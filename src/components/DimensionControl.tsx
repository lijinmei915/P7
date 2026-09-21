import { DesignElement, isDesignElement, iconName } from '../design/elements';
import React, { useEffect, useState } from 'react';
import { Rule } from '../design/library';
type Props = { element: DesignElement; slot: string; label: string; actual: string; assigned?: Rule; rules: Rule[]; apply: (id: string) => void; commit: (value: number) => void };
export default function DimensionControl({ element, slot, label, actual, assigned, rules, apply, commit }: Props) {
  const [draft, setDraft] = useState<string | null>(null);
  const [fixed, setFixed] = useState(false);
  const number = draft === null ? Math.round(parseFloat(actual)) : Number(draft);
  const valid = draft !== '' && Number.isFinite(number) && number >= 1 && number <= 2000;
  useEffect(() => { setDraft(null); setFixed(false); }, [element, slot]);
  useEffect(() => {
    if (draft === null || !valid) return;
    const changes: Record<string, string> = { [slot]: `${number}px` };
    const parentStyle = element.parentElement ? getComputedStyle(element.parentElement) : null;
    const mainAxis = parentStyle?.flexDirection.startsWith('column') ? 'height' : 'width';
    if (parentStyle?.display.includes('flex') && slot === mainAxis) Object.assign(changes, { 'flex-grow': '0', 'flex-shrink': '0', 'flex-basis': 'auto' });
    const saved = Object.keys(changes).map(key => [key, element.style.getPropertyValue(key), element.style.getPropertyPriority(key)]);
    Object.entries(changes).forEach(([key, value]) => element.style.setProperty(key, value, 'important'));
    return () => { saved.forEach(([key, value, priority]) => value ? element.style.setProperty(key, value, priority) : element.style.removeProperty(key)); };
  }, [element, slot, draft, number, valid]);
  const currentMode = fixed || draft !== null || assigned?.values.value.endsWith('px') ? 'fixed' : assigned?.id || '';
  return <div className="design-control dimension-control"><span>{label}</span>
    <div className="dimension-row"><select aria-label={`${label}模式`} value={currentMode} onChange={event => {
      setDraft(null); setFixed(event.target.value === 'fixed');
      if (event.target.value !== 'fixed') apply(event.target.value);
    }}>
      <option value="">沿用页面</option><option value="size-auto">自动</option><option value="size-content">适应内容</option><option value="size-full">填满父容器</option><option value="size-remaining">分配剩余空间</option><option value="fixed">固定尺寸</option>
    </select>
    {currentMode === 'fixed' && <><input aria-label={`自定义${label}（px）`} type="number" min="1" max="2000" step="1" value={draft ?? (Number.isFinite(number) ? number : '')} onChange={e => setDraft(e.target.value)} /><span>px</span></>}
    </div>
    {currentMode === 'fixed' && <details className="rule-picker"><summary>选择已有尺寸规范</summary><div className="rule-options">{rules.filter(rule => rule.values.value.endsWith('px')).map(rule => <button key={rule.id} onClick={() => { setDraft(null); apply(rule.id); }}><strong>{rule.name}</strong><small>{rule.values.value}</small></button>)}</div></details>}
    {draft !== null ? <div className="dimension-preview"><small role="status">{valid ? '临时预览 · 尚未保存' : '请输入 1–2000px 的有效尺寸'}</small><div className="design-actions"><button disabled={!valid} onClick={() => { commit(number); setDraft(null); }}>存为规范并应用</button><button onClick={() => setDraft(null)}>取消预览</button></div></div> : <small className="design-usage" title={`实际尺寸 ${actual}`}>{assigned?.name || '页面原有尺寸'} · 实际 {Number.isFinite(parseFloat(actual)) ? Math.round(parseFloat(actual)) + 'px' : actual}</small>}
  </div>;
}
