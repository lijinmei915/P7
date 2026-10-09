import React from 'react';
import StandardPageLayout from '../components/StandardPageLayout';

export default function SignalDecayPage({ onBack }: { onBack?: () => void }) {
  const titleRight = (
    <div className="w-[330px] xl:w-[390px] bg-[#1e293b] text-white p-2 xl:p-2.5 rounded-xl shadow-md shrink-0">
      <div className="flex justify-between items-center mb-1">
        <div className="text-xs xl:text-[12.5px] font-bold leading-snug">质量损耗最终由整个业务共同承担</div>
        <div className="text-[#38BDF8] text-[7.5px] xl:text-[8.5px] font-bold tracking-wider uppercase bg-[#1853FF]/20 px-1.5 py-0.5 rounded">Loss Consequence</div>
      </div>
      
      <div className="flex items-center text-xs text-slate-300">
        <div className="flex-1 flex flex-col pr-2 border-r border-slate-700">
          <span className="text-[8px] text-slate-400">补交与返工</span>
          <span className="text-white font-black text-sm xl:text-base tracking-tight">+39%</span>
        </div>
        <div className="flex-1 flex flex-col px-2 border-r border-slate-700">
          <span className="text-[8px] text-slate-400">高峰检核延迟</span>
          <span className="text-white font-black text-sm xl:text-base tracking-tight">1.8天</span>
        </div>
        <div className="flex-1 flex flex-col pl-2">
          <span className="text-[8px] text-slate-400">疑似异常率</span>
          <span className="text-white font-black text-sm xl:text-base tracking-tight">12.8%</span>
        </div>
      </div>
    </div>
  );

  return (
    <StandardPageLayout
      pageKey="signal"
      phaseTitle="PHASE 01 / SIGNAL DECAY"
      pageNumber="07"
      title="从活动完成到结果可验证，证据覆盖逐步收窄"
      subtitle="从任务下发到复盘，各层对“完成”的判断标准不同；同一批任务的累计指标，暴露出需持续验证的流失环节。"
      onBack={onBack}
      titleRight={titleRight}
      contentClassName="flex-1 min-h-0 relative overflow-hidden flex flex-col justify-between"
    >
      {/* Diagram Area - Zero scrollbar responsive container */}
      <div className="flex-1 min-h-0 relative w-full bg-white rounded-xl border border-slate-100 shadow-xs flex flex-col justify-between p-2.5 lg:p-3 overflow-hidden select-none">
        
        {/* Row 1: Top Survey Signals (4 columns corresponding to 4 funnel stages) */}
        <div className="grid grid-cols-4 gap-2 lg:gap-3 shrink-0">
          <div className="flex flex-col items-center text-center">
            <span className="text-[#1853FF] text-[8px] xl:text-[8.5px] font-bold">问卷信号 · 管理者</span>
            <span className="text-base xl:text-lg font-black text-slate-800 leading-tight">68%</span>
            <span className="text-[8px] xl:text-[8.5px] text-slate-500 leading-tight max-w-[140px]">判断异常需查看3个及以上信息来源。</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-[#1853FF] text-[8px] xl:text-[8.5px] font-bold">问卷信号 · 管理者</span>
            <span className="text-base xl:text-lg font-black text-slate-800 leading-tight">63%</span>
            <span className="text-[8px] xl:text-[8.5px] text-slate-500 leading-tight max-w-[140px]">难区分类策略无效与现场执行质量不足。</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-[#1853FF] text-[8px] xl:text-[8.5px] font-bold">问卷信号 · 运营</span>
            <span className="text-base xl:text-lg font-black text-slate-800 leading-tight">73%</span>
            <span className="text-[8px] xl:text-[8.5px] text-slate-500 leading-tight max-w-[140px]">用企微或Excel补充活动进度与异常状态。</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-[#1853FF] text-[8px] xl:text-[8.5px] font-bold">问卷信号 · 运营</span>
            <span className="text-base xl:text-lg font-black text-slate-800 leading-tight">64%</span>
            <span className="text-[8px] xl:text-[8.5px] text-slate-500 leading-tight max-w-[140px]">认为“已提交”不等于节点真正完成。</span>
          </div>
        </div>

        {/* Row 2: Funnel Diagram with Integrated Stage Overlays and Boundary Markers */}
        <div className="relative w-full h-[62px] xl:h-[72px] shrink-0 my-1">
          {/* SVG Funnel Shape */}
          <svg className="w-full h-full rounded-lg" preserveAspectRatio="none" viewBox="0 0 1000 160">
            <polygon points="0,10 250,10 250,150 0,150" fill="#1e293b" />
            <polygon points="250,10 500,28 500,132 250,150" fill="#475569" />
            <polygon points="500,28 750,46 750,114 500,132" fill="#94a3b8" />
            <polygon points="750,46 1000,60 1000,100 750,114" fill="#1853FF" />
          </svg>

          {/* Funnel Stage Content: 4 balanced columns centered in each quadrant */}
          <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
            <div className="flex flex-col items-center justify-center text-white px-2">
              <span className="text-[7.5px] font-bold text-white/60 tracking-wider uppercase">INPUT</span>
              <span className="text-[10px] xl:text-[11.5px] font-bold whitespace-nowrap">经营目标与费用投入</span>
            </div>
            <div className="flex flex-col items-center justify-center text-white px-2">
              <span className="text-[7.5px] font-bold text-white/60 tracking-wider uppercase">TRANSLATE</span>
              <span className="text-[10px] xl:text-[11.5px] font-bold whitespace-nowrap">活动规则与执行任务</span>
            </div>
            <div className="flex flex-col items-center justify-center text-white px-2">
              <span className="text-[7.5px] font-bold text-white/60 tracking-wider uppercase">EXECUTE</span>
              <span className="text-[10px] xl:text-[11.5px] font-bold whitespace-nowrap">门店作业与现场举证</span>
            </div>
            <div className="flex flex-col items-center justify-center text-white px-2">
              <span className="text-[7.5px] font-bold text-white/60 tracking-wider uppercase">OUTPUT</span>
              <span className="text-[10px] xl:text-[11.5px] font-bold whitespace-nowrap">可解释的经营结果</span>
            </div>
          </div>

          {/* 3 Boundary Markers - Positioned exactly at 25%, 50%, 75% borders */}
          <div className="absolute -top-2.5 bottom-[-4px] left-[25%] -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
            <div className="bg-white/95 text-slate-800 border border-slate-200 px-1.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <span className="text-[9px] font-black text-slate-800">管理者</span>
              <span className="text-[7.5px] text-slate-500 font-medium">目标能否被解释</span>
            </div>
            <div className="w-[1px] flex-1 bg-slate-400/40 my-0.5"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#1853FF]"></div>
          </div>

          <div className="absolute -top-2.5 bottom-[-4px] left-[50%] -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
            <div className="bg-white/95 text-slate-800 border border-slate-200 px-1.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <span className="text-[9px] font-black text-slate-800">运营人员</span>
              <span className="text-[7.5px] text-slate-500 font-medium">标准能否被传递</span>
            </div>
            <div className="w-[1px] flex-1 bg-slate-400/40 my-0.5"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#1853FF]"></div>
          </div>

          <div className="absolute -top-2.5 bottom-[-4px] left-[75%] -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
            <div className="bg-white/95 text-slate-800 border border-slate-200 px-1.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <span className="text-[9px] font-black text-slate-800">业代</span>
              <span className="text-[7.5px] text-slate-500 font-medium">质量能否被保证</span>
            </div>
            <div className="w-[1px] flex-1 bg-slate-400/40 my-0.5"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#1853FF]"></div>
          </div>
        </div>

        {/* Row 3: Calculation Rule Note */}
        <div className="text-[7.5px] xl:text-[8px] text-slate-400 font-medium px-1 shrink-0">
          累计比例 = 本阶段数量 ÷ 420 个同批活动任务；阶段转化率另按相邻阶段计算。
        </div>

        {/* Row 4: Bottom 5 Conversion Stage Metrics (Clean 5-column grid, no overflow) */}
        <div className="grid grid-cols-5 gap-1.5 lg:gap-2 shrink-0">
          {/* Milestone 1: 100% */}
          <div className="p-1.5 rounded-lg bg-slate-50/80 border border-slate-200/60 flex flex-col justify-between">
            <div>
              <div className="text-base xl:text-lg font-black text-slate-800 tracking-tight leading-none">100%</div>
              <div className="text-[8px] xl:text-[8.5px] font-bold text-slate-600 mt-0.5">任务已下发 <span className="text-slate-400 font-normal">· 420</span></div>
            </div>
            <div className="mt-1 pt-1 border-t border-slate-200/60">
              <div className="text-xs xl:text-[13px] font-black text-slate-700 leading-none">7.4天</div>
              <div className="text-[7px] xl:text-[7.5px] text-slate-500 mt-0.5 leading-snug">费用核销平均周期，补交与确认延长结算。</div>
            </div>
          </div>

          {/* Milestone 2: 76.0% */}
          <div className="p-1.5 rounded-lg bg-slate-50/80 border border-slate-200/60 flex flex-col justify-between">
            <div>
              <div className="text-base xl:text-lg font-black text-slate-800 tracking-tight leading-none">76.0%</div>
              <div className="text-[8px] xl:text-[8.5px] font-bold text-slate-600 mt-0.5">按期完成 <span className="text-slate-400 font-normal">· 319</span></div>
            </div>
            <div className="mt-1 pt-1 border-t border-slate-200/60">
              <div className="text-[7.5px] text-[#1853FF] font-bold leading-none">运营台账 · Mock</div>
              <div className="text-xs xl:text-[13px] font-black text-slate-700 leading-none mt-0.5">6.4h/周</div>
              <div className="text-[7px] xl:text-[7.5px] text-slate-500 mt-0.5 leading-snug">用于规则答疑、催办与补交追踪。</div>
            </div>
          </div>

          {/* Milestone 3: 60.8% */}
          <div className="p-1.5 rounded-lg bg-slate-50/80 border border-slate-200/60 flex flex-col justify-between">
            <div>
              <div className="text-base xl:text-lg font-black text-slate-800 tracking-tight leading-none">60.8%</div>
              <div className="text-[8px] xl:text-[8.5px] font-bold text-slate-600 mt-0.5">一次通过 <span className="text-slate-400 font-normal">· 194</span></div>
            </div>
            <div className="mt-1 pt-1 border-t border-slate-200/60">
              <div className="text-[7.5px] text-[#1853FF] font-bold leading-none">问卷信号 · 业代</div>
              <div className="text-xs xl:text-[13px] font-black text-slate-700 leading-none mt-0.5">57%</div>
              <div className="text-[7px] xl:text-[7.5px] text-slate-500 mt-0.5 leading-snug">提交后不能立即确认举证是否合格。</div>
            </div>
          </div>

          {/* Milestone 4: 57.1% */}
          <div className="p-1.5 rounded-lg bg-slate-50/80 border border-slate-200/60 flex flex-col justify-between">
            <div>
              <div className="text-base xl:text-lg font-black text-slate-800 tracking-tight leading-none">57.1%</div>
              <div className="text-[8px] xl:text-[8.5px] font-bold text-slate-600 mt-0.5">质量可确认 <span className="text-slate-400 font-normal">· 182</span></div>
            </div>
            <div className="mt-1 pt-1 border-t border-slate-200/60">
              <div className="text-[7.5px] text-[#1853FF] font-bold leading-none">问卷信号 · 业代</div>
              <div className="text-xs xl:text-[13px] font-black text-slate-700 leading-none mt-0.5">49%</div>
              <div className="text-[7px] xl:text-[7.5px] text-slate-500 mt-0.5 leading-snug">不清楚奖励计算方式或到账进度。</div>
            </div>
          </div>

          {/* Milestone 5: 53.9% */}
          <div className="p-1.5 rounded-lg bg-[#1853FF]/5 border border-[#1853FF]/20 flex flex-col justify-between">
            <div>
              <div className="text-base xl:text-lg font-black text-[#1853FF] tracking-tight leading-none">53.9%</div>
              <div className="text-[8px] xl:text-[8.5px] font-bold text-[#1853FF] mt-0.5">ROI可关联 <span className="text-[#1853FF]/70 font-normal">· 172</span></div>
            </div>
            <div className="mt-1 pt-1 border-t border-[#1853FF]/20">
              <div className="text-[7.5px] text-[#1853FF] font-bold leading-none">经营闭环 · 验证</div>
              <div className="text-xs xl:text-[13px] font-black text-[#1853FF] leading-none mt-0.5">仅半数闭环</div>
              <div className="text-[7px] xl:text-[7.5px] text-slate-500 mt-0.5 leading-snug">仅53.9%任务能直接归因动销与ROI。</div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Bottom Banner */}
      <div className="mt-2 bg-[#F4F6FB] border-l-4 border-[#1853FF] px-3 py-1.5 xl:py-2 rounded-r-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
         <span className="font-bold text-slate-800 text-xs xl:text-[12.5px] leading-tight">
           研究判断：需要担心的不是单一角色“执行力”，而是目标传递、规则理解、质量反推与激励机制的连续性。
         </span>
         <span className="text-[8.5px] xl:text-[9.5px] text-slate-400 font-medium whitespace-nowrap">
           下一步：选择26位差异样本进入真实任务与页面走查
         </span>
      </div>
    </StandardPageLayout>
  );
}
