import { DesignElement, isDesignElement, iconName } from '../design/elements';
import { pageName } from '../design/pageNames';
import SpacingControl from './SpacingControl';
import DimensionControl from './DimensionControl';
import { useRecordedState } from '../design/history';
import React, { useEffect, useRef, useState } from 'react';
import { libraryDefaults, Rule, slots } from '../design/library';
import { useTextChanges } from './TextChanges';
import SelectionOutline from './SelectionOutline';
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
export default function ElementEditor({ element, pageId, onSelect, onHandoff, mode, onSummary, scope }: { mode: 'edit' | 'library'; scope: 'page' | 'global'; onSummary: (summary: string[]) => void; element: DesignElement | null; pageId: string; onSelect: (el: DesignElement | null) => void; onHandoff: (payload: string) => void }) {
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
  useEffect(() => { setSizeError(''); }, [element]);
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
  const { edits: textEdits, editor: textEditor } = useTextChanges(element, pageId, selector);
  const ruleUsage = (id: string) => Object.entries(refs).flatMap(([page, targets]) => Object.entries(targets).filter(([, properties]) => Object.values(properties).includes(id)).map(([target]) => ({ page, target })));
  useEffect(() => {
    if (mode !== 'library' || !usageRule) return;
    const targets = ruleUsage(usageRule).filter(item => item.page === pageId).map(item => document.querySelector(item.target)).filter(Boolean);
    targets.forEach(target => target!.setAttribute('data-rule-highlight', 'true'));
    return () => targets.forEach(target => target!.removeAttribute('data-rule-highlight'));
  }, [usageRule, refs, pageId, mode]);
  useEffect(() => {
    const summary: string[] = [];
    Object.entries(textEdits).forEach(([page, edits]) => Object.values(edits).forEach(edit => { if (edit.before !== edit.after) summary.push(`${pageName(page)} · 文案：${edit.before} → ${edit.after}`); }));
    Object.entries(refs).forEach(([page, targets]) => Object.entries(targets).forEach(([target, properties]) => {
      const used = Object.entries(properties).filter(([, id]) => id).map(([slot, id]) => `${slots.find(item => item[0] === slot)?.[1] || slot}：${library.find(rule => rule.id === id)?.name || id}`);
      if (used.length) summary.push(`${pageName(page)} · 元素 ${Object.keys(targets).indexOf(target) + 1} · ${used.join('，')}`);
    }));
    library.forEach(rule => { const original = libraryDefaults.find(item => item.id === rule.id); if (!original || JSON.stringify(original.values) !== JSON.stringify(rule.values)) summary.push(`${original ? '修改' : '新增'}规范：${rule.name} · ${Object.values(rule.values).join(' / ')}`); });
    Object.entries(legacy).forEach(([page, targets]) => Object.values(targets).forEach(properties => { if (Object.keys(properties).length) summary.push(`${pageName(page)} · 保留旧版调整：${Object.entries(properties).map(([key, value]) => `${key} ${value}`).join('，')}`); }));
    onSummary(summary);
    onHandoff('请将以下 P7 预览中的调整落实到项目源码，保持已有设计规范。元素定位按页面 ID 和页面内选择器记录；若结构已变化，请先核对内容。\n' + JSON.stringify({ 当前页面: pageId, 文案改动: textEdits, 元素规范引用: refs, 旧版属性覆盖: legacy, 规范库: library }, null, 2));
  }, [pageId, textEdits, refs, legacy, library, onHandoff, onSummary]);
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
    if (slot === 'align-items') return isLayout && layoutOptions.align;
    if (slot === 'justify-content') return isLayout && layoutOptions.distribute;
    if (slot === 'row-gap') return (isFlex || isGrid) && layoutOptions.rows;
    if (slot === 'column-gap') return (isFlex || isGrid) && layoutOptions.columns;
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
      const mainAxis = parent?.flexDirection.startsWith('column') ? 'height' : 'width';
      for (const axis of ['width', 'height']) {
        const id = refs[pageId]?.[target]?.[axis];
        const rule = library.find(item => item.id === id);
        if (rule?.values.mode === 'remaining') {
          css[axis] = 'auto'; css[`min-${axis}`] = '0';
          if (parent?.display.includes('flex') && mainAxis === axis) css.flex = '1 1 0%';
          else { css['align-self'] = 'stretch'; css['justify-self'] = 'stretch'; }
        } else if (css[axis] && parent?.display.includes('flex') && mainAxis === axis) {
          css['flex-shrink'] = '0'; css['flex-grow'] = '0'; css['flex-basis'] = 'auto';
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
  function format(values: Record<string, string>, typography: boolean) {
    return typography ? `${values['font-size']} / 字重 ${values['font-weight']} / 行高 ${values['line-height']}${values.color ? ` / 字色 ${values.color}` : ''}` : values.value;
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
    <SelectionOutline element={element} />
    {mode === 'edit' && !element && <section className="element-editor"><strong>点击页面元素开始编辑</strong><p className="design-help">选中文字修改文案，选中卡片或布局调整排版。</p><button className="design-trigger" onClick={() => { const target = document.querySelector<DesignElement>('.deck-canvas [data-design-layout], .deck-canvas h2'); if (target) onSelect(target); }}>选择本页主要内容</button></section>}
    {mode === 'edit' && element && <section className="element-editor"><div className="element-heading"><strong>{isIcon ? '图标属性' : isText ? '文字属性' : isLayout ? '布局属性' : '容器属性'} · 仅选择规范</strong><p className="design-help">{isIcon ? objectName(element) : element.dataset.designCard || element.dataset.designLayout || element.textContent?.trim().slice(0, 36) || '容器'}</p>
      <nav className="design-breadcrumbs" aria-label="元素层级">{ancestors.map((node, index) => <button key={index} title={objectName(node)} aria-current={node === element ? 'true' : undefined} onClick={() => onSelect(node)}>{objectName(node)}</button>)}</nav>
      <div className="design-actions design-layer-actions" aria-label="选择层级">
        <button type="button" aria-label="选择父级" title="选择父级" disabled={!canSelectParent} onClick={() => {
          if (canSelectParent && parentElement) { childHistory.current.set(parentElement, element); onSelect(parentElement); }
        }}>↑</button>
        <button type="button" aria-label="选择子级" title="选择子级（优先返回刚才的元素）" disabled={!childElement} onClick={() => { if (childElement) onSelect(childElement); }}>↓</button>
        <button type="button" onClick={() => onSelect(null)}>取消选择</button>
      </div>
      </div>{textEditor}
      {!isText && !isIcon && <p className="design-help">宽高选择尺寸规范；内边距控制卡片内部留白，外边距控制周围留白。调整卡片之间的距离，请选中它们的外层布局，修改行／列间距。尺寸按画布原始 px 计，随预览缩放。</p>}
      {Object.keys(pending).length > 0 && <p className="design-help">未归档旧调整：{Object.entries(pending).map(([k, v]) => `${k}: ${v}`).join('；')}。选择规范逐项替换，或先入库。</p>}
      {relevantSlots.filter(([slot]) => !slot.startsWith('padding-') && !slot.startsWith('margin-')).map(([slot, label, category]) => {
        const candidates = library.filter(e => e.kind === category);
        const assigned = refs[pageId]?.[selector]?.[slot];
        const match = candidates.find(e => e.id === assigned) || candidates.find(e => matches(slot, e));
        const currentValue = format(slot === 'typography' ? actual : { value: actual[slot] || '—' }, slot === 'typography');
        if (category === 'size') return <div key={`${selector}-${slot}`}><DimensionControl element={element} slot={slot} label={label} actual={actual[slot] || ''} assigned={match} rules={candidates} apply={id => apply(slot, id)} commit={value => applyCustomSize(slot, value)} /></div>;
        return <div key={`${selector}-${slot}`} className="design-control"><span>{label}</span>
          <details className="rule-picker" onKeyDown={event => {
            if (event.key === 'Escape') { event.stopPropagation(); event.currentTarget.open = false; event.currentTarget.querySelector('summary')?.focus(); }
          }}>
            <summary aria-label={`元素${label}`}>{match ? match.name : `未归档 · ${currentValue}`}</summary>
            <div className="rule-options" role="group" aria-label={`${label}选项`}>
              <button type="button" onClick={event => { apply(slot, ''); const details = event.currentTarget.closest('details')!; details.open = false; details.querySelector('summary')?.focus(); }}><strong>沿用页面样式</strong><small>清除此属性的单独设置</small></button>
              {candidates.map(rule => <button type="button" key={rule.id} aria-pressed={match?.id === rule.id} onClick={event => {
                apply(slot, rule.id); const details = event.currentTarget.closest('details')!; details.open = false; details.querySelector('summary')?.focus();
              }}><strong>{rule.name}</strong><small>{rule.name} · {format(resolved[rule.id] || rule.values, slot === 'typography')}</small></button>)}
            </div>
          </details></div>;
      })}
      {!isText && !isIcon && <SpacingControl prefix="padding" actual={actual} rules={library.filter(rule => rule.kind === 'space')} apply={apply} />}
      {!isText && !isIcon && <details className="more-layout"><summary>更多布局 · 外边距</summary><SpacingControl prefix="margin" actual={actual} rules={library.filter(rule => rule.kind === 'space')} apply={apply} /></details>}
      {sizeError && <p role="alert">{sizeError}</p>}
      <button className="design-trigger" onClick={() => { setRefs(p => ({ ...p, [pageId]: { ...p[pageId], [selector]: {} } })); setLegacy(p => ({ ...p, [pageId]: { ...p[pageId], [selector]: {} } })); }}>恢复此元素原样</button>
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
