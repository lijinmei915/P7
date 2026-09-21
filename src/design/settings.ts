export const controls = [
  { key: 'blue', label: '品牌蓝', value: '#1853ff', type: 'color', group: '色彩' },
  { key: 'light', label: '浅色画布', value: '#f4f6fb', type: 'color', group: '色彩' },
  { key: 'dark', label: '深色画布', value: '#0a0d14', type: 'color', group: '色彩' },
  { key: 'ink', label: '正文标题', value: '#1e293b', type: 'color', group: '色彩' },
  { key: 'panel', label: '深色卡片', value: '#172238', type: 'color', group: '色彩' },
  { key: 'title', label: '正文页标题', value: '25', type: 'range', min: 22, max: 30, step: 1, unit: 'px', group: '排版' },
  { key: 'header', label: '页眉字号', value: '14', type: 'range', min: 12, max: 16, step: 1, unit: 'px', group: '排版' },
  { key: 'explanation', label: '说明文字字号', value: '13', type: 'range', min: 11, max: 16, step: 1, unit: 'px', group: '排版' },
  { key: 'explanation-weight', label: '说明文字字重', value: '400', type: 'range', min: 400, max: 600, step: 100, unit: '', group: '排版' },
  { key: 'explanation-color', label: '说明文字字色', value: '#64748b', type: 'color', group: '排版' },
  { key: 'margin', label: '正文页边距', value: '40', type: 'range', min: 28, max: 52, step: 2, unit: 'px', group: '排版' },
  { key: 'radius-scale', label: '整体圆润度', value: '1', type: 'range', min: 0, max: 1.5, step: .05, unit: '', group: '圆角' },
  { key: 'radius-sm', label: 'S · 标签与信息块', value: '4', type: 'range', min: 0, max: 8, step: 1, unit: 'px', group: '圆角' },
  { key: 'radius-md', label: 'M · 流程节点与小卡片', value: '8', type: 'range', min: 0, max: 16, step: 1, unit: 'px', group: '圆角' },
  { key: 'radius', label: 'L · 分组容器', value: '16', type: 'range', min: 0, max: 24, step: 2, unit: 'px', group: '圆角' },
  { key: 'canvas-radius', label: 'XL · PPT 画布', value: '48', type: 'range', min: 0, max: 56, step: 4, unit: 'px', group: '圆角' },
  { key: 'flow', label: '流光周期', value: '3.6', type: 'range', min: 2, max: 8, step: .2, unit: 's', group: '动效' },
] as const;
export type Settings = Record<string, string>;
export const defaults: Settings = Object.fromEntries(controls.map(c => [c.key, c.value]));
export const storageKey = 'p7-design-settings-v1';
export function normalize(input: unknown): Settings {
  const result = { ...defaults };
  if (!input || typeof input !== 'object') return result;
  for (const c of controls) {
    const value = (input as Settings)[c.key];
    if (typeof value !== 'string') continue;
    if (c.type === 'color' && /^#[0-9a-f]{6}$/i.test(value)) result[c.key] = value;
    if (c.type === 'range' && value.trim() && Number.isFinite(Number(value))) result[c.key] = String(Math.min(c.max, Math.max(c.min, Number(value))));
  }
  return result;
}
