import React from 'react';
import { motion } from 'motion/react';
import { Mail, MessageCircle } from 'lucide-react';

export default function EndingPage() {
  return (
    <motion.div
      key="ending"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 w-full h-full bg-[#0A0D14] text-white p-5 sm:p-7 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-between overflow-hidden rounded-[2rem] lg:rounded-[3rem] font-sans selection:bg-[#5B89FF] selection:text-black select-none"
    >
      {/* Background Subtle Grain - Same as Cover */}
      <div 
         className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none z-50" 
         style={{
           backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
         }}
      ></div>

      {/* Simplified Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#5B89FF]/10 to-[#8B5CF6]/10 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[#0A0D14]/40 backdrop-blur-[30px] z-10"></div>
      </div>

      {/* Top Header - Same as Cover */}
      <header className="flex justify-between items-center w-full z-20 shrink-0">
         <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#5B89FF] rounded-full"></div>
            <div className="text-[11px] xl:text-[13px] uppercase tracking-[0.3em] text-white/60 font-medium">UX Design Portfolio</div>
         </div>
         <div className="text-[11px] xl:text-[13px] uppercase tracking-[0.3em] text-white/40 font-mono">
            2022<span className="mx-2.5 text-white/20">—</span>2026
         </div>
      </header>

      {/* Main Content - Centered & Simplified */}
      <main className="flex-1 min-h-0 flex flex-col items-center justify-center w-full relative z-10 py-2">
         
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-6 lg:mb-8"
         >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none font-light tracking-widest uppercase mb-3 lg:mb-4">
               THANK <span className="font-serif italic text-white/40">YOU.</span>
            </h1>
            <div className="flex items-center justify-center gap-4">
               <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#5B89FF]/50"></div>
               <p className="text-white/70 text-xs sm:text-sm md:text-base tracking-[0.2em] font-light">
                  期待与您的进一步沟通
               </p>
               <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#5B89FF]/50"></div>
            </div>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-xl justify-center px-4"
         >
            {/* Email Card */}
            <div className="flex-1 group bg-white/[0.02] border border-white/10 p-4 lg:p-5 rounded-xl backdrop-blur-md hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer flex flex-col items-center text-center shadow-md">
               <div className="w-10 h-10 rounded-full bg-[#5B89FF]/10 flex items-center justify-center text-[#5B89FF] group-hover:scale-110 transition-transform mb-2">
                  <Mail className="w-4 h-4" />
               </div>
               <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">Email</div>
               <div className="text-white/90 text-xs sm:text-sm font-medium tracking-wide">lijinmei915@gmail.com</div>
            </div>

            {/* WeChat Card */}
            <div className="flex-1 group bg-white/[0.02] border border-white/10 p-4 lg:p-5 rounded-xl backdrop-blur-md hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer flex flex-col items-center text-center shadow-md">
               <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] group-hover:scale-110 transition-transform mb-2">
                  <MessageCircle className="w-4 h-4" />
               </div>
               <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">WeChat / Phone</div>
               <div className="text-white/90 text-xs sm:text-sm font-medium tracking-wide">提供后随时联络</div>
            </div>
         </motion.div>

      </main>

      {/* Bottom Footer - Same as Cover */}
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
