import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, Gauge, LayoutDashboard, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Boxes, Workflow, Layers, Network, Settings2, Briefcase, Users, MonitorSmartphone, Target, LineChart, MessageSquare, Lightbulb, User, CheckCircle, Clock, MapPin, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { cases } from '../data/mockData';

export default function DirectoryPage({ onNavigate, activeId = '01' }: { onNavigate: (id: string) => void, activeId?: string }) {
  return (
    <motion.div
      key="directory"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="deck-page flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 relative z-10 h-full w-full overflow-hidden select-none"
    >
      {/* Header */}
      <header className="flex justify-between items-center z-10 relative shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-1.5 shadow-sm">
            <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] relative z-10 ring-2 ring-[var(--slide-bg)]" />
            <div className="w-5 h-5 rounded-full bg-[#00D084] ring-2 ring-[var(--slide-bg)]" />
          </div>
          <h1 className="text-[14px] font-black tracking-[0.2em] text-gray-800 uppercase mt-0.5">
            SANGEANLI / 三个案例
          </h1>
        </div>
        {/* Right Header Element */}
        <div className="hidden md:flex items-center gap-4 text-gray-400">
          <span className="w-8 h-[2px] bg-gray-500 rounded-full"></span>
          <span className="text-sm xl:text-base font-black tracking-widest">2026</span>
        </div>
      </header>

      {/* Cards Grid - Centered comfortably without stretching full height */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 my-auto z-10 relative w-full max-w-[1040px] xl:max-w-[1160px] mx-auto">
        {cases.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              key={item.id}
              onClick={(item.id === activeId) ? () => onNavigate(item.id) : undefined}
              className={`group relative overflow-hidden flex flex-col p-6 lg:p-7 xl:p-8 rounded-2xl lg:rounded-3xl transition-all duration-500 justify-between min-h-[340px] md:min-h-[380px] lg:min-h-[430px] xl:min-h-[460px] ${
                (item.id === activeId)
                  ? 'cursor-pointer bg-[linear-gradient(135deg,#7A8AFF_0%,#5568FE_35%,#3547E8_70%,#2031CF_100%)] shadow-[0_20px_40px_-15px_rgba(85,104,254,0.5)] text-white hover:shadow-[0_25px_50px_-15px_rgba(85,104,254,0.6)] hover:-translate-y-1'
                  : 'bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] border border-white hover:border-blue-50 hover:shadow-[0_25px_50px_-15px_rgba(85,104,254,0.08)] hover:-translate-y-1'
              }`}
            >
              {/* Grid Overlay for Active Card */}
              {(item.id === activeId) && (
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                      linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: '4.5rem 4.5rem, 4.5rem 4.5rem, 1.5rem 1.5rem, 1.5rem 1.5rem',
                    backgroundPosition: '0 0',
                    WebkitMaskImage: 'radial-gradient(circle at 10% 10%, black 15%, rgba(0,0,0,0.15) 100%)',
                    maskImage: 'radial-gradient(circle at 10% 10%, black 15%, rgba(0,0,0,0.15) 100%)',
                  }}
                />
              )}

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  {/* Card Top */}
                  <div className="flex justify-between items-start mb-3 lg:mb-4">
                    <span
                      className={`text-2xl lg:text-3xl font-bold tracking-tight ${
                        (item.id === activeId) ? 'text-white' : 'text-gray-300 group-hover:text-[#5568FE] transition-colors duration-500'
                      }`}
                    >
                      {item.id}
                    </span>
                    <ArrowUpRight 
                      className={`w-5 h-5 transition-all duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
                        (item.id === activeId) ? 'text-white/60 group-hover:text-white' : 'text-gray-300 opacity-0 group-hover:opacity-100 group-hover:text-[#5568FE]'
                      }`} 
                    />
                  </div>

                  <h2
                    className={`text-lg lg:text-xl xl:text-2xl font-bold mb-3 leading-snug tracking-tight ${
                      (item.id === activeId) ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {item.title}
                  </h2>

                  <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-4">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[11px] lg:text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                          (item.id === activeId)
                            ? 'bg-white/10 border border-white/20 text-white'
                            : 'bg-transparent border border-gray-200 text-gray-600 group-hover:bg-blue-50/50 group-hover:border-blue-100/80'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Icon and Description at bottom */}
                <div className="mt-6 lg:mt-8">
                  <div className="flex flex-col">
                    <div className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 transition-colors duration-500 ${
                      (item.id === activeId) ? 'bg-white/10' : 'bg-gray-50 group-hover:bg-blue-50'
                    }`}>
                      <Icon
                        className={`w-5 h-5 lg:w-5.5 lg:h-5.5 ${
                          (item.id === activeId) ? 'text-white' : 'text-[#3B54F4]'
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>
                    
                    <p
                      className={`text-xs lg:text-sm leading-relaxed font-medium line-clamp-3 ${
                        (item.id === activeId) ? 'text-white/90' : 'text-gray-500 group-hover:text-gray-700 transition-colors duration-500'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

