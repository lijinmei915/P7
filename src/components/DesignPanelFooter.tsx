import React, { useState, useEffect } from 'react';
import { useHistory } from '../design/history';
import { Undo2, Redo2, RotateCcw, Download, Upload, Copy, Check, ChevronDown, ChevronUp, X, Trash2 } from 'lucide-react';
import { ChangeRecord } from '../design/changes';

interface DesignPanelFooterProps {
  onReset: () => void;
  onDownload: () => void;
  onUpload: () => void;
  summary: string[];
  payload: string;
  noticeMessage?: string;
  onClearNotice?: () => void;
  records?: ChangeRecord[];
}

export default function DesignPanelFooter({
  onReset,
  onDownload,
  onUpload,
  summary,
  payload,
  noticeMessage,
  onClearNotice,
  records,
}: DesignPanelFooterProps) {
  const history = useHistory();
  const [copied, setCopied] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  // Auto-clear notice after 2.5s
  useEffect(() => {
    if (noticeMessage && onClearNotice) {
      const timer = setTimeout(() => {
        onClearNotice();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [noticeMessage, onClearNotice]);

  const recordCount = records ? records.length : summary.length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setShowDrawer(true);
      setShowRaw(true);
    }
  };

  return (
    <div className="design-fixed-footer">
      {/* 1. Expandable change summary drawer (only shown when toggled) */}
      {showDrawer && (
        <div className="footer-drawer animate-fade-in" role="region" aria-label="改动详情">
          <div className="footer-drawer-header">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 text-xs">
                改动记录 ({recordCount} 项)
              </span>
              {recordCount > 0 && (
                <button
                  type="button"
                  className="text-[11px] text-red-500 hover:text-red-700 hover:underline flex items-center gap-0.5 ml-1 transition-colors"
                  onClick={() => {
                    if (window.confirm('确定要清空全部改动记录吗？')) {
                      onReset();
                    }
                  }}
                  title="清空并恢复所有改动"
                >
                  <RotateCcw size={10} />
                  <span>清空全部</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="text-[11px] text-blue-600 hover:underline"
                onClick={() => setShowRaw(!showRaw)}
              >
                {showRaw ? '摘要卡片' : '完整数据'}
              </button>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors"
                onClick={() => setShowDrawer(false)}
                aria-label="关闭改动详情"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          <div className="footer-drawer-body">
            {records && records.length > 0 ? (
              <div className="change-record-list">
                {records.map((record) => (
                  <div key={record.id} className="change-record-card">
                    <div className="change-record-header">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className={`change-category-tag ${record.category}`}>
                          {record.category === 'element'
                            ? '元素'
                            : record.category === 'rule'
                            ? '规范'
                            : record.category === 'text'
                            ? '文案'
                            : '全局'}
                        </span>
                        <span className="change-record-title" title={record.title}>
                          {record.title}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={record.onDelete}
                        className="change-delete-btn"
                        title="移除整项改动"
                        aria-label={`移除${record.title}`}
                      >
                        <Trash2 size={11} />
                        <span>删除</span>
                      </button>
                    </div>

                    {record.subItems && record.subItems.length > 0 ? (
                      <div className="change-chips-wrap">
                        {record.subItems.map((sub) => (
                          <span
                            key={sub.id}
                            className="change-chip"
                            title={`点击移除 ${sub.label}`}
                          >
                            <span className="change-chip-label">{sub.label}：</span>
                            <span className="change-chip-value">{sub.value}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                sub.onDelete();
                              }}
                              className="change-chip-delete"
                              title={`移除「${sub.label}」`}
                              aria-label={`移除${sub.label}`}
                            >
                              <X size={10} strokeWidth={2.5} />
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : record.description ? (
                      <div className="change-record-desc" title={record.description}>
                        {record.description}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : summary.length > 0 ? (
              <ul className="footer-summary-list">
                {summary.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-[11px] text-slate-400 py-3 text-center">暂无已保存改动。</p>
            )}

            {showRaw && (
              <textarea
                aria-label="发给 AI 的改动说明"
                readOnly
                rows={5}
                className="footer-raw-textarea"
                value={payload}
                onFocus={(e) => e.target.select()}
              />
            )}
          </div>
        </div>
      )}

      {/* 2. Top Ribbon: History & Utility Controls (Height: ~26px) */}
      <div className="design-footer-ribbon">
        <div className="footer-tools-left">
          <button
            type="button"
            className="footer-mini-btn"
            disabled={!history.canUndo}
            onClick={history.undo}
            title="撤销 (Undo)"
            aria-label="撤销"
          >
            <Undo2 size={12} />
            <span>撤销</span>
          </button>
          <button
            type="button"
            className="footer-mini-btn"
            disabled={!history.canRedo}
            onClick={history.redo}
            title="重做 (Redo)"
            aria-label="重做"
          >
            <Redo2 size={12} />
            <span>重做</span>
          </button>

          <span className="footer-v-divider" />

          <button
            type="button"
            className="footer-mini-btn"
            onClick={onReset}
            title="恢复默认规范"
          >
            <RotateCcw size={11} />
            <span>重置</span>
          </button>
          <button
            type="button"
            className="footer-mini-btn"
            onClick={onDownload}
            title="导出规范 JSON"
          >
            <Download size={11} />
            <span>导出</span>
          </button>
          <button
            type="button"
            className="footer-mini-btn"
            onClick={onUpload}
            title="导入规范 JSON"
          >
            <Upload size={11} />
            <span>导入</span>
          </button>
        </div>

        {/* Right side: Notice or Change summary toggle badge */}
        <div className="footer-tools-right">
          {noticeMessage ? (
            <span className="footer-notice-chip animate-fade-in">
              <Check size={10} className="inline mr-0.5" />
              {noticeMessage}
            </span>
          ) : recordCount > 0 ? (
            <button
              type="button"
              className={`footer-summary-badge ${showDrawer ? 'is-active' : ''}`}
              onClick={() => setShowDrawer(!showDrawer)}
              title="点击查看改动详情"
            >
              <span>{recordCount} 项改动</span>
              {showDrawer ? <ChevronDown size={11} /> : <ChevronUp size={11} />}
            </button>
          ) : null}
        </div>
      </div>

      {/* 3. Bottom Row: High-Contrast Primary Handoff Button (Height: ~32px) */}
      <button
        type="button"
        className={`footer-cta-btn ${copied ? 'is-copied' : ''}`}
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <Check size={14} className="text-white" />
            <span>已复制改动！直接在 AI 对话粘贴发送</span>
          </>
        ) : (
          <>
            <Copy size={13} />
            <span>复制改动发给 AI{recordCount > 0 ? ` · ${recordCount} 项` : ''}</span>
          </>
        )}
      </button>
    </div>
  );
}
