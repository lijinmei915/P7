import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function SurveyPage({ onBack }: { onBack: () => void }) {
  const steps = [
    {
      id: '01',
      title: '定向发放',
      tag: '01 / 对齐名单',
      desc: '确认配额，不公开作答',
      bg: 'bg-white',
      text: 'text-slate-900',
      tagColor: 'text-[#1853FF]',
      border: 'border border-slate-200'
    },
    {
      id: '02',
      title: '分类问卷',
      tag: '02 / 三类入口',
      desc: '分角色定题，预计 5-7 分钟',
      bg: 'bg-white',
      text: 'text-slate-900',
      tagColor: 'text-[#1853FF]',
      border: 'border border-slate-200'
    },
    {
      id: '03',
      title: '汇总分析',
      tag: '03 / 匿名回收',
      desc: '不集姓名，保留组织编码',
      bg: 'bg-slate-900',
      text: 'text-white',
      tagColor: 'text-[#00D084]',
      border: 'border border-slate-900'
    },
    {
      id: '04',
      title: '形成样本',
      tag: '04 / 有效性筛选',
      desc: '多维判断，清洗有效数据',
      bg: 'bg-[#1853FF]',
      text: 'text-white',
      tagColor: 'text-white/80',
      border: 'border border-[#1853FF]'
    }
  ];

  return (
    <motion.div
      key="survey"
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 flex-1 relative z-10 h-full w-full overflow-hidden select-none"
    >
      {/* Header */}
      <header className="flex justify-between items-center z-10 relative mb-3.5 lg:mb-5 shrink-0">
        <div 
          className="flex items-center gap-4 cursor-pointer group" 
          onClick={onBack}
        >
          <div className="flex -space-x-1.5 shadow-sm group-hover:scale-110 transition-transform">
            <div className="w-5 h-5 rounded-full bg-[#1853FF] relative z-10 ring-2 ring-[#F4F6FB]" />
            <div className="w-5 h-5 rounded-full bg-[#00D084] ring-2 ring-[#F4F6FB]" />
          </div>
          <h1 className="text-[14px] font-black tracking-[0.2em] text-gray-800 uppercase mt-0.5 flex items-center">
            {onBack && <ChevronLeft className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0 text-[#1853FF]" strokeWidth={3} />}
            <span className="group-hover:text-[#1853FF] transition-colors">PHASE 01 / ONLINE SURVEY</span>
          </h1>
        </div>
        <div className="text-lg lg:text-xl font-bold text-gray-400 tracking-wider">
          06
        </div>
      </header>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-3.5 xl:gap-5 relative overflow-hidden">
        
        {/* Left Column (Main Process) */}
        <div className="flex-[1.35] xl:flex-[1.4] flex flex-col min-w-0 pr-0 lg:pr-3.5 xl:pr-5 border-r-0 lg:border-r border-slate-100 min-h-0 overflow-hidden">
          
          {/* Header */}
          <div className="mb-2 lg:mb-2.5 shrink-0">
            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-[24px] font-black text-slate-800 tracking-tight mb-1 leading-snug whitespace-normal lg:whitespace-nowrap">
              56道题完整统计，收敛出4个需要深入验证的方向
            </h2>
            <p className="text-slate-500 text-[11px] xl:text-xs font-medium leading-relaxed">
              主页面不罗列全部答案，而是依据统一规则，从 286 份有效问卷中筛出 8 个关键结果；每个结果都能回到题号、匿名答卷、人数和分母。
            </p>
          </div>

          {/* Condensed Funnel (The original 420->312->286) */}
          <div className="flex items-center justify-between bg-slate-50/70 p-2.5 lg:p-3 rounded-lg border border-slate-100 mb-2 lg:mb-2.5 shrink-0">
             <div className="flex flex-col">
               <span className="text-[9px] text-slate-400 font-bold mb-0.5">定向发放</span>
               <span className="text-lg font-black text-slate-400">420</span>
             </div>
             <div className="flex-1 px-3 flex flex-col items-center">
               <span className="text-[8.5px] font-bold text-slate-400 mb-0.5">回收 74.3%</span>
               <div className="w-full h-px bg-slate-200 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 border-t border-r border-slate-300 rotate-45" /></div>
             </div>
             <div className="flex flex-col">
               <span className="text-[9px] text-slate-500 font-bold mb-0.5">完成提交</span>
               <span className="text-xl font-black text-slate-700">312</span>
             </div>
             <div className="flex-1 px-3 flex flex-col items-center">
               <span className="text-[8.5px] font-bold text-[#1853FF] mb-0.5">有效 91.7%</span>
               <div className="w-full h-[2px] bg-[#1853FF]/20 relative"><div className="absolute left-0 top-0 h-full bg-[#1853FF] w-full" /><div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#1853FF] rotate-45" /></div>
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] text-[#1853FF] font-bold mb-0.5">有效样本</span>
               <span className="text-2xl font-black text-slate-900">286</span>
             </div>
          </div>

          {/* Merged Insights & Directions - 4 Columns */}
          <div className="flex flex-col flex-1 min-h-0 border border-slate-200 rounded-lg overflow-hidden shadow-xs bg-slate-50/50">
             {/* Header */}
             <div className="bg-[#111318] px-3 py-1.5 flex items-center justify-between border-b border-slate-800 shrink-0">
                <div className="text-[#FFD600] text-[10.5px] xl:text-[11.5px] font-bold tracking-wider">
                   8项关键结果不是根因，而是4个待验证方向
                </div>
                <div className="flex gap-3 text-[9px] text-white/60 font-medium">
                   <span>M: 管理者</span>
                   <span>O: 运营人员</span>
                   <span>R: 业代</span>
                </div>
             </div>
             
             {/* 4 Columns Grid */}
             <div className="grid grid-cols-4 divide-x divide-slate-200 flex-1 min-h-0">
                
                {/* Column 1 */}
                <div className="p-2 lg:p-2.5 flex flex-col justify-between h-full bg-white/60">
                   <div>
                      <div className="font-bold text-slate-800 text-[11px] lg:text-[12px] mb-0.5">结果解释</div>
                      <div className="text-[9px] text-slate-400 leading-tight">管理者异常下钻</div>
                   </div>
                   <div className="flex flex-col gap-1.5 mt-auto">
                      {/* M10 */}
                      <div className="bg-white border border-slate-200 p-1.5 rounded shadow-xs">
                         <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-sm lg:text-base font-black text-slate-800 leading-none">67%</span>
                            <span className="text-[8px] font-bold text-white bg-slate-800 px-1 py-0.5 rounded-xs leading-none">M10</span>
                         </div>
                         <div className="text-[8.5px] lg:text-[9.5px] font-bold text-slate-700 leading-tight">需要查看3个及以上位置</div>
                      </div>
                      {/* M16 */}
                      <div className="bg-white border border-slate-200 p-1.5 rounded shadow-xs">
                         <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-sm lg:text-base font-black text-slate-800 leading-none">64%</span>
                            <span className="text-[8px] font-bold text-white bg-slate-800 px-1 py-0.5 rounded-xs leading-none">M16</span>
                         </div>
                         <div className="text-[8.5px] lg:text-[9.5px] font-bold text-slate-700 leading-tight">难区分策略与执行问题</div>
                      </div>
                   </div>
                </div>

                {/* Column 2 */}
                <div className="p-2 lg:p-2.5 flex flex-col justify-between h-full bg-white/60">
                   <div>
                      <div className="font-bold text-slate-800 text-[11px] lg:text-[12px] mb-0.5">规则与传递</div>
                      <div className="text-[9px] text-slate-400 leading-tight">运营配置与协调</div>
                   </div>
                   <div className="flex flex-col gap-1.5 mt-auto">
                      {/* O12 */}
                      <div className="bg-white border border-slate-200 p-1.5 rounded shadow-xs">
                         <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-sm lg:text-base font-black text-slate-800 leading-none">73%</span>
                            <span className="text-[8px] font-bold text-white bg-slate-500 px-1 py-0.5 rounded-xs leading-none">O12</span>
                         </div>
                         <div className="text-[8.5px] lg:text-[9.5px] font-bold text-slate-700 leading-tight">使用企微或Excel补充状态</div>
                      </div>
                      {/* O14 */}
                      <div className="bg-white border border-slate-200 p-1.5 rounded shadow-xs">
                         <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-sm lg:text-base font-black text-slate-800 leading-none">64%</span>
                            <span className="text-[8px] font-bold text-white bg-slate-500 px-1 py-0.5 rounded-xs leading-none">O14</span>
                         </div>
                         <div className="text-[8.5px] lg:text-[9.5px] font-bold text-slate-700 leading-tight">难区分提交与检核通过</div>
                      </div>
                   </div>
                </div>

                {/* Column 3 */}
                <div className="p-2 lg:p-2.5 flex flex-col justify-between h-full bg-white/60">
                   <div>
                      <div className="font-bold text-slate-800 text-[11px] lg:text-[12px] mb-0.5">质量确认</div>
                      <div className="text-[9px] text-slate-400 leading-tight">现场作业与举证</div>
                   </div>
                   <div className="flex flex-col gap-1.5 mt-auto">
                      {/* O18 */}
                      <div className="bg-white border border-slate-200 p-1.5 rounded shadow-xs">
                         <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-sm lg:text-base font-black text-slate-800 leading-none">58%</span>
                            <span className="text-[8px] font-bold text-white bg-slate-500 px-1 py-0.5 rounded-xs leading-none">O18</span>
                         </div>
                         <div className="text-[8.5px] lg:text-[9.5px] font-bold text-slate-700 leading-tight">仍需人工解释举证标准</div>
                      </div>
                      {/* R13 */}
                      <div className="bg-white border border-slate-200 p-1.5 rounded shadow-xs">
                         <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-sm lg:text-base font-black text-slate-800 leading-none">42%</span>
                            <span className="text-[8px] font-bold text-slate-900 bg-[#FFD600] px-1 py-0.5 rounded-xs leading-none">R13</span>
                         </div>
                         <div className="text-[8.5px] lg:text-[9.5px] font-bold text-slate-700 leading-tight">现场遇到拍照不合格</div>
                      </div>
                   </div>
                </div>

                {/* Column 4 */}
                <div className="p-2 lg:p-2.5 flex flex-col justify-between h-full bg-white/60">
                   <div>
                      <div className="font-bold text-slate-800 text-[11px] lg:text-[12px] mb-0.5">反馈与激励</div>
                      <div className="text-[9px] text-slate-400 leading-tight">退回审核与奖励</div>
                   </div>
                   <div className="flex flex-col gap-1.5 mt-auto">
                      {/* R15 */}
                      <div className="bg-white border border-slate-200 p-1.5 rounded shadow-xs">
                         <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-sm lg:text-base font-black text-slate-800 leading-none">57%</span>
                            <span className="text-[8px] font-bold text-slate-900 bg-[#FFD600] px-1 py-0.5 rounded-xs leading-none">R15</span>
                         </div>
                         <div className="text-[8.5px] lg:text-[9.5px] font-bold text-slate-700 leading-tight">1天以上才知道结果</div>
                      </div>
                      {/* R17 */}
                      <div className="bg-white border border-slate-200 p-1.5 rounded shadow-xs">
                         <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-sm lg:text-base font-black text-slate-800 leading-none">49%</span>
                            <span className="text-[8px] font-bold text-slate-900 bg-[#FFD600] px-1 py-0.5 rounded-xs leading-none">R17</span>
                         </div>
                         <div className="text-[8.5px] lg:text-[9.5px] font-bold text-slate-700 leading-tight">看不清审核与奖励进度</div>
                      </div>
                   </div>
                </div>

             </div>
          </div>

        </div>
        {/* Right Column (Evidence Images) */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#F8F9FA] rounded-lg relative overflow-hidden border border-slate-200/80 shadow-xs min-h-0">
          <div className="p-3.5 lg:p-4 flex justify-between items-start relative z-20 shrink-0">
            <div className="w-full">
              <h3 className="text-[9.5px] lg:text-[10.5px] font-bold text-[#1853FF] tracking-[0.15em] uppercase mb-0.5">RESEARCH EVIDENCE</h3>
              <h4 className="text-sm lg:text-base font-black text-slate-800 mb-1">三类角色，覆盖23家企业、13个省份</h4>
              <p className="text-[11px] lg:text-xs text-slate-600 leading-relaxed max-w-[95%]">
                采用统一的有效性标准，检查作答完整度、完成时长、前后逻辑、重复作答、样本结构与开放建议质量。
              </p>
            </div>
          </div>

          {/* Stacked Images Container */}
          <div className="flex-1 relative overflow-hidden flex items-start justify-center min-h-0">
            {/* Back Image (Manager) */}
            <div className="absolute top-4 left-[10%] w-[75%] h-[240px] lg:h-[280px] shadow-[0_12px_24px_rgba(0,0,0,0.1)] border border-slate-200 bg-white rounded-md overflow-hidden rotate-[-4deg] origin-bottom hover:rotate-[-6deg] transition-all hover:z-30 cursor-pointer group">
              <img src="/images/survey/manager.png?v=1787836008681" alt="管理者问卷" className="w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-xs p-2.5 text-white">
                <div className="font-bold text-xs mb-0.5">管理者 · 18 题</div>
                <div className="text-[9px] text-white/70">经营判断 / 异常定位 / 系统支持</div>
              </div>
            </div>

            {/* Middle Image (Ops) */}
            <div className="absolute top-8 right-[12%] w-[75%] h-[240px] lg:h-[280px] shadow-[0_12px_24px_rgba(0,0,0,0.12)] border border-slate-200 bg-white rounded-md overflow-hidden rotate-[3deg] origin-bottom hover:rotate-[5deg] transition-all hover:z-30 cursor-pointer group z-10">
              <img src="/images/survey/ops.png" alt="运营问卷" className="w-full object-cover opacity-95 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-xs p-2.5 text-white">
                <div className="font-bold text-xs mb-0.5">运营人员 · 20 题</div>
                <div className="text-[9px] text-white/70">活动配置 / 过程跟踪 / 异常处理</div>
              </div>
            </div>

            {/* Front Image (Sales) */}
            <div className="absolute top-12 left-[16%] w-[75%] h-[240px] lg:h-[280px] shadow-[0_16px_32px_rgba(0,0,0,0.15)] border-2 border-white bg-white rounded-md overflow-hidden rotate-[-1deg] origin-bottom hover:rotate-[-2deg] transition-all hover:z-30 cursor-pointer group z-20">
              <img src="/images/survey/sales.png" alt="业代问卷" className="w-full object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-[#1A1F36]/90 backdrop-blur-xs p-2.5 text-white border-l-3 border-[#1853FF]">
                <div className="font-bold text-[13px] mb-0.5">业代 · 18 题</div>
                <div className="text-[10px] text-white/80">拜访规划 / 门店执行 / 激励反馈</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
