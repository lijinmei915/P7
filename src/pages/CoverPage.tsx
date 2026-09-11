import React from 'react';
import { motion } from 'motion/react';

export default function CoverPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 w-full h-full bg-[#0A0D14] text-white p-5 sm:p-7 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-between overflow-hidden rounded-[2rem] lg:rounded-[3rem] font-sans selection:bg-[#5B89FF] selection:text-black"
    >
      {/* Background Subtle Grain */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none z-50" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
        }}
      ></div>

      {/* Glass Fluid Texture Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#5B89FF]/10 blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[10%] w-[40%] h-[60%] rounded-full bg-[#8B5CF6]/10 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[#0A0D14]/40 backdrop-blur-[50px] z-10"></div>
      </div>


      {/* Top Header */}
      <header className="flex justify-between items-center w-full z-20 shrink-0">
         <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#5B89FF] rounded-full"></div>
            <div className="text-[11px] xl:text-[13px] uppercase tracking-[0.3em] text-white/60 font-medium">UX Design Portfolio</div>
         </div>
         <div className="text-[11px] xl:text-[13px] uppercase tracking-[0.3em] text-white/40 font-mono">
            2022<span className="mx-2.5 text-white/20">—</span>2026
         </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-0 flex flex-col lg:flex-row items-center w-full relative z-10 py-2 lg:py-4">
         
         {/* Left Column - Typography */}
         <div className="w-full lg:w-[55%] flex flex-col justify-center h-full z-20">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[7.5rem] leading-[0.88] font-light tracking-tighter mb-4 lg:mb-6 shrink-0"
            >
               PORT<br />
               <span className="font-serif italic text-white/30 tracking-tight">FOLIO.</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-5 lg:pl-7 xl:pl-8 max-w-xl"
            >
              <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gradient-to-b from-[#5B89FF] to-transparent"></div>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed text-white/90 tracking-wide">
                 “以系统化思维解构复杂业务，<br/>
                 <span className="text-white/40">在商业目标与用户体验间构建平衡解法。”</span>
              </p>
            </motion.div>
         </div>

         {/* Right Column - Abstract Optics Graphic */}
         <div className="w-full lg:w-[45%] h-full flex items-center justify-center relative z-0 min-h-0">
            <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] lg:w-[360px] lg:h-[360px] xl:w-[440px] xl:h-[440px]">
               
               {/* Ambient Glow */}
               <motion.div
                 animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                 transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                 className="absolute top-1/4 left-1/4 w-[60%] h-[60%] bg-gradient-to-tr from-[#5B89FF]/20 to-[#4A628A]/20 blur-[50px] rounded-full mix-blend-screen"
               />

               {/* Overlapping Glass Optics */}
               <motion.div
                 initial={{ x: -30, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                 className="absolute top-[10%] left-[10%] w-[65%] h-[65%] rounded-full border border-white/10 backdrop-blur-md bg-white/[0.01] shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]"
               />
               <motion.div
                 initial={{ x: 30, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                 className="absolute bottom-[10%] right-[10%] w-[55%] h-[55%] rounded-full border border-white/10 backdrop-blur-xl bg-white/[0.02] shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]"
               />

               {/* Precision Crosshairs (Represents "Systematic Deconstruction") */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                 className="absolute inset-0 flex items-center justify-center pointer-events-none"
               >
                  <div className="w-[120%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45"></div>
                  <div className="w-[120%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transform -rotate-45"></div>
                  
                  {/* Central Node */}
                  <div className="absolute w-2 h-2 border border-[#5B89FF] rounded-full flex items-center justify-center">
                    <div className="w-[2px] h-[2px] bg-white rounded-full"></div>
                  </div>
                  
                  {/* Orbital Ring */}
                  <div className="absolute w-[35%] h-[35%] rounded-full border border-[#5B89FF]/30 border-dashed"></div>
               </motion.div>

            </div>
         </div>
      </main>

      {/* Bottom Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full pt-3 lg:pt-4 border-t border-white/10 z-20 shrink-0"
      >
         <div className="mb-2 sm:mb-0">
            <div className="text-xl lg:text-2xl font-bold tracking-[0.2em] mb-1 text-white">李金梅</div>
            <div className="text-[11px] lg:text-[12px] tracking-[0.15em] text-white/50 uppercase flex items-center gap-2.5">
               <span className="text-[#5B89FF]">资深体验设计 / 10 YRS</span>
               <span className="w-1 h-1 bg-white/20 rounded-full"></span>
               <span>B2B & SaaS</span>
            </div>
         </div>
         <div className="flex flex-wrap gap-2 lg:gap-2.5">
            {['0-1 系统搭建', '复杂系统重构', '多端场景', 'AI 交互范式'].map(tag => (
               <span key={tag} className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] lg:text-[12px] tracking-[0.1em] font-light text-white/70">
                 {tag}
               </span>
            ))}
         </div>
      </motion.footer>

    </motion.div>
  );
}
