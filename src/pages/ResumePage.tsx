import React from 'react';
import { motion } from 'motion/react';

export default function ResumePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 w-full h-full bg-[#0A0D14] text-white overflow-hidden rounded-[2rem] lg:rounded-[3rem] font-sans selection:bg-[#5B89FF] selection:text-black flex"
    >
      {/* Cinematic Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-50 fixed" 
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

      
      
      {/* Artistic Photo Background - Flush Left */}
      <div className="absolute bottom-0 left-0 w-[35%] xl:w-[40%] h-[85%] z-0 pointer-events-none overflow-hidden" style={{ WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 0% 100%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)' }}>
         <div className="absolute inset-0 -scale-x-100">
            <img 
               src="/images/bg-photo.jpg" 
               alt="Background"
               className="w-full h-full object-cover object-[center_20%] grayscale opacity-[0.25] mix-blend-screen"
            />
         </div>
      </div>

      {/* Giant Typography Watermark */}
      <div className="absolute bottom-[-5%] right-[-2%] text-[16rem] xl:text-[20rem] font-black text-white/[0.015] leading-none pointer-events-none select-none z-0 tracking-tighter">
         10 YRS
      </div>

      <div className="relative w-full h-full flex flex-row p-5 sm:p-7 md:p-8 lg:p-10 xl:p-12 z-20 min-h-0 gap-6 xl:gap-10 overflow-hidden select-none">
         
         {/* LEFT & MIDDLE WRAPPER (To align Photo and Text exactly at the top) */}
         <div className="flex-1 shrink-0 h-full flex flex-col justify-center min-w-0 pr-4 xl:pr-8 relative z-10">
            <div className="flex flex-row items-start gap-8 xl:gap-12 w-full">
               
               {/* LEFT COLUMN (ID Photo) */}
               <div className="hidden md:flex w-[180px] xl:w-[240px] shrink-0 flex-col pt-1.5 xl:pt-2">
                  <div className="w-full aspect-[3/4] rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden flex flex-col items-center justify-center backdrop-blur-sm group">
                     <svg className="w-8 h-8 text-white/20 mb-2 group-hover:text-white/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                     <span className="text-[11px] text-white/30 font-mono tracking-widest group-hover:text-white/50 transition-colors">3:4 PHOTO</span>
                  </div>
               </div>

               {/* MIDDLE COLUMN (Identity + Philosophy) */}
               <div className="flex-1 flex flex-col min-w-0">
                  
                  <div className="flex items-end gap-4 xl:gap-5 mb-4 xl:mb-5">
                     <h1 className="text-4xl xl:text-[3.5rem] font-bold tracking-tight text-white leading-none">李金梅</h1>
               <div className="flex items-center pb-1 xl:pb-1.5">
                  <span className="text-[14px] xl:text-[15px] text-white tracking-widest font-medium whitespace-nowrap">资深体验设计师</span>
               </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6 xl:mb-8">
               {['责任感', '执着', '好奇心', '协作力', '持续学习'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 text-[12px] xl:text-[13px] font-medium text-white/80 bg-white/10 border border-white/20 rounded-sm tracking-[0.2em] backdrop-blur-sm">
                     {tag}
                  </span>
               ))}
            </div>
            
            <div className="relative mt-2 xl:mt-4">
              <span className="absolute -left-5 xl:-left-6 -top-5 xl:-top-7 text-[4rem] xl:text-[5rem] font-['DIN_Alternate','DIN',sans-serif] font-bold italic text-[#5B89FF]/40 leading-none pointer-events-none">“</span>
              <p className="text-[1.15rem] xl:text-2xl font-light italic leading-snug text-white/90 tracking-wide">
                好设计不仅是美化，<span className="text-[#5B89FF]/90 font-serif">更是业务效率放大器。</span>
              </p>
            </div>

            <div className="mt-8 xl:mt-10">
               <div className="text-[14px] xl:text-[16px] text-white/70 leading-[1.7] xl:leading-[1.8] tracking-wide font-light flex flex-col gap-3 xl:gap-4 max-w-[540px] xl:max-w-[640px]">
                  <div>
                     <span className="text-white font-semibold text-[15px] xl:text-[17px]">10年</span> 复杂 <strong className="text-white font-semibold">B端</strong> 产品设计经验，具备 <strong className="text-white font-semibold">全终端</strong> 设计能力 (PC网页、移动端、大屏、硬件POS等)。
                  </div>
                  <div>
                     深耕 <strong className="text-white font-semibold">CRM SaaS、骑手物流、协同办公、AI</strong>，拥有多款大型商业化项目从 <strong className="text-white font-semibold">0-1 落地</strong> 及 <strong className="text-white font-semibold">复杂系统解构</strong> 的核心操盘经验。
                  </div>
               </div>
            </div>

            <div className="flex flex-row flex-wrap items-center gap-x-8 xl:gap-x-10 gap-y-6 mt-24 xl:mt-32">
               <MetaBlock label="Experience" value="10年" />
               <MetaBlock label="Education" value={<>硕士 - UAB（巴塞罗那自治大学）<span className="mx-2 text-white/20">|</span>本科 - 上海师范大学</>} />
               <MetaBlock label="Contact" value={<>185 1620 8332<span className="mx-2 text-white/20">|</span>lijinmei915@gmail.com</>} />
            </div>
               </div>
            </div>
         </div>

         {/* RIGHT COLUMN (Timeline) */}
         <div className="w-[300px] xl:w-[380px] shrink-0 h-full flex flex-col justify-center relative min-w-0 pl-8 xl:pl-12 z-10">
            
            <div className="relative flex flex-col w-full">
               {/* Bleeding Vertical Line (Extends out to infinity) */}
               <div className="absolute left-0 -top-[100vh] -bottom-[100vh] w-[1px] bg-gradient-to-b from-[#5B89FF]/0 via-[#5B89FF]/40 to-[#5B89FF]/0 pointer-events-none"></div>
               
               <div className="text-[13px] xl:text-[14px] text-white/50 font-mono tracking-[0.2em] uppercase mb-10 xl:mb-12 shrink-0 flex items-center gap-4 relative pl-8 xl:pl-10">
                  <span>Selected Experience</span>
               </div>

               {/* Timeline Track */}
               <div className="relative flex flex-col gap-8 xl:gap-10 min-h-0">
                  <TimelineNode
                     year="2022.08 — 2026.09"
                     company="纷享销客"
                     fullCompany="北京易动纷享科技有限责任公司"
                     desc="AI建设 / 营销活动 / 费用管理 / 任务系统 / 外勤"
                     isActive={true}
                  />
                  <TimelineNode
                     year="2020.11 — 2022.06"
                     company="盒马"
                     fullCompany="上海盒马网络科技有限公司"
                     desc="物流配送侧 / 社区电商盒马邻里 / HR四大系统"
                  />
                  <TimelineNode
                     year="2019.03 — 2020.10"
                     company="熵趣"
                     fullCompany="熵趣(上海)智能科技有限公司"
                     desc="商汤SenseOffice / 智慧安防 / 智慧展厅 (亚运会)"
                  />
                  <TimelineNode
                     year="2016.02 — 2019.03"
                     company="义援"
                     fullCompany="上海义援网络科技有限公司"
                     desc="CRM / 招聘系统 / 财务系统"
                  />
               </div>
            </div>
         </div>

      </div>
    </motion.div>
  );
}

