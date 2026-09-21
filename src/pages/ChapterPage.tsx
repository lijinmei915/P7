import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, Gauge, LayoutDashboard, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Boxes, Workflow, Layers, Network, Settings2, Briefcase, Users, MonitorSmartphone, Target, LineChart, MessageSquare, Lightbulb, User, CheckCircle, Clock, MapPin, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';


export default function ChapterPage() {
  return (
    <motion.div
      key="chapter"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col md:flex-row w-full h-full bg-[#0B0F19] overflow-hidden relative"
    >
      {/* Subtle tech grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] z-0"></div>

      {/* Global Top Right Header - Removed */}

      {/* Left Content (Text) */}
      <div className="w-full md:w-[48%] h-full flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 xl:pl-16 z-20 relative select-none">
         <div className="relative">
            {/* Giant Watermark 01 */}
            <div 
              className="absolute -top-12 -left-6 md:-left-8 text-slate-800/50 font-black text-[180px] md:text-[240px] lg:text-[280px] leading-none select-none z-0 pointer-events-none tracking-tighter"
            >
              01
            </div>

            <div className="relative z-10 pt-2">
              <div className="flex items-center gap-3 mb-6 lg:mb-8">
                <div className="w-8 lg:w-10 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                <div className="text-blue-400 font-bold tracking-[0.2em] text-[11px] md:text-xs uppercase drop-shadow-xs">
                  CASE 01 / CONSUMER GOODS OPERATIONS
                </div>
              </div>
              
              <h1 className="text-white text-3xl md:text-4xl lg:text-[46px] font-bold leading-[1.25] tracking-tight mb-3 lg:mb-4 drop-shadow-md">
                一场活动，如何从<br />
                “执行完成”走向<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 drop-shadow-xs">“经营有效”</span>
              </h1>
              
              <p className="text-gray-400 text-xs md:text-sm lg:text-base leading-relaxed max-w-md mb-6 lg:mb-8">
                从活动执行、费用核销到门店结果的经营机制设计。
              </p>

              {/* Bottom tags */}
              <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                {['活动经营', '跨角色协作', '业财营销一体化'].map((tag, idx) => (
                  <div key={idx} className="border border-white/20 bg-white/5 px-3.5 py-1.5 lg:px-4 lg:py-2 text-white/80 text-[11px] lg:text-xs font-medium tracking-wide rounded-full backdrop-blur-xs">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
         </div>
      </div>
      
      {/* Right Content - Abstract Tech Viz with Business Copy */}
      <div className="w-full md:w-[55%] h-full relative z-10 hidden md:flex items-center justify-center">
         {/* Glow effects & Edge Light Leak */}
         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
         <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
         
         {/* Right Edge Ambient Light (透光效果) */}
         <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-blue-400/10 to-transparent pointer-events-none z-0 mix-blend-screen"></div>
         <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-80 h-[80%] bg-[var(--color-primary)]/15 rounded-full blur-[120px] pointer-events-none z-0"></div>

         {/* Business Copy Title Floating Above - Removed */}

         <div className="relative w-full max-w-lg aspect-square flex items-center justify-center mt-12">
            {/* Abstract Tech Geometric Background */}
            <div className="absolute inset-[-50%] pointer-events-none flex items-center justify-center overflow-visible z-0">
                {/* Glowing Orbs */}
                <div className="absolute top-[30%] right-[20%] w-[28rem] h-[28rem] bg-[var(--color-primary)]/20 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-[20%] left-[20%] w-[36rem] h-[36rem] bg-cyan-400/15 rounded-full blur-[140px] mix-blend-screen"></div>
                
                {/* Abstract Concentric Circles & Lines */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[700px] max-h-[700px] flex items-center justify-center opacity-60">
                   {/* Grid Pattern */}
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
                   
                   {/* Circle 1 - Outer Dashed */}
                   <motion.div 
                     animate={{ rotate: 360 }} 
                     transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
                     className="absolute w-[90%] h-[90%] rounded-full border-[1px] border-dashed border-[var(--color-primary)]/20"
                   ></motion.div>
                   
                   {/* Circle 2 - Inner Solid with glowing shadow */}
                   <motion.div 
                     animate={{ rotate: -360 }} 
                     transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
                     className="absolute w-[65%] h-[65%] rounded-full border-[1px] border-[var(--color-primary)]/30 shadow-[inset_0_0_40px_rgba(24,83,255,0.1)]"
                   >
                     {/* Orbiting Dots */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_rgba(24,83,255,0.8)]"></div>
                   </motion.div>
                   
                   {/* Circle 3 - Innermost Dotted */}
                   <div className="absolute w-[40%] h-[40%] rounded-full border-[2px] border-dotted border-cyan-400/20"></div>

                   {/* Radial / Diagonal technical lines */}
                   <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent rotate-45"></div>
                   <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -rotate-45"></div>
                   <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)]/10 to-transparent"></div>
                   <div className="absolute h-[120%] w-[1px] bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"></div>
                   
                   {/* Tech Crosshairs */}
                   <div className="absolute w-6 h-6 border-t border-l border-[var(--color-primary)]/40 top-[15%] left-[15%]"></div>
                   <div className="absolute w-6 h-6 border-t border-r border-[var(--color-primary)]/40 top-[15%] right-[15%]"></div>
                   <div className="absolute w-6 h-6 border-b border-l border-[var(--color-primary)]/40 bottom-[15%] left-[15%]"></div>
                   <div className="absolute w-6 h-6 border-b border-r border-[var(--color-primary)]/40 bottom-[15%] right-[15%]"></div>
                   
                   {/* Small decorative data points */}
                   <div className="absolute top-[30%] right-[30%] flex items-center gap-1">
                       <div className="w-1 h-1 bg-cyan-400/50 rounded-full"></div>
                       <div className="text-[11px] font-mono text-cyan-400/40 tracking-widest">LAT.84</div>
                   </div>
                   <div className="absolute bottom-[35%] left-[25%] flex items-center gap-1">
                       <div className="w-1 h-1 bg-[var(--color-primary)]/50 rounded-full"></div>
                       <div className="text-[11px] font-mono text-[var(--color-primary)]/40 tracking-widest">SYS.ON</div>
                   </div>
                </div>

                {/* Ethereal depth masks to blend it into the dark background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/10 via-transparent to-[#0B0F19]/90 z-0"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0B0F19_70%)] z-0"></div>
            </div>

            {/* Floating Glass Panels */}
            
            {/* Top Right Panel: ROI */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="absolute top-[0%] right-[0%] bg-slate-800/95 backdrop-blur-2xl p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.7)] border border-slate-600/50 w-64 z-20 group overflow-hidden"
            >
               {/* Glass highlight */}
               <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
               
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/40 flex items-center justify-center">
                     <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]"></div>
                  </div>
                  <span className="text-slate-300 text-xs font-semibold tracking-wider">活动综合 ROI</span>
               </div>
               <div className="flex items-baseline gap-3 mb-2">
                 <div className="text-4xl font-black text-white tracking-tighter tabular-nums drop-shadow-md leading-none">0.78</div>
                 <div className="text-rose-400 text-[11px] font-medium bg-rose-400/10 px-2 py-0.5 rounded border border-rose-400/20">低于目标 0.95</div>
               </div>
               <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mb-4 shadow-inner">
                 <div className="h-full w-[78%] bg-gradient-to-r from-blue-500 to-[var(--color-primary)] relative">
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
                 </div>
               </div>
               <div className="flex justify-between items-center text-[11px] text-slate-400 border-t border-white/5 pt-3">
                 <span>计算公式</span>
                 <span className="font-mono text-slate-300">增量毛利 ÷ 活动总投入</span>
               </div>
            </motion.div>

            {/* Center Left Panel: 执行 x 动销 */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              className="absolute top-[32%] -left-[22%] bg-slate-800/95 backdrop-blur-2xl p-6 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-[var(--color-primary)]/40 w-[320px] z-30 overflow-hidden"
            >
               {/* Suble glow behind chart */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--color-primary)]/30 blur-[50px] pointer-events-none"></div>
               <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/50 to-transparent"></div>
               
               <div className="relative z-10">
                   <h3 className="text-white text-sm font-bold tracking-wide mb-3">活动流程协作</h3>
                   <div className="flex items-center justify-between gap-1 mb-4" aria-label="管理者设定目标，运营编排任务，业代执行反馈">
                     {[
                       ['管理者', '设定目标'],
                       ['运营', '编排任务'],
                       ['业代', '执行反馈'],
                     ].map(([role, action], index) => (
                       <React.Fragment key={role}>
                         {index > 0 && <span aria-hidden="true" className="text-blue-400/70 text-xs">→</span>}
                         <div className="text-center">
                           <div className="text-[11px] text-blue-300 mb-1">{role}</div>
                           <div className="text-[11px] text-slate-100 font-medium">{action}</div>
                         </div>
                       </React.Fragment>
                     ))}
                   </div>
                   <div className="border-t border-white/10 pt-3">
                     <div className="flex justify-between items-center mb-1">
                       <h4 className="text-[11px] font-semibold text-slate-200">区域有效执行率</h4>
                       <span className="text-[11px] text-slate-400">0–100%</span>
                     </div>
                     <p className="text-[11px] text-slate-400 mb-3">有效执行门店数 / 参与执行门店数</p>
                     <div className="flex items-end gap-3 h-20 border-b border-white/10">
                       {[
                         { region: '安徽', rate: 32 },
                         { region: '浙江', rate: 45 },
                         { region: '上海', rate: 92 },
                         { region: '江苏', rate: 85 },
                       ].map(({ region, rate }) => (
                         <div key={region} className="flex-1 h-full flex items-end" aria-label={`${region}有效执行率 ${rate}%`}>
                           <div className="relative w-full rounded-t bg-gradient-to-t from-[var(--color-primary)]/80 to-[#4B7BFF]" style={{ height: `${rate}%` }}>
                             <span className="absolute -top-4 inset-x-0 text-center text-[11px] font-semibold text-blue-200">{rate}%</span>
                           </div>
                         </div>
                       ))}
                     </div>
                     <div className="flex gap-3 pt-2 text-[11px] text-slate-300">
                       {['安徽', '浙江', '上海', '江苏'].map(region => <span key={region} className="flex-1 text-center">{region}</span>)}
                     </div>
                   </div>
               </div>
            </motion.div>

            {/* Bottom Right Panel: Risk / Warning */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
              className="absolute bottom-[-5%] right-[5%] bg-slate-800/95 backdrop-blur-2xl p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.7)] border border-slate-600/50 w-64 z-20 overflow-hidden"
            >
               <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>

               <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/30">
                     <div className="w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
                  </div>
                  <span className="text-amber-400 text-xs font-bold tracking-wide">执行进度异常预警</span>
               </div>
               
               <div className="bg-slate-900/50 rounded-lg p-3 mb-3 border border-white/5">
                  <div className="text-slate-400 text-[11px] mb-1">连续 14 天未落地预算</div>
                  <div className="text-white text-lg font-bold tabular-nums">¥ 185,000</div>
                  <div className="text-rose-400 text-[11px] mt-1 flex items-center gap-1 font-medium">
                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                     预计折损销售目标 ¥ 186万
                  </div>
               </div>
               
               <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2.5 flex items-start gap-2">
                  <div className="text-blue-400 mt-0.5">
                     <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                     <div className="text-blue-300 text-[11px] font-bold mb-0.5">智能干预建议</div>
                     <div className="text-slate-300 text-[11px] leading-relaxed">系统已自动触发工单，追加督导下店与核心网点陈列资源。</div>
                  </div>
               </div>
            </motion.div>
            
            {/* Bottom Right Tag - Removed */}
         </div>
      </div>
    </motion.div>
  );
}






