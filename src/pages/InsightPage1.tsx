import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, Gauge, LayoutDashboard, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Boxes, Workflow, Layers, Network, Settings2, Briefcase, Users, MonitorSmartphone, Target, LineChart, MessageSquare, Lightbulb, User, CheckCircle, Clock, MapPin, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';


export default function InsightPage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      key="insight"
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
            <span className="group-hover:text-[#1853FF] transition-colors">CASE 01 / INDUSTRY INSIGHT</span>
          </h1>
        </div>
        <div className="text-lg lg:text-xl font-bold text-gray-400 tracking-wider">
          01
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-h-0">
        <h2 className="text-lg md:text-xl lg:text-2xl xl:text-[24px] font-black text-slate-800 tracking-tight mb-2.5 lg:mb-3.5 shrink-0 whitespace-normal lg:whitespace-nowrap">
          从渠道扩张转向终端精耕，系统必须走向经营赋能
        </h2>

        <div className="flex flex-col md:flex-row gap-4 xl:gap-5 items-stretch my-auto w-full min-h-[350px] md:min-h-[380px] lg:min-h-[410px] xl:min-h-[435px] max-h-[465px]">
          
          {/* PAST Box */}
          <div className="flex-[1.1] xl:flex-[1] border-[1.5px] border-dashed border-gray-300 rounded-xl lg:rounded-2xl p-5 xl:p-6 bg-white/75 backdrop-blur-xs flex flex-col hover:shadow-lg hover:bg-white transition-all duration-300 min-h-0 justify-between">
            <div>
              <div className="text-[10px] lg:text-[11px] text-gray-400 mb-2 xl:mb-2.5 tracking-[0.15em] uppercase font-bold">PAST / 规模扩张</div>
              <h3 className="text-base lg:text-lg font-bold mb-2 text-[#1A1F36] tracking-tight">增长来自“铺得更广”</h3>
              <p className="text-gray-500 text-xs lg:text-[13px] leading-relaxed mb-3">增长主要来自于不断地进入新市场、开拓新渠道。只要渠道足够多，销量自然就上去了。</p>
            </div>

            <div className="flex flex-col gap-1.5 mt-auto pt-2">
              {[
                "标准化大单品 · 规模化走量",
                "开拓网点 · 比拼覆盖数量",
                "大面积投放 · 考核进货量"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 py-2 xl:py-2.5 px-3 rounded-lg bg-gray-50/70 border border-gray-100 group/item hover:bg-gray-100/80 transition-colors">
                  <span className="text-gray-400 font-bold text-xs font-mono tracking-wider group-hover/item:text-gray-500 transition-colors">0{i+1}</span>
                  <span className="text-gray-700 text-xs lg:text-[13px] font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BUSINESS SHIFT Box */}
          <div className="w-full md:w-[135px] lg:w-[150px] xl:w-[165px] flex-shrink-0 border-[1.5px] border-[#5568FE]/40 rounded-xl lg:rounded-2xl p-4 lg:p-5 bg-gradient-to-b from-[#F2F5FF] via-[#FAFBFD] to-[#EDF1FF] flex flex-col items-center justify-between text-center relative overflow-hidden shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(85,104,254,0.25)] hover:border-[#5568FE]/60 transition-all duration-300 min-h-0">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/70 rounded-full blur-xl -mr-10 -mt-10 pointer-events-none" />
            
            <div className="text-[9.5px] lg:text-[10px] font-bold text-[#5568FE] tracking-widest uppercase relative z-10 pt-1">BUSINESS SHIFT</div>
            
            <div className="my-auto py-2 flex flex-col items-center relative z-10">
              <div className="text-xl lg:text-2xl xl:text-[28px] font-black text-[#1A1F36] leading-[1.15] mb-3 flex flex-col tracking-tight">
                <span>经营</span>
                <span>拐点</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-[#5568FE]/20 flex items-center justify-center text-[#5568FE]">
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </div>
            </div>

            <p className="text-[10.5px] lg:text-[11px] text-[#4A5CE3] font-semibold leading-relaxed relative z-10 px-0.5 pb-1">单点流程留痕已无法解释结果</p>
          </div>

          {/* NOW Box */}
          <div className="flex-[2] xl:flex-[2.4] border-[1.5px] border-slate-800 rounded-xl lg:rounded-2xl p-5 xl:p-6 bg-white flex flex-col shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300 min-h-0 justify-between">
            <div>
              <div className="text-[10px] lg:text-[11px] font-bold text-[#1853FF] tracking-[0.1em] mb-2 xl:mb-2.5 uppercase">NOW / 存量精耕</div>
              <h3 className="text-base lg:text-lg font-bold mb-2 text-[#1A1F36] tracking-tight">“挖得更深”，开始关心“每一笔投入是否有效”</h3>
              <p className="text-gray-500 text-xs lg:text-[13px] leading-relaxed mb-3">产品场景化、渠道碎片化、促销高频化，让执行、费用、销售与库存必须在同一活动对象上被持续解释。</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 xl:gap-5 mt-auto pt-2">
              {/* Left list */}
              <div className="flex flex-col gap-1.5 flex-1 justify-end pb-0.5">
                {[
                  "场景化产品矩阵 · 单店效益优先",
                  "运营存量网点 · 看重终端执行",
                  "费用精准落地 · 考核终端动销"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 xl:py-2.5 px-3 rounded-lg bg-blue-50/40 border border-blue-100/60 group/item hover:bg-blue-50/80 transition-colors">
                    <span className="text-[#1853FF] font-bold text-xs font-mono tracking-wider">0{i+1}</span>
                    <span className="text-gray-800 font-semibold text-xs lg:text-[13px]">{text}</span>
                  </div>
                ))}
              </div>

              {/* Right questions box */}
              <div className="flex-[1.2] bg-gradient-to-br from-[#F4F8FB] to-[#F8FBFC] rounded-xl p-3.5 xl:p-4 border border-blue-100/60 shadow-xs">
                <div className="text-[10.5px] lg:text-[11px] text-gray-400 mb-2 xl:mb-2.5 font-bold tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1853FF]" />
                  系统必须回答的 4 个问题
                </div>
                <div className="flex flex-col gap-0.5">
                  {[
                    "费用是否真正落到目标门店？",
                    "进货增长是否只是渠道库存？",
                    "执行是否形成有效覆盖与动销？",
                    "举证、核销与 ROI 能否互相解释？"
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-2 py-1 xl:py-1.5 border-b border-[#E8EEF5] last:border-0">
                      <span className="text-[#1853FF] font-bold text-[10px] lg:text-[11px] mt-0.5 font-mono">0{i+1}</span>
                      <span className="text-slate-700 text-[10.5px] lg:text-[11.5px] font-medium leading-snug pt-0.5">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}