function MetaBlock({ label, value }: { label: string, value: React.ReactNode }) {
   return (
      <div className="flex flex-col gap-1.5 xl:gap-2">
         <div className="text-[12px] xl:text-[13px] text-white/50 font-mono tracking-[0.2em] uppercase">{label}</div>
         <div className="text-[15px] xl:text-[17px] text-white font-semibold tracking-wide leading-snug">{value}</div>
      </div>
   );
}

function TimelineNode({ year, company, fullCompany, desc, isActive = false }: { year: string, company: string, fullCompany?: string, desc: string, isActive?: boolean }) {
   const dotBaseClasses = "absolute left-[-3.5px] xl:left-[-4.5px] top-[1.5px] xl:top-[1px] w-2 h-2 xl:w-2.5 xl:h-2.5 rounded-full border transition-all duration-300 z-10";
   const dotActiveClasses = "bg-[#5B89FF] border-[#5B89FF] shadow-[0_0_12px_rgba(91,137,255,0.8)]";
   const dotInactiveClasses = "bg-[#0A0D14] border-[#5B89FF]/50 group-hover:bg-[#5B89FF] group-hover:border-[#5B89FF] group-hover:shadow-[0_0_12px_rgba(91,137,255,0.8)]";

   return (
      <div className="relative flex flex-col pl-8 xl:pl-10 group cursor-default">
         {/* Node Dot aligned to left-0 line and vertically centered with text */}
         <div className={`${dotBaseClasses} ${isActive ? dotActiveClasses : dotInactiveClasses}`}></div>
         
         <div className={`text-[14px] xl:text-[15px] font-mono tracking-[0.1em] mb-2 transition-colors leading-none whitespace-nowrap ${isActive ? 'text-[#5B89FF]' : 'text-[#5B89FF]/70 group-hover:text-[#5B89FF]'}`}>{year}</div>
         <div className="flex flex-col gap-0.5 mb-1.5">
            <div className={`text-[18px] xl:text-[20px] font-bold transition-colors tracking-wide leading-tight ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{company}</div>
            {fullCompany && <div className={`text-[13px] xl:text-[15px] font-light tracking-wide transition-colors ${isActive ? 'text-white/50' : 'text-white/30 group-hover:text-white/50'}`}>{fullCompany}</div>}
         </div>
         <div className={`text-[14px] xl:text-[16px] font-light tracking-wide leading-relaxed transition-colors pr-4 ${isActive ? 'text-white/80' : 'text-white/50 group-hover:text-white/80'}`}>{desc}</div>
      </div>
   );
}
