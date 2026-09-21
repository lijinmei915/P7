import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

const pillars = [
  {
    no: '01',
    name: '经营决策',
    missing: '销售、库存和执行各自汇总，管理者无法判断投入偏差由什么业务事实造成。',
    limited: 'ROI 事后计算 · 费用与执行脱节 · 风险影响金额不可见',
    target: '目标与投入 × 风险决策',
  },
  {
    no: '02',
    name: '活动编排',
    missing: '策略、预算、流程和角色规则分散配置，市场变化仍依赖人工调整。',
    limited: '预算约束进入流程太晚 · 节点、规则和费用项难复用',
    target: '策略预算 × 活动编排',
  },
  {
    no: '03',
    name: '执行激励',
    missing: '任务下发后缺少业务目标、费用约束、质量反馈与销售结果的编排解释。',
    limited: '只见任务数量 · 质量反馈滞后 · 激励与业务贡献难关联',
    target: '现场执行 × 有效贡献',
  },
  {
    no: '04',
    name: '活动经营底座',
    missing: '目标、活动、预算、费用、流程、任务、门店、商品、销售、凭证与核销缺少统一关系。',
    limited: '业、财、营销各建各 · 状态、金额与结果无法穿透',
    target: '统一对象 × 状态金额',
  },
];

export default function BusinessModelPage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      key="bizmodel"
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="deck-page flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 flex-1 relative z-10 h-full w-full overflow-hidden select-none"
    >
      <header className="flex justify-between items-center z-10 relative mb-3.5 lg:mb-5 shrink-0">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={onBack}>
          <div className="flex -space-x-1.5 shadow-sm group-hover:scale-110 transition-transform">
            <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] relative z-10 ring-2 ring-[var(--slide-bg)]" />
            <div className="w-5 h-5 rounded-full bg-[#00D084] ring-2 ring-[var(--slide-bg)]" />
          </div>
          <h1 className="text-[14px] font-black tracking-[0.2em] text-gray-800 uppercase mt-0.5 flex items-center">
            {onBack && <ChevronLeft className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0 text-[var(--color-primary)]" strokeWidth={3} />}
            <span className="group-hover:text-[var(--color-primary)] transition-colors">CASE 01 / SYSTEM MODEL</span>
          </h1>
        </div>
        <div className="text-lg lg:text-xl font-bold text-gray-400 tracking-wider">01</div>
      </header>

      <h2 className="text-lg md:text-xl lg:text-2xl xl:text-[24px] font-black text-slate-800 tracking-tight mb-1 lg:mb-2 shrink-0">
        真正需要重建的，是连接业、财、营销的活动经营模型
      </h2>
      <p className="slide-explanation text-gray-500 mb-4 lg:mb-5 shrink-0">
        以活动为主对象，将经营目标、预算费用、流程任务、门店执行与结果证据连起来。
      </p>

      {/* 四列支柱 */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3.5 xl:gap-4 flex-1 min-h-0">
        {pillars.map((p, i) => (
          <div
            key={i}
            className={`rounded-2xl p-4 xl:p-5 flex flex-col min-h-0 border ${
              i === 3
                ? 'bg-[var(--surface-emphasis)] border-slate-600/40 shadow-lg'
                : 'bg-white/80 border-gray-200/70'
            }`}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-black font-mono shrink-0 ${
                  i === 3 ? 'bg-[#729CFF] text-white' : 'bg-[var(--color-primary)] text-white'
                }`}
              >
                {p.no}
              </span>
              <span className={`text-[14px] lg:text-[15px] font-black tracking-tight ${i === 3 ? 'text-white' : 'text-[#1A1F36]'}`}>
                {p.name}
              </span>
            </div>

            <div className="flex flex-col gap-2.5 flex-1 min-h-0 justify-start">
              <div>
                <div className={`text-[11px] font-bold tracking-[0.14em] uppercase mb-1 ${i === 3 ? 'text-slate-400' : 'text-gray-400'}`}>
                  当前缺失
                </div>
                <p className={`text-[11px] lg:text-[11.5px] leading-relaxed ${i === 3 ? 'text-slate-200' : 'text-gray-600'}`}>
                  {p.missing}
                </p>
              </div>
              <div className={`rounded-lg p-2.5 ${i === 3 ? 'bg-white/5 border border-white/10' : 'bg-gray-50/80 border border-gray-100'}`}>
                <div className={`text-[11px] font-bold tracking-[0.14em] uppercase mb-1 ${i === 3 ? 'text-slate-400' : 'text-gray-400'}`}>
                  典型受限
                </div>
                <p className={`text-[11px] lg:text-[11px] leading-relaxed font-medium ${i === 3 ? 'text-slate-300' : 'text-gray-500'}`}>
                  {p.limited}
                </p>
              </div>
            </div>

            <div className={`mt-3 rounded-lg py-2.5 px-3 text-center text-[12px] lg:text-[12.5px] font-bold ${
              i === 3 ? 'bg-[#729CFF] text-white' : 'bg-[var(--color-primary)] text-white'
            }`}>
              {p.target}
            </div>
          </div>
        ))}
      </div>

      {/* 底部设计判断 */}
      <div className="shrink-0 mt-4 rounded-xl overflow-hidden flex items-stretch">
        <div className="bg-[var(--surface-emphasis)] px-5 flex items-center shrink-0">
          <span className="text-[11px] font-bold tracking-[0.14em] text-white uppercase">设计判断</span>
        </div>
        <div className="flex-1 bg-white border-x border-gray-200/80 px-5 py-3.5 flex items-center">
          <span className="text-[13px] lg:text-[14px] font-bold text-gray-800">
            一套活动经营底座，支撑管理决策、运营编排和现场执行三套角色化机制
          </span>
        </div>
        <div className="bg-blue-50/70 border border-blue-100 px-4 flex items-center shrink-0">
          <span className="text-[12px] font-bold text-[var(--color-primary)] whitespace-nowrap">一套经营底座 · 三套机制</span>
        </div>
      </div>
    </motion.div>
  );
}
