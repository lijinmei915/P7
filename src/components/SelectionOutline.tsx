import { DesignElement, iconName } from '../design/elements';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FoldHorizontal, Maximize2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Move, Magnet } from 'lucide-react';

type Props = {
  element: DesignElement | null;
  onCommitSize?: (slot: 'width' | 'height', px: number) => void;
  onAssignMode?: (slot: 'width' | 'height', id: string) => void;
  onSelectParent?: () => void;
  currentMode?: string;
};

interface CandidateTarget {
  el: HTMLElement;
  label: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

interface ActiveSnap {
  lineX?: number; // in viewport px
  lineY?: number; // in viewport px
  labelX?: string;
  labelY?: string;
  targetEl?: HTMLElement;
  targetLabel?: string;
  targetRect?: DOMRect;
}

/** Render outside the slide so overflow clipping and canvas transforms cannot hide selection. */
export default function SelectionOutline({ element, onCommitSize, onAssignMode, onSelectParent, currentMode, isFixed, onToggleFixed, onCommitFixedPosition }: Props) {
  const outline = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [isDragging, setIsDragging] = useState<'e' | 's' | 'se' | 'move' | null>(null);
  const [liveSize, setLiveSize] = useState<{ w: number; h: number } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [snapEnabled, setSnapEnabled] = useState<boolean>(true);
  const [activeSnap, setActiveSnap] = useState<ActiveSnap | null>(null);
  const [isNearTop, setIsNearTop] = useState<boolean>(false);
  const [isMoveActive, setIsMoveActive] = useState<boolean>(false);
  const [moveCount, setMoveCount] = useState<number>(0);

  useEffect(() => {
    setIsMoveActive(false);
  }, [element]);

  useEffect(() => {
    if (!element) return;
    let frame = 0;
    const update = () => {
      const node = outline.current;
      if (!node) return;
      const rect = element.getBoundingClientRect();
      const canvas = element.closest('.deck-canvas') as HTMLElement | null;
      const zoom = canvas ? (parseFloat(canvas.style.zoom) || 1) : 1;
      node.style.display = element.isConnected && rect.width && rect.height ? 'block' : 'none';
      node.style.left = `${rect.left}px`;
      node.style.top = `${rect.top}px`;
      node.style.width = `${rect.width}px`;
      node.style.height = `${rect.height}px`;
      node.style.borderRadius = getComputedStyle(element).borderRadius;
      setDimensions({ w: Math.round(rect.width / zoom), h: Math.round(rect.height / zoom) });
      setIsNearTop(rect.top < 65);
      frame = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frame);
  }, [element]);

  // Spatial direction calculation to find available move directions
  const getAvailableDirections = () => {
    if (!element || !element.parentElement) {
      return { up: false, down: false, left: false, right: false };
    }
    const parent = element.parentElement;
    const allChildren = Array.from(parent.children) as HTMLElement[];
    const currentIndex = allChildren.indexOf(element as HTMLElement);
    if (currentIndex === -1) {
      return { up: false, down: false, left: false, right: false };
    }

    const elemRect = element.getBoundingClientRect();
    let up = false;
    let down = false;
    let left = false;
    let right = false;

    // Check previous sibling in DOM
    if (currentIndex > 0) {
      const prev = allChildren[currentIndex - 1];
      const prevRect = prev.getBoundingClientRect();
      const dx = (prevRect.left + prevRect.width / 2) - (elemRect.left + elemRect.width / 2);
      const dy = (prevRect.top + prevRect.height / 2) - (elemRect.top + elemRect.height / 2);

      if (Math.abs(dx) >= Math.abs(dy)) {
        if (dx <= 0) left = true;
        else right = true;
      } else {
        if (dy <= 0) up = true;
        else down = true;
      }
    }

    // Check next sibling in DOM
    if (currentIndex < allChildren.length - 1) {
      const next = allChildren[currentIndex + 1];
      const nextRect = next.getBoundingClientRect();
      const dx = (nextRect.left + nextRect.width / 2) - (elemRect.left + elemRect.width / 2);
      const dy = (nextRect.top + nextRect.height / 2) - (elemRect.top + elemRect.height / 2);

      if (Math.abs(dx) >= Math.abs(dy)) {
        if (dx >= 0) right = true;
        else left = true;
      } else {
        if (dy >= 0) down = true;
        else up = true;
      }
    }

    return { up, down, left, right };
  };

  const moveInDirection = (dir: 'up' | 'down' | 'left' | 'right', isForcedNudge = false, step = 8) => {
    if (!element || !element.parentElement) return;
    const parent = element.parentElement;
    const allChildren = Array.from(parent.children) as HTMLElement[];
    const currentIndex = allChildren.indexOf(element as HTMLElement);
    if (currentIndex === -1) return;

    const dirs = getAvailableDirections();

    if (!isForcedNudge) {
      if (dir === 'left' && dirs.left && currentIndex > 0) {
        const prev = allChildren[currentIndex - 1];
        parent.insertBefore(element, prev);
        setMoveCount(c => c + 1);
        setToast('已向左移动 (排版换位)');
        setTimeout(() => setToast(null), 1200);
        return;
      }
      if (dir === 'right' && dirs.right && currentIndex < allChildren.length - 1) {
        const next = allChildren[currentIndex + 1];
        parent.insertBefore(element, next.nextSibling);
        setMoveCount(c => c + 1);
        setToast('已向右移动 (排版换位)');
        setTimeout(() => setToast(null), 1200);
        return;
      }
      if (dir === 'up' && dirs.up && currentIndex > 0) {
        const prev = allChildren[currentIndex - 1];
        parent.insertBefore(element, prev);
        setMoveCount(c => c + 1);
        setToast('已向上移动 (排版换位)');
        setTimeout(() => setToast(null), 1200);
        return;
      }
      if (dir === 'down' && dirs.down && currentIndex < allChildren.length - 1) {
        const next = allChildren[currentIndex + 1];
        parent.insertBefore(element, next.nextSibling);
        setMoveCount(c => c + 1);
        setToast('已向下移动 (排版换位)');
        setTimeout(() => setToast(null), 1200);
        return;
      }
    }

    // Fallback or explicit nudge: visual micro-nudge via transform
    const curTransform = element.style.transform || '';
    const match = curTransform.match(/translate\(([-0-9.]+)px,\s*([-0-9.]+)px\)/);
    const currentX = match ? parseFloat(match[1]) : 0;
    const currentY = match ? parseFloat(match[2]) : 0;
    const dx = dir === 'left' ? -step : dir === 'right' ? step : 0;
    const dy = dir === 'up' ? -step : dir === 'down' ? step : 0;
    const nextX = currentX + dx;
    const nextY = currentY + dy;

    let newTransform = curTransform;
    if (match) {
      newTransform = curTransform.replace(/translate\([^)]+\)/, `translate(${nextX}px, ${nextY}px)`);
    } else {
      newTransform = `${curTransform} translate(${nextX}px, ${nextY}px)`.trim();
    }
    element.style.transform = newTransform;
    setMoveCount(c => c + 1);
    const dirName = dir === 'up' ? '上' : dir === 'down' ? '下' : dir === 'left' ? '左' : '右';
    setToast(`已向${dirName}微调 ${step}px`);
    setTimeout(() => setToast(null), 1200);
  };

