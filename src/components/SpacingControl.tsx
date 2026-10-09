import React, { useState } from 'react';
import { Rule } from '../design/library';

export default function SpacingControl({
  prefix,
  actual,
  rules,
  apply,
  onDirectStyle,
}: {
  prefix: string;
  actual: Record<string, string>;
  rules: Rule[];
  apply: (slots: string[], id: string) => void;
  onDirectStyle?: (property: string, value: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const sides = ['top', 'right', 'bottom', 'left'];
  const labels = ['上', '右', '下', '左'];
  const properties = sides.map(side => `${prefix}-${side}`);
  const values = properties.map(property => actual[property] || '0px');
  const uniform = values.every(value => value === values[0]);
  const label = prefix === 'padding' ? '内边距' : '外边距';

  // Key spacing options for fast single-click setting
  const quickRules = rules.filter(r => {
    const val = parseInt(r.values.value, 10);
    return [0, 4, 8, 12, 16, 24, 32, 48].includes(val);
  });

  const picker = (targets: string[], currentValue: string, name: string) => {
    const matchedRule = rules.find(rule => rule.values.value === currentValue);
    const numericVal = parseInt(currentValue, 10) || 0;

    return (
      <div className="spacing-picker-group">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-slate-800">{name}</span>
          <span className="text-[11px] font-mono text-slate-400">
            {currentValue === 'mixed' ? '四边不同' : currentValue}
          </span>
        </div>
        <div className="spacing-chip-bar" role="radiogroup" aria-label={name}>
          <button
            type="button"
            className={`spacing-chip-btn ${!matchedRule ? 'is-active' : ''}`}
            onClick={() => apply(targets, '')}
            title="沿用页面默认值"
          >
            沿用
          </button>
          {quickRules.map(rule => {
            const isSelected = matchedRule?.id === rule.id;
            return (
              <button
                type="button"
                key={rule.id}
                className={`spacing-chip-btn ${isSelected ? 'is-active' : ''}`}
                onClick={() => apply(targets, rule.id)}
                title={rule.name}
              >
                {rule.name}
              </button>
            );
          })}
        </div>
        {onDirectStyle && (
          <div className="custom-input-inline-wrap">
            <span className="custom-input-label">自定义数值:</span>
            <div className="custom-px-input-wrap">
              <input
                type="number"
                min="0"
                max="300"
                className="custom-px-input"
                placeholder="px"
                value={numericVal}
                onChange={e => {
                  const val = parseInt(e.target.value, 10);
                  if (Number.isFinite(val) && val >= 0) {
                    targets.forEach(targetProp => {
                      onDirectStyle(targetProp, `${val}px`);
                    });
                  }
                }}
              />
              <span className="position-coord-unit">px</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="spacing-control">
      {!expanded && picker(properties, uniform ? values[0] : 'mixed', label)}
      <div className="flex items-center justify-between mt-1.5">
        <button
          type="button"
          className="spacing-toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '← 合并四边统一设置' : '分别设置四边 (上下左右) →'}
        </button>
      </div>
      {expanded && (
        <div className="spacing-sides-exposed">
          {properties.map((property, index) => (
            <div key={property} className="mb-2">
              {picker([property], values[index], `${labels[index]}侧${label}`)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
