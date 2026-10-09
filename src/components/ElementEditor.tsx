import { DesignElement, isDesignElement, iconName } from '../design/elements';
import { pageName } from '../design/pageNames';
import SpacingControl from './SpacingControl';
import DimensionControl from './DimensionControl';
import AlignmentControl from './AlignmentControl';
import { useRecordedState } from '../design/history';
import React, { useEffect, useRef, useState } from 'react';
import { libraryDefaults, Rule, slots } from '../design/library';
import { useTextChanges } from './TextChanges';
import SelectionOutline from './SelectionOutline';
import { ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import { ChangeRecord, ChangeSubItem } from '../design/changes';

const slotLabelMap: Record<string, string> = {
  'grid-template-columns': '网格列数',
  'flex-direction': '方向',
  'align-items': '对齐',
  'align-content': '内容垂直对齐',
  'justify-content': '分布',
  'justify-items': '单元格对齐',
  'typography': '字体',
  'color': '字色',
  'width': '宽度',
  'height': '高度',
  'background-color': '背景',
  'border-color': '边框',
  'border-radius': '圆角',
  'padding-top': '上内距',
  'padding-bottom': '下内距',
  'padding-left': '左内距',
  'padding-right': '右内距',
  'margin-top': '上外距',
  'margin-bottom': '下外距',
  'margin-left': '左外距',
  'margin-right': '右外距',
  'row-gap': '行距',
  'column-gap': '列距',
  'text-align': '文字对齐',
  'align-self': '自身对齐',
  'justify-self': '自身分布',
  'position': '定位模式',
  'top': '顶部距离',
  'left': '左侧距离',
  'right': '右侧距离',
  'bottom': '底部距离',
  'z-index': '层叠层级',
};

type Data = Record<string, Record<string, Record<string, string>>>;
function read<T>(key: string, fallback: T): T { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; } }
function selectorFor(el: DesignElement) {
  const parts: string[] = [];
  let node: Element | null = el;
  while (node && !node.classList.contains('deck-canvas')) {
    const parent: Element | null = node.parentElement;
    if (!parent) return '';
    parts.unshift(`${node.tagName.toLowerCase()}:nth-child(${Array.from(parent.children).indexOf(node) + 1})`); node = parent;
  }
  return node ? '.deck-canvas' + (parts.length ? ' > ' + parts.join(' > ') : '') : '';
}
export default function ElementEditor({ element, pageId, onSelect, onHandoff, mode, onSummary, onRecordsChange, scope }: { mode: 'edit' | 'library'; scope: 'page' | 'global'; onSummary: (summary: string[]) => void; onRecordsChange?: (records: ChangeRecord[]) => void; element: DesignElement | null; pageId: string; onSelect: (el: DesignElement | null) => void; onHandoff: (payload: string) => void }) {
  const [refs, setRefs] = useRecordedState<Data>(() => read('p7-element-refs-v2', {}));
  const [legacy, setLegacy] = useRecordedState<Data>(() => read('p7-element-styles-v1', {}));
  const [library, setLibrary] = useRecordedState<Rule[]>(() => {
    const saved = read<Rule[]>('p7-library-v1', libraryDefaults);
    return [...saved, ...libraryDefaults.filter(rule => !saved.some(item => item.id === rule.id))];
  });
  useEffect(() => {
    if (read('p7-card-title-14-migrated', false)) return;
    const updated = library.map(rule => rule.id === 'card' ? { ...rule, values: { ...rule.values, 'font-size': '14px' } } : rule);
    setLibrary(updated);
    try {
      localStorage.setItem('p7-library-v1', JSON.stringify(updated));
      localStorage.setItem('p7-card-title-14-migrated', 'true');
    } catch { /* The current session still uses the updated rule. */ }
  }, []);
  const [message, setMessage] = useState('');
  const [layoutOptions, setLayoutOptions] = useState({ rows: false, columns: false, align: false, distribute: false, border: false });
  const [actual, setActual] = useState<Record<string, string>>({});
  const [resolved, setResolved] = useState<Record<string, Record<string, string>>>({});
  const [librarySearch, setLibrarySearch] = useState('');
  const [libraryKind, setLibraryKind] = useState('all');
  const [usageRule, setUsageRule] = useState('');
  const [editing, setEditing] = useState('');
  const [kind, setKind] = useState('type');
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [value, setValue] = useState('12');
  const [weight, setWeight] = useState('500');
  const [typeColor, setTypeColor] = useState('var(--color-heading)');
  const [height, setHeight] = useState('1.5');
  const [sizeError, setSizeError] = useState('');
  const selector = element ? selectorFor(element) : '';
  const breadcrumbRef = useRef<HTMLElement>(null);
  useEffect(() => { setSizeError(''); }, [element]);
  useEffect(() => {
    if (breadcrumbRef.current) {
      breadcrumbRef.current.scrollLeft = breadcrumbRef.current.scrollWidth;
    }
  }, [element]);
  const ancestors: DesignElement[] = [];
  let ancestor = element;
  while (ancestor && ancestor.closest('.deck-canvas')) { ancestors.unshift(ancestor); ancestor = ancestor.parentElement; }
  const objectName = (node: DesignElement) => node.dataset.designCard || node.dataset.designLayout || (node instanceof SVGSVGElement ? `图标 · ${iconName(node)}` : node.classList.contains('deck-canvas') ? '页面' : /^H[1-6]$/.test(node.tagName) ? '标题' : node.matches('p,span,small,strong') ? '文字' : node.tagName === 'IMG' ? '图片' : '容器');
  const childHistory = useRef(new WeakMap<DesignElement, DesignElement>());
  useEffect(() => { childHistory.current = new WeakMap(); }, [pageId]);
  const parentElement = element?.parentElement;
  const canSelectParent = !!parentElement?.closest('.deck-canvas');
  const rememberedChild = element ? childHistory.current.get(element) : null;
  const childElement = rememberedChild?.parentElement === element ? rememberedChild :
    element && !(element instanceof SVGSVGElement) ? Array.from(element.children).find((child): child is DesignElement => isDesignElement(child)) : null;
  const { edits: textEdits, editor: textEditor, revertTextEdit } = useTextChanges(element, pageId, selector);

  const removeElementSlot = (page: string, target: string, slot: string) => {
    try {
      const node = document.querySelector<HTMLElement>(target);
      if (node) {
        if (slot === 'width') {
          node.style.removeProperty('width');
          node.style.removeProperty('min-width');
          node.style.removeProperty('flex');
        } else if (slot === 'height') {
          node.style.removeProperty('height');
          node.style.removeProperty('min-height');
          node.style.removeProperty('flex');
        } else if (slot === 'align-items') {
          node.style.removeProperty('align-items');
          node.style.removeProperty('align-content');
        } else if (slot === 'justify-content') {
          node.style.removeProperty('justify-content');
          node.style.removeProperty('justify-items');
        } else if (slot === 'typography') {
          node.style.removeProperty('font-size');
          node.style.removeProperty('font-weight');
          node.style.removeProperty('line-height');
        } else if (slot === 'position') {
          node.style.removeProperty('position');
          node.style.removeProperty('top');
          node.style.removeProperty('left');
          node.style.removeProperty('right');
          node.style.removeProperty('bottom');
          node.style.removeProperty('z-index');
        } else {
          node.style.removeProperty(slot);
        }
      }
    } catch {
      // ignore
    }

    setRefs(p => {
      const pageRefs = { ...p[page] };
      if (!pageRefs[target]) return p;
      const elementRefs = { ...pageRefs[target] };
      delete elementRefs[slot];
      if (slot === 'align-items') delete elementRefs['align-content'];
      if (slot === 'justify-content') delete elementRefs['justify-items'];
      if (slot === 'position') {
        delete elementRefs['top'];
        delete elementRefs['left'];
        delete elementRefs['right'];
        delete elementRefs['bottom'];
        delete elementRefs['z-index'];
      }
      if (Object.keys(elementRefs).length === 0) {
        delete pageRefs[target];
      } else {
        pageRefs[target] = elementRefs;
      }
      return { ...p, [page]: pageRefs };
    });

    setLegacy(p => {
      const pageStyles = { ...p[page] };
      if (!pageStyles[target]) return p;
      const elementStyles = { ...pageStyles[target] };
      delete elementStyles[slot];
      if (slot === 'align-items') delete elementStyles['align-content'];
      if (slot === 'justify-content') delete elementStyles['justify-items'];
      if (slot === 'position') {
        delete elementStyles['top'];
        delete elementStyles['left'];
        delete elementStyles['right'];
        delete elementStyles['bottom'];
        delete elementStyles['z-index'];
      }
      if (slot === 'typography') {
        delete elementStyles['font-size'];
        delete elementStyles['font-weight'];
        delete elementStyles['line-height'];
      }
      if (Object.keys(elementStyles).length === 0) {
        delete pageStyles[target];
      } else {
        pageStyles[target] = elementStyles;
      }
      return { ...p, [page]: pageStyles };
    });
  };

  const removeElementEntirely = (page: string, target: string) => {
    try {
      const node = document.querySelector<HTMLElement>(target);
      if (node) {
        node.removeAttribute('style');
      }
    } catch {
      // ignore
    }
    setRefs(p => {
      const pageRefs = { ...p[page] };
      delete pageRefs[target];
      return { ...p, [page]: pageRefs };
    });
    setLegacy(p => {
      const pageStyles = { ...p[page] };
      delete pageStyles[target];
      return { ...p, [page]: pageStyles };
    });
  };

  const ruleUsage = (id: string) => Object.entries(refs).flatMap(([page, targets]) => Object.entries(targets).filter(([, properties]) => Object.values(properties).includes(id)).map(([target]) => ({ page, target })));
  useEffect(() => {
    if (mode !== 'library' || !usageRule) return;
    const targets = ruleUsage(usageRule).filter(item => item.page === pageId).map(item => document.querySelector(item.target)).filter(Boolean);
    targets.forEach(target => target!.setAttribute('data-rule-highlight', 'true'));
    return () => targets.forEach(target => target!.removeAttribute('data-rule-highlight'));
  }, [usageRule, refs, pageId, mode]);
  useEffect(() => {
    const summary: string[] = [];
    const records: ChangeRecord[] = [];

    // 1. Text edits
    Object.entries(textEdits).forEach(([page, edits]) => {
      Object.entries(edits).forEach(([target, edit]) => {
        if (edit.before !== edit.after) {
          const raw = `${pageName(page)} · 文案：${edit.before} → ${edit.after}`;
          summary.push(raw);
          records.push({
            id: `text-${page}-${target}`,
            category: 'text',
            title: `${pageName(page)} · 文案修改`,
            description: `「${edit.before}」→「${edit.after}」`,
            rawText: raw,
            onDelete: () => revertTextEdit(page, target),
          });
        }
      });
    });

    // 2. Element modifications (refs & legacy)
    const allPages = Array.from(new Set([...Object.keys(refs), ...Object.keys(legacy)]));
    allPages.forEach(page => {
      const pageRefs = refs[page] || {};
      const pageLegacy = legacy[page] || {};
      const allTargets = Array.from(new Set([...Object.keys(pageRefs), ...Object.keys(pageLegacy)]));

      allTargets.forEach((target, targetIndex) => {
        const targetRefs = pageRefs[target] || {};
        const targetLegacy = pageLegacy[target] || {};
        const subItems: ChangeSubItem[] = [];

        const allSlots = Array.from(new Set([...Object.keys(targetRefs), ...Object.keys(targetLegacy)]));

        allSlots.forEach(slot => {
          if (slot === 'align-content' && (targetRefs['align-items'] || targetLegacy['align-items'])) return;
          if (slot === 'justify-items' && (targetRefs['justify-content'] || targetLegacy['justify-content'])) return;

          const ruleId = targetRefs[slot];
          let displayVal = '';
          if (ruleId) {
            displayVal = library.find(rule => rule.id === ruleId)?.name || ruleId;
          } else if (targetLegacy[slot]) {
            displayVal = targetLegacy[slot];
          }

          if (!displayVal) return;
          const slotLabel = slotLabelMap[slot] || slots.find(item => item[0] === slot)?.[1] || slot;

          subItems.push({
            id: slot,
            label: slotLabel,
            value: displayVal,
            onDelete: () => removeElementSlot(page, target, slot),
          });
        });

        if (subItems.length > 0) {
          const raw = `${pageName(page)} · 元素 ${targetIndex + 1} · ${subItems.map(s => `${s.label}：${s.value}`).join('，')}`;
          summary.push(raw);
          records.push({
            id: `element-${page}-${target}`,
            category: 'element',
            title: `${pageName(page)} · 元素 ${targetIndex + 1}`,
            subItems,
            rawText: raw,
            onDelete: () => removeElementEntirely(page, target),
          });
        }
      });
    });

    // 3. Library rules
    library.forEach(rule => {
      const original = libraryDefaults.find(item => item.id === rule.id);
      const isCustom = !original;
      const isModified = original && JSON.stringify(original.values) !== JSON.stringify(rule.values);

      if (isCustom || isModified) {
        const raw = `${original ? '修改' : '新增'}规范：${rule.name} · ${Object.values(rule.values).join(' / ')}`;
        summary.push(raw);
        records.push({
          id: `rule-${rule.id}`,
          category: 'rule',
          title: `${original ? '修改' : '新增'}规范 · ${rule.name}`,
          description: Object.values(rule.values).join(' / '),
          rawText: raw,
          onDelete: () => {
            if (isCustom) {
              setLibrary(p => p.filter(r => r.id !== rule.id));
              setRefs(p => {
                const updated = { ...p };
                for (const pg of Object.keys(updated)) {
                  for (const sel of Object.keys(updated[pg] || {})) {
                    for (const [slot, id] of Object.entries(updated[pg][sel])) {
                      if (id === rule.id) delete updated[pg][sel][slot];
                    }
                  }
                }
                return updated;
              });
            } else if (original) {
              setLibrary(p => p.map(r => r.id === rule.id ? { ...original } : r));
            }
          },
        });
      }
    });

    onSummary(summary);
    if (onRecordsChange) onRecordsChange(records);
    onHandoff('请将以下 P7 预览中的调整落实到项目源码，保持已有设计规范。元素定位按页面 ID 和页面内选择器记录；若结构已变化，请先核对内容。\n' + JSON.stringify({ 当前页面: pageId, 文案改动: textEdits, 元素规范引用: refs, 旧版属性覆盖: legacy, 规范库: library }, null, 2));
  }, [pageId, textEdits, refs, legacy, library, onHandoff, onSummary, onRecordsChange]);
  const pending = legacy[pageId]?.[selector] || {};
  const isIcon = element instanceof SVGSVGElement;
  const isText = !isIcon && !!element?.textContent?.trim() && (element.children.length === 0 || element.matches('h1,h2,h3,h4,p,span,small,strong,label'));
  const isFlex = /flex/.test(actual.display || '');
  const isGrid = /grid/.test(actual.display || '');
  const isLayout = !!element?.hasAttribute('data-design-layout') || (!isText && !element?.hasAttribute('data-design-card') && (isFlex || isGrid) && actual['background-color'] === 'rgba(0, 0, 0, 0)' && actual['background-image'] === 'none');
  const layoutOrder = ['grid-template-columns', 'flex-direction', 'column-gap', 'row-gap', 'align-items', 'justify-content', 'width', 'height', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'];
  const relevantSlots = slots.filter(([slot]) => {
    if (isIcon) return ['width', 'height', 'color'].includes(slot);
    if (isText) return ['typography', 'color'].includes(slot);
    if (slot === 'grid-template-columns') return isLayout && isGrid;
    if (slot === 'flex-direction') return isLayout && isFlex;
    if (slot === 'align-items' || slot === 'justify-content') return false; // Handled directly by AlignmentControl!
    if (slot === 'row-gap') return isFlex || isGrid;
    if (slot === 'column-gap') return isFlex || isGrid;
    if (slot === 'border-color') return !isLayout && layoutOptions.border;
    if (isLayout) return layoutOrder.includes(slot);
    return !['typography', 'color'].includes(slot);
  }).sort((a, b) => isLayout ? layoutOrder.indexOf(a[0]) - layoutOrder.indexOf(b[0]) : 0);
  useEffect(() => {
    const sheet = document.createElement('style');
    const targets = new Set([...Object.keys(legacy[pageId] || {}), ...Object.keys(refs[pageId] || {})]);
    sheet.textContent = [...targets].map(target => {
      const css = { ...legacy[pageId]?.[target] };
      for (const [slot, id] of Object.entries(refs[pageId]?.[target] || {})) {
        const rule = library.find(e => e.id === id); if (!rule) continue;
        if (slot === 'typography') Object.assign(css, rule.values); else css[slot] = rule.values.value;
      }
      // Explicit per-element colors remain more specific than a typography preset.
      const explicitColor = library.find(rule => rule.id === refs[pageId]?.[target]?.color);
      if (explicitColor) css.color = explicitColor.values.value;
      const node = document.querySelector<DesignElement>(target);
      const parent = node?.parentElement ? getComputedStyle(node.parentElement) : null;
      const isFlex = !!parent?.display.includes('flex');
      const isGrid = !!parent?.display.includes('grid');
      const isColumn = !!parent?.flexDirection.startsWith('column');

      for (const axis of ['width', 'height']) {
        const id = refs[pageId]?.[target]?.[axis];
        if (!id) continue;
        const rule = library.find(item => item.id === id);
        if (!rule) continue;

        const isFlexMainAxis = isFlex && ((isColumn && axis === 'height') || (!isColumn && axis === 'width'));
        const isFlexCrossAxis = isFlex && !isFlexMainAxis;

        if (rule.values.mode === 'remaining') {
          css[axis] = 'auto';
          css[`min-${axis}`] = '0';
          if (isFlexMainAxis) {
            css.flex = '1 1 0%';
          } else {
            if (axis === 'height') css['align-self'] = 'stretch';
            if (axis === 'width') css['justify-self'] = 'stretch';
          }
        } else if (rule.id === 'size-full') {
          css[axis] = '100%';
          if (isFlexMainAxis) {
            css.flex = '1 1 100%';
          } else {
            if (axis === 'height') css['align-self'] = 'stretch';
            if (axis === 'width') css['justify-self'] = 'stretch';
          }
        } else {
          // Explicit content, auto, or fixed px sizing
          css[axis] = rule.values.value;
          if (rule.values.value.endsWith('px')) {
            css[`min-${axis}`] = rule.values.value;
            css[`max-${axis}`] = rule.values.value;
          }

          if (isGrid) {
            if (axis === 'height') {
              css['align-self'] = 'start';
            }
            if (axis === 'width') {
              css['justify-self'] = 'start';
            }
          } else if (isFlexCrossAxis) {
            css['align-self'] = 'flex-start';
          } else if (isFlexMainAxis) {
            css['flex-shrink'] = '0';
            css['flex-grow'] = '0';
            css['flex-basis'] = rule.values.value;
          }
        }
      }
      if (css['font-size']) css['font-size'] = `max(11px, ${css['font-size']})`;
      return `${target} { ${Object.entries(css).map(([k, v]) => `${k}: ${v} !important;`).join(' ')} }`;
    }).join('\n');
    document.head.appendChild(sheet);
    const measure = () => {
      if (!element?.isConnected) return;
      const keys = ['display', 'background-image', 'font-size', 'font-weight', 'line-height', ...slots.filter(s => s[0] !== 'typography').map(s => s[0])];
      const css = getComputedStyle(element);
      const children = Array.from(element.children).filter(child => {
        const style = getComputedStyle(child);
        return style.display !== 'none' && !['absolute', 'fixed'].includes(style.position);
      });
      const tracks = (value: string) => (value.match(/[\d.]+px/g) || []).map(parseFloat);
      const columns = tracks(css.gridTemplateColumns), rows = tracks(css.gridTemplateRows);
      const innerWidth = parseFloat(css.width) - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight);
      const innerHeight = parseFloat(css.height) - parseFloat(css.paddingTop) - parseFloat(css.paddingBottom);
      const vertical = css.flexDirection.startsWith('column');
      const sizes = children.map(child => { const s = getComputedStyle(child); return { width: parseFloat(s.width), height: parseFloat(s.height) }; });
      const grid = css.display.includes('grid'), flex = css.display.includes('flex');
      const rects = children.map(child => child.getBoundingClientRect());
      const positions = (axis: 'top' | 'left') => new Set(rects.map(rect => Math.round(rect[axis] / 3))).size;
      const mainSpace = vertical ? innerHeight : innerWidth;
      const mainUsed = sizes.reduce((sum, size) => sum + (vertical ? size.height : size.width), 0) + Math.max(0, sizes.length - 1) * (parseFloat(vertical ? css.rowGap : css.columnGap) || 0);
      setLayoutOptions({
        rows: grid ? rows.length > 1 : flex && children.length > 1 && (vertical || css.flexWrap !== 'nowrap' && positions('top') > 1),
        columns: grid ? columns.length > 1 : flex && children.length > 1 && (!vertical || css.flexWrap !== 'nowrap' && positions('left') > 1),
        align: grid ? sizes.some((size, index) => size.height < (rows[Math.floor(index / Math.max(1, columns.length))] || 0) - 2) : flex && sizes.some(size => (vertical ? size.width < innerWidth - 2 : size.height < innerHeight - 2)),
        distribute: grid ? innerWidth - columns.reduce((a, b) => a + b, 0) - Math.max(0, columns.length - 1) * (parseFloat(css.columnGap) || 0) > 2 : flex && mainSpace - mainUsed > 2,
        border: ['Top', 'Right', 'Bottom', 'Left'].some(side => parseFloat(css.getPropertyValue(`border-${side.toLowerCase()}-width`)) > 0),
      });
      setActual(Object.fromEntries(keys.map(k => [k, css.getPropertyValue(k)])));
      const probe = document.createElement('div');
      probe.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none';
      document.body.appendChild(probe);
      const result: Record<string, Record<string, string>> = {};
      library.forEach(rule => {
        if (['size', 'columns', 'alignment', 'distribution', 'direction'].includes(rule.kind)) { result[rule.id] = rule.values; return; }
        probe.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none';
        if (rule.kind === 'type') Object.entries(rule.values).forEach(([k, v]) => probe.style.setProperty(k, k === 'font-size' ? `max(11px, ${v})` : String(v)));
        else probe.style.setProperty(rule.kind === 'color' ? 'color' : 'padding-top', rule.values.value);
        const style = getComputedStyle(probe);
        result[rule.id] = rule.kind === 'type' ? Object.fromEntries(['font-size', 'font-weight', 'line-height', ...(rule.values.color ? ['color'] : [])].map(k => [k, style.getPropertyValue(k)])) : { value: style.getPropertyValue(rule.kind === 'color' ? 'color' : 'padding-top') };
      });
      probe.remove(); setResolved(result);
    };
    measure();
    const observer = new MutationObserver(measure);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
    const resizeObserver = new ResizeObserver(measure);
    if (element) { resizeObserver.observe(element); Array.from(element.children).forEach(child => resizeObserver.observe(child)); }
    window.addEventListener('resize', measure);
    try { localStorage.setItem('p7-element-refs-v2', JSON.stringify(refs)); localStorage.setItem('p7-element-styles-v1', JSON.stringify(legacy)); localStorage.setItem('p7-library-v1', JSON.stringify(library)); } catch { setMessage('浏览器无法保存设置。'); }
    return () => { sheet.remove(); observer.disconnect(); resizeObserver.disconnect(); window.removeEventListener('resize', measure); };
  }, [refs, legacy, library, pageId, element]);
  function formatWeight(w: string | undefined): string {
    if (!w || w === 'normal' || w === '400') return '400 (常规)';
    if (w === 'bold' || w === '700') return '700 (粗体)';
    if (w === '500') return '500 (中等)';
    if (w === '600') return '600 (半粗)';
    if (w === '800') return '800 (特粗)';
    if (w === '900') return '900 (极粗)';
    return w;
  }

  function formatLineHeight(lh: string | undefined, fontSize?: string): string {
    if (!lh || lh === 'normal') {
      if (fontSize) {
        const fs = parseFloat(fontSize);
        if (Number.isFinite(fs) && fs > 0) return `~${Math.round(fs * 1.4)}px (默认1.4倍)`;
      }
      return '默认 (约1.4倍)';
    }
    return lh;
  }

  function format(values: Record<string, string>, typography: boolean) {
    if (!typography) return values.value;
    const size = values['font-size'] || '—';
    const weight = formatWeight(values['font-weight']);
    const lh = formatLineHeight(values['line-height'], size);
    return `${size} / 字重 ${weight} / 行高 ${lh}${values.color ? ` / 字色 ${values.color}` : ''}`;
  }
  function matches(slot: string, rule: Rule) {
    const values = resolved[rule.id]; if (!values) return false;
    const equal = (a: string, b: string) => a === b || (/^[\d.]+px$/.test(a) && /^[\d.]+px$/.test(b) && Math.abs(parseFloat(a) - parseFloat(b)) < .1);
    return slot === 'typography' ? ['font-size', 'font-weight', 'line-height', ...(rule.values.color ? ['color'] : [])].every(k => equal(actual[k] || '', values[k])) : equal(actual[slot] || '', values.value);
  }
  useEffect(() => { if (!element) return; element.setAttribute('data-element-selected', 'true'); return () => element.removeAttribute('data-element-selected'); }, [element]);
  function apply(slot: string | string[], id: string) {
    const properties = Array.isArray(slot) ? slot : [slot];
    setRefs(p => ({ ...p, [pageId]: { ...p[pageId], [selector]: { ...p[pageId]?.[selector], ...Object.fromEntries(properties.map(property => [property, id])) } } }));
    setLegacy(p => { const values = { ...p[pageId]?.[selector] }; properties.flatMap(property => property === 'typography' ? ['font-size', 'font-weight', 'line-height'] : [property]).forEach(k => delete values[k]); return { ...p, [pageId]: { ...p[pageId], [selector]: values } }; });
  }
  function applyCustomSize(slot: string, number: number) {
    if ( !Number.isFinite(number) || number <= 0 || number > 2000) {
      setSizeError('请输入大于 0、最多 2000 的尺寸（px）。'); return;
    }
    const value = `${number}px`;
    const existing = library.find(rule => rule.kind === 'size' && rule.values.value === value);
    const id = existing?.id || `custom-${crypto.randomUUID()}`;
    if (!existing) setLibrary(previous => [...previous, { id, name: `自定义尺寸 ${number}px`, purpose: '元素宽度与高度', kind: 'size', values: { value } }]);
    apply(slot, id);
    setSizeError('');
  }
  function applyDirectStyle(property: string, value: string, ruleId?: string) {
    if (!element) return;
    element.style.setProperty(property, value, 'important');
    if (ruleId) {
      setRefs(p => ({
        ...p,
        [pageId]: {
          ...p[pageId],
          [selector]: {
            ...p[pageId]?.[selector],
            [property]: ruleId
          }
        }
      }));
    }
    setLegacy(p => ({
      ...p,
      [pageId]: {
        ...p[pageId],
        [selector]: {
          ...p[pageId]?.[selector],
          [property]: value
        }
      }
    }));
  }
  function resetStyles(properties: string[]) {
    if (!element) return;
    properties.forEach(prop => element.style.removeProperty(prop));
    setRefs(p => {
      const next = { ...p[pageId]?.[selector] };
      properties.forEach(prop => delete next[prop]);
      return { ...p, [pageId]: { ...p[pageId], [selector]: next } };
    });
    setLegacy(p => {
      const next = { ...p[pageId]?.[selector] };
      properties.forEach(prop => delete next[prop]);
      return { ...p, [pageId]: { ...p[pageId], [selector]: next } };
    });
  }
  function save() {
    if (!name.trim() || !purpose.trim()) { setMessage('请填写规范名称和用途。'); return; }
    if (library.some(e => e.id !== editing && e.kind === kind && e.name === name.trim())) { setMessage('同类规范名称已存在。'); return; }
    if (kind === 'color' ? !/^#[0-9a-f]{6}$/i.test(value) : !value.trim() || !Number.isFinite(Number(value)) || Number(value) < 0 || Number(value) > (kind === 'size' ? 2000 : 200)) { setMessage('请填写有效数值。'); return; }
    if (kind === 'size' && Number(value) === 0) { setMessage('尺寸须大于 0px，最大 2000px。'); return; }
    if (kind === 'type' && (Number(value) < 11 || !Number.isFinite(Number(height)) || Number(height) < 1 || Number(height) > 3)) { setMessage('页面字号不得低于 11px，行高为 1–3 倍。'); return; }
    const rule: Rule = { id: editing || `custom-${crypto.randomUUID()}`, name: name.trim(), purpose: purpose.trim(), kind, values: kind === 'type' ? { 'font-size': `${Number(value)}px`, 'font-weight': weight, 'line-height': height, ...(typeColor ? { color: typeColor } : {}) } : { value: kind === 'color' ? value : `${Number(value)}px` } };
    setLibrary(p => editing ? p.map(e => e.id === editing ? rule : e) : [...p, rule]);
    setMessage(editing ? '规范已更新，所有引用同步生效。' : '已入库，可在元素属性中选择。'); setEditing(''); setName(''); setPurpose('');
  }
  return <>
    <SelectionOutline 
      element={element} 
      onCommitSize={(slot, px) => applyCustomSize(slot, px)}
      onAssignMode={(slot, id) => apply(slot, id)}
      onSelectParent={canSelectParent && parentElement ? () => {
        childHistory.current.set(parentElement, element);
        onSelect(parentElement);
      } : undefined}
      currentMode={element ? (refs[pageId]?.[selector]?.['width'] || '') : ''}
    />
    {mode === 'edit' && !element && (
      <section className="element-editor-empty">
        <strong className="element-editor-empty-title">点击页面元素开始编辑</strong>
        <p className="design-help" style={{ margin: '4px 0 12px' }}>选中文字修改文案，选中卡片或布局调整排版。</p>
        <button
          className="element-empty-action"
          onClick={() => {
            const target = document.querySelector<DesignElement>('.deck-canvas [data-design-card], .deck-canvas .survey-direction, .deck-canvas [data-design-layout], .deck-canvas h2');
            if (target) onSelect(target);
          }}
        >
          选择本页主要内容
        </button>
      </section>
    )}
    {mode === 'edit' && element && <section className="element-editor">
      <div className="element-heading element-heading-compact">
        <nav ref={breadcrumbRef} className="design-breadcrumbs" aria-label="元素层级">
          {ancestors.map((node, index) => {
            const isCurrent = node === element;
            const isLast = index === ancestors.length - 1;
            return (
              <React.Fragment key={index}>
                <button
                  type="button"
                  className="design-breadcrumb-btn"
                  title={objectName(node)}
                  aria-current={isCurrent ? 'true' : undefined}
                  onClick={() => onSelect(node)}
                >
                  {objectName(node)}
                </button>
                {!isLast && <span className="design-breadcrumb-sep">›</span>}
              </React.Fragment>
            );
          })}
        </nav>
        <div className="design-layer-actions" aria-label="选择层级">
          <button
            type="button"
            className="design-layer-btn"
            aria-label="选择父级"
            title="选择父级 (↑)"
            disabled={!canSelectParent}
            onClick={() => {
              if (canSelectParent && parentElement) {
                childHistory.current.set(parentElement, element);
                onSelect(parentElement);
              }
            }}
          >
            <ArrowUp size={12} />
          </button>
          <button
            type="button"
            className="design-layer-btn"
            aria-label="选择子级"
            title="选择子级 (↓)"
            disabled={!childElement}
            onClick={() => {
              if (childElement) onSelect(childElement);
            }}
          >
            <ArrowDown size={12} />
          </button>
          <button
            type="button"
            className="design-layer-btn design-layer-cancel"
            title="取消选择"
            onClick={() => onSelect(null)}
          >
            取消
          </button>
        </div>
      </div>
      {textEditor}

      <AlignmentControl
        element={element}
        actual={actual}
        isText={isText}
        onApplyStyle={applyDirectStyle}
        onResetStyle={resetStyles}
      />
      {relevantSlots.filter(([slot]) => !slot.startsWith('padding-') && !slot.startsWith('margin-')).map(([slot, label, category]) => {
        const candidates = library.filter(e => e.kind === category);
        const assigned = refs[pageId]?.[selector]?.[slot];
        const match = candidates.find(e => e.id === assigned) || candidates.find(e => matches(slot, e));
        
        if (category === 'size') {
          return (
            <div key={`${selector}-${slot}`}>
              <DimensionControl
                element={element}
                slot={slot}
                label={label}
                actual={actual[slot] || ''}
                assigned={match}
                rules={candidates}
                apply={id => apply(slot, id)}
                commit={value => applyCustomSize(slot, value)}
              />
            </div>
          );
        }

        // 1. Radius Control: Exposed single-click pill bar with specific px values and custom px input
        if (category === 'radius') {
          const radiusMap: Record<string, string> = {
            'radius-sm': '4px',
            'radius-md': '8px',
            'radius-lg': '16px',
            'radius-xl': '24px',
            'radius-full': '999px',
          };
          const currentRadius = legacy[pageId]?.[selector]?.['border-radius'] || actual['border-radius'] || '0px';

          return (
            <div key={`${selector}-${slot}`} className="design-control">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-800">{label}</span>
                <span className="text-[11px] font-mono text-slate-400">当前: {currentRadius}</span>
              </div>
              <div className="radius-chip-bar" role="radiogroup" aria-label="圆角选项">
                <button
                  type="button"
                  className={`radius-chip-btn ${!assigned && !legacy[pageId]?.[selector]?.['border-radius'] ? 'is-active' : ''}`}
                  onClick={() => {
                    apply(slot, '');
                    resetStyles(['border-radius']);
                  }}
                  title="沿用页面默认圆角"
                >
                  <span>沿用</span>
                </button>
                {candidates.map(rule => {
                  const resolvedVal = resolved[rule.id]?.value;
                  const displayPx = resolvedVal && resolvedVal.endsWith('px') ? resolvedVal : (radiusMap[rule.id] || rule.values.value);
                  const isSelected = match?.id === rule.id && !legacy[pageId]?.[selector]?.['border-radius'];
                  return (
                    <button
                      type="button"
                      key={rule.id}
                      className={`radius-chip-btn ${isSelected ? 'is-active' : ''}`}
                      onClick={() => {
                        resetStyles(['border-radius']);
                        apply(slot, rule.id);
                      }}
                      title={`${rule.name}: ${displayPx}`}
                    >
                      <span className="font-semibold">{rule.name}</span>
                      <span className="radius-chip-val">{displayPx}</span>
                    </button>
                  );
                })}
              </div>
              <div className="custom-input-inline-wrap">
                <span className="custom-input-label">自定义数值:</span>
                <div className="custom-px-input-wrap">
                  <input
                    type="number"
                    min="0"
                    max="999"
                    className="custom-px-input"
                    placeholder="输入圆角"
                    value={parseInt(currentRadius, 10) || 0}
                    onChange={e => {
                      const val = parseInt(e.target.value, 10);
                      if (Number.isFinite(val) && val >= 0) {
                        applyDirectStyle('border-radius', `${val}px`);
                      }
                    }}
                  />
                  <span className="position-coord-unit">px</span>
                </div>
              </div>
            </div>
          );
        }

        // 2. Typography Control: Exposed 2-column preset cards with clear sizes and weights
        if (category === 'type') {
          const currentSize = actual['font-size'] || '—';
          const currentWeight = formatWeight(actual['font-weight']);

          return (
            <div key={`${selector}-${slot}`} className="design-control">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-800">{label}</span>
                <span className="text-[11px] font-mono text-slate-400">
                  当前: {currentSize} · {currentWeight}
                </span>
              </div>
              <div className="type-preset-grid" role="radiogroup" aria-label="字体规范选项">
                <button
                  type="button"
                  className={`type-preset-card ${!assigned ? 'is-active' : ''}`}
                  onClick={() => apply(slot, '')}
                  title="沿用页面规范"
                >
                  <span className="type-preset-name">沿用页面</span>
                  <span className="type-preset-desc">继承默认</span>
                </button>
                {candidates.map(rule => {
                  const isSelected = match?.id === rule.id;
                  const size = resolved[rule.id]?.['font-size'] || rule.values['font-size'] || '14px';
                  const weight = formatWeight(rule.values['font-weight']);
                  return (
                    <button
                      type="button"
                      key={rule.id}
                      className={`type-preset-card ${isSelected ? 'is-active' : ''}`}
                      onClick={() => apply(slot, rule.id)}
                      title={`${rule.name}: ${size} / ${weight}`}
                    >
                      <span className="type-preset-name">{rule.name}</span>
                      <span className="type-preset-desc">{size} · {weight}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }

        // 3. Color Control: Exposed color swatch palette bar
        if (category === 'color') {
          const currentColor = actual[slot] || '—';

          return (
            <div key={`${selector}-${slot}`} className="design-control">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-800">{label}</span>
                <span className="text-[11px] font-mono text-slate-400">当前: {currentColor}</span>
              </div>
              <div className="color-swatch-row" role="radiogroup" aria-label={`${label}选项`}>
                <button
                  type="button"
                  className={`color-swatch-btn ${!assigned ? 'is-active' : ''}`}
                  onClick={() => apply(slot, '')}
                  title="沿用页面"
                >
                  <span className="color-swatch-icon color-swatch-inherit">/</span>
                  <span className="color-swatch-label">沿用</span>
                </button>
                {candidates.map(rule => {
                  const isSelected = match?.id === rule.id;
                  const colorVal = resolved[rule.id]?.value || rule.values.value;
                  const isTransparent = colorVal === 'transparent';
                  const isWhite = colorVal === '#ffffff' || colorVal === 'white' || colorVal === 'rgb(255, 255, 255)';

                  return (
                    <button
                      type="button"
                      key={rule.id}
                      className={`color-swatch-btn ${isSelected ? 'is-active' : ''}`}
                      onClick={() => apply(slot, rule.id)}
                      title={`${rule.name}: ${colorVal}`}
                    >
                      <span
                        className="color-swatch-icon"
                        style={{
                          backgroundColor: isTransparent ? 'transparent' : colorVal,
                          border: isWhite ? '1px solid #cbd5e1' : undefined,
                        }}
                      >
                        {isTransparent && <span className="text-[9px] text-red-500 font-bold">✕</span>}
                      </span>
                      <span className="color-swatch-label">{rule.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }

        // 4. Columns Control: Exposed segmented bar
        if (category === 'columns') {
          return (
            <div key={`${selector}-${slot}`} className="design-control">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-800">{label}</span>
                <span className="text-[11px] font-mono text-slate-400">{actual['grid-template-columns'] || '—'}</span>
              </div>
              <div className="segment-options-bar" role="radiogroup" aria-label={`${label}选项`}>
                <button
                  type="button"
                  className={`segment-option-btn ${!assigned ? 'is-active' : ''}`}
                  onClick={() => apply(slot, '')}
                >
                  沿用
                </button>
                {candidates.map(rule => (
                  <button
                    type="button"
                    key={rule.id}
                    className={`segment-option-btn ${match?.id === rule.id ? 'is-active' : ''}`}
                    onClick={() => apply(slot, rule.id)}
                  >
                    {rule.name}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        // 5. Direction Control: Exposed segmented bar
        if (category === 'direction') {
          return (
            <div key={`${selector}-${slot}`} className="design-control">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-800">{label}</span>
                <span className="text-[11px] font-mono text-slate-400">{actual['flex-direction'] || 'row'}</span>
              </div>
              <div className="segment-options-bar" role="radiogroup" aria-label={`${label}选项`}>
                <button
                  type="button"
                  className={`segment-option-btn ${!assigned ? 'is-active' : ''}`}
                  onClick={() => apply(slot, '')}
                >
                  沿用
                </button>
                {candidates.map(rule => (
                  <button
                    type="button"
                    key={rule.id}
                    className={`segment-option-btn ${match?.id === rule.id ? 'is-active' : ''}`}
                    onClick={() => apply(slot, rule.id)}
                  >
                    {rule.name}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        // 6. Gap Controls (row-gap, column-gap)
        if (slot === 'row-gap' || slot === 'column-gap') {
          const quickGaps = candidates.filter(r => [0, 4, 8, 12, 16, 24, 32, 48].includes(parseInt(r.values.value, 10)));
          return (
            <div key={`${selector}-${slot}`} className="design-control">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-800">{label}</span>
                <span className="text-[11px] font-mono text-slate-400">当前: {actual[slot] || '0px'}</span>
              </div>
              <div className="spacing-chip-bar" role="radiogroup" aria-label={`${label}选项`}>
                <button
                  type="button"
                  className={`spacing-chip-btn ${!assigned ? 'is-active' : ''}`}
                  onClick={() => apply(slot, '')}
                >
                  沿用
                </button>
                {quickGaps.map(rule => (
                  <button
                    type="button"
                    key={rule.id}
                    className={`spacing-chip-btn ${match?.id === rule.id ? 'is-active' : ''}`}
                    onClick={() => apply(slot, rule.id)}
                  >
                    {rule.name}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        // Generic fallback with exposed chips
        return (
          <div key={`${selector}-${slot}`} className="design-control">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-800">{label}</span>
              <span className="text-[11px] font-mono text-slate-400">{actual[slot] || '—'}</span>
            </div>
            <div className="segment-options-bar" role="radiogroup" aria-label={`${label}选项`}>
              <button
                type="button"
                className={`segment-option-btn ${!assigned ? 'is-active' : ''}`}
                onClick={() => apply(slot, '')}
              >
                沿用
              </button>
              {candidates.map(rule => (
                <button
                  type="button"
                  key={rule.id}
                  className={`segment-option-btn ${match?.id === rule.id ? 'is-active' : ''}`}
                  onClick={() => apply(slot, rule.id)}
                >
                  {rule.name}
                </button>
              ))}
            </div>
          </div>
        );
      })}
      {!isText && !isIcon && (
        <div className="mt-2 space-y-3">
          <SpacingControl
            prefix="padding"
            actual={actual}
            rules={library.filter(rule => rule.kind === 'space')}
            apply={apply}
            onDirectStyle={applyDirectStyle}
          />
          <SpacingControl
            prefix="margin"
            actual={actual}
            rules={library.filter(rule => rule.kind === 'space')}
            apply={apply}
            onDirectStyle={applyDirectStyle}
          />
        </div>
      )}
      {sizeError && <p role="alert">{sizeError}</p>}
      <button
        type="button"
        className="element-reset-btn"
        onClick={() => {
          setRefs(p => ({ ...p, [pageId]: { ...p[pageId], [selector]: {} } }));
          setLegacy(p => ({ ...p, [pageId]: { ...p[pageId], [selector]: {} } }));
        }}
      >
        <RotateCcw size={13} />
        <span>恢复此元素原样</span>
      </button>
    </section>}
    <details hidden={mode !== 'library'} className="element-editor"><summary>规范库 · 查看 / 新增 / 修改</summary>
      <p className="design-help">排版底线：页面所有文字不得低于 11px，包含编号、说明、标签和辅助标注。</p>
      <p className="design-help">修改规范会联动引用它的元素。内置变量在下方全局规范中调整；新数值须先入库。</p>
      <label className="design-control">查找规范<input aria-label="查找规范" value={librarySearch} onChange={e => setLibrarySearch(e.target.value)} placeholder="名称或用途" /></label>
      <label className="design-control">分类<select aria-label="规范分类" value={libraryKind} onChange={e => setLibraryKind(e.target.value)}>{[['all','全部'],['type','文字'],['color','颜色'],['size','尺寸'],['space','间距'],['radius','圆角'],['layout','布局']].map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <p className="design-help">当页仅列出本页已绑定的规范；新增规范在全局列表查看。引用数量统计编辑器绑定，源码全局变量在下方显示本页使用情况。</p>
      {library.filter(rule => (scope === 'global' || ruleUsage(rule.id).some(item => item.page === pageId)) && (libraryKind === 'all' || rule.kind === libraryKind || libraryKind === 'layout' && ['columns','alignment','distribution','direction'].includes(rule.kind)) && `${rule.name} ${rule.purpose}`.includes(librarySearch)).map(e => {
        const usage = ruleUsage(e.id);
        const linked = e.kind === 'type' ? e.values['font-size'].includes('var(') : Object.values(e.values).some(v => String(v).includes('var('));
        return <div className="library-row" key={e.id}><strong>{e.name}</strong><small>{e.purpose} · {linked ? '联动全局规范' : Object.values(e.values).join(' / ')}</small><small>已绑定 {new Set(usage.map(item => item.page)).size} 页 · {usage.length} 个元素</small>{usage.length > 0 && <details><summary>查看引用位置</summary>{[...new Set(usage.map(item => item.page))].map(page => <p key={page}>{pageName(page)} · {usage.filter(item => item.page === page).length} 处{page === pageId && <button onClick={() => setUsageRule(usageRule === e.id ? '' : e.id)}>{usageRule === e.id ? '取消高亮' : '高亮本页引用'}</button>}</p>)}</details>}{!linked && e.values.value !== 'transparent' && e.id !== 'radius-full' && !['columns', 'alignment', 'distribution', 'direction'].includes(e.kind) && !(e.kind === 'size' && !e.values.value.endsWith('px')) && <button onClick={() => {
          setEditing(e.id); setKind(e.kind); setName(e.name); setPurpose(e.purpose);
          setValue(e.kind === 'color' ? e.values.value : String(parseFloat(e.values['font-size'] || e.values.value)));
          setTypeColor(e.values.color || '');
          setWeight(e.values['font-weight'] || '500'); setHeight(e.values['line-height'] || '1.5');
        }}>修改</button>}</div>;
      })}
      {editing && <p className="design-impact" role="status">正在修改共享规范「{library.find(rule => rule.id === editing)?.name}」，保存将同步影响已绑定的 {new Set(ruleUsage(editing).map(item => item.page)).size} 页、{ruleUsage(editing).length} 个元素。</p>}
      <label className="design-control">类型<select aria-label="规范类型" value={kind} disabled={!!editing} onChange={e => { setKind(e.target.value); setValue(e.target.value === 'color' ? '#64748b' : '12'); }}>{[['type', '文字样式'], ['color', '颜色'], ['radius', '圆角'], ['size', '尺寸（宽高）'], ['space', '间距']].map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
      <label className="design-control">名称<input aria-label="规范名称" value={name} onChange={e => setName(e.target.value)} /></label>
      <label className="design-control">用途<input aria-label="规范用途" value={purpose} onChange={e => setPurpose(e.target.value)} /></label>
      <label className="design-control">{kind === 'type' ? '字号（px）' : kind === 'color' ? '颜色' : '数值（px）'}<input aria-label="规范数值" type={kind === 'color' ? 'color' : 'number'} value={value} onChange={e => setValue(e.target.value)} /></label>
      {kind === 'type' && <><label className="design-control">字色<select aria-label="文字样式字色" value={typeColor} onChange={e => setTypeColor(e.target.value)}><option value="">保留元素原色</option>{typeColor && !library.some(rule => rule.kind === 'color' && rule.values.value === typeColor) && <option value={typeColor}>当前字色 · {typeColor}</option>}{library.filter(rule => rule.kind === 'color' && rule.values.value !== 'transparent').map(rule => <option key={rule.id} value={rule.values.value}>{rule.name} · {rule.values.value}</option>)}</select></label><label className="design-control">字重<select aria-label="规范字重" value={weight} onChange={e => setWeight(e.target.value)}>{[400, 500, 600, 700, 800, 900].map(w => <option key={w}>{w}</option>)}</select></label><label className="design-control">行高倍数<input aria-label="规范行高" type="number" min="1" max="3" step="0.1" value={height} onChange={e => setHeight(e.target.value)} /></label></>}
      <button className="design-trigger" onClick={save}>{editing ? '保存规范并联动' : '加入规范库'}</button>{editing && <button onClick={() => { setEditing(''); setName(''); setPurpose(''); }}>取消修改</button>}
      <p role="status">{message}</p>
    </details>
  </>;
}
