// Keep selectors aligned with the token rules in tokens.css.
export const tokenTargets: Record<string, string> = {
  blue: '.deck-canvas [class*="var(--color-primary)"], .deck-canvas [stroke="var(--color-primary)"], .deck-canvas [fill="var(--color-primary)"]',
  light: '.deck-canvas',
  dark: '.deck-canvas [class*="var(--slide-dark)"]',
  ink: '.deck-canvas .text-slate-800, .deck-page > div > h2, .deck-page > h2',
  panel: '.deck-canvas [class*="var(--surface-emphasis)"]',
  flow: '.deck-canvas .insight-flow-line',

  title: '.deck-page > div > h2, .deck-page > h2, [data-design-type="title"]',
  header: '.deck-page > header h1, [data-design-type="header"]',
  explanation: '.deck-page .slide-explanation',
  'explanation-weight': '.deck-page .slide-explanation',
  'explanation-color': '.deck-page .slide-explanation',
  margin: '.deck-canvas > .deck-page',
  'radius-sm': '.deck-canvas :is(.rounded,.rounded-sm,.rounded-md)',
  'radius-md': '.deck-canvas :is(.rounded-lg,.rounded-xl)',
  radius: '.deck-canvas :is(.rounded-2xl,.rounded-3xl)',
  'canvas-radius': '.deck-canvas',
  'radius-scale': '.deck-canvas, .deck-canvas :is(.rounded,.rounded-sm,.rounded-md,.rounded-lg,.rounded-xl,.rounded-2xl,.rounded-3xl)',
};

export function visibleTargets(key: string): Element[] {
  const selector = tokenTargets[key];
  if (!selector) return [];
  return [...document.querySelectorAll(selector)].filter(el => {
    const r = el.getBoundingClientRect();
    const canvas = el.closest('.deck-canvas')?.getBoundingClientRect();
    return canvas && r.width > 0 && r.height > 0 && r.right > canvas.left + 1 && r.left < canvas.right - 1 && r.bottom > canvas.top && r.top < canvas.bottom && getComputedStyle(el).visibility !== 'hidden';
  });
}
