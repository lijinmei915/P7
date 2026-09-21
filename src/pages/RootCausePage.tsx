import React from 'react';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const evidence = [
  {
    role: '管理者证据 / 05C',
    quote: '“数据能看到，风险却总在发生后才被追问。”',
    breakpoint: '看得见数据，但无法及时决策',
  },
  {
    role: '运营证据 / 05D',
    quote: '“流程能够配置，一变客户与场景就重新依赖定制。”',
    breakpoint: '有固定流程，但无法快速适配',
  },
  {
    role: '业代证据 / 05E',
    quote: '“任务已经下发，现场仍不知道先做什么、做到什么算完成。”',
    breakpoint: '收到任务，但缺少执行确定性',
  },
];

export default function RootCausePage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      key="rootcause"
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
            <span className="group-hover:text-[var(--color-primary)] transition-colors">CASE 01 / ROOT CAUSE</span>
          </h1>
        </div>
        <div className="text-lg lg:text-xl font-bold text-gray-400 tracking-wider">01</div>
      </header>

      <h2 className="text-lg md:text-xl lg:text-2xl xl:text-[24px] font-black text-slate-800 tracking-tight mb-1 lg:mb-2 shrink-0">
        三个角色的表层阻碍，最终指向同一个经营链路断点
      </h2>
      <p className="slide-explanation text-gray-500 mb-4 lg:mb-5 shrink-0">
        将 05A–05C 的行为证据与经营指标交叉验证，追问：费用、执行和结果为什么无法互相解释？
      </p>

      <div className="flex flex-col lg:flex-row gap-4 xl:gap-5 flex-1 min-h-0">
        {/* 左：三条行为证据 → 机制断点 */}
        <div className="flex-[1.6] flex flex-col gap-3 justify-center min-h-0">
          {evidence.map((e, i) => (
            <div key={i} className="flex items-stretch gap-3">
              <div className="flex-[1.4] bg-white/80 border border-gray-200/70 rounded-xl p-4 flex flex-col justify-center gap-1.5">
                <div className="text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase">{e.role}</div>
                <div className="text-[13px] lg:text-[14px] text-gray-800 font-medium leading-snug">{e.quote}</div>
              </div>
              <div className="flex items-center text-gray-300 shrink-0">
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="flex-1 bg-blue-50/50 border border-blue-100/70 rounded-xl p-4 flex flex-col justify-center gap-1">
                <div className="text-[11px] font-bold tracking-[0.12em] text-[var(--color-primary)] uppercase">机制断点 0{i + 1}</div>
                <div className="text-[13px] lg:text-[14px] text-gray-800 font-semibold leading-snug">{e.breakpoint}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 右：共同根因 */}
        <div className="flex-1 bg-[var(--surface-emphasis)] rounded-2xl p-6 xl:p-7 border border-slate-600/40 shadow-lg flex flex-col justify-between min-h-0">
          <div>
            <div className="text-[11px] font-bold tracking-[0.15em] text-slate-300 uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#729CFF]" />
              ROOT CAUSE / 共同根因
            </div>
            <div className="text-[17px] lg:text-[19px] font-black text-white leading-snug tracking-tight">
              不是三个功能缺口，
              <br />
              而是经营、费用、执行与结果
              <br />
              没有连缀起来。
            </div>
            <p className="slide-explanation text-slate-300/90 mt-4 leading-relaxed">
              目标、活动、预算、费用、流程、任务、门店执行、销售库存与核销各自存在，却缺少统一对象关系和连续状态语言。
            </p>
          </div>
          <div className="mt-4 pt-3.5 border-t border-white/10">
            <div className="text-[15px] lg:text-[16px] font-black text-[#729CFF] tracking-tight">活动经营底座缺失</div>
            <div className="text-[11px] text-slate-400 mt-1">业、财、营销无法被解释的原因</div>
          </div>
        </div>
      </div>

      {/* 底部结论条 */}
      <div className="shrink-0 mt-4 bg-white border border-gray-200/80 rounded-xl px-5 py-3.5 flex items-center justify-between gap-4">
        <div className="text-[11px] font-bold tracking-[0.18em] text-gray-400 uppercase shrink-0">DESIGN THESIS</div>
        <div className="text-[13px] lg:text-[14px] font-bold text-gray-800 flex-1">
          不是补三个孤立功能，而是用<span className="text-[var(--color-primary)]">一套活动经营模型重建三种业务机制</span>。
        </div>
        <div className="text-[11px] font-mono text-gray-400 shrink-0">07 统一架构 →</div>
      </div>
    </motion.div>
  );
}
