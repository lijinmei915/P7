import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

export interface StandardPageLayoutProps {
  pageKey: string;
  phaseTitle: string;
  pageNumber: string;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  onBack?: () => void;
  titleRight?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Standard content page layout following the exact PPT specification:
 * - Pure synchronized canvas background (#F4F6FB + AmbientBackground)
 * - Standardized responsive padding: p-5 sm:p-6 md:p-7 lg:p-8 xl:p-9 (calibrated for 16:9 presentation canvas)
 * - Standard double-circle icon (Blue #1853FF + Green #00D084)
 * - Standard phase typography: text-[14px] font-black tracking-[0.2em] uppercase
 * - Standard title typography & layout rule: 
 *   标题在有空间时坚决不折行 (whitespace-normal lg:whitespace-nowrap)，不设死 max-w 约束，保持横向延伸气场
 * - Standard subtitle typography: text-slate-500 text-sm font-medium leading-relaxed
 * - PPT 绝对准则（Zero-Scrollbar Rule）：
 *   一页 PPT 里面的所有内容绝对不能产生滚动条！
 *   整个页面必须在 16:9 比例内自洽容纳，严格禁止 overflow-y-auto 或出现任何内层/外层滚动条。
 */
export default function StandardPageLayout({
  pageKey,
  phaseTitle,
  pageNumber,
  title,
  subtitle,
  onBack,
  titleRight,
  children,
  className = '',
  contentClassName = 'flex-1 flex flex-col min-h-0 relative z-10 overflow-hidden',
}: StandardPageLayoutProps) {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 flex-1 relative z-10 h-full w-full overflow-hidden select-none ${className}`}
    >
      {/* Header - Standard Specification */}
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
            {onBack && (
              <ChevronLeft
                className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0 text-[#1853FF]"
                strokeWidth={3}
              />
            )}
            <span className="group-hover:text-[#1853FF] transition-colors">
              {phaseTitle}
            </span>
          </h1>
        </div>

        <div className="text-lg lg:text-xl font-bold text-gray-400 tracking-wider">
          {pageNumber}
        </div>
      </header>

      {/* Title Area - Standard Specification: Title never wraps when space is available */}
      <div className="flex flex-col mb-3 lg:mb-4 shrink-0 relative z-20">
        {/* Title: full width, no artificial max-w restriction, single line when space permits */}
        <h2 className="text-xl lg:text-2xl xl:text-[25px] 2xl:text-3xl font-black text-slate-800 tracking-wide mb-1.5 shrink-0 max-w-full whitespace-normal lg:whitespace-nowrap">
          {title}
        </h2>

        {/* Subtitle & Right Slot Row */}
        {(subtitle || titleRight) && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {subtitle && (
              <div className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed max-w-4xl">
                {subtitle}
              </div>
            )}
            {titleRight && (
              <div className="shrink-0 md:ml-auto">
                {titleRight}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content Area - Strictly Overflow Hidden with Zero Scrollbars */}
      <div className={contentClassName}>
        {children}
      </div>
    </motion.div>
  );
}
