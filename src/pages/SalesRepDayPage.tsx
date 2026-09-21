import React from 'react';
import { Clock, MapPin, Target, Smartphone, MessageSquare, AlertCircle, TrendingDown, BatteryLow, Frown, ZapOff } from 'lucide-react';
import StandardPageLayout from '../components/StandardPageLayout';

export default function SalesRepDayPage({ onBack }: { onBack?: () => void }) {
  const subtitle = (
    <>
      以典型个案 S07 为主线，结合 10 位业代影随与 1V1 回顾，还原优化前的目标、行为、触点、判断与情绪变化。<br/>
      <span className="text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-1 py-0.5 rounded">特别发现：不仅是执行难，更核心的问题是“缺乏即时激励与反馈”导致的动力衰竭。</span>
    </>
  );

  return (
    <StandardPageLayout
      pageKey="salesRepDay"
      phaseTitle="PHASE 02 / EMPATHY MAP"
      pageNumber="11"
      title="业代的一天：作业质量始于到店之前，也延续到离店之后"
      subtitle={subtitle}
      onBack={onBack}
      contentClassName="flex-1 overflow-hidden relative z-10 bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(24,83,255,0.06)] rounded-2xl flex flex-col"
    >
      {/* Timeline Line */}
      <div className="absolute top-[88px] left-0 right-0 h-1 bg-gradient-to-r from-slate-100 via-[var(--color-primary)]/30 to-slate-100 z-0 hidden lg:block"></div>
      
      <div className="flex flex-col lg:flex-row h-full overflow-hidden relative z-10 p-4 lg:p-6 gap-6 lg:gap-4">
          
          {/* Node 1 */}
          <TimelineNode 
             time="08:20" 
             title="接收今日任务" 
             status="info"
             context="12家门店，5项活动任务。"
             thought="搞清今天有哪些任务，哪些事情不能遗漏。"
             action="先看群里临时要求，再查系统正式任务。手动记下特别要求，交叉比对。"
             emotion="信息多且散，未形成清晰执行顺序。"
             quote="群里说的比较急，我一般先记下来，再去系统看是不是同一件事。"
             data="80% 业代需要双重确认系统与微信信息。"
          />

          {/* Node 2 */}
          <TimelineNode 
             time="10:30" 
             title="核心陈列执行" 
             status="neutral"
             context="到达A类大店，需完成冰饮专案陈列与拍照。"
             thought="陈列标准到底是什么？怎么摆才算合格能拿到钱？"
             action="翻找历史培训图文，按理解摆放。拍照上传系统，但系统只提示已提交。"
             emotion="执行过程机械，提交后缺乏“安全感”。"
             quote="拍完传上去就行了，至于合不合格，要等下周运营通知。"
             data="65% 业代表示不确定当前陈列是否完全符合标准。"
          />

          {/* Node 3 */}
          <TimelineNode 
             time="15:45" 
             title="疲惫期跑店" 
             status="warning"
             context="已跑完8家，体力下降，还剩4家小店。"
             thought="今天好累，这几家小店随便拍拍算了，反正奖励不多。"
             action="缩短在店时间，仅完成最基础的签到和货架拍照，未主动推销新品。"
             emotion="动力明显衰竭，只求完成指标，不求过程质量。"
             quote="下午真的跑不动了，如果做好了能立刻看到奖金涨几块钱，可能还有点劲。"
             data="下午3点后，门店有效作业时间平均缩短 35%。"
             highlightIssue={true}
          />

          {/* Node 4 */}
          <TimelineNode 
             time="18:30" 
             title="离店与收益预估" 
             status="danger"
             context="结束一天行程，准备回家。"
             thought="今天到底挣了多少提成？那个专案到底算不算有效？"
             action="打开系统看业绩看板，发现只有总体销量，看不到单项活动的预估收益。放弃计算。"
             emotion="黑盒感极强，努力与回报脱节，产生严重挫败感。"
             quote="算不清楚的。每个月发工资就像开盲盒，积极性都被磨没了。"
             data="92% 业代不知道自己当天的活动执行能带来多少确切收入。"
             highlightIssue={true}
          />
          
        </div>
    </StandardPageLayout>
  );
}

function TimelineNode({ time, title, status, context, thought, action, emotion, quote, data, highlightIssue }: any) {
  const isDanger = status === 'danger';
  const isWarning = status === 'warning';
  
  return (
    <div className="flex-1 flex flex-col min-w-0 h-full">
      {/* Time Header */}
      <div className="flex flex-col items-center mb-4 shrink-0">
         <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-xs lg:text-sm font-black shadow-md relative z-10 border-4 border-white
            ${isDanger ? 'bg-red-500 text-white' : isWarning ? 'bg-amber-500 text-white' : 'bg-[var(--color-primary)] text-white'}`}>
            {time}
         </div>
         <div className="mt-2 text-xs lg:text-sm font-black text-slate-800 tracking-tight text-center">{title}</div>
      </div>

      {/* Content Card */}
      <div className={`flex-1 rounded-2xl p-3 lg:p-4 flex flex-col justify-between gap-2 relative overflow-hidden transition-all
         ${highlightIssue ? 'bg-red-50/50 border border-red-100 shadow-[0_4px_16px_rgba(239,68,68,0.05)]' : 'bg-slate-50 border border-slate-100'}`}>
         
         {highlightIssue && (
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
         )}

         {/* Section: Context & Thought */}
         <div className="space-y-2">
            <div>
               <div className="flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">当前情况</span>
               </div>
               <div className="text-xs font-bold text-slate-700 leading-tight">{context}</div>
            </div>
            
            <div>
               <div className="flex items-center gap-1 mb-0.5">
                  <Target className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">目标与想法</span>
               </div>
               <div className="text-xs font-bold text-[var(--color-primary)] leading-tight bg-[var(--color-primary)]/5 p-1 rounded">{thought}</div>
            </div>

            {/* Section: Action */}
            <div>
               <div className="flex items-center gap-1 mb-0.5">
                  <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">实际行为</span>
               </div>
               <div className="text-[11px] text-slate-600 leading-snug font-normal">{action}</div>
            </div>
         </div>

         {/* Section: Emotion & Quotes */}
         <div className="pt-2 border-t border-slate-200/50 flex flex-col gap-2 mt-auto">
            <div className="flex items-start gap-1">
               {highlightIssue ? <ZapOff className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" /> : <MessageSquare className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0 mt-0.5" />}
               <div className="text-[11px] text-slate-500 italic leading-snug">
                 "{quote}"
               </div>
            </div>
            
            {highlightIssue && (
               <div className="bg-red-50 text-red-600 text-[11px] p-2 rounded-lg flex items-start gap-1 font-bold border border-red-100">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>激励断层：{emotion}</span>
               </div>
            )}
            {!highlightIssue && (
               <div className="bg-slate-100 text-slate-600 text-[11px] p-2 rounded-lg flex items-start gap-1 font-bold">
                  <Frown className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>情绪体验：{emotion}</span>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
