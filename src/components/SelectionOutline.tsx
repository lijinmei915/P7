import { DesignElement, isDesignElement, iconName } from '../design/elements';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/** Render outside the slide so overflow clipping and canvas transforms cannot hide selection. */
export default function SelectionOutline({ element }: { element: DesignElement | null }) {
  const outline = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!element) return;
    let frame = 0;
    const update = () => {
      const node = outline.current;
      if (!node) return;
      const rect = element.getBoundingClientRect();
      node.style.display = element.isConnected && rect.width && rect.height ? 'block' : 'none';
      node.style.left = `${rect.left}px`;
      node.style.top = `${rect.top}px`;
      node.style.width = `${rect.width}px`;
      node.style.height = `${rect.height}px`;
      node.style.borderRadius = getComputedStyle(element).borderRadius;
      frame = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frame);
  }, [element]);
  if (!element) return null;
  const label = element.dataset.designCard || element.dataset.designLayout || (element instanceof SVGSVGElement ? `图标 · ${iconName(element)}` : '已选中元素');
  return createPortal(<div ref={outline} className="design-selection-outline" aria-hidden="true">
    <span>{label}</span>
    <i /><i /><i /><i />
  </div>, document.body);
}
