import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, BarChart3, LineChart, TrendingUp, Search, MessageSquare, Bot } from 'lucide-react';

export default function ChapterPage2() {
  return (
    <motion.div
      key="chapter2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col md:flex-row w-full h-full bg-[#05050A] overflow-hidden relative"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(123,97,255,0.08),transparent_50%),radial-gradient(circle_at_30%_80%,rgba(0,240,255,0.05),transparent_40%)] z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] z-0"></div>

      {/* Left Content (Text) */}
      <div className="w-full md:w-[48%] h-full flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 xl:pl-16 z-20 relative select-none">
         <div className="relative">
            {/* Giant Watermark 02 */}
            <div 
              className="absolute -top-12 -left-6 md:-left-8 text-white/[0.02] font-black text-[180px] md:text-[240px] lg:text-[280px] leading-none select-none z-0 pointer-events-none tracking-tighter"
            >
              02
            </div>

            <div className="relative z-10 pt-2">
              <div className="flex items-center gap-3 mb-5 lg:mb-6">
                <div className="w-8 lg:w-10 h-[2px] bg-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.6)]"></div>
                <div className="text-[#00F0FF] font-bold tracking-[0.25em] text-[11px] md:text-xs uppercase drop-shadow-xs">
                  CASE 02 / LIVEBOARD & REPORT
                </div>
              </div>
              
              <h1 className="text-white text-3xl md:text-4xl lg:text-[46px] font-bold leading-[1.25] tracking-tight mb-3 lg:mb-4">
                对话式交互，<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#7B61FF]">
                  让数据从静态展示<br />走向动态洞察
                </span>
              </h1>
              
              <p className="text-slate-400 text-xs md:text-sm lg:text-base leading-relaxed max-w-md font-normal mb-6">
                传统的 BI 看板往往是固化的，用户只能在既定框架内筛选。我们通过 AI Agent 引入对话式分析，结合大语言模型，允许用户用自然语言自由探索数据，动态生成报表与归因分析。
              </p>

              <div className="flex gap-3">
                 <div className="flex items-center gap-2 text-[11px] lg:text-xs font-bold text-slate-400 tracking-wider uppercase border border-white/10 px-3 py-1.5 rounded-full bg-white/5">
                    <Sparkles className="w-3 h-3 text-[#7B61FF]" />
                    <span>Agent 驱动</span>
                 </div>
                 <div className="flex items-center gap-2 text-[11px] lg:text-xs font-bold text-slate-400 tracking-wider uppercase border border-white/10 px-3 py-1.5 rounded-full bg-white/5">
                    <BarChart3 className="w-3 h-3 text-[#00F0FF]" />
                    <span>动态可视化</span>
                 </div>
              </div>
            </div>
         </div>
      </div>

      {/* Right Content (Visual Composite) */}
      <div className="w-full md:w-[55%] h-full relative z-10 flex items-center justify-center p-8 lg:p-12 hidden md:flex">
         <div className="relative w-full h-[80%] max-w-[700px]">
            
            {/* Center Main Dashboard */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[360px] bg-[var(--slide-dark)]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
            >
               {/* Dashboard Header */}
               <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B61FF] to-[#00F0FF] flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                     </div>
                     <span className="text-white font-bold text-sm tracking-wide">Data Agent</span>
                  </div>
                  <div className="flex gap-2">
                     <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                     <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                     <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  </div>
               </div>

               {/* Dashboard Content */}
               <div className="flex-1 p-6 relative">
                  {/* Fake User Query */}
                  <div className="flex justify-end mb-6">
                     <div className="bg-[#27272A] text-slate-200 text-xs px-4 py-2.5 rounded-t-xl rounded-bl-xl max-w-[80%] shadow-md border border-white/5">
                        帮我分析一下 Q3 华东大区各省份的销售额，并标出异常点
                     </div>
                  </div>

                  {/* AI Response Block */}
                  <div className="flex gap-3">
                     <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7B61FF] to-[#00F0FF] flex items-center justify-center shrink-0 mt-1">
                        <Sparkles className="w-3 h-3 text-white" />
                     </div>
                     <div className="flex-1">
                        <div className="text-slate-300 text-xs leading-relaxed mb-4">
                           已为您生成 Q3 华东大区销售分析。浙江省在 8 月份出现明显下滑，低于目标 15%，主要受竞品促销活动影响。
                        </div>
                        {/* Dynamic Chart Area */}
                        <div className="h-40 w-full border border-white/10 rounded-xl bg-black/20 p-4 flex items-end gap-3 justify-between relative overflow-hidden">
                           <div className="absolute top-3 left-4 text-[11px] text-slate-500 font-bold uppercase tracking-wider">Revenue by Province</div>
                           {/* Chart Bars */}
                           {[60, 45, 90, 75, 50, 85].map((val, i) => (
                              <div key={i} className="w-full flex justify-center group relative h-full">
                                 <div className="absolute -top-5 text-[11px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">{val}k</div>
                                 <div 
                                    className={`w-full rounded-t-sm h-[${val}%] mt-auto transition-all duration-300 ${
                                      i === 1 ? 'bg-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.4)] border-t border-rose-400' : 'bg-[#00F0FF]/60 hover:bg-[#00F0FF]/80 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                                    }`}
                                    style={{ height: `${val}%` }}
                                 ></div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Floating Insight Card 1 */}
            <motion.div 
              initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}
              className="absolute top-[10%] -left-[10%] bg-slate-900/80 backdrop-blur-md p-4 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-[#7B61FF]/40 w-48 z-20"
            >
               <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded bg-[#7B61FF]/20 flex items-center justify-center">
                     <TrendingUp className="w-3 h-3 text-[#7B61FF]" />
                  </div>
                  <span className="text-white text-[11px] font-bold">智能归因</span>
               </div>
               <div className="text-[11px] text-slate-400 leading-snug">
                  发现 <span className="text-rose-400 font-bold">3 个</span> 异动因子，影响销售额约 12.5%。已生成根因树。
               </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div 
              initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}
              className="absolute bottom-[5%] -right-[5%] bg-slate-900/80 backdrop-blur-md p-4 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-[#00F0FF]/30 w-52 z-30"
            >
               <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                  <span className="text-[#00F0FF] text-[11px] font-bold tracking-widest uppercase">KPI Forecast</span>
                  <LineChart className="w-3.5 h-3.5 text-[#00F0FF]" />
               </div>
               <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-black text-white leading-none">94.2</span>
                  <span className="text-[11px] text-[#00F0FF] font-bold">+2.4%</span>
               </div>
               <div className="text-[11px] text-slate-500">基于历史数据的下月预测</div>
               
               {/* Sparkline fake */}
               <div className="mt-3 flex items-end gap-1 h-6">
                  {[2, 4, 3, 6, 5, 8, 7, 10].map((v, i) => (
                     <div key={i} className="flex-1 bg-[#00F0FF]/30 rounded-t-[1px]" style={{ height: `${v * 10}%` }}></div>
                  ))}
               </div>
            </motion.div>
         </div>
      </div>
    </motion.div>
  );
}
