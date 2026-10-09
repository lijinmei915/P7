import { DesignElement, isDesignElement, iconName } from '../design/elements';
import { HistoryProvider, useRecordedState } from '../design/history';
import { tokenTargets, visibleTargets } from '../design/inspect';
import ElementEditor from './ElementEditor';
import DesignPanelFooter from './DesignPanelFooter';
import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { controls, defaults, normalize, Settings, storageKey } from '../design/settings';
import { ChangeRecord } from '../design/changes';

function findDefaultElement(): DesignElement | null {
  const canvas = document.querySelector('.deck-canvas');
  if (!canvas) return null;
  const card = canvas.querySelector<DesignElement>('[data-design-card], .survey-direction, .deck-card');
  if (card) return card;
  const layout = canvas.querySelector<DesignElement>('[data-design-layout]');
  if (layout && layout !== canvas) return layout;
  const title = canvas.querySelector<DesignElement>('h2, [data-design-type="title"], header h1');
  if (title) return title;
  const child = canvas.querySelector<DesignElement>('.deck-page > div, .deck-page > section, .deck-page > *');
  return child || null;
}

function DesignPanelContent({ pageId, pageNumber }: { pageId: string; pageNumber: number }) {
  const [mode, setMode] = useState<'edit' | 'library'>('edit');
  const [scope, setScope] = useState<'page' | 'global'>('page');
  const [pageCounts, setPageCounts] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [handoff, setHandoff] = useState('');
  const [changeSummary, setChangeSummary] = useState<string[]>([]);
  const [elementRecords, setElementRecords] = useState<ChangeRecord[]>([]);
  const [selectedElement, setSelectedElement] = useState<DesignElement | null>(null);

  // Auto-select primary content when panel opens or page changes
  useEffect(() => {
    if (!open) {
      setSelectedElement(null);
      return;
    }
    const el = findDefaultElement();
    if (el) {
      setSelectedElement(el);
    } else {
      const timer = setTimeout(() => {
        const delayedEl = findDefaultElement();
        if (delayedEl) setSelectedElement(delayedEl);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pageId, open]);
  const [settings, setSettings] = useRecordedState<Settings>(() => {
    try { return normalize(JSON.parse(localStorage.getItem(storageKey) || '{}')); } catch { return { ...defaults }; }
  });
  const [activeToken, setActiveToken] = useState('');
  const [targetCount, setTargetCount] = useState(0);
  const [message, setMessage] = useState('');
  const file = useRef<HTMLInputElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    for (const c of controls) document.documentElement.style.setProperty(`--ds-${c.key}`, settings[c.key] + (c.type === 'range' ? c.unit : ''));
    try { localStorage.setItem(storageKey, JSON.stringify(settings)); } catch { setMessage('浏览器无法保存设置，可导出备份。'); }
  }, [settings]);
  useEffect(() => { if (open) close.current?.focus(); }, [open]);
  useEffect(() => {
    if (!open) return;
    const canvas = document.querySelector<DesignElement>('.deck-canvas');
    const stage = document.querySelector<DesignElement>('.deck-stage');
    if (!canvas || !stage) return;
    const baseWidth = canvas.clientWidth;
    document.body.classList.add('design-editing');
    const fit = () => {
      const availableHeight = window.innerWidth <= 760 ? window.innerHeight * .5 - 110 : window.innerHeight - 160;
      const scale = Math.min(1, stage.clientWidth / baseWidth, Math.max(100, availableHeight) / (baseWidth * 9 / 16));
      canvas.style.width = `${baseWidth}px`;
      canvas.style.zoom = String(scale);
    };
    fit();
    const observer = new ResizeObserver(fit); observer.observe(stage);
    window.addEventListener('resize', fit);
    return () => { observer.disconnect(); window.removeEventListener('resize', fit); document.body.classList.remove('design-editing'); canvas.style.removeProperty('width'); canvas.style.removeProperty('zoom'); };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const highlight = () => {
      document.querySelectorAll('[data-design-highlight]').forEach(el => el.removeAttribute('data-design-highlight'));
      const counts = Object.fromEntries(controls.map(c => [c.key, visibleTargets(c.key).length]));
      setPageCounts(previous => JSON.stringify(previous) === JSON.stringify(counts) ? previous : counts);
      const targets = visibleTargets(activeToken);
      targets.forEach(el => el.setAttribute('data-design-highlight', 'true'));
      setTargetCount(targets.length);
    };
    highlight();
    const canvas = document.querySelector('.deck-canvas');
    const observer = new MutationObserver(highlight);
    if (canvas) observer.observe(canvas, { childList: true, subtree: true });
    const settled = window.setTimeout(highlight, 750);
    window.addEventListener('resize', highlight);
    window.addEventListener('scroll', highlight, true);
    return () => {
      observer.disconnect(); window.clearTimeout(settled);
      window.removeEventListener('resize', highlight);
      window.removeEventListener('scroll', highlight, true);
      document.querySelectorAll('[data-design-highlight]').forEach(el => el.removeAttribute('data-design-highlight'));
    };
  }, [open, activeToken, pageId]);
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('design-picking');
    const pick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest('.deck-canvas')) return;
      event.preventDefault(); event.stopPropagation();
      const card = target.closest<DesignElement>('[data-design-card]');
      const isTextLeaf = target.matches('p, h1, h2, h3, h4, h5, h6, span, small, strong, label, input, button, img') || (target.children.length === 0 && Boolean(target.textContent?.trim()));
      const svg = target.closest('svg');
      const selected = svg instanceof SVGSVGElement 
        ? svg 
        : isTextLeaf 
          ? (isDesignElement(target) ? target : target.closest<DesignElement>('p, h1, h2, h3, h4, span, div') || target) 
          : card 
            ? card 
            : isDesignElement(target) 
              ? target 
              : target.closest<DesignElement>('div');
      if (selected) { setSelectedElement(selected); setMode('edit'); }
      let element: Element | null = target;
      let key = '';
      while (element && !key) {
        key = Object.keys(tokenTargets).find(k => !['blue', 'light', 'dark', 'ink', 'panel', 'flow', 'radius-scale', 'explanation-weight', 'margin'].includes(k) && element!.matches(tokenTargets[k])) || '';
        element = element.parentElement;
      }
      setActiveToken('');
      requestAnimationFrame(() => {
        const control = document.querySelector('.element-editor');
        const details = control?.closest('details');
        if (details) details.open = true;
        control?.scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    };
    document.addEventListener('click', pick, true);
    return () => { document.body.classList.remove('design-picking'); document.removeEventListener('click', pick, true); };
  }, [open]);
  function dismiss() { setOpen(false); trigger.current?.focus(); }
  function download() {
    const url = URL.createObjectURL(new Blob([JSON.stringify({ version: 1, tokens: settings }, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = 'p7-design-tokens.json'; a.click(); URL.revokeObjectURL(url);
    setMessage('变量已导出。');
  }
  return <div className="design-tools" onKeyDown={e => { e.stopPropagation(); if (e.key === 'Escape') dismiss(); }}>
    <button ref={trigger} className="design-trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="design-panel">设计规范</button>
    <aside hidden={!open} id="design-panel" role="dialog" aria-label="设计规范面板" className="design-panel">
      <div className="design-fixed-heading">
        <div className="design-panel-topbar">
          <div className="design-scope design-panel-tabs" role="group" aria-label="面板功能">
            <button aria-pressed={mode === 'edit'} onClick={() => {
              setMode('edit');
              if (!selectedElement) {
                const el = findDefaultElement();
                if (el) setSelectedElement(el);
              }
            }}>编辑元素</button>
            <button aria-pressed={mode === 'library'} onClick={() => setMode('library')}>规范库</button>
          </div>
          <button ref={close} className="design-panel-close-btn" onClick={dismiss} aria-label="关闭设计规范" title="关闭面板 (Esc)">
            <X size={15} />
          </button>
        </div>
      </div>
      <div className="design-panel-scroll"><div hidden={mode !== 'library'}><div className="design-scope" role="group" aria-label="规范范围"><button aria-pressed={scope === 'page'} onClick={() => setScope('page')}>当页规范 · {String(pageNumber).padStart(2, '0')}</button><button aria-pressed={scope === 'global'} onClick={() => setScope('global')}>全局规范</button></div>
      <p className="design-help">{scope === 'page' ? '仅展示本页已接入的规范；修改仍会同步到使用同一规范的页面。' : '整套 PPT 的共享规范；标注本页使用情况。'}</p></div>
      {mode === 'edit' && activeToken && <div className="design-inspector"><p role="status">{`${controls.find(c => c.key === activeToken)?.label} · 当前可见 ${targetCount} 处`}</p><button onClick={() => setActiveToken('')}>清除高亮</button></div>}
      <ElementEditor scope={scope} mode={mode} element={open ? selectedElement : null} pageId={pageId} onSelect={setSelectedElement} onHandoff={setHandoff} onSummary={setChangeSummary} onRecordsChange={setElementRecords} />
      {mode === 'library' && ['色彩', '排版', '圆角', '动效'].map(group => {
        const renderControl = (c: typeof controls[number]) => <label key={c.key} id={`design-control-${c.key}`} className={`design-control ${activeToken === c.key ? 'is-active' : ''}`} onClick={() => setActiveToken(c.key)} onFocus={() => setActiveToken(c.key)}><span>{c.label}<output>{c.key === 'radius-scale' ? `${Math.round(Number(settings[c.key]) * 100)}%` : settings[c.key] + (c.type === 'range' ? c.unit : '')}</output></span><small className="design-usage">{pageCounts[c.key] ? `本页 ${pageCounts[c.key]} 处` : '本页未使用'}</small><input aria-label={c.label} type={c.type} value={settings[c.key]} {...(c.type === 'range' ? { min: c.min, max: c.max, step: c.step } : {})} onChange={e => setSettings(s => ({ ...s, [c.key]: e.target.value }))} /></label>;
        const grouped = controls.filter(c => c.group === group && (scope === 'global' || pageCounts[c.key] > 0));
        if (!grouped.length) return null;
        return <fieldset key={group}><legend>{group}</legend>{group === '圆角' ? <>
          {grouped.filter(c => c.key === 'radius-scale').map(renderControl)}
          <div className="radius-preview">{[['S', 'radius-sm', 'sm'], ['M', 'radius-md', 'md'], ['L', 'radius', 'lg'], ['XL', 'canvas-radius', 'xl']].filter(([, key]) => scope === 'global' || pageCounts[key] > 0).map(([label, key, token]) => <div key={key} role="button" tabIndex={0} aria-label={`定位 ${label} 圆角`} onClick={() => setActiveToken(key)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveToken(key); } }} style={{ borderRadius: `var(--radius-${token})` }}><strong>{label}</strong><small>{Math.round(Number(settings[key]) * Number(settings['radius-scale']) * 10) / 10}px</small></div>)}</div>
          <p className="design-help">整体按比例联动；胶囊与圆形保持全圆。示例显示实际圆角。</p>
          <details className="radius-details"><summary>各档微调 · 基准值</summary>{grouped.filter(c => c.key !== 'radius-scale').map(renderControl)}</details>
        </> : group === '排版' ? <>
          {grouped.filter(c => !c.key.startsWith('explanation')).map(renderControl)}
          {grouped.some(c => c.key.startsWith('explanation')) && <details className="typography-rule" open>
            <summary>说明文字<small>{settings.explanation}px · 字重 {settings['explanation-weight']} · {settings['explanation-color']}</small></summary>
            {grouped.filter(c => c.key.startsWith('explanation')).map(renderControl)}
          </details>}
        </> : grouped.map(renderControl)}</fieldset>;
      })}
      </div>
      {(() => {
        const tokenRecords: ChangeRecord[] = controls
          .filter(c => settings[c.key] !== defaults[c.key])
          .map(c => {
            const raw = `全局规范 · ${c.label}：${defaults[c.key]} → ${settings[c.key]}${c.type === 'range' ? c.unit : ''}`;
            return {
              id: `token-${c.key}`,
              category: 'token' as const,
              title: `全局规范 · ${c.label}`,
              description: `${defaults[c.key]} → ${settings[c.key]}${c.type === 'range' ? c.unit : ''}`,
              rawText: raw,
              onDelete: () => {
                setSettings(s => ({ ...s, [c.key]: defaults[c.key] }));
                setMessage(`已恢复「${c.label}」为默认值。`);
              },
            };
          });

        const allRecords = [...elementRecords, ...tokenRecords];

        return (
          <DesignPanelFooter
            onReset={() => {
              setSettings({ ...defaults });
              elementRecords.forEach(r => r.onDelete());
              setMessage('已恢复默认规范与所有改动。');
            }}
            onDownload={download}
            onUpload={() => file.current?.click()}
            summary={[...changeSummary, ...tokenRecords.map(r => r.rawText)]}
            payload={handoff + '\n全局规范：\n' + JSON.stringify(settings, null, 2)}
            noticeMessage={message}
            onClearNotice={() => setMessage('')}
            records={allRecords}
          />
        );
      })()}
      <input ref={file} hidden type="file" accept="application/json,.json" onChange={async e => { const f = e.target.files?.[0]; if (!f) return; try { const data = JSON.parse(await f.text()); if (data.version !== 1 || !data.tokens || typeof data.tokens !== 'object') throw new Error(); setSettings(normalize(data.tokens)); setMessage('已导入并应用。'); } catch { setMessage('文件格式不正确，请选择本面板导出的 JSON。'); } e.target.value = ''; }} />
    </aside>
  </div>;
}

export default function DesignPanel(props: { pageId: string; pageNumber: number }) { return <HistoryProvider><DesignPanelContent {...props} /></HistoryProvider>; }
