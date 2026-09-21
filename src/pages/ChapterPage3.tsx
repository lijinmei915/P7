import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Sparkles, Code2, Layers, Cpu, CheckCircle2, ChevronRight, MessageSquareCode } from 'lucide-react';

export default function ChapterPage3() {
  return (
    <motion.div
      key="chapter3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col md:flex-row w-full h-full bg-[#FAFAFA] overflow-hidden relative"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.06),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.05),transparent_40%)] z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:3rem_3rem] z-0"></div>

      {/* Left Content (Text) */}
      <div className="w-full md:w-[48%] h-full flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 xl:pl-16 z-20 relative select-none">
         <div className="relative">
            {/* Giant Watermark 03 */}
            <div 
              className="absolute -top-12 -left-6 md:-left-8 text-slate-900/[0.03] font-black text-[180px] md:text-[240px] lg:text-[280px] leading-none select-none z-0 pointer-events-none tracking-tighter"
            >
              03
            </div>

            <div className="relative z-10 pt-2">
              <div className="flex items-center gap-3 mb-5 lg:mb-6">
                <div className="w-8 lg:w-10 h-[2px] bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.4)]"></div>
                <div className="text-violet-600 font-bold tracking-[0.25em] text-[11px] md:text-xs uppercase drop-shadow-xs">
                  CASE 03 / GENERATIVE UI & COMPONENTS
                </div>
              </div>
              
              <h1 className="text-slate-900 text-3xl md:text-4xl lg:text-[46px] font-bold leading-[1.25] tracking-tight mb-3 lg:mb-4">
                语义化组件，<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                  重塑 B 端交互范式
                </span>
              </h1>
              
              <p className="text-slate-500 text-xs md:text-sm lg:text-base leading-relaxed max-w-md font-normal mb-6">
                打破传统固化的表单与弹窗。通过搭建高度原子化的语义组件库，结合大模型能力，系统可以根据用户的自然语言意图，在前端实时“拼装”并渲染出最适合当前任务的界面形态。
              </p>

              <div className="flex gap-3">
                 <div className="flex items-center gap-2 text-[11px] lg:text-xs font-bold text-violet-700 tracking-wider uppercase border border-violet-200 px-3 py-1.5 rounded-full bg-violet-50 shadow-xs">
                    <Layers className="w-3 h-3" />
                    <span>原子化设计</span>
                 </div>
                 <div className="flex items-center gap-2 text-[11px] lg:text-xs font-bold text-blue-700 tracking-wider uppercase border border-blue-200 px-3 py-1.5 rounded-full bg-blue-50 shadow-xs">
                    <Cpu className="w-3 h-3" />
                    <span>动态渲染</span>
                 </div>
              </div>
            </div>
         </div>
      </div>

      {/* Right Content (Visual Composite) */}
      <div className="w-full md:w-[55%] h-full relative z-10 flex items-center justify-center p-8 lg:p-12 hidden md:flex">
         <div className="relative w-full h-[80%] max-w-[700px] flex items-center justify-center">
            
            {/* Background elements to represent "code" or "components" */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
               className="absolute right-0 top-[10%] w-64 h-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 rotate-6 opacity-60 pointer-events-none"
            >
               <div className="w-1/2 h-2 bg-slate-200 rounded-full mb-4"></div>
               <div className="w-full h-10 bg-slate-100 rounded-lg mb-2"></div>
               <div className="w-full h-10 bg-slate-100 rounded-lg mb-2"></div>
            </motion.div>
            
            {/* Center Generative Demo */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              className="relative w-full max-w-[500px] z-20 flex flex-col items-center"
            >
               {/* Prompt Input */}
               <div className="w-full bg-white rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center gap-4 mb-6 z-30 relative">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                     <Sparkles className="w-4 h-4 text-violet-600" />
                  </div>
                  <div className="text-sm font-medium text-slate-700 flex-1">
                     帮我配置一个针对华南区新员工的<span className="text-violet-600 font-bold bg-violet-50 px-1 rounded mx-0.5">门店走访计划</span>
                  </div>
                  <div className="bg-slate-900 text-white p-2 rounded-xl shadow-md">
                     <ChevronRight className="w-4 h-4" />
                  </div>
                  
                  {/* Connective Line */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 h-8 w-px bg-gradient-to-b from-violet-300 to-transparent"></div>
               </div>

               {/* Generated Component Card */}
               <div className="w-[110%] bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 z-0"></div>
                  
                  {/* Code Tags Overlay (Abstract Concept) */}
                  <div className="absolute top-4 right-4 bg-blue-50 text-blue-600 text-[11px] font-mono font-bold px-2 py-1 rounded border border-blue-100 shadow-sm z-20 flex items-center gap-1">
                     <Code2 className="w-3 h-3" />
                     <span>{'<TaskFlow />'}</span>
                  </div>

                  <div className="relative z-10">
                     <div className="flex justify-between items-end mb-6">
                        <div>
                           <h3 className="text-lg font-black text-slate-800 tracking-tight">门店走访与检核任务</h3>
                           <p className="text-xs text-slate-500 mt-1">适用对象：华南大区 - 新入职业代</p>
                        </div>
                        <div className="text-xs font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-md">
                           Auto-generated
                        </div>
                     </div>

                     {/* Generated Form/Timeline UI */}
                     <div className="flex flex-col gap-4">
                        {/* Step 1 */}
                        <div className="flex items-start gap-3">
                           <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[11px] font-black">1</span>
                           </div>
                           <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-3">
                              <div className="text-xs font-bold text-slate-700 mb-2">陈列标准确认</div>
                              <div className="flex gap-2">
                                 <div className="flex-1 h-8 bg-white border border-slate-200 rounded-lg flex items-center px-3 text-[11px] text-slate-400">拍照上传主货架</div>
                                 <div className="flex-1 h-8 bg-white border border-slate-200 rounded-lg flex items-center px-3 text-[11px] text-slate-400">系统自动核验</div>
                              </div>
                           </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start gap-3">
                           <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[11px] font-black">2</span>
                           </div>
                           <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-3 opacity-70">
                              <div className="text-xs font-bold text-slate-700 mb-2">竞品数据采集</div>
                              <div className="w-full h-8 bg-white border border-slate-200 rounded-lg flex items-center px-3 text-[11px] text-slate-400">录入核心竞品价格与陈列面</div>
                           </div>
                        </div>
                     </div>
                     
                     <div className="mt-6 flex justify-end">
                        <button className="bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                           一键下发任务
                        </button>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Floating Tag Bottom Left */}
            <motion.div 
               initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}
               className="absolute bottom-[5%] left-[5%] bg-white p-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-100 z-30 flex items-center gap-3"
            >
               <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
               </div>
               <div>
                  <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Efficiency</div>
                  <div className="text-sm font-black text-slate-800">配置时间 -85%</div>
               </div>
            </motion.div>
         </div>
      </div>
    </motion.div>
  );
}
