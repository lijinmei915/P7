import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

const columns = [
  {
    time: "08:20",
    title: "接收今日任务",
    context: "12 家门店，5 项活动任务。",
    goal: "搞清今天有哪些任务，哪个收益最高。",
    action: "先查看主管群里的临时要求，再打开系统核对正式任务。",
    bullets: ["区分今日新增与昨日遗留", "手动记下特别要求"],
    touchpoints: ["CRM 待办", "企业微信", "主管"],
    emotionText: "信息较多，且难以直观衡量任务价值，缺乏驱动力。",
    quoteName: "S02 · MOCK",
    quote: "“群里说的比较急，我一般先记下来，再去系统看是不是同一件事。”",
    statNum: "8/10",
    statText: "同时从系统和群消息接收任务",
    y: 50
  },
  {
    time: "08:45",
    title: "安排拜访顺序",
    context: "预计拜访 9 家、行程约 34 公里",
    goal: "在有限时间内尽量多完成门店拜访。",
    action: "根据距离、熟悉程度和个人经验排序，而非收益最大化。",
    bullets: ["使用地图查看相邻门店", "用备忘录记录大致顺序"],
    touchpoints: ["地图", "备忘录", "电话"],
    emotionText: "对熟悉片区较有把握，但对不同任务的激励感知微弱，凭惯性跑店。",
    quoteName: "S07 · MOCK",
    quote: "“先跑顺路的，远的要看今天来不来得及，至于哪个奖励多，算不过来。”",
    statNum: "7/10",
    statText: "主要按照距离和熟悉程度安排门店",
    y: 20
  },
  {
    time: "10:05",
    title: "到店前再次确认",
    context: "翻看两层说明页面",
    goal: "确认这家门店到底要做什么、做到什么程度。",
    action: "打开活动说明，查找活动 SKU、陈列层数和必拍照片。",
    bullets: ["对要求不确定时询问运营"],
    touchpoints: ["任务详情", "活动说明", "运营人员"],
    emotionText: "担心遗漏要求，“合格”与“奖励”的门槛仍依赖个人理解。",
    quoteName: "S04 · MOCK",
    quote: "“文字我看懂了，但照片拍到什么程度才能拿到钱，不太确定。”",
    statNum: "6/10",
    statText: "执行前会重新查看规则或询问运营",
    y: 70
  },
  {
    time: "10:30—10:57",
    title: "完成门店现场作业",
    context: "现场共耗时 27 分钟，单项激励微薄",
    goal: "在现场条件允许的情况下完成陈列，并留下作业记录。",
    action: "先检查库存，再与店主协商陈列位置，最后完成陈列并拍摄。",
    bullets: ["1 个活动 SKU 缺货", "竞品占据目标陈列位置", "调整陈列后提交 3 类照片"],
    touchpoints: ["店主", "商品库存", "陈列现场", "手机相机"],
    emotionText: "处理完各种变数后，觉得费时费力，对微薄的激励缺乏成就感。",
    quoteName: "S07 · MOCK",
    quote: "“每家店情况不一样，折腾半天有时候就为了十几块钱，真不想弄。”",
    statNum: "5/10",
    statText: "到店后才发现缺货或现场条件不符",
    y: 40
  },
  {
    time: "14:10",
    title: "应对临时插单",
    context: "新增任务 1 个，延期门店 2 家",
    goal: "完成主管临时要求，同时尽量不影响原有计划。",
    action: "临时前往一家具备临期风险的门店，将原计划中的两家门店延后。",
    bullets: ["通过电话确认门店情况", "凭经验重新调整剩余顺序"],
    touchpoints: ["主管消息", "电话", "地图"],
    emotionText: "原有节奏被打断，更加不关心全天收益，只求能早点下班。",
    quoteName: "S09 · MOCK",
    quote: "“一插单，后面就只能看时间，做不完的明天再说，奖金拿不到就算了。”",
    statNum: "4/10",
    statText: "发生插单后，完全放弃评估剩余任务价值",
    y: 80
  },
  {
    time: "17:40",
    title: "提交当日记录",
    context: "今日共提交 9 项，全部无即时反馈",
    goal: "确认今天做过的任务都已经提交，希望能看到成果。",
    action: "补充门店记录，检查是否存在未提交项。",
    bullets: ["部分记录在现场提交", "部分内容在晚上补录"],
    touchpoints: ["任务列表", "拜访记录", "手机照片库"],
    emotionText: "看到“已提交”后稍感轻松，但没有即时收益反馈，感觉像在机械交差。",
    quoteName: "S01 · MOCK",
    quote: "“当天先保证都传上去，没个什么提示，做多做少今天都没感觉。”",
    statNum: "8/10",
    statText: "将“已提交”作为免责标志，缺乏正向反馈",
    y: 10
  },
  {
    time: "20:35",
    title: "收到结果并处理驳回",
    context: "当日驳回任务 2 项，次日需整改",
    goal: "弄清哪里没有通过，以及是否需要再次到店。",
    action: "收到“价签不完整”的驳回消息，查看照片后安排次日补充。",
    bullets: ["无法确认其他内容是否合格", "面临扣钱/白干的风险"],
    touchpoints: ["检核消息", "驳回原因", "运营人员"],
    emotionText: "感到挫败和被动，正向激励极度滞后，而驳回的负面反馈却很强烈。",
    quoteName: "S07 · MOCK",
    quote: "“晚上才知道价签没拍全，钱没挣到第二天还得绕回来，太打击人了。”",
    statNum: "4/10",
    statText: "在离店后才收到驳回信息，情绪跌至谷底",
    y: 90
  }
];

