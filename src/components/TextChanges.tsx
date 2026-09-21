import { DesignElement, isDesignElement, iconName } from '../design/elements';
import { useRecordedState } from '../design/history';
import React, { useEffect, useState } from 'react';
type Edit = { before: string; after: string };
type Edits = Record<string, Record<string, Edit>>;
const key = 'p7-text-edits-v1';
export function useTextChanges(element: DesignElement | null, pageId: string, selector: string) {
  const [edits, setEdits] = useRecordedState<Edits>(() => { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return {}; } });
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');
  const editable = !!element && !(element instanceof SVGSVGElement) && element.children.length === 0 && !!element.textContent?.trim();
  useEffect(() => { setDraft(element?.textContent || ''); }, [element, pageId]);
  useEffect(() => {
    const apply = () => {
      for (const [target, edit] of Object.entries(edits[pageId] || {}) as [string, Edit][]) {
        const el = document.querySelector(target);
        if (el && el.children.length === 0 && el.textContent !== edit.after) el.textContent = edit.after;
      }
    };
    apply();
    const observer = new MutationObserver(apply);
    const canvas = document.querySelector('.deck-canvas');
    if (canvas) observer.observe(canvas, { childList: true, characterData: true, subtree: true });
    try { localStorage.setItem(key, JSON.stringify(edits)); } catch { setStatus('文案无法保存到浏览器。'); }
    return () => {
      observer.disconnect();
      for (const [target, edit] of Object.entries(edits[pageId] || {}) as [string, Edit][]) {
        const el = document.querySelector(target);
        if (el && el.children.length === 0 && el.textContent === edit.after) el.textContent = edit.before;
      }
    };
  }, [edits, pageId]);
  const editor = editable ? <div className="design-control"><span>文字内容</span><textarea aria-label="文字内容" value={draft} rows={3} onChange={e => setDraft(e.target.value)} /><div className="design-actions"><button onClick={() => {
    if (!element) return;
    const before = edits[pageId]?.[selector]?.before ?? element.textContent ?? '';
    setEdits(p => ({ ...p, [pageId]: { ...p[pageId], [selector]: { before, after: draft } } }));
    setStatus('文字已应用并保存到当前浏览器。');
  }}>应用文字</button><button onClick={() => {
    const edit = edits[pageId]?.[selector]; if (!edit || !element) return;
    element.textContent = edit.before; setDraft(edit.before);
    setEdits(p => { const page = { ...p[pageId] }; delete page[selector]; return { ...p, [pageId]: page }; });
    setStatus('已恢复原文。');
  }}>恢复原文</button></div><small role="status">{status}</small></div> : null;
  return { edits, editor };
}
export function ChangeHandoff({ payload, summary }: { payload: string; summary: string[] }) {
  const [status, setStatus] = useState('');
  const [show, setShow] = useState(false);
  return <section className="change-handoff"><button className="design-trigger" onClick={async () => {
    try { await navigator.clipboard.writeText(payload); setStatus('已复制改动说明，请粘贴到当前 AI 对话发送。'); }
    catch { setShow(true); setStatus('无法自动复制，请从下面手动复制。'); }
  }}>复制改动发给 AI</button><p className="design-help" role="status">{status || '复制后粘贴到 AI 对话，才会同步到源码。'}</p><details className="handoff-summary"><summary>查看改动摘要 · {summary.length} 项</summary>{summary.length ? <ul>{summary.map((line, i) => <li key={i}>{line}</li>)}</ul> : <p>暂无已保存改动。</p>}<button onClick={() => setShow(!show)}>查看完整交接数据</button></details>{show && <textarea aria-label="发给 AI 的改动说明" readOnly rows={7} value={payload} onFocus={e => e.target.select()} />}</section>;
}
