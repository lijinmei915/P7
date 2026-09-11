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
                <div className="text-blue-400 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-xs">
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
         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#1853FF]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
         <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
         
         {/* Right Edge Ambient Light (透光效果) */}
         <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-blue-400/10 to-transparent pointer-events-none z-0 mix-blend-screen"></div>
         <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-80 h-[80%] bg-[#1853FF]/15 rounded-full blur-[120px] pointer-events-none z-0"></div>

         {/* Business Copy Title Floating Above - Removed */}

         <div className="relative w-full max-w-lg aspect-square flex items-center justify-center mt-12">
            {/* Abstract Tech Geometric Background */}
            <div className="absolute inset-[-50%] pointer-events-none flex items-center justify-center overflow-visible z-0">
                {/* Glowing Orbs */}
                <div className="absolute top-[30%] right-[20%] w-[28rem] h-[28rem] bg-[#1853FF]/20 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-[20%] left-[20%] w-[36rem] h-[36rem] bg-cyan-400/15 rounded-full blur-[140px] mix-blend-screen"></div>
                
                {/* Abstract Concentric Circles & Lines */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[700px] max-h-[700px] flex items-center justify-center opacity-60">
                   {/* Grid Pattern */}
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
                   
                   {/* Circle 1 - Outer Dashed */}
                   <motion.div 
                     animate={{ rotate: 360 }} 
                     transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
                     className="absolute w-[90%] h-[90%] rounded-full border-[1px] border-dashed border-[#1853FF]/20"
                   ></motion.div>
                   
                   {/* Circle 2 - Inner Solid with glowing shadow */}
                   <motion.div 
                     animate={{ rotate: -360 }} 
                     transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
                     className="absolute w-[65%] h-[65%] rounded-full border-[1px] border-[#1853FF]/30 shadow-[inset_0_0_40px_rgba(24,83,255,0.1)]"
                   >
                     {/* Orbiting Dots */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#1853FF] shadow-[0_0_10px_rgba(24,83,255,0.8)]"></div>
                   </motion.div>
                   
                   {/* Circle 3 - Innermost Dotted */}
                   <div className="absolute w-[40%] h-[40%] rounded-full border-[2px] border-dotted border-cyan-400/20"></div>

                   {/* Radial / Diagonal technical lines */}
                   <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[#1853FF]/30 to-transparent rotate-45"></div>
                   <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -rotate-45"></div>
                   <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[#1853FF]/10 to-transparent"></div>
                   <div className="absolute h-[120%] w-[1px] bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"></div>
                   
                   {/* Tech Crosshairs */}
                   <div className="absolute w-6 h-6 border-t border-l border-[#1853FF]/40 top-[15%] left-[15%]"></div>
                   <div className="absolute w-6 h-6 border-t border-r border-[#1853FF]/40 top-[15%] right-[15%]"></div>
                   <div className="absolute w-6 h-6 border-b border-l border-[#1853FF]/40 bottom-[15%] left-[15%]"></div>
                   <div className="absolute w-6 h-6 border-b border-r border-[#1853FF]/40 bottom-[15%] right-[15%]"></div>
                   
                   {/* Small decorative data points */}
                   <div className="absolute top-[30%] right-[30%] flex items-center gap-1">
                       <div className="w-1 h-1 bg-cyan-400/50 rounded-full"></div>
                       <div className="text-[8px] font-mono text-cyan-400/40 tracking-widest">LAT.84</div>
                   </div>
                   <div className="absolute bottom-[35%] left-[25%] flex items-center gap-1">
                       <div className="w-1 h-1 bg-[#1853FF]/50 rounded-full"></div>
                       <div className="text-[8px] font-mono text-[#1853FF]/40 tracking-widest">SYS.ON</div>
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
                  <div className="w-6 h-6 rounded bg-[#1853FF]/20 border border-[#1853FF]/40 flex items-center justify-center">
                     <div className="w-2 h-2 rounded-full bg-[#1853FF] shadow-[0_0_8px_#1853FF]"></div>
                  </div>
                  <span className="text-slate-300 text-xs font-semibold tracking-wider">活动综合 ROI</span>
               </div>
               <div className="flex items-baseline gap-3 mb-2">
                 <div className="text-4xl font-black text-white tracking-tighter tabular-nums drop-shadow-md leading-none">0.78</div>
                 <div className="text-rose-400 text-[10px] font-medium bg-rose-400/10 px-2 py-0.5 rounded border border-rose-400/20">低于目标 0.95</div>
               </div>
               <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mb-4 shadow-inner">
                 <div className="h-full w-[78%] bg-gradient-to-r from-blue-500 to-[#1853FF] relative">
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
                 </div>
               </div>
               <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-white/5 pt-3">
                 <span>计算公式</span>
                 <span className="font-mono text-slate-300">增量毛利 ÷ 活动总投入</span>
               </div>
            </motion.div>

            {/* Center Left Panel: 执行 x 动销 */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              className="absolute top-[32%] -left-[22%] bg-slate-800/95 backdrop-blur-2xl p-6 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-[#1853FF]/40 w-[320px] z-30 overflow-hidden"
            >
               {/* Suble glow behind chart */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#1853FF]/30 blur-[50px] pointer-events-none"></div>
               <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1853FF]/50 to-transparent"></div>
               
               <div className="relative z-10">
                   <div className="mb-4">
                       <h3 className="text-white text-sm font-bold tracking-wide mb-1">区域执行有效性评估</h3>
                       <p className="text-slate-400 text-[10px]">门店执行质量与实际 Sell-out 转化对比</p>
                   </div>
                   
                   {/* Legend */}
                   <div className="flex gap-4 mb-4 text-[10px] font-medium">
                       <div className="flex items-center gap-1.5">
                           <div className="w-2 h-2 rounded-sm bg-slate-600"></div>
                           <span className="text-slate-400">无效执行 (仅核销)</span>
                       </div>
                       <div className="flex items-center gap-1.5">
                           <div className="w-2 h-2 rounded-sm bg-blue-500"></div>
                           <span className="text-slate-200">有效执行 (带动销)</span>
                       </div>
                   </div>

                   <div className="flex flex-col gap-2">
                      <div className="flex items-end justify-between gap-3 h-24 border-b border-white/10 pb-2 pt-4">
                          <div className="w-full flex justify-center group relative h-full">
                             <div className="absolute -top-5 text-[10px] font-bold text-slate-500">32%</div>
                             <div className="w-full bg-slate-600/80 rounded-t h-[32%] mt-auto transition-all duration-300 group-hover:bg-slate-500"></div>
                          </div>
                          <div className="w-full flex justify-center group relative h-full">
                             <div className="absolute -top-5 text-[10px] font-bold text-slate-500">45%</div>
                             <div className="w-full bg-slate-600/80 rounded-t h-[45%] mt-auto transition-all duration-300 group-hover:bg-slate-500"></div>
                          </div>
                          <div className="w-full flex justify-center group relative h-full">
                             <div className="absolute -top-5 text-[10px] font-bold text-blue-300">92%</div>
                             <div className="w-full bg-gradient-to-t from-[#1853FF]/80 to-[#4B7BFF] rounded-t h-[92%] mt-auto shadow-[0_0_15px_rgba(24,83,255,0.6)] border-t border-blue-300"></div>
                          </div>
                          <div className="w-full flex justify-center group relative h-full">
                             <div className="absolute -top-5 text-[10px] font-bold text-blue-300">85%</div>
                             <div className="w-full bg-gradient-to-t from-[#1853FF]/80 to-[#4B7BFF] rounded-t h-[85%] mt-auto shadow-[0_0_15px_rgba(24,83,255,0.6)] border-t border-blue-300"></div>
                          </div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-medium pt-1">
                          <div className="w-full text-center text-slate-400">安徽</div>
                          <div className="w-full text-center text-slate-400">浙江</div>
                          <div className="w-full text-center text-blue-300 font-bold drop-shadow-sm">上海</div>
                          <div className="w-full text-center text-blue-300 font-bold drop-shadow-sm">江苏</div>
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
                  <div className="text-slate-400 text-[10px] mb-1">连续 14 天未落地预算</div>
                  <div className="text-white text-lg font-bold tabular-nums">¥ 185,000</div>
                  <div className="text-rose-400 text-[10px] mt-1 flex items-center gap-1 font-medium">
                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                     预计折损销售目标 ¥ 186万
                  </div>
               </div>
               
               <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2.5 flex items-start gap-2">
                  <div className="text-blue-400 mt-0.5">
                     <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                     <div className="text-blue-300 text-[10px] font-bold mb-0.5">智能干预建议</div>
                     <div className="text-slate-300 text-[9px] leading-relaxed">系统已自动触发工单，追加督导下店与核心网点陈列资源。</div>
                  </div>
               </div>
            </motion.div>
            
            {/* Bottom Right Tag - Removed */}
         </div>
      </div>
    </motion.div>
  );
}






