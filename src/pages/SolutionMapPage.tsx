import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

const roles = [
  {
    no: '01',
    role: '管理者',
    mech: '管理决策机制',
    from: '看到结果',
    to: '提前发现并完成决策',
    abilities: ['全局经营看板', '主动风险提醒', '逐层原因下钻', '决策动作追踪'],
    value: '提升风险响应与经营判断效率',
  },
  {
    no: '02',
    role: '运营人员',
    mech: '活动编排机制',
    from: '固定流程',
    to: '按场景灵活组合流程',
    abilities: ['可视化流程画布', '规则与角色配置', '高频模板复用', '发布前自动校验'],
    value: '降低差异化活动配置与定制成本',
  },
  {
    no: '03',
    role: '业代',
    mech: '执行激励机制',
    from: '被动接任务',
    to: '有目标、有反馈、有激励',
    abilities: ['游戏化任务中心', '即时过程反馈', '积分与任务奖励', '提交校验与质量评分'],
    value: '同步提升执行效率与完成质量',
  },
];

const foundation = ['目标', '活动', '流程', '任务', '人员', '状态', '异常', '结果'];
const capabilities = ['统一对象模型', '连续状态流转', '过程数据回流', '角色权限规则'];

export default function SolutionMapPage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      key="solutionmap"
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
            <span className="group-hover:text-[var(--color-primary)] transition-colors">CASE 01 / DESIGN STRATEGY</span>
          </h1>
        </div>
        <div className="text-lg lg:text-xl font-bold text-gray-400 tracking-wider">01</div>
      </header>

      <h2 className="text-lg md:text-xl lg:text-2xl xl:text-[24px] font-black text-slate-800 tracking-tight mb-1 lg:mb-2 shrink-0">
        一套任务底座，支撑三类角色机制
      </h2>
      <p className="slide-explanation text-gray-500 mb-4 lg:mb-5 shrink-0">
        三个角色方案不是独立功能，而是基于统一对象、状态和验证能力形成的差异化业务机制。
      </p>

      {/* 三列角色方案 */}
      <div className="grid grid-cols-3 gap-4 xl:gap-5 flex-1 min-h-0">
        {roles.map((r, i) => (
          <div key={i} className="bg-white/85 border border-gray-200/70 rounded-2xl p-4 xl:p-5 flex flex-col min-h-0">
            <div className="flex items-baseline gap-2.5 mb-3">
              <span className="text-[11px] font-black font-mono text-[var(--color-primary)]">{r.no}</span>
              <span className="text-[15px] lg:text-[16px] font-black text-[#1A1F36] tracking-tight">{r.role}</span>
              <span className="text-[11px] text-gray-400 font-medium">{r.mech}</span>
            </div>

            <div className="text-[14px] lg:text-[15px] font-black text-[#1A1F36] leading-snug tracking-tight mb-3">
              从“{r.from}”升级为
              <br />
              “{r.to}”
            </div>

            <div className="text-[11px] font-bold tracking-[0.14em] text-gray-400 uppercase mb-1.5">核心能力</div>
            <div className="grid grid-cols-2 gap-1.5 mb-auto">
              {r.abilities.map((a, j) => (
                <div key={j} className="bg-gray-50/90 border border-gray-100 rounded-lg px-2.5 py-2 text-[11px] lg:text-[11px] font-medium text-gray-700 text-center">
                  {a}
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-lg bg-blue-50/70 border border-blue-100/80 py-2.5 px-3 text-center text-[11.5px] lg:text-[12px] font-bold text-[var(--color-primary)]">
              {r.value}
            </div>
          </div>
        ))}
      </div>

      {/* 底部：统一任务底座 */}
      <div className="shrink-0 mt-4 bg-[var(--surface-emphasis)] rounded-2xl p-4 xl:p-5 border border-slate-600/40 shadow-lg">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="shrink-0">
            <div className="text-[13px] lg:text-[14px] font-black text-white tracking-tight">统一任务底座</div>
            <div className="text-[11px] font-bold tracking-[0.18em] text-slate-400 uppercase">SHARED FOUNDATION</div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {foundation.map((f, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-[11px] font-medium text-slate-100">
                {f}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap mt-3 pt-3 border-t border-white/10">
          <div className="text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase shrink-0">底层能力</div>
          <div className="flex gap-4 flex-wrap">
            {capabilities.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#729CFF]" />
                {c}
              </span>
            ))}
          </div>
          <span className="ml-auto text-[11px] lg:text-[12px] font-bold text-[#729CFF]">
            三类界面不是独立功能，而是运行在同一底座上的角色化机制
          </span>
        </div>
      </div>
    </motion.div>
  );
}
