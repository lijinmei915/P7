import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, Gauge, LayoutDashboard, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Boxes, Workflow, Layers, Network, Settings2, Briefcase, Users, MonitorSmartphone, Target, LineChart, MessageSquare, Lightbulb, User, CheckCircle, Clock, MapPin, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { steps } from '../data/mockData';

export default function InsightPage2({ onBack }: { onBack: () => void }) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);
  const [hoveredLine, setHoveredLine] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (scrollContainerRef.current) {
      // Restore the horizontal panel, defaulting to the existing swimlane view.
      let panel = 2;
      try {
        const saved = sessionStorage.getItem('p7-insight2-panel');
        if (saved !== null && /^[0-2]$/.test(saved)) panel = Number(saved);
      } catch { /* Storage may be unavailable. */ }
      scrollContainerRef.current.scrollLeft = panel * scrollContainerRef.current.clientWidth;
      
      // Delay enabling smooth scroll so the initial jump isn't animated
      const timer = setTimeout(() => setIsMounted(true), 50);
      return () => clearTimeout(timer);
    }
  }, []);
  const stepsRow1 = steps.slice(0, 5);
  const stepsRow2 = steps.slice(5, 10).reverse();

  const roles = [
    { layer: '决策层', name: '管理者' },
    { layer: '组织编排层', name: '运营人员' },
    { layer: '现场执行层', name: '业代' },
    { layer: '经营承接层', name: '门店经营者' },
    { layer: '证据审核层', name: '检核人员' },
    { layer: '渠道履约层', name: '经销商' },
    { layer: '费用处理层', name: '财务人员' }
  ];

  const nodes33 = [
    { id: '01', title: '活动方案', desc: '确认具体活动方案', row: 1, col: 0 },
    { id: '02', title: '活动申请', desc: '申请参与活动', row: 5, col: 1 },
    { id: '03', title: '活动协议', desc: '与门店签署协议', row: 2, col: 2 },
    { id: '04', title: '活动举证', desc: '提交执行凭证', row: 2, col: 3 },
    { id: '05', title: '活动检核', desc: '核查活动执行情况', row: 4, col: 4 },
    { id: '07', title: '门店费用发放', desc: '向门店发放费用', row: 5, col: 4 },
    { id: '06', title: '门店费用核销', desc: '核销门店活动费用', row: 6, col: 3 },
    { id: '08', title: '经销商费用核销', desc: '核销经销商费用', row: 6, col: 5 },
    { id: '09', title: '费用上账', desc: '经销商费用入账', row: 6, col: 6 },
    { id: '10', title: 'ROI 分析', desc: '分析活动经营效果', row: 0, col: 6 },
  ];

  const getX = (i: number) => `${(i * 100) / 7 + 100 / 14}%`;
  const getY = (j: number) => `${(j * 100) / 7 + 100 / 14}%`;

  const pathPoints = [
    [0,1], [1,5], [2,2], [3,2], [4,4], [4,5], [3,6], [5,6], [6,6], [6,0]
  ];

  return (
    <motion.div
      key="insight2"
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 relative z-10 h-full w-full overflow-hidden"
    >
      {/* Horizontal Scroll Container */}
      <div ref={scrollContainerRef} onScroll={event => {
        const container = event.currentTarget;
        if (container.clientWidth) {
          try { sessionStorage.setItem('p7-insight2-panel', String(Math.round(container.scrollLeft / container.clientWidth))); }
          catch { /* Storage may be unavailable. */ }
        }
      }} className={`flex h-full w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide ${isMounted ? 'scroll-smooth' : ''}`}>
        
        {/* PANEL 1: 03.1 (Flowchart) */}
        <div className="w-full h-full flex-shrink-0 snap-center flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden select-none justify-between">
          {/* Header */}
          <header className="flex justify-between items-center z-10 relative mb-3.5 lg:mb-5 shrink-0">
            <div 
              className="flex items-center gap-4 cursor-pointer group" 
              onClick={onBack}
            >
              <div className="flex -space-x-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] relative z-10 ring-2 ring-[var(--slide-bg)]" />
                <div className="w-5 h-5 rounded-full bg-[#00D084] ring-2 ring-[var(--slide-bg)]" />
              </div>
              <h1 data-design-type="header" className="text-[14px] font-black tracking-[0.2em] text-gray-800 uppercase mt-0.5 flex items-center">
                {onBack && <ChevronLeft className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0 text-[var(--color-primary)]" strokeWidth={3} />}
                <span className="group-hover:text-[var(--color-primary)] transition-colors">CASE01 / INDUSTRY INSIGHT</span>
              </h1>
            </div>
            <div className="text-lg lg:text-xl font-bold text-gray-400 tracking-wider">
              03.1
            </div>
          </header>

          {/* Main Content */}
          <div className="flex flex-col flex-1 min-h-0 justify-between">
            <h2 data-design-type="title" className="text-lg md:text-xl lg:text-2xl xl:text-[24px] font-black text-slate-800 tracking-tight mb-2.5 lg:mb-3 shrink-0 whitespace-normal lg:whitespace-nowrap">
              系统现状：基础业务链路已经打通，但系统仍停留在被动留痕
            </h2>

            {/* Flowchart Area */}
            <div className="flex flex-col xl:flex-row gap-4 xl:gap-6 items-stretch shrink-0 pb-0">
              
              {/* Left Grid */}
              <div className="flex-1 flex flex-col gap-3 lg:gap-4 relative pt-0">
                
                {/* Row 1 */}
                <div className="grid grid-cols-5 gap-2.5 lg:gap-3.5 relative">
                  {stepsRow1.map((step, i) => (
                    <div key={step.id} className="relative z-10">
                      <div className="relative border border-slate-200 bg-white/80 backdrop-blur-xs rounded-xl p-2 lg:p-2.5 flex flex-col h-[82px] lg:h-[92px] xl:h-[98px] shadow-xs hover:shadow-sm hover:border-[var(--color-primary)]/30 transition-all">
                        <div className="absolute top-0 right-0 bg-slate-700 text-white text-[11px] lg:text-[11px] font-mono px-1.5 py-0.5 rounded-bl-lg rounded-tr-xl">
                          {step.id}
                        </div>
                        <div className="font-bold text-[#1A1F36] text-[11px] lg:text-[12px] mb-0.5 leading-tight">{step.title}</div>
                        <div className="text-slate-500 text-[11px] lg:text-[11px] leading-tight mb-auto line-clamp-1">{step.desc}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {step.tags.map((tag, idx) => (
                            <span key={idx} className="text-[11px] lg:text-[11px] bg-slate-100 text-slate-500 font-medium px-1 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Left and Right Connectors */}
                      {i === 0 && (
                        <div className="absolute top-1/2 -left-2.5 lg:-left-3.5 w-2.5 lg:w-3.5 h-[calc(100%+0.75rem)] lg:h-[calc(100%+1rem)] border-t-[1.5px] border-l-[1.5px] border-b-[1.5px] border-slate-300 rounded-l-lg z-0 pointer-events-none">
                          <svg className="absolute top-[-7px] right-[-2px] w-3 h-3 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                      )}
                      {i < 4 && (
                        <div className="absolute top-1/2 -right-2.5 lg:-right-3.5 w-2.5 lg:w-3.5 h-[1.5px] bg-slate-300 z-0 pointer-events-none">
                          <svg className="absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                      )}
                      {i === 4 && (
                        <div className="absolute top-1/2 -right-2.5 lg:-right-3.5 w-2.5 lg:w-3.5 h-[calc(100%+0.75rem)] lg:h-[calc(100%+1rem)] border-t-[1.5px] border-r-[1.5px] border-b-[1.5px] border-slate-300 rounded-r-lg z-0 pointer-events-none">
                          <svg className="absolute bottom-[-7px] left-[-2px] w-3 h-3 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-5 gap-2.5 lg:gap-3.5 relative">
                  {stepsRow2.map((step, i) => (
                    <div key={step.id} className="relative z-10">
                      <div className="relative border border-slate-200 bg-white/80 backdrop-blur-xs rounded-xl p-2 lg:p-2.5 flex flex-col h-[82px] lg:h-[92px] xl:h-[98px] shadow-xs hover:shadow-sm hover:border-[var(--color-primary)]/30 transition-all">
                        <div className="absolute top-0 right-0 bg-slate-700 text-white text-[11px] lg:text-[11px] font-mono px-1.5 py-0.5 rounded-bl-lg rounded-tr-xl">
                          {step.id}
                        </div>
                        <div className="font-bold text-[#1A1F36] text-[11px] lg:text-[12px] mb-0.5 leading-tight">{step.title}</div>
                        <div className="text-slate-500 text-[11px] lg:text-[11px] leading-tight mb-auto line-clamp-1">{step.desc}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {step.tags.map((tag, idx) => (
                            <span key={idx} className="text-[11px] lg:text-[11px] bg-slate-100 text-slate-500 font-medium px-1 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Left pointing Connectors */}
                      {i > 0 && (
                        <div className="absolute top-1/2 -left-2.5 lg:-left-3.5 w-2.5 lg:w-3.5 h-[1.5px] bg-slate-300 z-0 pointer-events-none">
                          <svg className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>

              {/* Red Box */}
              <div className="w-full xl:w-[200px] 2xl:w-[230px] flex shrink-0">
                 <div className="border border-rose-200/80 bg-gradient-to-br from-rose-50/90 to-white backdrop-blur-xs rounded-xl p-3.5 lg:p-4 flex flex-col justify-center shadow-md shadow-rose-100/40 w-full">
                    <div className="text-[11px] lg:text-[11px] font-bold text-rose-500 tracking-wider mb-2 uppercase">CORE QUESTION / 核心追问</div>
                    <div className="text-xs lg:text-[13px] font-bold text-rose-950 leading-relaxed">
                      流程能够走完，为什么每一笔投入仍无法被实时解释？
                    </div>
                 </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-2.5 lg:pt-3 flex flex-col items-center text-center shrink-0">
              <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-xs mb-1.5 border border-slate-100">
                {/* Custom Crossed out equal sign */}
                <div className="relative flex flex-col gap-[2.5px] items-center justify-center w-full h-full">
                  <div className="w-3.5 h-[2px] bg-slate-800 rounded-full"></div>
                  <div className="w-3.5 h-[2px] bg-slate-800 rounded-full"></div>
                  <div className="absolute w-5 h-[2px] bg-red-500 rotate-[-45deg] rounded-full"></div>
                </div>
              </div>
              <h4 className="text-sm lg:text-base font-black text-[#1A1F36] mb-1 tracking-tight">流程跑通 ≠ 经营闭环</h4>
              <p className="text-[11px] lg:text-xs text-slate-500 max-w-2xl leading-relaxed font-medium">
                标准流程支持单据流转、凭证透出与状态回写，但事前规划约束、事中风险管控、事后多维度分析的精细化不足，无法灵活适配客户差异化促销业务。
              </p>
            </div>
          </div>
        </div>

        {/* PANEL 2: 03.2 (Abstract Orchestration) */}
        <div className="w-full h-full flex-shrink-0 snap-center flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden select-none justify-between">
          {/* Header */}
          <header className="flex justify-between items-center z-10 relative mb-3.5 lg:mb-5 shrink-0">
            <div 
              className="flex items-center gap-4 cursor-pointer group" 
              onClick={onBack}
            >
              <div className="flex -space-x-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] relative z-10 ring-2 ring-[var(--slide-bg)]" />
                <div className="w-5 h-5 rounded-full bg-[#00D084] ring-2 ring-[var(--slide-bg)]" />
              </div>
              <h1 data-design-type="header" className="text-[14px] font-black tracking-[0.2em] text-gray-800 uppercase mt-0.5 flex items-center">
                {onBack && <ChevronLeft className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0 text-[var(--color-primary)]" strokeWidth={3} />}
                <span className="group-hover:text-[var(--color-primary)] transition-colors">CASE01 / INDUSTRY INSIGHT</span>
              </h1>
            </div>
            <div className="text-lg lg:text-xl font-bold text-gray-400 tracking-wider">
              03.2
            </div>
          </header>

          {/* Main Content */}
          <div className="flex flex-col flex-1 min-h-0 justify-around">
            <h2 data-design-type="title" className="text-lg md:text-xl lg:text-2xl xl:text-[24px] font-black text-slate-800 tracking-tight mb-2 shrink-0 flex items-center gap-2 whitespace-normal lg:whitespace-nowrap">
              <span className="text-[#1A1F36]">系统重构：</span>
              <span className="text-gray-500 font-bold">从一个个离散的承载对象，整合成动态可编排能力</span>
            </h2>

            {/* Abstract Visualization Area */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 xl:gap-12 pb-0 flex-1 min-h-0">
              
              {/* Left: Scattered Objects */}
              <div className="flex-1 w-full max-w-xs flex flex-col items-center">
                <div className="relative w-full aspect-square max-h-[190px] lg:max-h-[210px] flex items-center justify-center mb-2.5">
                  <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2.5 p-2 lg:p-3">
                    {/* Floating blocks representing objects */}
                    <motion.div animate={{ y: [0, -6, 0], rotate: [-6, -4, -6] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="w-16 h-16 lg:w-18 lg:h-18 bg-white shadow-xs border border-gray-100/80 rounded-xl flex flex-col items-center justify-center text-gray-400">
                      <Boxes className="w-5 h-5 mb-1 opacity-50" />
                      <span className="text-[11px] font-bold">活动方案</span>
                    </motion.div>
                    <motion.div animate={{ y: [0, 6, 0], rotate: [0, 3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="w-14 h-14 lg:w-16 lg:h-16 bg-white shadow-xs border border-gray-100/80 rounded-xl flex flex-col items-center justify-center text-gray-400">
                      <Boxes className="w-4 h-4 mb-1 opacity-50" />
                      <span className="text-[11px] font-bold">活动协议</span>
                    </motion.div>
                    <motion.div animate={{ y: [0, -5, 0], rotate: [3, 5, 3] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="w-18 h-14 lg:w-20 lg:h-16 bg-white shadow-xs border border-gray-100/80 rounded-xl flex flex-col items-center justify-center text-gray-400">
                      <Boxes className="w-4 h-4 mb-1 opacity-50" />
                      <span className="text-[11px] font-bold">费用上账</span>
                    </motion.div>
                    <motion.div animate={{ y: [0, 5, 0], rotate: [0, -2, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} className="w-14 h-18 lg:w-16 lg:h-18 bg-white shadow-xs border border-gray-100/80 rounded-xl flex flex-col items-center justify-center text-gray-400">
                      <Boxes className="w-4 h-4 mb-1 opacity-50" />
                      <span className="text-[11px] font-bold">ROI分析</span>
                    </motion.div>
                  </div>
                </div>
                <h3 className="text-sm lg:text-base font-bold text-[#1A1F36] mb-1 tracking-tight">离散的数据对象</h3>
                <p className="text-[11px] lg:text-xs text-gray-500 text-center leading-relaxed">
                  数据被静态封装在单据中，流程固化，<br className="hidden lg:block"/>成为信息孤岛。
                </p>
              </div>

              {/* Center: Arrow/Transition */}
              <div className="flex flex-col items-center justify-center shrink-0 w-20 xl:w-28 z-10">
                <div className="relative flex items-center justify-center w-full h-12 mb-1">
                  <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 100 60">
                    <defs>
                      <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
                        <stop offset="30%" stopColor="var(--color-primary)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    
                    {/* 3 converging lines */}
                    <motion.path
                      d="M -10 15 C 30 15, 60 30, 95 30"
                      fill="none"
                      stroke="url(#flow-gradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                    />
                    <motion.path
                      d="M 10 30 L 95 30"
                      fill="none"
                      stroke="url(#flow-gradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2, repeatDelay: 0.5 }}
                    />
                    <motion.path
                      d="M -10 45 C 30 45, 60 30, 95 30"
                      fill="none"
                      stroke="url(#flow-gradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4, repeatDelay: 0.5 }}
                    />
                  </svg>
                  
                  {/* Arrow head bubble */}
                  <div className="absolute right-[-10px] xl:right-[-6px] w-7 h-7 bg-white rounded-full shadow-xs border border-blue-100 flex items-center justify-center z-10">
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--color-primary)]" strokeWidth={3} />
                  </div>
                </div>
                
                <div className="text-[11px] font-bold text-[var(--color-primary)] tracking-[0.15em] bg-blue-50/80 backdrop-blur-xs px-3 py-1 rounded-full border border-blue-100/50 shadow-xs whitespace-nowrap">
                  整合 / 编排
                </div>
              </div>

              {/* Right: Dynamic Orchestration */}
              <div className="flex-1 w-full max-w-xs flex flex-col items-center">
                <div className="relative w-full aspect-square max-h-[190px] lg:max-h-[210px] flex items-center justify-center mb-2.5 overflow-visible">
                  {/* Decorative background glow */}
                  <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--color-primary)]/20 rounded-full blur-2xl pointer-events-none"></motion.div>
                  
                  {/* Connected Nodes */}
                  <div className="relative w-full h-full">
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="75" fill="none" stroke="var(--color-primary)" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 8" className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: '100px 100px' }}/>
                        <circle cx="100" cy="100" r="45" fill="none" stroke="var(--color-primary)" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="6 4" className="animate-[spin_15s_linear_infinite_reverse]" style={{ transformOrigin: '100px 100px' }}/>
                        
                        <line x1="100" y1="25" x2="100" y2="100" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="2" />
                        <line x1="100" y1="175" x2="100" y2="100" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="2" />
                        <line x1="25" y1="100" x2="100" y2="100" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="2" />
                        <line x1="175" y1="100" x2="100" y2="100" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="2" />
                        
                        {/* Flowing Data Pulses */}
                        <motion.circle cx="100" cy="25" r="2.5" fill="var(--color-primary)" animate={{ cy: [25, 100], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }} />
                        <motion.circle cx="100" cy="175" r="2.5" fill="var(--color-primary)" animate={{ cy: [175, 100], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn", delay: 0.3 }} />
                        <motion.circle cx="25" cy="100" r="2.5" fill="var(--color-primary)" animate={{ cx: [25, 100], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn", delay: 0.6 }} />
                        <motion.circle cx="175" cy="100" r="2.5" fill="var(--color-primary)" animate={{ cx: [175, 100], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn", delay: 0.9 }} />
                      </svg>
                      
                      {/* Center Node */}
                      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 lg:w-12 lg:h-12 bg-[var(--color-primary)] rounded-xl shadow-[0_6px_16px_rgba(24,83,255,0.35)] flex items-center justify-center z-10 text-white cursor-pointer">
                        <Settings2 className="w-5 h-5" />
                      </motion.div>
                      
                      {/* Orbiting Nodes */}
                      <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[12.5%] left-1/2 -translate-x-1/2 w-8 h-8 lg:w-9 lg:h-9 bg-white rounded-lg shadow-xs border border-blue-100 flex items-center justify-center text-blue-600 cursor-pointer">
                        <Layers className="w-3.5 h-3.5" />
                      </motion.div>
                      <motion.div animate={{ y: [3, -3, 3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute bottom-[12.5%] left-1/2 -translate-x-1/2 w-8 h-8 lg:w-9 lg:h-9 bg-white rounded-lg shadow-xs border border-blue-100 flex items-center justify-center text-blue-600 cursor-pointer">
                        <Network className="w-3.5 h-3.5" />
                      </motion.div>
                      <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute top-1/2 left-[12.5%] -translate-y-1/2 w-8 h-8 lg:w-9 lg:h-9 bg-white rounded-lg shadow-xs border border-blue-100 flex items-center justify-center text-blue-600 cursor-pointer">
                        <RefreshCw className="w-3.5 h-3.5" />
                      </motion.div>
                      <motion.div animate={{ y: [3, -3, 3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} className="absolute top-1/2 right-[12.5%] -translate-y-1/2 w-8 h-8 lg:w-9 lg:h-9 bg-white rounded-lg shadow-xs border border-blue-100 flex items-center justify-center text-blue-600 cursor-pointer">
                        <Boxes className="w-3.5 h-3.5" />
                      </motion.div>
                  </div>
                </div>
                <h3 className="text-sm lg:text-base font-bold text-[var(--color-primary)] mb-1 tracking-tight">动态可编排能力</h3>
                <p className="text-[11px] lg:text-xs text-gray-500 text-center leading-relaxed">
                  将底层数据和业务抽象为能力组件，<br className="hidden lg:block"/>通过引擎灵活重组，实时响应业务变化。
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* PANEL 3: 03.3 (Swimlane Flow) */}
        <div className="w-full h-full flex-shrink-0 snap-center flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden select-none justify-between">
          {/* Header */}
          <header className="flex justify-between items-center z-10 relative mb-3.5 lg:mb-5 shrink-0">
            <div 
              className="flex items-center gap-4 cursor-pointer group" 
              onClick={onBack}
            >
              <div className="flex -space-x-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] relative z-10 ring-2 ring-[var(--slide-bg)]" />
                <div className="w-5 h-5 rounded-full bg-[#00D084] ring-2 ring-[var(--slide-bg)]" />
              </div>
              <h1 data-design-type="header" className="text-[14px] font-black tracking-[0.2em] text-gray-800 uppercase mt-0.5 flex items-center">
                {onBack && <ChevronLeft className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0 text-[var(--color-primary)]" strokeWidth={3} />}
                <span className="group-hover:text-[var(--color-primary)] transition-colors">CASE01 / INDUSTRY INSIGHT</span>
              </h1>
            </div>
            <div className="text-lg lg:text-xl font-bold text-gray-400 tracking-wider">
              03.3
            </div>
          </header>

          {/* Main Content */}
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5 lg:mb-3.5 shrink-0">
              <h2 data-design-type="title" className="text-lg md:text-xl lg:text-2xl xl:text-[24px] font-black text-slate-800 tracking-tight whitespace-normal lg:whitespace-nowrap">
                一场活动横跨七类角色，原有流程以渠道履约、举证与费用核销为主
              </h2>

            </div>

            {/* Swimlane Diagram Container (Height Expanded to ~530px for spacious breathing room) */}
            <div className="my-auto w-full h-[460px] md:h-[490px] lg:h-[515px] xl:h-[535px] max-h-[550px] rounded-2xl border transition-all duration-300 overflow-hidden relative flex flex-col border-blue-100/90 bg-white/95 shadow-[0_12px_36px_-10px_rgba(24,83,255,0.06)]">
               <div className="w-full h-full flex flex-col relative">
                  
                  {/* 7 Rows (Grid + Left Axis) */}
                  {roles.map((r, idx) => {
                    // Consistent role styling; alternating lanes aid horizontal tracking.
                    const style = {
                          leftBg: 'bg-[#F0F5FF]',
                          layerColor: 'text-slate-500 font-medium',
                          nameColor: 'text-slate-800 font-bold',
                          laneBg: idx % 2 === 0 ? 'bg-white/80' : 'bg-blue-50/30',
                          laneBorder: 'border-blue-100/70',
                        };

                    return (
                      <div key={idx} className={`flex-1 flex border-b ${style.laneBorder} last:border-b-0 relative w-full min-h-0`}>
                         {/* Left Axis: Roles */}
                         <div className={`w-[110px] xl:w-[130px] flex-shrink-0 border-r ${style.laneBorder} flex flex-col justify-center px-2.5 lg:px-3 transition-colors duration-300 ${style.leftBg}`}>
                            <div className={`text-[11px] lg:text-[11px] leading-none mb-1 ${style.layerColor}`}>{r.layer}</div>
                            <div className={`text-[11px] lg:text-[12px] tracking-tight leading-tight ${style.nameColor}`}>{r.name}</div>
                         </div>
                         {/* Empty Data Area (Striped for lane visibility) */}
                         <div className={`flex-1 transition-colors duration-300 ${style.laneBg}`}></div>
                      </div>
                    );
                  })}

                  {/* Absolute Overlay for SVG and Nodes */}
                  <div className="absolute top-0 bottom-0 right-0 left-[110px] xl:left-[130px] z-10 pointer-events-none">

                    {/* SVG Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                      {pathPoints.slice(0, -1).map((start, idx) => {
                        const end = pathPoints[idx + 1];
                        const active = hoveredLine === idx || nodes33.some(n => n.id === hoveredNode && (
                          (n.col === start[0] && n.row === start[1]) || (n.col === end[0] && n.row === end[1])
                        ));
                        return (
                          <g key={idx}>
                          <line
                            x1={getX(start[0])} y1={getY(start[1])}
                            x2={getX(end[0])} y2={getY(end[1])}
                            stroke="transparent" strokeWidth="18"
                            style={{ pointerEvents: 'stroke' }}
                            onMouseEnter={() => setHoveredLine(idx)}
                            onMouseLeave={() => setHoveredLine(null)}
                          />
                          <line
                            key={idx}
                            x1={getX(start[0])} y1={getY(start[1])}
                            x2={getX(end[0])} y2={getY(end[1])}
                            stroke="#CBD5E1"
                            strokeWidth="1.5"
                          />
                          {active && <g className="swimlane-hover-glow">{Array.from({ length: 12 }, (_, trail) => <line
                            key={trail}
                            className="swimlane-hover-flow"
                            pathLength="100"
                            x1={getX(start[0])} y1={getY(start[1])}
                            x2={getX(end[0])} y2={getY(end[1])}
                            stroke={trail < 4 ? '#5568FE' : '#8494FF'} strokeWidth="2" strokeLinecap="round"
                            style={{ '--trail-offset': `${trail * .65}px`, '--trail-opacity': .85 * (1 - trail / 12) } as React.CSSProperties}
                          />)}</g>}
                          </g>
                        );
                      })}
                      
                      {/* Circles at joints */}
                      {pathPoints.map((pt, idx) => (
                        <circle
                          key={`c-${idx}`}
                          cx={getX(pt[0])}
                          cy={getY(pt[1])}
                          r="3.5"
                          fill="white"
                          stroke="#94A3B8"
                          strokeWidth="2"
                        />
                      ))}
                    </svg>

                    {/* Nodes */}
                    {nodes33.map(n => (
                      <div
                        key={n.id}
                        onMouseEnter={() => setHoveredNode(n.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="swimlane-node absolute z-20 pointer-events-auto transition-colors duration-300 bg-white/98 backdrop-blur-xs border border-blue-100 shadow-[0_6px_16px_-4px_rgba(24,83,255,0.1)] rounded-xl"
                        style={{
                          width: 'max-content',
                          left: getX(n.col),
                          top: getY(n.row),
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <span className="swimlane-corner-number">{n.id}</span>
                        <div className="swimlane-node-copy">
                        <div className="text-[14px] font-bold text-[#1A1F36] leading-[1.4]">
                          {n.title}
                        </div>
                        <div className="text-[11px] xl:text-[11px] leading-relaxed text-slate-500 font-medium">
                          {n.desc}
                        </div>
                        </div>
                      </div>
                    ))}

                    {/* Labels on lines */}
                    <div 
                      className="absolute text-[11px] xl:text-[11px] pointer-events-auto font-bold px-2 py-0.5 rounded-full z-20 whitespace-nowrap transition-all text-slate-600 bg-slate-100 border border-slate-200 shadow-2xs"
                      style={{ left: getX(0.5), top: getY(3), transform: 'translate(-50%, -50%)' }}
                    >
                      方案 → 渠道申请
                    </div>

                    <div 
                      className="absolute text-[11px] xl:text-[11px] pointer-events-auto font-bold px-2 py-0.5 rounded-full z-20 whitespace-nowrap transition-all text-slate-600 bg-slate-100 border border-slate-200 shadow-2xs"
                      style={{ left: getX(2.5), top: `calc(${getY(2)} - 44px)`, transform: 'translate(-50%, -50%)' }}
                    >
                      协议确认 → 执行
                    </div>

                    <div 
                      className="absolute text-[11px] xl:text-[11px] pointer-events-auto font-bold px-2 py-0.5 rounded-full z-20 whitespace-nowrap transition-all text-slate-600 bg-slate-100 border border-slate-200 shadow-2xs"
                      style={{ left: getX(3.5), top: getY(3), transform: 'translate(-50%, -50%)' }}
                    >
                      单证 → 检核
                    </div>

                    <div 
                      className="absolute text-[11px] xl:text-[11px] pointer-events-auto font-bold px-2 py-0.5 rounded-full z-20 whitespace-nowrap transition-all text-slate-600 bg-slate-100 border border-slate-200 shadow-2xs"
                      style={{ left: getX(3.5), top: getY(5.5), transform: 'translate(-50%, -50%)' }}
                    >
                      检核 → 核销
                    </div>

                    <div 
                      className="absolute text-[11px] xl:text-[11px] pointer-events-auto font-bold px-2 py-0.5 rounded-full z-20 whitespace-nowrap transition-all text-slate-600 bg-slate-100 border border-slate-200 shadow-2xs"
                      style={{ left: getX(6), top: getY(3), transform: 'translate(-50%, -50%)' }}
                    >
                      费用上账 → ROI
                    </div>

                  </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
