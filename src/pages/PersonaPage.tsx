import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, Gauge, LayoutDashboard, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Boxes, Workflow, Layers, Network, Settings2, Briefcase, Users, MonitorSmartphone, Target, LineChart, MessageSquare, Lightbulb, User, CheckCircle, Clock, MapPin, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';


export default function PersonaPage({ onBack }: { onBack: () => void }) {
  const personas = [
    {
      id: 'decision',
      name: '王总',
      location: '华东大区',
      tag: '01 / DECISION',
      title: '管理者',
      badge: '管理者',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=256&h=256&fit=crop&q=80',
      gradient: 'from-[#7CE1FE]/60 via-[#7CE1FE]/10 to-white',
      shadow: 'shadow-[0_8px_30px_rgba(24,83,255,0.08)]',
      accent: 'text-[#1853FF]',
      attributes: [
        { label: '角色', value: '大区总监', icon: Briefcase },
        { label: '团队', value: '40-80人', icon: Users },
        { label: '年限', value: '10+ 年', icon: Clock },
        { label: '设备', value: 'PC为主', icon: MonitorSmartphone },
      ],
      description: '“我要快速判断钱花在哪里、活动是否有效，以及现在应该介入什么。” 常态看趋势，异常时临时下钻；重点关注费用、达成率与 ROI。',
      goals: {
        title: '痛点与挑战',
        icon: Target,
        text: '王总作为大区管理者，信息高度分散在多个系统中，难以形成全局视野；经营数据往往存在滞后性，无法支持实时的纠偏与决策；下属团队汇报多依靠表格，缺乏系统性的过程透明度。'
      },
      needs: {
        title: '核心诉求',
        icon: CheckCircle,
        items: [
          '经营数据的全局实时看板',
          '异常情况的自动预警与下钻',
          '投资回报率 (ROI) 的清晰追踪',
          '跨部门协同的宏观调度能力'
        ]
      }
    },
    {
      id: 'orchestration',
      name: '李冰',
      location: '渠道部',
      tag: '02 / ORCHESTRATION',
      title: '运营人员',
      badge: '运营',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&h=256&fit=crop&q=80',
      gradient: 'from-[#FFA783]/60 via-[#FFA783]/10 to-white',
      shadow: 'shadow-[0_8px_30px_rgba(255,138,76,0.08)]',
      accent: 'text-[#F97316]',
      attributes: [
        { label: '角色', value: '运营专家', icon: Briefcase },
        { label: '协作', value: '5-7类角色', icon: Network },
        { label: '活动', value: '8-15场并行', icon: Layers },
        { label: '设备', value: 'PC+企微', icon: MonitorSmartphone },
      ],
      description: '“我要让复杂活动按规则推进，并尽早发现需要协调的环节。” 多活动并行；高频切换任务；批量操作与跨角色协调多，需要持续追踪状态。',
      goals: {
        title: '痛点与挑战',
        icon: Target,
        text: '李冰每天被大量的跨部门沟通和突发问题淹没。业务规则频繁变动导致配置极易出错；无法实时掌握一线执行进度，每次复盘都需要人工收集拼接大量表格与沟通记录。'
      },
      needs: {
        title: '核心诉求',
        icon: CheckCircle,
        items: [
          '活动规则的模块化与快速配置',
          '关键节点的自动化状态追踪',
          '异常流转环节的自动提醒',
          '沉淀可复用的活动经验库'
        ]
      }
    },
    {
      id: 'execution',
      name: '张强',
      location: '一线业务',
      tag: '03 / EXECUTION',
      title: '业代',
      badge: '业代',
      avatar: 'https://images.unsplash.com/photo-1542596594-649edbc13630?w=256&h=256&fit=crop&q=80',
      gradient: 'from-[#C3F465]/70 via-[#C3F465]/10 to-white',
      shadow: 'shadow-[0_8px_30px_rgba(131,180,65,0.08)]',
      accent: 'text-[#65A30D]',
      attributes: [
        { label: '角色', value: '业务代表', icon: Briefcase },
        { label: '门店', value: '80-120家', icon: MapPin },
        { label: '拜访', value: '8-12家/天', icon: User },
        { label: '设备', value: '手机为主', icon: Smartphone },
      ],
      description: '“我要知道今天先跑哪些店、怎样算完成，以及完成后能获得多少激励。” 时间碎片化；路线和任务优先级动态变化；拍照提交频繁，对即时反馈敏感。',
      goals: {
        title: '痛点与挑战',
        icon: Target,
        text: '张强觉得系统操作繁琐，占用过多在店时间；弱网环境下容易提交失败。常常不清楚目前的指标完成度，导致月底突击。需要随时随地了解路线调整与最新的激励政策。'
      },
      needs: {
        title: '核心诉求',
        icon: CheckCircle,
        items: [
          '极简的移动端任务填报体验',
          '智能化的拜访路线规划推荐',
          '实时激励反馈与指标进度条',
          '弱网环境下的离线操作支持'
        ]
      }
    }
  ];

  return (
    <motion.div
      key="persona"
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col flex-1 relative z-10 h-full w-full overflow-hidden select-none p-6 sm:p-8 md:p-10 lg:p-12"
    >
      <div className="w-full h-full flex flex-col min-h-0 overflow-hidden">
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
              <ChevronLeft className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0 text-[#1853FF]" strokeWidth={3} />
              <span className="group-hover:text-[#1853FF] transition-colors">PHASE 01 / INITIAL PERSONA</span>
            </h1>
          </div>
          <div className="text-lg lg:text-xl font-bold text-gray-400 tracking-wider">
            05
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="flex flex-col flex-1 min-h-0 w-full overflow-hidden">
          {/* Section Title */}
          <div className="mb-2 lg:mb-3 text-left shrink-0">
            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-[26px] font-black text-slate-800 tracking-wide mb-1 whitespace-normal lg:whitespace-nowrap">
              关键角色：用业务负荷理解三类关键角色
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              基于业务调研与现场访谈，提炼管理者、运营人员与业代三类典型角色的职责、痛点与核心诉求。
            </p>
          </div>

          {/* Three Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 lg:gap-3.5 flex-1 min-h-0 items-stretch overflow-hidden">
            {personas.map((persona, idx) => (
              <motion.div 
                key={persona.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-200/70 overflow-hidden hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 min-h-0"
              >
                {/* Block 1: Profile */}
                <div className={`bg-gradient-to-b ${persona.gradient} p-3.5 lg:p-4 flex flex-col relative shrink-0`}>
                  {/* Top row: Avatar + Name + Location + Badge */}
                  <div className="flex items-center gap-3 mb-2.5 relative">
                    <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden shadow-sm shrink-0 ring-2 ring-white">
                      <img src={persona.avatar} alt={persona.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm lg:text-base font-black text-slate-900 leading-tight">{persona.name}</h3>
                      <div className="text-[10px] lg:text-[11px] text-slate-600 font-medium">{persona.location}</div>
                    </div>
                    
                    {/* Role Badge (Tag) */}
                    <div className="absolute top-0 right-0">
                      <span className="inline-block bg-white/80 backdrop-blur-xs text-slate-800 text-[10px] lg:text-[11px] font-bold px-2 py-0.5 rounded-md border border-white/80 shadow-xs">
                        {persona.badge}
                      </span>
                    </div>
                  </div>

                  {/* Attributes Grid (2x2) */}
                  <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 w-full mb-2 pb-2 border-b border-black/5">
                    {persona.attributes.map((attr, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <attr.icon className="w-3 h-3 text-slate-700 shrink-0" strokeWidth={2.5} />
                        <div className="flex items-center gap-1 whitespace-nowrap">
                          <span className="text-[9.5px] lg:text-[10px] text-slate-900 font-bold">{attr.label}:</span>
                          <span className="text-[9.5px] lg:text-[10px] text-slate-600 font-medium">{attr.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-[9.5px] lg:text-[10.5px] font-medium text-slate-600 leading-snug text-left w-full">
                    {persona.description}
                  </p>
                </div>

                {/* Block 2: Goals */}
                <div className="p-3 lg:p-3.5 flex flex-col shrink-0 bg-white border-t border-slate-100">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center bg-slate-100 text-[9px]">
                      ⚽️
                    </div>
                    <h4 className="text-xs lg:text-[13px] font-bold text-slate-800">
                      {persona.goals.title}
                    </h4>
                  </div>
                  <p className="text-[9.5px] lg:text-[10.5px] leading-relaxed font-medium text-slate-500">
                    {persona.goals.text}
                  </p>
                </div>

                {/* Block 3: Needs */}
                <div className="p-3 lg:p-3.5 flex-1 flex flex-col bg-white border-t border-slate-100 min-h-0 justify-center">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center bg-slate-100 text-[9px]">
                      😃
                    </div>
                    <h4 className="text-xs lg:text-[13px] font-bold text-slate-800">
                      {persona.needs.title}
                    </h4>
                  </div>
                  
                  <ul className="flex flex-col gap-1.5">
                    {persona.needs.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <ArrowRight className="w-3 h-3 mt-0.5 shrink-0 text-[#1853FF]" strokeWidth={2.5} />
                        <span className="text-[9.5px] lg:text-[10.5px] font-medium leading-snug text-slate-600">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

