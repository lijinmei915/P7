import React, { useState } from 'react';
import { Rule } from '../design/library';
export default function SpacingControl({ prefix, actual, rules, apply }: { prefix: string; actual: Record<string, string>; rules: Rule[]; apply: (slots: string[], id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const sides = ['top', 'right', 'bottom', 'left'];
  const labels = ['上', '右', '下', '左'];
  const properties = sides.map(side => `${prefix}-${side}`);
  const values = properties.map(property => actual[property] || '0px');
  const uniform = values.every(value => value === values[0]);
  const label = prefix === 'padding' ? '内边距' : '外边距';
  const picker = (targets: string[], value: string, name: string) => <label className="design-control"><span>{name}</span><select aria-label={name} value={rules.find(rule => rule.values.value === value)?.id || ''} onChange={event => apply(targets, event.target.value)}>
    <option value="">{value === 'mixed' ? '混合值' : `当前 ${value}`} · 沿用页面</option>{rules.map(rule => <option key={rule.id} value={rule.id}>{rule.name} · {rule.values.value}</option>)}
  </select></label>;
  return <div className="spacing-control">
    {!expanded && picker(properties, uniform ? values[0] : 'mixed', label)}
    <button type="button" className="spacing-toggle" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? '合并显示' : '分别设置四边'}</button>
    {expanded && <div className="spacing-sides">{properties.map((property, index) => <div key={property}>{picker([property], values[index], `${labels[index]}${label}`)}</div>)}</div>}
  </div>;
}