const Row = ({ title, isFlex, children, isRelative, className = "" }: any) => (
  <div className={`flex border-b border-slate-200 last:border-0 ${isFlex ? 'flex-1 min-h-0' : 'shrink-0'} ${className}`}>
    <div className="w-[60px] lg:w-[80px] xl:w-[90px] shrink-0 bg-[#101014] text-white flex items-center justify-center p-1 lg:p-2 text-center text-[11px] lg:text-[11px] font-black tracking-widest break-words leading-tight">
      {title}
    </div>
    <div className={`flex flex-1 ${isRelative ? 'relative' : ''}`}>
      {children}
    </div>
  </div>
);

export default function UserJourneyPage({ onBack }: { onBack?: () => void }) {
  return (
    <motion.div
      key="userJourney"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col flex-1 relative z-10 h-full w-full overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12 select-none"
    >
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
          <h1 className="text-[14px] font-black tracking-[0.2em] text-gray-800 uppercase mt-0.5 flex items-center">
            {onBack && <ChevronLeft className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0 text-[var(--color-primary)]" strokeWidth={3} />}
            <span className="group-hover:text-[var(--color-primary)] transition-colors">02. 调研分析与机会挖掘</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">USER JOURNEY</span>
          <div className="bg-[#FDE047] text-yellow-900 text-xs font-black px-3 py-1 rounded-sm tracking-wider">05E-A</div>
        </div>
      </header>

      {/* Main Title */}
      <div className="mb-2.5 lg:mb-3 shrink-0 z-10">
         <h2 className="text-lg md:text-xl lg:text-2xl xl:text-[26px] font-black text-slate-800 tracking-tight mb-1 whitespace-normal lg:whitespace-nowrap">
            业代的一天：作业质量始于到店之前，也延续到离店之后
         </h2>
         <p className="text-slate-500 text-xs sm:text-sm font-medium">
            以典型个案 S07 为主线，结合 10 位业代影随与 1V1 回顾，还原优化前的执行阻力与激励失效瞬间。
         </p>
      </div>

      {/* Main Grid Map */}
      <div className="flex flex-col flex-1 min-h-0 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden z-10">
         {/* Row 1: 工作阶段 */}
         <Row title="工作阶段">
            {columns.map((c, i) => (
               <div key={i} className="flex-1 border-r border-slate-200 last:border-0 p-1.5 lg:p-2 flex flex-col justify-center">
                  <div className="text-yellow-600 font-black text-[11px] lg:text-[11px] mb-0.5">{c.time}</div>
                  <div className="font-black text-slate-800 text-[11px] lg:text-xs xl:text-sm mb-0.5 leading-tight">{c.title}</div>
                  <div className="text-[11px] lg:text-[11px] xl:text-[11px] text-slate-400 leading-tight">{c.context}</div>
               </div>
            ))}
         </Row>
         
         {/* Row 2: 此刻想完成什么 */}
         <Row title="此刻想完成什么">
            {columns.map((c, i) => (
               <div key={i} className="flex-1 border-r border-slate-200 last:border-0 p-1.5 lg:p-2 flex items-center bg-slate-50/50">
                  <div className="font-bold text-slate-800 text-[11px] lg:text-[11px] xl:text-[11px] leading-snug">
                     {c.goal}
                  </div>
               </div>
            ))}
         </Row>

         {/* Row 3: 实际行为与判断 */}
         <Row title="实际行为与判断" isFlex>
            {columns.map((c, i) => (
               <div key={i} className="flex-1 border-r border-slate-200 last:border-0 p-1.5 lg:p-2 flex flex-col min-h-0 overflow-hidden justify-center">
                  <div className="text-[11px] lg:text-[11px] xl:text-[11px] text-slate-700 font-bold leading-snug mb-1">{c.action}</div>
                  <ul className="list-disc pl-3 text-[11px] lg:text-[11px] xl:text-[11px] text-slate-500 space-y-0.5">
                     {c.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
               </div>
            ))}
         </Row>

         {/* Row 4: 接触到的人与工具 */}
         <Row title="接触到的人与工具">
            {columns.map((c, i) => (
               <div key={i} className="flex-1 border-r border-slate-200 last:border-0 p-1.5 flex flex-wrap content-center gap-1 bg-slate-50/50">
                  {c.touchpoints.map((t, j) => (
                     <span key={j} className="border border-slate-200 text-slate-500 bg-white px-1.5 py-0.5 rounded text-[11px] lg:text-[11px] xl:text-[11px] font-medium">{t}</span>
                  ))}
               </div>
            ))}
         </Row>

         {/* Row 5: 确定感 / 情绪 */}
         <Row title="确定感 / 情绪" isRelative className="h-[50px] lg:h-[60px] xl:h-[70px]">
            {/* SVG Background Layer */}
            <div className="absolute inset-0 z-0 h-[25px] lg:h-[35px] xl:h-[45px]">
               <svg viewBox="0 0 700 100" preserveAspectRatio="none" className="w-full h-full overflow-visible drop-shadow-sm">
                  <polyline 
                     points={columns.map((c, i) => `${(i * 100) + 50},${c.y}`).join(' ')} 
                     fill="none" stroke="#EAB308" strokeWidth="2.5" vectorEffect="non-scaling-stroke" 
                     strokeLinecap="round" strokeLinejoin="round"
                  />
               </svg>
               {columns.map((c, i) => (
                  <div 
                     key={i}
                     className="absolute w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-yellow-400 border-[1.5px] border-white transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-sm"
                     style={{ left: `${(i + 0.5) * (100 / 7)}%`, top: `${c.y}%` }}
                  />
               ))}
            </div>
            
            {/* Text Layer */}
            {columns.map((c, i) => (
               <div key={i} className="flex-1 border-r border-slate-200 last:border-0 px-1.5 pb-1 pt-[25px] lg:pt-[35px] xl:pt-[45px] flex flex-col justify-end z-10">
                  <div className="text-[11px] lg:text-[11px] xl:text-[11px] text-slate-600 leading-tight font-medium bg-white/90 backdrop-blur-sm rounded px-1 py-0.5">{c.emotionText}</div>
               </div>
            ))}
         </Row>

         {/* Row 6: 观察证据与原话 */}
         <Row title="观察证据与原话">
            {columns.map((c, i) => (
               <div key={i} className="flex-1 border-r border-slate-200 last:border-0 p-1.5 lg:p-2 flex flex-col justify-between gap-1.5">
                  <div className="bg-[#101014] text-white p-1.5 rounded text-[11px] lg:text-[11px]">
                     <div className="text-yellow-400 font-bold mb-0.5 tracking-wider text-[11px] lg:text-[11px]">{c.quoteName}</div>
                     <div className="text-white/80 leading-snug">{c.quote}</div>
                  </div>
                  <div className="flex items-start gap-1 lg:gap-1.5">
                     <div className="text-yellow-500 font-black text-xs lg:text-sm leading-none tracking-tighter w-6 lg:w-7 shrink-0">{c.statNum}</div>
                     <div className="text-[11px] lg:text-[11px] xl:text-[11px] text-slate-500 leading-tight font-medium flex-1">{c.statText}</div>
                  </div>
               </div>
            ))}
         </Row>
      </div>

      {/* Bottom Panels - Guaranteed to fit inside viewport */}
      <div className="flex gap-2.5 lg:gap-3 mt-2 lg:mt-3 shrink-0 h-[70px] lg:h-[84px] z-10">
         {/* Panel 1 */}
         <div className="w-[180px] lg:w-[220px] xl:w-[240px] bg-white border border-slate-200 p-2 lg:p-3 rounded-lg shadow-sm flex flex-col justify-center shrink-0">
            <div className="text-yellow-600 font-black text-[11px] lg:text-[11px] xl:text-[11px] tracking-widest mb-1.5">METHOD · 研究方法</div>
            <div className="font-black text-slate-800 text-[11px] lg:text-xs mb-2">一天影随 + 任务后回顾</div>
            <div className="flex flex-wrap gap-1">
               <span className="bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded text-[11px] lg:text-[11px] font-medium border border-slate-100">10位业代分层样本</span>
               <span className="bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded text-[11px] lg:text-[11px] font-medium border border-slate-100">完整工作日影随</span>
               <span className="bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded text-[11px] lg:text-[11px] font-medium border border-slate-100">行为/触点/情绪记录</span>
               <span className="bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded text-[11px] lg:text-[11px] font-medium border border-slate-100">30分钟1V1</span>
            </div>
         </div>
         
         {/* Panel 2 */}
         <div className="w-[240px] lg:w-[280px] xl:w-[320px] bg-white border border-slate-200 p-2 lg:p-3 rounded-lg shadow-sm flex flex-col justify-center shrink-0">
            <div className="text-yellow-600 font-black text-[11px] lg:text-[11px] xl:text-[11px] tracking-widest mb-1.5">BEHAVIOR PATTERN · MOCK</div>
            <div className="font-black text-slate-800 text-[11px] lg:text-[11px] mb-2">跨阶段重复出现的行为模式</div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 lg:gap-y-1.5">
               <div className="flex items-center gap-1.5">
                  <span className="text-yellow-500 font-black text-xs lg:text-sm tracking-tighter">8/10</span>
                  <span className="text-[11px] lg:text-[11px] text-slate-500 leading-tight font-medium">从多个入口被动接收任务</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <span className="text-yellow-500 font-black text-xs lg:text-sm tracking-tighter">7/10</span>
                  <span className="text-[11px] lg:text-[11px] text-slate-500 leading-tight font-medium">凭经验而非收益最大化排线</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <span className="text-yellow-500 font-black text-xs lg:text-sm tracking-tighter">6/10</span>
                  <span className="text-[11px] lg:text-[11px] text-slate-500 leading-tight font-medium">对奖励门槛与规则感到模糊</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <span className="text-yellow-500 font-black text-xs lg:text-sm tracking-tighter">8/10</span>
                  <span className="text-[11px] lg:text-[11px] text-slate-500 leading-tight font-medium">认为日常提交仅是机械交差</span>
               </div>
            </div>
         </div>

         {/* Panel 3 */}
         <div className="flex-1 bg-[#101014] text-white p-3 lg:p-4 rounded-lg shadow-xl flex flex-col justify-center min-w-0">
            <div className="text-yellow-400 font-black text-[11px] lg:text-[11px] xl:text-[11px] tracking-widest mb-1.5">PRE-SOLUTION INSIGHT · 待交叉验证</div>
            <div className="font-black text-xs lg:text-sm mb-2">优化前洞察</div>
            <div className="text-[11px] lg:text-[11px] xl:text-[11px] text-white/90 leading-relaxed font-bold mb-2">
               目前的执行链路充满阻力且极度<span className="text-yellow-400">缺乏正向刺激</span>。在规则模糊与滞后反馈的消耗下，业代逐渐沦为<span className="text-yellow-400">“机械交差”</span>，微弱且延迟的激励完全无法驱动他们追求“高质量完成”。
            </div>
            <div className="border-t border-white/10 pt-1.5 text-[11px] lg:text-[11px] text-white/40">
               验证边界：下一页单独放大“一次到店作业”。本页不提出产品功能，仅与运营的活动配置、检核记录和驳回原因进行交叉验证。
            </div>
         </div>
      </div>
    </motion.div>
  );
}
