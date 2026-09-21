/** Select SVG roots as objects, never their implementation paths. */
export type DesignElement = HTMLElement | SVGSVGElement;
export function isDesignElement(node: Element): node is DesignElement {
  return node instanceof HTMLElement || node instanceof SVGSVGElement;
}
export function iconName(node: DesignElement) {
  return node.getAttribute('aria-label') || Array.from(node.classList).find(name => name.startsWith('lucide-'))?.replace('lucide-', '') || 'SVG';
}
