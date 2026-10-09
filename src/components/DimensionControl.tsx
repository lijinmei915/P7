import { DesignElement } from '../design/elements';
import React, { useEffect, useRef, useState } from 'react';
import { Rule } from '../design/library';

type Props = {
  element: DesignElement;
  slot: string; // 'width' | 'height'
  label: string; // '宽度' | '高度'
  actual: string; // e.g. '341.33px'
  assigned?: Rule;
  rules: Rule[];
  apply: (id: string) => void;
  commit: (value: number) => void;
};

export default function DimensionControl({
  element,
  slot,
  label,
  actual,
  assigned,
  apply,
  commit,
}: Props) {
  const [draft, setDraft] = useState<string | null>(null);
  const [fixed, setFixed] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const feedbackTimer = useRef<number | null>(null);

  const actualPx = Math.round(parseFloat(actual)) || (slot === 'width' ? 320 : 240);
  const number = draft === null ? actualPx : Number(draft);
  const valid = draft !== '' && Number.isFinite(number) && number >= 1 && number <= 2000;

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setFeedback(null), 2200);
  };

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    };
  }, []);

  useEffect(() => {
    setDraft(null);
    setFixed(false);
    setFeedback(null);
  }, [element, slot]);

  // Determine current active mode
  let currentMode = 'default';
  if (fixed || draft !== null || (assigned?.values.value && assigned.values.value.endsWith('px'))) {
    currentMode = 'fixed';
  } else if (assigned?.id === 'size-content' || assigned?.id === 'size-auto') {
    currentMode = 'content';
  } else if (assigned?.id === 'size-remaining' || assigned?.id === 'size-full') {
    currentMode = 'remaining';
  } else if (!assigned?.id) {
    currentMode = 'default';
  }

  // Instantly apply CSS to element.style with full multi-property enforcement
  const applyImmediateHug = () => {
    setDraft(null);
    setFixed(false);
    showFeedback('已即时贴合内容 (Hug)');
    // Direct DOM write
    element.style.setProperty(slot, 'fit-content', 'important');
    element.style.setProperty(slot === 'width' ? 'min-width' : 'min-height', '0px', 'important');
    element.style.setProperty(slot === 'width' ? 'max-width' : 'max-height', 'max-content', 'important');
    element.style.setProperty(slot === 'width' ? 'justify-self' : 'align-self', 'start', 'important');
    element.style.setProperty('flex-grow', '0', 'important');
    element.style.setProperty('flex-shrink', '1', 'important');
    element.style.setProperty('flex-basis', 'auto', 'important');
    apply('size-content');
  };

  const applyImmediateFill = () => {
    setDraft(null);
    setFixed(false);
    showFeedback('已即时撑满空间 (Fill)');
    // Direct DOM write
    element.style.setProperty(slot, '100%', 'important');
    element.style.setProperty(slot === 'width' ? 'min-width' : 'min-height', '0px', 'important');
    element.style.setProperty(slot === 'width' ? 'max-width' : 'max-height', 'none', 'important');
    element.style.setProperty(slot === 'width' ? 'justify-self' : 'align-self', 'stretch', 'important');
    element.style.setProperty('flex-grow', '1', 'important');
    element.style.setProperty('flex-shrink', '1', 'important');
    element.style.setProperty('flex-basis', '0%', 'important');
    apply('size-remaining');
  };

  const applyImmediateDefault = () => {
    setDraft(null);
    setFixed(false);
    showFeedback('已恢复页面原始排版');
    // Remove inline overrides
    const props = [
      slot,
      slot === 'width' ? 'min-width' : 'min-height',
      slot === 'width' ? 'max-width' : 'max-height',
      slot === 'width' ? 'justify-self' : 'align-self',
      'flex', 'flex-grow', 'flex-shrink', 'flex-basis'
    ];
    props.forEach(p => element.style.removeProperty(p));
    apply('');
  };

  const applyImmediateFixedPx = (px: number, informUser = true) => {
    const safePx = Math.max(20, Math.min(2000, Math.round(px)));
    setFixed(true);
    setDraft(String(safePx));
    if (informUser) showFeedback(`已设为固定 ${safePx}px`);
    // Direct DOM write
    element.style.setProperty(slot, `${safePx}px`, 'important');
    element.style.setProperty(slot === 'width' ? 'min-width' : 'min-height', `${safePx}px`, 'important');
    element.style.setProperty(slot === 'width' ? 'max-width' : 'max-height', `${safePx}px`, 'important');
    element.style.setProperty(slot === 'width' ? 'justify-self' : 'align-self', 'start', 'important');
    element.style.setProperty('flex-grow', '0', 'important');
    element.style.setProperty('flex-shrink', '0', 'important');
    element.style.setProperty('flex-basis', `${safePx}px`, 'important');
    commit(safePx);
  };

  const handleSelectMode = (mode: 'content' | 'remaining' | 'fixed' | 'default') => {
    if (mode === 'content') {
      applyImmediateHug();
    } else if (mode === 'remaining') {
      applyImmediateFill();
    } else if (mode === 'default') {
      applyImmediateDefault();
    } else if (mode === 'fixed') {
      const targetPx = Number.isFinite(number) && number > 0 ? number : actualPx;
      applyImmediateFixedPx(targetPx, true);
    }
  };

  const handleStep = (delta: number) => {
    const current = Number.isFinite(number) ? number : actualPx;
    applyImmediateFixedPx(current + delta, true);
  };

  const handleInputChange = (valStr: string) => {
    setDraft(valStr);
    const parsed = parseFloat(valStr);
    if (Number.isFinite(parsed) && parsed >= 20 && parsed <= 2000) {
      applyImmediateFixedPx(parsed, false);
    }
  };

  return (
    <div className="design-control dimension-control">
      <div className="dimension-header">
        <span className="dimension-title">{label}</span>
        <div className="dimension-header-right">
          {feedback && <span className="dimension-feedback">{feedback}</span>}
          <span className="dimension-val-badge">
            {Number.isFinite(parseFloat(actual)) ? Math.round(parseFloat(actual)) + 'px' : actual}
          </span>
        </div>
      </div>

      {/* Modern Compact Segmented Bar: 4 modes in one sleek row */}
      <div className="dimension-segment-bar" role="radiogroup" aria-label={`${label}排版模式`}>
        <button
          type="button"
          className={`dimension-segment-btn ${currentMode === 'content' ? 'is-active' : ''}`}
          onClick={() => handleSelectMode('content')}
          title="适应内容 (Hug)"
        >
          {slot === 'width' ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
              <rect x="5" y="5" width="14" height="14" rx="2" strokeDasharray="3 3" />
              <path d="M2 12h3M22 12h-3" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
              <rect x="5" y="5" width="14" height="14" rx="2" strokeDasharray="3 3" />
              <path d="M12 2v3M12 22v-3" />
            </svg>
          )}
          <span>Hug 适应</span>
        </button>

        <button
          type="button"
          className={`dimension-segment-btn ${currentMode === 'remaining' ? 'is-active' : ''}`}
          onClick={() => handleSelectMode('remaining')}
          title="撑满空间 (Fill)"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            {slot === 'width' ? (
              <path d="M7 12H4m0 0l2-2m-2 2l2 2M17 12h3m0 0l-2-2m2 2l-2 2" />
            ) : (
              <path d="M12 7V4m0 0l-2 2m2-2l2 2M12 17v3m0 0l-2-2m2 2l2-2" />
            )}
          </svg>
          <span>Fill 撑满</span>
        </button>

        <button
          type="button"
          className={`dimension-segment-btn ${currentMode === 'fixed' ? 'is-active' : ''}`}
          onClick={() => handleSelectMode('fixed')}
          title="固定尺寸 (Fixed)"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M8 6v3m4-3v3m4-3v3" />
          </svg>
          <span>固定尺寸</span>
        </button>

        <button
          type="button"
          className={`dimension-segment-btn ${currentMode === 'default' ? 'is-active' : ''}`}
          onClick={() => handleSelectMode('default')}
          title="恢复原始默认尺寸"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span>默认</span>
        </button>
      </div>

      {/* When Fixed is active: Compact Stepper + Quick Presets */}
      {currentMode === 'fixed' && (
        <div className="dimension-fixed-panel">
          <div className="dimension-stepper-row">
            <div className="dimension-stepper-group">
              <button
                type="button"
                className="dimension-stepper-btn"
                onClick={() => handleStep(-10)}
                title="减少 10px"
              >
                -10
              </button>
              <button
                type="button"
                className="dimension-stepper-btn"
                onClick={() => handleStep(-1)}
                title="微调 -1px"
              >
                -1
              </button>
            </div>

            <div className="dimension-input-wrapper">
              <input
                aria-label={`${label}像素值`}
                type="number"
                min="20"
                max="2000"
                step="1"
                className="dimension-number-input"
                value={draft ?? (Number.isFinite(number) ? number : actualPx)}
                onChange={e => handleInputChange(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && valid) {
                    applyImmediateFixedPx(number, true);
                  }
                }}
              />
              <span className="dimension-unit">px</span>
            </div>

            <div className="dimension-stepper-group">
              <button
                type="button"
                className="dimension-stepper-btn"
                onClick={() => handleStep(1)}
                title="微调 +1px"
              >
                +1
              </button>
              <button
                type="button"
                className="dimension-stepper-btn"
                onClick={() => handleStep(10)}
                title="增加 10px"
              >
                +10
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