  // Keyboard navigation: listen for ArrowUp, ArrowDown, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!element) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not intercept if user is typing into input or contenteditable
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();

        const step = e.shiftKey ? 20 : (e.altKey ? 1 : 8);
        const isForcedNudge = e.shiftKey || e.altKey;

        if (e.key === 'ArrowUp') moveInDirection('up', isForcedNudge, step);
        else if (e.key === 'ArrowDown') moveInDirection('down', isForcedNudge, step);
        else if (e.key === 'ArrowLeft') moveInDirection('left', isForcedNudge, step);
        else if (e.key === 'ArrowRight') moveInDirection('right', isForcedNudge, step);
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [element, moveCount]);

  if (!element) return null;

  // Collect candidate reference objects on current canvas for smart snapping
  const collectCandidates = (): { candidates: CandidateTarget[]; canvasRect: DOMRect; zoom: number } => {
    const canvas = element.closest('.deck-canvas') as HTMLElement | null;
    const zoom = canvas ? (parseFloat(canvas.style.zoom) || 1) : 1;
    const canvasRect = canvas ? canvas.getBoundingClientRect() : document.body.getBoundingClientRect();
    const list: CandidateTarget[] = [];

    const addCandidate = (node: HTMLElement, customLabel?: string) => {
      if (node === element || element.contains(node) || node.contains(element)) return;
      if (list.some(item => item.el === node)) return;
      const r = node.getBoundingClientRect();
      if (r.width < 12 || r.height < 12) return;

      const left = (r.left - canvasRect.left) / zoom;
      const top = (r.top - canvasRect.top) / zoom;
      const width = r.width / zoom;
      const height = r.height / zoom;

      const label =
        customLabel ||
        node.dataset.designCard ||
        node.dataset.designLayout ||
        (node.tagName === 'H2' ? '大标题' : node.tagName === 'HEADER' ? '页眉导航' : node.textContent?.trim().slice(0, 14) || '参考对象');

      list.push({
        el: node,
        label,
        left,
        right: left + width,
        top,
        bottom: top + height,
        centerX: left + width / 2,
        centerY: top + height / 2,
        width,
        height,
      });
    };

    // 1. Siblings in same container
    if (element.parentElement) {
      Array.from(element.parentElement.children).forEach(child => {
        if (child instanceof HTMLElement) addCandidate(child);
      });
    }

    // 2. All design cards, layouts, headings across slide canvas
    if (canvas) {
      const allKeyNodes = canvas.querySelectorAll<HTMLElement>('[data-design-card], [data-design-layout], header, h2, section, article');
      allKeyNodes.forEach(node => addCandidate(node));
    }

    // 3. Parent container inner bounds
    if (element.parentElement) {
      const pRect = element.parentElement.getBoundingClientRect();
      const pComp = getComputedStyle(element.parentElement);
      const pPadL = parseFloat(pComp.paddingLeft) || 0;
      const pPadR = parseFloat(pComp.paddingRight) || 0;
      const pPadT = parseFloat(pComp.paddingTop) || 0;
      const pPadB = parseFloat(pComp.paddingBottom) || 0;

      const pLeft = (pRect.left - canvasRect.left + pPadL) / zoom;
      const pTop = (pRect.top - canvasRect.top + pPadT) / zoom;
      const pWidth = (pRect.width - pPadL - pPadR) / zoom;
      const pHeight = (pRect.height - pPadT - pPadB) / zoom;

      if (pWidth > 50 && pHeight > 50) {
        list.push({
          el: element.parentElement,
          label: '父容器边界',
          left: pLeft,
          right: pLeft + pWidth,
          top: pTop,
          bottom: pTop + pHeight,
          centerX: pLeft + pWidth / 2,
          centerY: pTop + pHeight / 2,
          width: pWidth,
          height: pHeight,
        });
      }
    }

    return { candidates: list, canvasRect, zoom };
  };

  const startDrag = (e: React.PointerEvent, handle: 'e' | 's' | 'se' | 'move') => {
    e.stopPropagation();
    e.preventDefault();
    if (!element) return;

    const { candidates, canvasRect, zoom } = collectCandidates();

    const startX = e.clientX;
    const startY = e.clientY;
    const origRect = element.getBoundingClientRect();
    const startW = origRect.width / zoom;
    const startH = origRect.height / zoom;
    const elemLeft = (origRect.left - canvasRect.left) / zoom;
    const elemTop = (origRect.top - canvasRect.top) / zoom;

    if (handle !== 'move') {
      // Release flex/grid rigid constraints only during resizing
      element.style.setProperty('align-self', 'start', 'important');
      element.style.setProperty('justify-self', 'start', 'important');
      element.style.setProperty('flex-grow', '0', 'important');
      element.style.setProperty('flex-shrink', '0', 'important');
      element.style.setProperty('flex-basis', 'auto', 'important');
    } else {
      element.style.setProperty('z-index', '50', 'important');
      element.style.setProperty('opacity', '0.9', 'important');
      element.style.setProperty('pointer-events', 'none', 'important');
      element.style.setProperty('transition', 'none', 'important');
    }

    let currentW = Math.round(startW);
    let currentH = Math.round(startH);
    let finalMovedTop = origRect.top;
    let finalMovedLeft = origRect.left;

    setIsDragging(handle);
    setLiveSize({ w: Math.round(startW), h: Math.round(startH) });
    setActiveSnap(null);

    const cursor =
      handle === 'e'
        ? 'ew-resize'
        : handle === 's'
        ? 'ns-resize'
        : handle === 'se'
        ? 'nwse-resize'
        : 'grabbing';
    document.body.style.cursor = cursor;
    document.body.style.userSelect = 'none';

    const SNAP_THRESHOLD = 8; // Snap magnetic radius (pixels in canvas coords)

    const onPointerMove = (moveEv: PointerEvent) => {
      moveEv.preventDefault();
      const dx = (moveEv.clientX - startX) / zoom;
      const dy = (moveEv.clientY - startY) / zoom;
      const isAltKey = moveEv.altKey;
      const allowSnap = snapEnabled && !isAltKey;

      let newSnap: ActiveSnap | null = null;

      if (handle === 'move') {
        // Move / Reorder Dragging
        const rawElemLeft = elemLeft + dx;
        const rawElemTop = elemTop + dy;
        const rawElemRight = rawElemLeft + currentW;
        const rawElemBottom = rawElemTop + currentH;
        const rawCenterX = rawElemLeft + currentW / 2;
        const rawCenterY = rawElemTop + currentH / 2;

        let snappedDx = dx;
        let snappedDy = dy;

        if (allowSnap) {
          // Check horizontal snaps
          let minDiffX = SNAP_THRESHOLD + 1;
          for (const cand of candidates) {
            // Left to Left
            if (Math.abs(rawElemLeft - cand.left) < minDiffX) {
              minDiffX = Math.abs(rawElemLeft - cand.left);
              snappedDx = cand.left - elemLeft;
              newSnap = {
                ...newSnap,
                lineX: cand.left * zoom + canvasRect.left,
                labelX: `左对齐 · ${cand.label}`,
                targetEl: cand.el,
                targetLabel: cand.label,
                targetRect: cand.el.getBoundingClientRect(),
              };
            }
            // Right to Right
            if (Math.abs(rawElemRight - cand.right) < minDiffX) {
              minDiffX = Math.abs(rawElemRight - cand.right);
              snappedDx = cand.right - currentW - elemLeft;
              newSnap = {
                ...newSnap,
                lineX: cand.right * zoom + canvasRect.left,
                labelX: `右对齐 · ${cand.label}`,
                targetEl: cand.el,
                targetLabel: cand.label,
                targetRect: cand.el.getBoundingClientRect(),
              };
            }
            // Center to Center
            if (Math.abs(rawCenterX - cand.centerX) < minDiffX) {
              minDiffX = Math.abs(rawCenterX - cand.centerX);
              snappedDx = cand.centerX - currentW / 2 - elemLeft;
              newSnap = {
                ...newSnap,
                lineX: cand.centerX * zoom + canvasRect.left,
                labelX: `水平居中对齐 · ${cand.label}`,
                targetEl: cand.el,
                targetLabel: cand.label,
                targetRect: cand.el.getBoundingClientRect(),
              };
            }
          }

          // Check vertical snaps
          let minDiffY = SNAP_THRESHOLD + 1;
          for (const cand of candidates) {
            // Top to Top
            if (Math.abs(rawElemTop - cand.top) < minDiffY) {
              minDiffY = Math.abs(rawElemTop - cand.top);
              snappedDy = cand.top - elemTop;
              newSnap = {
                ...newSnap,
                lineY: cand.top * zoom + canvasRect.top,
                labelY: `顶对齐 · ${cand.label}`,
                targetEl: cand.el,
                targetLabel: cand.label,
                targetRect: cand.el.getBoundingClientRect(),
              };
            }
            // Bottom to Bottom
            if (Math.abs(rawElemBottom - cand.bottom) < minDiffY) {
              minDiffY = Math.abs(rawElemBottom - cand.bottom);
              snappedDy = cand.bottom - currentH - elemTop;
              newSnap = {
                ...newSnap,
                lineY: cand.bottom * zoom + canvasRect.top,
                labelY: `底对齐 · ${cand.label}`,
                targetEl: cand.el,
                targetLabel: cand.label,
                targetRect: cand.el.getBoundingClientRect(),
              };
            }
            // Center to Center
            if (Math.abs(rawCenterY - cand.centerY) < minDiffY) {
              minDiffY = Math.abs(rawCenterY - cand.centerY);
              snappedDy = cand.centerY - currentH / 2 - elemTop;
              newSnap = {
                ...newSnap,
                lineY: cand.centerY * zoom + canvasRect.top,
                labelY: `垂直居中对齐 · ${cand.label}`,
                targetEl: cand.el,
                targetLabel: cand.label,
                targetRect: cand.el.getBoundingClientRect(),
              };
            }
          }
        }

        finalMovedLeft = origRect.left + snappedDx;
        finalMovedTop = origRect.top + snappedDy;
        element.style.setProperty('transform', `translate3d(${Math.round(snappedDx)}px, ${Math.round(snappedDy)}px, 0)`, 'important');

        // Sibling Reorder check in Flex / Grid container
        if (element.parentElement && element.parentElement.children.length > 1) {
          const siblings = Array.from(element.parentElement.children).filter(c => c !== element && c instanceof HTMLElement) as HTMLElement[];
          for (const sib of siblings) {
            const sibRect = sib.getBoundingClientRect();
            if (moveEv.clientX > sibRect.left && moveEv.clientX < sibRect.right && moveEv.clientY > sibRect.top && moveEv.clientY < sibRect.bottom) {
              const sibMidX = sibRect.left + sibRect.width / 2;
              if (moveEv.clientX < sibMidX) {
                element.parentElement.insertBefore(element, sib);
              } else {
                element.parentElement.insertBefore(element, sib.nextSibling);
              }
              break;
            }
          }
        }
      } else {
        // Resize Dragging: e, s, se
        let targetW = Math.max(60, Math.min(2000, Math.round(startW + dx)));
        let targetH = Math.max(40, Math.min(2000, Math.round(startH + dy)));

        if (handle === 'e' || handle === 'se') {
          const rawRight = elemLeft + targetW;

          if (allowSnap) {
            let minDiffX = SNAP_THRESHOLD + 1;

            for (const cand of candidates) {
              // 1. Equal Width Snap (等宽吸附)
              const diffW = Math.abs(targetW - cand.width);
              if (diffW < minDiffX) {
                minDiffX = diffW;
                targetW = Math.round(cand.width);
                newSnap = {
                  ...newSnap,
                  lineX: (elemLeft + cand.width) * zoom + canvasRect.left,
                  labelX: `等宽吸附 · ${Math.round(cand.width)}px (${cand.label})`,
                  targetEl: cand.el,
                  targetLabel: cand.label,
                  targetRect: cand.el.getBoundingClientRect(),
                };
              }

              // 2. Right Edge Align Snap (右边缘对齐)
              const diffR = Math.abs(rawRight - cand.right);
              if (diffR < minDiffX) {
                const snapW = Math.round(cand.right - elemLeft);
                if (snapW >= 60) {
                  minDiffX = diffR;
                  targetW = snapW;
                  newSnap = {
                    ...newSnap,
                    lineX: cand.right * zoom + canvasRect.left,
                    labelX: `右侧对齐 · ${cand.label}`,
                    targetEl: cand.el,
                    targetLabel: cand.label,
                    targetRect: cand.el.getBoundingClientRect(),
                  };
                }
              }

              // 3. Right edge to Candidate Left (贴齐左侧)
              const diffL = Math.abs(rawRight - cand.left);
              if (diffL < minDiffX) {
                const snapW = Math.round(cand.left - elemLeft);
                if (snapW >= 60) {
                  minDiffX = diffL;
                  targetW = snapW;
                  newSnap = {
                    ...newSnap,
                    lineX: cand.left * zoom + canvasRect.left,
                    labelX: `贴齐左侧 · ${cand.label}`,
                    targetEl: cand.el,
                    targetLabel: cand.label,
                    targetRect: cand.el.getBoundingClientRect(),
                  };
                }
              }
            }
          }

          currentW = targetW;
          element.style.setProperty('width', `${currentW}px`, 'important');
          element.style.setProperty('min-width', `${currentW}px`, 'important');
          element.style.setProperty('max-width', `${currentW}px`, 'important');
          element.style.setProperty('flex-basis', `${currentW}px`, 'important');
        }

        if (handle === 's' || handle === 'se') {
          const rawBottom = elemTop + targetH;

          if (allowSnap) {
            let minDiffY = SNAP_THRESHOLD + 1;

            for (const cand of candidates) {
              // 1. Equal Height Snap (等高吸附)
              const diffH = Math.abs(targetH - cand.height);
              if (diffH < minDiffY) {
                minDiffY = diffH;
                targetH = Math.round(cand.height);
                newSnap = {
                  ...newSnap,
                  lineY: (elemTop + cand.height) * zoom + canvasRect.top,
                  labelY: `等高吸附 · ${Math.round(cand.height)}px (${cand.label})`,
                  targetEl: cand.el,
                  targetLabel: cand.label,
                  targetRect: cand.el.getBoundingClientRect(),
                };
              }

              // 2. Bottom Edge Align Snap (底边缘对齐)
              const diffB = Math.abs(rawBottom - cand.bottom);
              if (diffB < minDiffY) {
                const snapH = Math.round(cand.bottom - elemTop);
                if (snapH >= 40) {
                  minDiffY = diffB;
                  targetH = snapH;
                  newSnap = {
                    ...newSnap,
                    lineY: cand.bottom * zoom + canvasRect.top,
                    labelY: `底部对齐 · ${cand.label}`,
                    targetEl: cand.el,
                    targetLabel: cand.label,
                    targetRect: cand.el.getBoundingClientRect(),
                  };
                }
              }
            }
          }

          currentH = targetH;
          element.style.setProperty('height', `${currentH}px`, 'important');
          element.style.setProperty('min-height', `${currentH}px`, 'important');
          element.style.setProperty('max-height', `${currentH}px`, 'important');
          element.style.setProperty('flex-basis', `${currentH}px`, 'important');
        }

        setLiveSize({ w: Math.round(currentW), h: Math.round(currentH) });
      }

      setActiveSnap(newSnap);
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      setIsDragging(null);
      setLiveSize(null);
      setActiveSnap(null);

      if (handle === 'move') {
        element.style.removeProperty('transform');
        element.style.removeProperty('z-index');
        element.style.removeProperty('opacity');
        element.style.removeProperty('pointer-events');
        element.style.removeProperty('transition');
      } else {
        if (handle === 'e' || handle === 'se') {
          onCommitSize?.('width', currentW);
        }
        if (handle === 's' || handle === 'se') {
          onCommitSize?.('height', currentH);
        }
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const handleDoubleClickHandle = (slot: 'width' | 'height') => {
    onAssignMode?.(slot, 'size-content');
    setToast(`已设为：适应内容 (${slot === 'width' ? '宽度' : '高度'} Hug)`);
    setTimeout(() => setToast(null), 2000);
  };

  const label =
    element.dataset.designCard ||
    element.dataset.designLayout ||
    (element instanceof SVGSVGElement ? `图标 · ${iconName(element)}` : '已选中元素');

  const currentW = liveSize?.w ?? dimensions.w;
  const currentH = liveSize?.h ?? dimensions.h;

  const canvas = element.closest('.deck-canvas') as HTMLElement | null;
  const canvasRect = canvas ? canvas.getBoundingClientRect() : document.body.getBoundingClientRect();
  const dirs = getAvailableDirections();

  return createPortal(
    <>
      {/* 1. Primary Selection Outline Box */}
      <div ref={outline} className="design-selection-outline" aria-hidden="false">
        {/* Floating Quick Action Toolbar (Figma Style: No redundant text, direct manipulation) */}
        <div className={`selection-toolbar ${isNearTop ? 'is-below' : 'is-above'}`} role="toolbar" aria-label="元素快捷操作">
          {/* Direct Width Layout Mode: Fixed, Hug & Fill */}
          <div className="selection-toolbar-group">
            <button
              type="button"
              className={`selection-toolbar-btn ${currentMode && currentMode !== 'size-content' && currentMode !== 'size-remaining' && currentMode !== 'size-auto' && currentMode !== 'size-full' ? 'is-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                // Commit current rendered width as fixed size (mirroring DimensionControl 'fixed' mode)
                const targetW = Math.round(currentW) || 320;
                onCommitSize?.('width', targetW);
                setToast(`宽度设为：固定尺寸 (${targetW}px)`);
                setTimeout(() => setToast(null), 1800);
              }}
              title="固定尺寸 (Fixed)"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <path d="M8 6v3m4-3v3m4-3v3" />
              </svg>
              <span>Fixed</span>
            </button>

            <button
              type="button"
              className={`selection-toolbar-btn ${currentMode === 'size-content' ? 'is-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onAssignMode?.('width', 'size-content');
                setToast('宽度设为：适应内容 (Hug)');
                setTimeout(() => setToast(null), 1800);
              }}
              title="适应内容 (Hug)"
            >
              <FoldHorizontal size={11} />
              <span>Hug</span>
            </button>

            <button
              type="button"
              className={`selection-toolbar-btn ${currentMode === 'size-remaining' ? 'is-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onAssignMode?.('width', 'size-remaining');
                setToast('宽度设为：撑满空间 (Fill)');
                setTimeout(() => setToast(null), 1800);
              }}
              title="撑满空间 (Fill)"
            >
              <Maximize2 size={11} />
              <span>Fill</span>
            </button>
          </div>

          {/* Quick Select Parent Container */}
          {onSelectParent && (
            <>
              <span className="selection-toolbar-divider" />
              <button
                type="button"
                className="selection-toolbar-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectParent();
                }}
                title="选择父级容器 (快捷层级跳转)"
              >
                <ArrowUp size={11} />
                <span>父级</span>
              </button>
            </>
          )}

          <span className="selection-toolbar-divider" />

          {/* Move & Reorder Group: Directional Buttons + Move Toggle */}
          <div className="selection-toolbar-group" title="移动与排列 (支持键盘 ↑ ↓ ← → 方向键)">
            {/* Move Mode Toggle Button */}
            <button
              type="button"
              className={`selection-toolbar-btn selection-toolbar-move ${isMoveActive ? 'is-active' : ''} ${isDragging === 'move' ? 'is-moving' : ''}`}
              title={isMoveActive ? '移动模式已激活：按键盘 ↑ ↓ ← → 可直接移动，或按住鼠标拖拽' : '点击激活移动模式（支持键盘 ↑ ↓ ← → 移动），或按住拖拽'}
              onClick={(e) => {
                e.stopPropagation();
                setIsMoveActive(prev => {
                  const next = !prev;
                  setToast(next ? '移动模式已激活：按键盘 ↑ ↓ ← → 或点击方向按钮' : '已退出移动模式');
                  setTimeout(() => setToast(null), 1800);
                  return next;
                });
              }}
              onPointerDown={e => startDrag(e, 'move')}
            >
              <Move size={11} />
              <span>移动{isMoveActive ? '中' : ''}</span>
            </button>

            {/* Display Available Move Directions as Requested */}
            {dirs.up && (
              <button
                type="button"
                className="selection-toolbar-btn selection-toolbar-dirbtn"
                onClick={(e) => {
                  e.stopPropagation();
                  moveInDirection('up');
                }}
                title="向上移动 (快捷键: ↑)"
              >
                <ArrowUp size={11} />
                <span>上</span>
              </button>
            )}

            {dirs.down && (
              <button
                type="button"
                className="selection-toolbar-btn selection-toolbar-dirbtn"
                onClick={(e) => {
                  e.stopPropagation();
                  moveInDirection('down');
                }}
                title="向下移动 (快捷键: ↓)"
              >
                <ArrowDown size={11} />
                <span>下</span>
              </button>
            )}

            {dirs.left && (
              <button
                type="button"
                className="selection-toolbar-btn selection-toolbar-dirbtn"
                onClick={(e) => {
                  e.stopPropagation();
                  moveInDirection('left');
                }}
                title="向左移动 (快捷键: ←)"
              >
                <ArrowLeft size={11} />
                <span>左</span>
              </button>
            )}

            {dirs.right && (
              <button
                type="button"
                className="selection-toolbar-btn selection-toolbar-dirbtn"
                onClick={(e) => {
                  e.stopPropagation();
                  moveInDirection('right');
                }}
                title="向右移动 (快捷键: →)"
              >
                <ArrowRight size={11} />
                <span>右</span>
              </button>
            )}
          </div>

          {/* Magnet Snapping Toggle */}
          <button
            type="button"
            className={`selection-toolbar-btn selection-toolbar-snap ${snapEnabled ? 'is-active' : ''}`}
            onClick={e => {
              e.stopPropagation();
              setSnapEnabled(p => !p);
              setToast(snapEnabled ? '已关闭吸附' : '已开启吸附');
              setTimeout(() => setToast(null), 1600);
            }}
            title={snapEnabled ? '吸附对齐已开启 (点击关闭，或拖动时按 Alt)' : '吸附对齐已关闭 (点击开启)'}
          >
            <Magnet size={11} />
            <span>{snapEnabled ? '吸附' : '自由'}</span>
          </button>
        </div>

        {/* Decorative Corner Dots */}
        <i />
        <i />
        <i />

        {/* Interactive Canvas Handle: Right Edge (Width) */}
        <div
          className={`selection-handle selection-handle-e ${isDragging === 'e' ? 'is-dragging' : ''}`}
          title="拖拽调节宽度 (自动吸附同级等宽/右对齐，双击贴合内容)"
          onPointerDown={e => startDrag(e, 'e')}
          onDoubleClick={e => {
            e.stopPropagation();
            handleDoubleClickHandle('width');
          }}
        >
          <div className="selection-handle-grip" />
        </div>

        {/* Interactive Canvas Handle: Bottom Edge (Height) */}
        <div
          className={`selection-handle selection-handle-s ${isDragging === 's' ? 'is-dragging' : ''}`}
          title="拖拽调节高度 (自动吸附同级等高/底对齐，双击贴合内容)"
          onPointerDown={e => startDrag(e, 's')}
          onDoubleClick={e => {
            e.stopPropagation();
            handleDoubleClickHandle('height');
          }}
        >
          <div className="selection-handle-grip-h" />
        </div>

        {/* Interactive Canvas Handle: Bottom-Right Corner (Width & Height) */}
        <div
          className={`selection-handle selection-handle-se ${isDragging === 'se' ? 'is-dragging' : ''}`}
          title="拖拽同时调节宽和高 (智能吸附对齐)"
          onPointerDown={e => startDrag(e, 'se')}
        />

        {/* Live Dimension Badge during drag or quick toast */}
        {(isDragging || toast) && (
          <div className="selection-dimension-badge">
            {toast ? (
              <span>{toast}</span>
            ) : (
              <>
                <span>
                  {currentW} × {currentH} px
                </span>
                {activeSnap && (activeSnap.labelX || activeSnap.labelY) ? (
                  <span className="selection-snap-badge">
                    🧲 {activeSnap.labelX || activeSnap.labelY}
                  </span>
                ) : (
                  <small>拖动吸附对齐 · 按住 Alt 自由拖拽</small>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* 2. Visual Smart Alignment Guide Lines (Figma / Keynote Style) */}
      {isDragging && activeSnap?.lineX !== undefined && (
        <>
          <div
            className="snap-guide-line-v"
            style={{
              left: `${activeSnap.lineX}px`,
              top: `${canvasRect.top}px`,
              height: `${canvasRect.height}px`,
            }}
          />
          {activeSnap.labelX && (
            <div
              className="snap-guide-tag"
              style={{
                left: `${activeSnap.lineX}px`,
                top: `${canvasRect.top + 24}px`,
              }}
            >
              <span>{activeSnap.labelX}</span>
            </div>
          )}
        </>
      )}

      {isDragging && activeSnap?.lineY !== undefined && (
        <>
          <div
            className="snap-guide-line-h"
            style={{
              top: `${activeSnap.lineY}px`,
              left: `${canvasRect.left}px`,
              width: `${canvasRect.width}px`,
            }}
          />
          {activeSnap.labelY && (
            <div
              className="snap-guide-tag"
              style={{
                top: `${activeSnap.lineY}px`,
                left: `${canvasRect.left + 80}px`,
              }}
            >
              <span>{activeSnap.labelY}</span>
            </div>
          )}
        </>
      )}

      {/* 3. Snapped Target Element Highlight Halo */}
      {isDragging && activeSnap?.targetRect && (
        <div
          className="snap-target-highlight"
          style={{
            left: `${activeSnap.targetRect.left}px`,
            top: `${activeSnap.targetRect.top}px`,
            width: `${activeSnap.targetRect.width}px`,
            height: `${activeSnap.targetRect.height}px`,
          }}
        >
          {activeSnap.targetLabel && (
            <span className="snap-target-tag">吸附参考: {activeSnap.targetLabel}</span>
          )}
        </div>
      )}
    </>,
    document.body
  );
}
