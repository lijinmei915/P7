import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
type Change = { undo: () => void; redo: () => void };
type History = { record: (change: Change) => void; undo: () => void; redo: () => void; canUndo: boolean; canRedo: boolean };
const Context = createContext<History | null>(null);
export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const past = useRef<Change[][]>([]), future = useRef<Change[][]>([]);
  const batch = useRef<Change[] | null>(null);
  const [, update] = useState(0);
  const record = useCallback((change: Change) => {
    if (!batch.current) {
      batch.current = [];
      past.current.push(batch.current);
      if (past.current.length > 100) past.current.shift();
      future.current = [];
      queueMicrotask(() => { batch.current = null; update(n => n + 1); });
    }
    batch.current.push(change);
  }, []);
  const undo = () => { const changes = past.current.pop(); if (!changes) return; batch.current = null; [...changes].reverse().forEach(c => c.undo()); future.current.push(changes); update(n => n + 1); };
  const redo = () => { const changes = future.current.pop(); if (!changes) return; batch.current = null; changes.forEach(c => c.redo()); past.current.push(changes); update(n => n + 1); };
  return <Context.Provider value={{ record, undo, redo, canUndo: !!past.current.length, canRedo: !!future.current.length }}>{children}</Context.Provider>;
}
export function useHistory() { const value = useContext(Context); if (!value) throw new Error('HistoryProvider is required'); return value; }
export function useRecordedState<T>(initial: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(initial);
  const current = useRef(value);
  const { record } = useHistory();
  const set = useCallback((next: React.SetStateAction<T>) => {
    const before = current.current;
    const after = typeof next === 'function' ? (next as (previous: T) => T)(before) : next;
    if (JSON.stringify(before) === JSON.stringify(after)) return;
    const restore = (snapshot: T) => { current.current = snapshot; setValue(snapshot); };
    restore(after);
    record({ undo: () => restore(before), redo: () => restore(after) });
  }, [record]);
  return [value, set];
}
export function HistoryButtons() {
  const history = useHistory();
  return <div className="design-actions"><button disabled={!history.canUndo} onClick={history.undo}>撤销</button><button disabled={!history.canRedo} onClick={history.redo}>重做</button><small>已保存到当前浏览器 · 尚未写入源码</small></div>;
}
