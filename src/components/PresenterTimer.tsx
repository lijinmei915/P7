import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

export default function PresenterTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-4 right-4 lg:top-8 lg:right-8 z-50 bg-[#1e293b]/90 backdrop-blur-xl text-slate-300 rounded-full py-2 px-4 flex items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-slate-700/50"
    >
      <div className={`font-mono text-xl font-black w-[4.5rem] text-center tracking-tight transition-colors ${isRunning ? 'text-white' : 'text-slate-500'}`}>
        {formatTime(time)}
      </div>
      
      <div className="flex items-center gap-1">
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className={`p-1.5 rounded-full transition-all ${isRunning ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
        >
          {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
        </button>
        <button 
          onClick={() => { setTime(0); setIsRunning(false); }}
          className="p-1.5 rounded-full hover:bg-slate-700 text-slate-500 hover:text-slate-300 transition-colors"
          title="重置计时"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
