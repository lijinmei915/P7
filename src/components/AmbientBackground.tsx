import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, Gauge, LayoutDashboard, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Boxes, Workflow, Layers, Network, Settings2, Briefcase, Users, MonitorSmartphone, Target, LineChart, MessageSquare, Lightbulb, User, CheckCircle, Clock, MapPin, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';


export default function AmbientBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-[2.5rem] z-0">
      <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[60%] rounded-full bg-blue-400/10 blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/5 blur-[100px]" />
      {/* Subtle Global Grid */}
      <div 
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: 'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
        }}
      />
    </div>
  );
}

