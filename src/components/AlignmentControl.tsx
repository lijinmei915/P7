import { DesignElement } from '../design/elements';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  element: DesignElement;
  actual: Record<string, string>;
  isText: boolean;
  onApplyStyle: (property: string, value: string, ruleId?: string) => void;
  onResetStyle: (properties: string[]) => void;
};

export default function AlignmentControl({
  element,
  actual,
  isText,
  onApplyStyle,
  onResetStyle,
}: Props) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const feedbackTimer = useRef<number | null>(null);

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
    setFeedback(null);
  }, [element]);

  // Determine element layout roles
  const computed = getComputedStyle(element);
  const isFlex = computed.display.includes('flex');
  const isGrid = computed.display.includes('grid');
  const isColumn = isFlex && computed.flexDirection.startsWith('column');
  const isContainer = isFlex || isGrid || element.children.length > 0;
  
  // Parent info
  const parent = element.parentElement ? getComputedStyle(element.parentElement) : null;
  const parentIsFlex = !!parent?.display.includes('flex');
  const parentIsGrid = !!parent?.display.includes('grid');
  const canSelfAlign = parentIsFlex || parentIsGrid;

  // Current computed values
  const currentJustifyContent = actual['justify-content'] || computed.justifyContent || 'normal';
  const currentAlignItems = actual['align-items'] || computed.alignItems || 'normal';
  const currentAlignContent = actual['align-content'] || computed.alignContent || 'normal';
  const currentJustifyItems = actual['justify-items'] || computed.justifyItems || 'normal';
  const currentTextAlign = actual['text-align'] || computed.textAlign || 'left';
  const currentAlignSelf = actual['align-self'] || computed.alignSelf || 'auto';
  const currentJustifySelf = actual['justify-self'] || computed.justifySelf || 'auto';

  // Automatically sync align-content for Grid when align-items was set but align-content wasn't
  useEffect(() => {
    if (!element) return;
    const comp = getComputedStyle(element);
    if (comp.display.includes('grid')) {
      const ai = actual['align-items'] || element.style.alignItems || comp.alignItems;
      const ac = actual['align-content'] || element.style.alignContent || comp.alignContent;
      if (ai && ai !== 'normal' && (!ac || ac === 'normal')) {
        const mapped = ai === 'flex-start' ? 'start' : ai === 'flex-end' ? 'end' : ai;
        element.style.setProperty('align-content', mapped, 'important');
        onApplyStyle('align-content', mapped);
      }
    }
  }, [element, actual, onApplyStyle]);

  // Apply Container Horizontal Distribution / Alignment
  const applyJustifyContent = (val: string, label: string) => {
    showFeedback(`已设为${label}`);

    if (isColumn) {
      // In flex-direction: column, cross-axis (horizontal) is controlled by align-items
      const aiVal = val === 'flex-start' || val === 'start' ? 'flex-start' : val === 'flex-end' || val === 'end' ? 'flex-end' : val === 'center' ? 'center' : 'stretch';
      element.style.setProperty('align-items', aiVal, 'important');
      onApplyStyle('align-items', aiVal);
      return;
    }

    if (!isFlex && !isGrid && element.children.length > 0) {
      element.style.setProperty('display', 'flex', 'important');
      onApplyStyle('display', 'flex');
    }

    element.style.setProperty('justify-content', val, 'important');
    if (isGrid) {
      const jiVal = val === 'space-between' || val === 'space-evenly' ? 'stretch' : (val === 'flex-start' ? 'start' : val === 'flex-end' ? 'end' : val);
      element.style.setProperty('justify-items', jiVal, 'important');
      onApplyStyle('justify-items', jiVal);
    }

    const ruleMap: Record<string, string> = {
      'flex-start': 'distribute-start',
      'start': 'distribute-start',
      'center': 'distribute-center',
      'flex-end': 'distribute-end',
      'end': 'distribute-end',
      'space-between': 'distribute-space-between',
      'space-evenly': 'distribute-space-evenly',
    };
    onApplyStyle('justify-content', val, ruleMap[val]);
  };

  // Apply Container Vertical Alignment
  const applyAlignItems = (val: string, label: string) => {
    showFeedback(`已设为${label}`);

    if (isColumn) {
      // In flex-direction: column, main-axis (vertical) is controlled by justify-content
      const jcVal = val === 'flex-start' || val === 'start' ? 'flex-start' : val === 'flex-end' || val === 'end' ? 'flex-end' : val === 'center' ? 'center' : 'stretch';
      element.style.setProperty('justify-content', jcVal, 'important');
      onApplyStyle('justify-content', jcVal);
      return;
    }

    if (!isFlex && !isGrid && element.children.length > 0) {
      element.style.setProperty('display', 'flex', 'important');
      onApplyStyle('display', 'flex');
    }

    // In CSS Grid, align-content is REQUIRED to vertically position row tracks within the grid container!
    // align-items vertically positions items inside each cell. Setting both guarantees complete vertical centering!
    const acVal = val === 'flex-start' ? 'start' : val === 'flex-end' ? 'end' : val;
    element.style.setProperty('align-content', acVal, 'important');
    element.style.setProperty('align-items', val, 'important');

    const ruleMap: Record<string, string> = {
      'flex-start': 'align-start',
      'start': 'align-start',
      'center': 'align-center',
      'flex-end': 'align-end',
      'end': 'align-end',
      'stretch': 'align-stretch',
    };
    onApplyStyle('align-items', val, ruleMap[val]);
    onApplyStyle('align-content', acVal);
  };

  // Apply Text Alignment
  const applyTextAlign = (val: string, label: string) => {
    showFeedback(`已设为${label}`);
    element.style.setProperty('text-align', val, 'important');
    onApplyStyle('text-align', val, `text-align-${val}`);
  };

  // Apply Self Alignment (align-self / justify-self)
  const applySelfAlignH = (val: string, label: string) => {
    showFeedback(`已设为自身水平${label}`);
    if (parentIsGrid) {
      element.style.setProperty('justify-self', val, 'important');
      onApplyStyle('justify-self', val);
    } else {
      // In flex container
      const parentIsCol = parent?.flexDirection.startsWith('column');
      if (parentIsCol) {
        element.style.setProperty('align-self', val === 'space-between' ? 'stretch' : val, 'important');
        onApplyStyle('align-self', val === 'space-between' ? 'stretch' : val);
      } else {
        // Horizontal flex child margin trick or flex-grow
        if (val === 'center') {
          element.style.setProperty('margin-left', 'auto', 'important');
          element.style.setProperty('margin-right', 'auto', 'important');
        } else if (val === 'flex-end' || val === 'end') {
          element.style.setProperty('margin-left', 'auto', 'important');
          element.style.setProperty('margin-right', '0', 'important');
        } else if (val === 'flex-start' || val === 'start') {
          element.style.setProperty('margin-left', '0', 'important');
          element.style.setProperty('margin-right', 'auto', 'important');
        }
      }
    }
  };

  const applySelfAlignV = (val: string, label: string) => {
    showFeedback(`已设为自身垂直${label}`);
    element.style.setProperty('align-self', val, 'important');
    onApplyStyle('align-self', val);
  };

  const handleResetAlignment = () => {
    showFeedback('已恢复默认对齐');
    onResetStyle(['justify-content', 'justify-items', 'align-items', 'align-content', 'text-align', 'align-self', 'justify-self']);
  };

  // Active state helpers for buttons
  const isVActive = (target: 'start' | 'center' | 'end' | 'stretch') => {
    if (isColumn) {
      if (target === 'start') return currentJustifyContent === 'flex-start' || currentJustifyContent === 'start';
      if (target === 'center') return currentJustifyContent === 'center';
      if (target === 'end') return currentJustifyContent === 'flex-end' || currentJustifyContent === 'end';
      if (target === 'stretch') return currentJustifyContent === 'stretch';
      return false;
    }
    if (isGrid) {
      if (target === 'start') return currentAlignContent === 'start' || currentAlignContent === 'flex-start' || currentAlignItems === 'start' || currentAlignItems === 'flex-start';
      if (target === 'center') return currentAlignContent === 'center' || currentAlignItems === 'center';
      if (target === 'end') return currentAlignContent === 'end' || currentAlignContent === 'flex-end' || currentAlignItems === 'end' || currentAlignItems === 'flex-end';
      if (target === 'stretch') return currentAlignContent === 'stretch' || currentAlignItems === 'stretch';
      return false;
    }
    if (target === 'start') return currentAlignItems === 'flex-start' || currentAlignItems === 'start';
    if (target === 'center') return currentAlignItems === 'center';
    if (target === 'end') return currentAlignItems === 'flex-end' || currentAlignItems === 'end';
    if (target === 'stretch') return currentAlignItems === 'stretch';
    return false;
  };

  const isHActive = (target: 'start' | 'center' | 'end' | 'space-between' | 'space-evenly') => {
    if (isColumn) {
      if (target === 'start') return currentAlignItems === 'flex-start' || currentAlignItems === 'start';
      if (target === 'center') return currentAlignItems === 'center';
      if (target === 'end') return currentAlignItems === 'flex-end' || currentAlignItems === 'end';
      return false;
    }
    if (target === 'start') return currentJustifyContent === 'flex-start' || currentJustifyContent === 'start' || currentJustifyItems === 'start';
    if (target === 'center') return currentJustifyContent === 'center';
    if (target === 'end') return currentJustifyContent === 'flex-end' || currentJustifyContent === 'end' || currentJustifyItems === 'end';
    if (target === 'space-between') return currentJustifyContent === 'space-between';
    if (target === 'space-evenly') return currentJustifyContent === 'space-evenly';
    return false;
  };

  return (
    <div className="design-control alignment-control-section">
      <div className="flex items-center justify-between font-semibold text-slate-800 text-xs mb-2">
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-600">
            <line x1="21" y1="10" x2="3" y2="10" />
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="21" y1="14" x2="3" y2="14" />
            <line x1="21" y1="18" x2="3" y2="18" />
          </svg>
          <span>对齐</span>
        </span>
        <div className="flex items-center gap-2">
          {feedback && <span className="text-[10px] text-blue-600 font-medium animate-pulse">{feedback}</span>}
          <button
            type="button"
            onClick={handleResetAlignment}
            className="text-[10px] font-medium text-slate-400 hover:text-blue-600 transition-colors"
            title="恢复默认"
          >
            恢复默认
          </button>
        </div>
      </div>

      {/* 1. If Text Element: Show Text Alignment */}
      {isText && (
        <div className="alignment-subgroup">
          <span className="alignment-sublabel">文字对齐</span>
          <div className="alignment-button-bar" role="group" aria-label="文字对齐">
            <button
              type="button"
              className={`alignment-btn ${currentTextAlign === 'left' || currentTextAlign === 'start' ? 'is-active' : ''}`}
              onClick={() => applyTextAlign('left', '左对齐')}
              title="左对齐"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="15" y2="12" />
                <line x1="3" y1="18" x2="18" y2="18" />
              </svg>
              <span>居左</span>
            </button>
            <button
              type="button"
              className={`alignment-btn ${currentTextAlign === 'center' ? 'is-active' : ''}`}
              onClick={() => applyTextAlign('center', '居中对齐')}
              title="居中对齐"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="6" y1="12" x2="18" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
              <span>居中</span>
            </button>
            <button
              type="button"
              className={`alignment-btn ${currentTextAlign === 'right' || currentTextAlign === 'end' ? 'is-active' : ''}`}
              onClick={() => applyTextAlign('right', '右对齐')}
              title="右对齐"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="9" y1="12" x2="21" y2="12" />
                <line x1="6" y1="18" x2="21" y2="18" />
              </svg>
              <span>居右</span>
            </button>
            <button
              type="button"
              className={`alignment-btn ${currentTextAlign === 'justify' ? 'is-active' : ''}`}
              onClick={() => applyTextAlign('justify', '两端对齐')}
              title="两端对齐"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span>两端</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Container Horizontal Alignment */}
      {isContainer && (
        <div className="alignment-subgroup">
          <span className="alignment-sublabel">水平对齐</span>
          <div className="alignment-button-bar" role="group" aria-label="水平对齐">
            <button
              type="button"
              className={`alignment-btn ${isHActive('start') ? 'is-active' : ''}`}
              onClick={() => applyJustifyContent('flex-start', '靠左')}
              title="靠左"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="4" y1="4" x2="4" y2="20" strokeWidth="3" />
                <rect x="7" y="6" width="6" height="12" rx="1.5" />
                <rect x="15" y="8" width="5" height="8" rx="1.5" />
              </svg>
              <span>靠左</span>
            </button>

            <button
              type="button"
              className={`alignment-btn ${isHActive('center') ? 'is-active' : ''}`}
              onClick={() => applyJustifyContent('center', '居中')}
              title="居中"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="12" y1="3" x2="12" y2="21" strokeDasharray="2 2" />
                <rect x="5" y="7" width="5" height="10" rx="1.5" />
                <rect x="14" y="7" width="5" height="10" rx="1.5" />
              </svg>
              <span>居中</span>
            </button>

            <button
              type="button"
              className={`alignment-btn ${isHActive('end') ? 'is-active' : ''}`}
              onClick={() => applyJustifyContent('flex-end', '靠右')}
              title="靠右"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="20" y1="4" x2="20" y2="20" strokeWidth="3" />
                <rect x="11" y="6" width="6" height="12" rx="1.5" />
                <rect x="4" y="8" width="5" height="8" rx="1.5" />
              </svg>
              <span>靠右</span>
            </button>

            <button
              type="button"
              className={`alignment-btn ${isHActive('space-between') ? 'is-active' : ''}`}
              onClick={() => applyJustifyContent('space-between', '两端')}
              title="两端"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="3" y1="4" x2="3" y2="20" strokeWidth="2" />
                <line x1="21" y1="4" x2="21" y2="20" strokeWidth="2" />
                <rect x="5" y="7" width="4" height="10" rx="1" />
                <rect x="15" y="7" width="4" height="10" rx="1" />
              </svg>
              <span>两端</span>
            </button>

            <button
              type="button"
              className={`alignment-btn ${isHActive('space-evenly') ? 'is-active' : ''}`}
              onClick={() => applyJustifyContent('space-evenly', '等距')}
              title="等距"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="4" y="7" width="4" height="10" rx="1" />
                <rect x="10" y="7" width="4" height="10" rx="1" />
                <rect x="16" y="7" width="4" height="10" rx="1" />
              </svg>
              <span>等距</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Container Vertical Alignment */}
      {isContainer && (
        <div className="alignment-subgroup">
          <span className="alignment-sublabel">垂直对齐</span>
          <div className="alignment-button-bar" role="group" aria-label="垂直对齐">
            <button
              type="button"
              className={`alignment-btn ${isVActive('start') ? 'is-active' : ''}`}
              onClick={() => applyAlignItems('flex-start', '顶部')}
              title="顶部"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="4" y1="4" x2="20" y2="4" strokeWidth="3" />
                <rect x="6" y="7" width="4" height="12" rx="1" />
                <rect x="14" y="7" width="4" height="7" rx="1" />
              </svg>
              <span>顶部</span>
            </button>

            <button
              type="button"
              className={`alignment-btn ${isVActive('center') ? 'is-active' : ''}`}
              onClick={() => applyAlignItems('center', '居中')}
              title="居中"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="3" y1="12" x2="21" y2="12" strokeDasharray="2 2" />
                <rect x="6" y="6" width="4" height="12" rx="1" />
                <rect x="14" y="8" width="4" height="8" rx="1" />
              </svg>
              <span>居中</span>
            </button>

            <button
              type="button"
              className={`alignment-btn ${isVActive('end') ? 'is-active' : ''}`}
              onClick={() => applyAlignItems('flex-end', '底部')}
              title="底部"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="4" y1="20" x2="20" y2="20" strokeWidth="3" />
                <rect x="6" y="5" width="4" height="12" rx="1" />
                <rect x="14" y="10" width="4" height="7" rx="1" />
              </svg>
              <span>底部</span>
            </button>

            <button
              type="button"
              className={`alignment-btn ${isVActive('stretch') ? 'is-active' : ''}`}
              onClick={() => applyAlignItems('stretch', '拉伸')}
              title="拉伸"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="4" y1="4" x2="20" y2="4" strokeWidth="2" />
                <line x1="4" y1="20" x2="20" y2="20" strokeWidth="2" />
                <rect x="7" y="6" width="3" height="12" rx="1" />
                <rect x="14" y="6" width="3" height="12" rx="1" />
              </svg>
              <span>拉伸</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Item Self Alignment (in parent Flex/Grid) */}
      {canSelfAlign && (
        <div className="alignment-subgroup">
          <span className="alignment-sublabel">自身在父级中对齐</span>
          <div className="alignment-button-bar" role="group" aria-label="自身对齐">
            <button
              type="button"
              className={`alignment-btn ${currentAlignSelf === 'flex-start' || currentAlignSelf === 'start' ? 'is-active' : ''}`}
              onClick={() => applySelfAlignV('flex-start', '靠顶')}
              title="自身靠顶"
            >
              <span>靠顶</span>
            </button>
            <button
              type="button"
              className={`alignment-btn ${currentAlignSelf === 'center' ? 'is-active' : ''}`}
              onClick={() => applySelfAlignV('center', '居中')}
              title="自身居中"
            >
              <span>居中</span>
            </button>
            <button
              type="button"
              className={`alignment-btn ${currentAlignSelf === 'flex-end' || currentAlignSelf === 'end' ? 'is-active' : ''}`}
              onClick={() => applySelfAlignV('flex-end', '靠底')}
              title="自身靠底"
            >
              <span>靠底</span>
            </button>
            <button
              type="button"
              className={`alignment-btn ${currentAlignSelf === 'stretch' ? 'is-active' : ''}`}
              onClick={() => applySelfAlignV('stretch', '拉伸')}
              title="自身拉伸"
            >
              <span>拉伸</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
