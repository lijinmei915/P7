import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ArrowRight, FileText, Smartphone, Database, CheckCircle, Search, AlertCircle } from 'lucide-react';

export default function OperatorStudyPage({ onBack }: { onBack?: () => void }) {
  return (
    <motion.div
      key="operatorStudy"
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
            <div className="w-5 h-5 rounded-full bg-[#1853FF] relative z-10 ring-2 ring-[#F4F6FB]" />
            <div className="w-5 h-5 rounded-full bg-[#00D084] ring-2 ring-[#F4F6FB]" />
          </div>
          <h1 className="text-[14px] font-black tracking-[0.2em] text-gray-800 uppercase mt-0.5 flex items-center">
            {onBack && <ChevronLeft className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0 text-[#1853FF]" strokeWidth={3} />}
            <span className="group-hover:text-[#1853FF] transition-colors">02. 调研分析与机会挖掘</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">OPERATOR STUDY</span>
          <div className="bg-[#FDE047] text-yellow-900 text-xs font-black px-3 py-1 rounded-sm tracking-wider">05D-A</div>
        </div>
      </header>

      {/* Main Title */}
      <div className="mb-2 lg:mb-3 shrink-0 z-10">
         <h2 className="text-lg md:text-xl lg:text-2xl xl:text-[26px] font-black text-slate-800 tracking-tight mb-1 whitespace-normal lg:whitespace-nowrap">
            运营如何把活动方案“翻译”为一线可执行任务
         </h2>
         <p className="text-slate-500 text-xs sm:text-sm font-medium">
            从问卷信号进入8位运营人员的配置任务观察，定位规则翻译、对象整理、配置校验与发布预览中的效率损耗。
         </p>
      </div>

      {/* Main Content Area: Left Input, Center Flow, Right Output */}
      <div className="flex-1 flex gap-2.5 lg:gap-4 min-h-0 relative z-10 w-full overflow-hidden">
         
         {/* Left Panel: INPUT */}
         <div className="w-[190px] lg:w-[220px] xl:w-[250px] bg-[#101014] text-white p-3 lg:p-4 flex flex-col shrink-0 relative shadow-xl overflow-hidden rounded-xl">
            <div className="text-[8px] lg:text-[9px] text-yellow-400 font-black tracking-widest mb-1.5">INPUT · 活动方案 BRIEF</div>
            <h3 className="text-xs lg:text-sm font-black mb-1 leading-snug">华东夏季冰饮<br/>重点门店陈列活动</h3>
            <p className="text-[8.5px] lg:text-[9.5px] text-white/60 mb-2.5 leading-relaxed">
               目标：提升重点门店铺货与陈列表现；不同门店等级采用不同执行标准与激励档位。
            </p>
            <div className="grid grid-cols-2 gap-1.5 mb-2.5">
               <div className="bg-white/5 p-1.5 rounded">
                  <div className="text-yellow-400 font-black text-base lg:text-lg">3</div><div className="text-[7.5px] lg:text-[8px] text-white/40">省区</div>
               </div>
               <div className="bg-white/5 p-1.5 rounded">
                  <div className="text-yellow-400 font-black text-base lg:text-lg">12</div><div className="text-[7.5px] lg:text-[8px] text-white/40">经销商</div>
               </div>
               <div className="bg-white/5 p-1.5 rounded">
                  <div className="text-yellow-400 font-black text-base lg:text-lg">1,260</div><div className="text-[7.5px] lg:text-[8px] text-white/40">目标门店</div>
               </div>
               <div className="bg-white/5 p-1.5 rounded">
                  <div className="text-yellow-400 font-black text-base lg:text-lg">6</div><div className="text-[7.5px] lg:text-[8px] text-white/40">活动SKU</div>
               </div>
            </div>
            <div className="mt-auto">
               <div className="text-[8.5px] lg:text-[9px] font-bold text-white mb-1">业务规则</div>
               <ul className="text-[7.5px] lg:text-[8px] text-white/60 space-y-1 pl-3 list-disc leading-tight">
                  <li>A/B/C级门店采用不同陈列标准</li>
                  <li>必须提交全景、近景与价签照片</li>
                  <li>检核通过后按门店等级发放激励</li>
                  <li>缺货门店需同步补货与复访计划</li>
               </ul>
               <div className="mt-2 text-[7px] lg:text-[7.5px] text-white/30 border-t border-white/10 pt-1.5">
                  业务语言 / Word方案 / Excel名单
               </div>
            </div>
            {/* Triangle pointer */}
            <div className="absolute top-1/2 -right-3 w-0 h-0 border-t-[10px] border-b-[10px] border-l-[12px] border-transparent border-l-[#101014] -translate-y-1/2"></div>
         </div>

         {/* Center Flow Area */}
         <div className="flex-1 bg-white border border-slate-200/60 shadow-sm p-4 lg:p-6 relative overflow-hidden grid grid-cols-1 md:grid-cols-5 gap-2 lg:gap-4 content-center">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="absolute top-4 left-4 text-[10px] font-black text-slate-400 tracking-wider">运营的规则翻译工作台</div>
            
            {/* Path line background */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 z-0 hidden md:block"></div>

            {/* Step 1 */}
            <div className="bg-white border border-slate-200 p-2 lg:p-3 rounded-lg shadow-sm relative z-10 flex flex-col mt-[-40px]">
               <div className="text-slate-200 text-3xl font-black absolute top-1 right-2 pointer-events-none">01</div>
               <div className="text-[8px] font-bold text-orange-500 mb-1">理解方案</div>
               <div className="text-[10px] lg:text-xs font-black text-slate-800 mb-1">拆解目标与规则</div>
               <div className="text-[7px] lg:text-[8px] text-slate-500 mb-2 leading-tight">把业务描述拆成对象、任务、单证、检核和激励条件</div>
               <div className="flex flex-wrap gap-1 mt-auto">
                  <span className="bg-slate-50 border border-slate-100 text-slate-500 px-1 py-0.5 rounded text-[7px]">区域</span>
                  <span className="bg-slate-50 border border-slate-100 text-slate-500 px-1 py-0.5 rounded text-[7px]">门店等级</span>
                  <span className="bg-slate-50 border border-slate-100 text-slate-500 px-1 py-0.5 rounded text-[7px]">SKU</span>
                  <span className="bg-slate-50 border border-slate-100 text-slate-500 px-1 py-0.5 rounded text-[7px]">陈列标准</span>
               </div>
               <div className="mt-2 text-[7px] text-red-500 font-medium">停顿: 部分规则只有文字描述，缺少可配置口径</div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-200 p-2 lg:p-3 rounded-lg shadow-sm relative z-10 flex flex-col mt-[20px]">
               <div className="text-slate-200 text-3xl font-black absolute top-1 right-2 pointer-events-none">02</div>
               <div className="text-[8px] font-bold text-blue-500 mb-1">对象圈选</div>
               <div className="text-[10px] lg:text-xs font-black text-slate-800 mb-1">整理参与范围</div>
               <div className="text-[7px] lg:text-[8px] text-slate-500 mb-2 leading-tight">关联省区、经销商、门店、人员和商品名单</div>
               <div className="space-y-1 mt-auto">
                  <div className="flex justify-between text-[7px] bg-slate-50 p-1"><span>门店名单.xlsx</span><span className="text-yellow-600 font-bold">1,260</span></div>
                  <div className="flex justify-between text-[7px] bg-slate-50 p-1"><span>业代归属.xlsx</span><span className="text-yellow-600 font-bold">186</span></div>
               </div>
               <div className="mt-2 text-[7px] text-red-500 font-medium">切换: Excel清洗、去重，再导入系统校验</div>
            </div>

            {/* Step 3 (Dark) */}
            <div className="bg-[#191920] border border-slate-700 p-2 lg:p-3 rounded-lg shadow-md relative z-10 flex flex-col mt-[-20px]">
               <div className="text-slate-800/80 text-3xl font-black absolute top-1 right-2 pointer-events-none">03</div>
               <div className="text-[8px] font-bold text-yellow-400 mb-1">任务与单证</div>
               <div className="text-[10px] lg:text-xs font-black text-white mb-1">配置一线作业标准</div>
               <div className="text-[7px] lg:text-[8px] text-white/50 mb-2 leading-tight">将不同门店等级映射为任务步骤和照片要求</div>
               <div className="space-y-1 mt-auto">
                  <div className="flex justify-between text-[7px] bg-white/5 text-white/80 p-1"><span>A级门店</span><span className="text-yellow-400">4组照片</span></div>
                  <div className="flex justify-between text-[7px] bg-white/5 text-white/80 p-1"><span>B/C级门店</span><span className="text-yellow-400">3组照片</span></div>
               </div>
               <div className="mt-2 text-[7px] text-red-400 font-medium">重复: 相似规则需在多个任务中逐项维护</div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-slate-200 p-2 lg:p-3 rounded-lg shadow-sm relative z-10 flex flex-col mt-[40px]">
               <div className="text-slate-200 text-3xl font-black absolute top-1 right-2 pointer-events-none">04</div>
               <div className="text-[8px] font-bold text-emerald-500 mb-1">检核与激励</div>
               <div className="text-[10px] lg:text-xs font-black text-slate-800 mb-1">绑定质量判断</div>
               <div className="text-[7px] lg:text-[8px] text-slate-500 mb-2 leading-tight">定义合格、驳回、整改与奖励触发条件</div>
               <div className="space-y-1 mt-auto">
                  <div className="flex justify-between text-[7px] bg-slate-50 p-1"><span>照片完整</span><span className="text-slate-700 font-bold">必选</span></div>
                  <div className="flex justify-between text-[7px] bg-slate-50 p-1"><span>位置一致</span><span className="text-slate-700 font-bold">校验</span></div>
               </div>
               <div className="mt-2 text-[7px] text-red-500 font-medium">风险: 规则变化后难判断影响了哪些任务</div>
            </div>

            {/* Step 5 */}
            <div className="bg-white border border-slate-200 p-2 lg:p-3 rounded-lg shadow-sm relative z-10 flex flex-col mt-[-10px]">
               <div className="text-slate-200 text-3xl font-black absolute top-1 right-2 pointer-events-none">05</div>
               <div className="text-[8px] font-bold text-purple-500 mb-1">发布校验</div>
               <div className="text-[10px] lg:text-xs font-black text-slate-800 mb-1">以执行视角预览</div>
               <div className="text-[7px] lg:text-[8px] text-slate-500 mb-2 leading-tight">检查对象遗漏、规则冲突、消息触达</div>
               <div className="space-y-1 mt-auto">
                  <div className="flex justify-between text-[7px] bg-red-50 p-1"><span className="text-red-700">未分配业代</span><span className="text-red-600 font-bold">23家</span></div>
                  <div className="flex justify-between text-[7px] bg-emerald-50 p-1"><span className="text-emerald-700">预计触达</span><span className="text-emerald-600 font-bold">186人</span></div>
               </div>
               <div className="mt-2 text-[7px] text-red-500 font-medium">求助: 发布前依赖人工逐页核对和同事复查</div>
            </div>

         </div>

         {/* Right Panel: OUTPUT */}
         <div className="w-[180px] lg:w-[220px] xl:w-[260px] bg-white border border-slate-200 p-3 lg:p-4 flex flex-col shrink-0 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-8 bg-[#101014]"></div>
            <div className="text-[8px] lg:text-[10px] text-white font-bold mb-4 relative z-10">业代端 · 活动任务预览</div>
            
            <div className="text-[7px] lg:text-[8px] text-yellow-600 font-bold mb-1 mt-2">OUTPUT · 一线可执行任务</div>
            <h3 className="text-xs lg:text-sm font-black text-slate-800 leading-tight mb-2">冰饮重点门店<br/>陈列任务</h3>
            
            <div className="flex flex-wrap gap-1 mb-3">
               <span className="bg-slate-100 text-slate-500 px-1 py-0.5 text-[6px] lg:text-[7px] rounded">今日完成</span>
               <span className="bg-slate-100 text-slate-500 px-1 py-0.5 text-[6px] lg:text-[7px] rounded">A级门店</span>
               <span className="bg-slate-100 text-slate-500 px-1 py-0.5 text-[6px] lg:text-[7px] rounded">预计15分钟</span>
            </div>

            <div className="bg-[#FFFDF5] border border-[#FDE047]/30 p-2 mb-3">
               <div className="text-[8px] lg:text-[9px] font-bold text-slate-800 mb-1">本店执行要求</div>
               <div className="text-[7px] lg:text-[8px] text-slate-500 leading-snug">完成4层冰饮陈列；价签完整；提交门头、陈列全景、价签近景3张照片。</div>
            </div>

            <div className="text-[8px] lg:text-[9px] font-bold text-slate-800 mb-1">拍摄示例</div>
            <div className="flex gap-2 mb-3">
               <div className="flex-1 aspect-video bg-slate-200 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 bg-black/60 text-white text-[5px] px-1">全景</div>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=200&q=80')] bg-cover bg-center mix-blend-multiply opacity-50"></div>
               </div>
               <div className="flex-1 aspect-video bg-slate-200 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 bg-black/60 text-white text-[5px] px-1">价签</div>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e67056058e1?w=200&q=80')] bg-cover bg-center mix-blend-multiply opacity-50"></div>
               </div>
            </div>

            <div className="bg-[#101014] p-2 mb-3">
               <div className="text-yellow-400 text-[6px] lg:text-[7px] font-bold mb-0.5">完成激励</div>
               <div className="text-white text-[9px] lg:text-[10px] font-bold">检核通过后计入 ¥20</div>
            </div>

            <div className="mt-auto">
               <button className="w-full bg-[#FDE047] text-yellow-900 font-bold text-[9px] lg:text-[10px] py-2 rounded shadow-sm hover:brightness-95 transition-all">
                  确认并发布活动
               </button>
            </div>
            
            {/* Triangle pointer */}
            <div className="absolute top-1/2 -left-3 w-0 h-0 border-t-[10px] border-b-[10px] border-r-[12px] border-transparent border-r-white -translate-y-1/2 drop-shadow-sm"></div>
         </div>
      </div>

      {/* Bottom 3 Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 mt-3 lg:mt-4 shrink-0 z-10">
         {/* Panel 1 */}
         <div className="bg-white p-3 lg:p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center">
            <div className="text-[8px] lg:text-[9px] font-black text-yellow-600 tracking-wider mb-2">QUESTIONNAIRE SIGNAL · MOCK</div>
            <h3 className="text-xs lg:text-sm font-black text-slate-800 mb-3">问卷先发现高频现象</h3>
            <div className="space-y-2">
               <div className="flex items-center gap-3"><div className="text-yellow-500 font-black text-sm lg:text-base w-10">68%</div><div className="text-[8px] lg:text-[9px] text-slate-500">通常复制历史活动后逐项修改</div></div>
               <div className="flex items-center gap-3"><div className="text-yellow-500 font-black text-sm lg:text-base w-10">57%</div><div className="text-[8px] lg:text-[9px] text-slate-500">发布前仍需用Excel整理对象范围</div></div>
               <div className="flex items-center gap-3"><div className="text-yellow-500 font-black text-sm lg:text-base w-10">42%</div><div className="text-[8px] lg:text-[9px] text-slate-500">发布后发生过规则补充或范围修订</div></div>
            </div>
         </div>
         {/* Panel 2 */}
         <div className="bg-white p-3 lg:p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center">
            <div className="text-[8px] lg:text-[9px] font-black text-yellow-600 tracking-wider mb-2">1V1 TASK OBSERVATION</div>
            <h3 className="text-xs lg:text-sm font-black text-slate-800 mb-3">再观察为什么耗时</h3>
            <div className="grid grid-cols-2 gap-2 lg:gap-3">
               <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="font-bold text-slate-800 text-[9px] lg:text-[10px]">8位运营</div>
                  <div className="text-[7px] lg:text-[8px] text-slate-500 mt-1">保证操作路径可横向分层</div>
               </div>
               <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="font-bold text-slate-800 text-[9px] lg:text-[10px]">同一Brief</div>
                  <div className="text-[7px] lg:text-[8px] text-slate-500 mt-1">统一参考系以便横向比较</div>
               </div>
               <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="font-bold text-slate-800 text-[9px] lg:text-[10px]">45分钟配置</div>
                  <div className="text-[7px] lg:text-[8px] text-slate-500 mt-1">不提示路径，记录切换与停顿</div>
               </div>
               <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="font-bold text-slate-800 text-[9px] lg:text-[10px]">30分钟回顾</div>
                  <div className="text-[7px] lg:text-[8px] text-slate-500 mt-1">追问最近一次真实配置事件</div>
               </div>
            </div>
         </div>
         {/* Panel 3 */}
         <div className="bg-[#101014] p-3 lg:p-4 rounded-xl shadow-xl border border-white/5 flex flex-col justify-center text-white">
            <div className="text-[8px] lg:text-[9px] font-black text-yellow-400 tracking-wider mb-2">INITIAL HYPOTHESIS · 待验证</div>
            <h3 className="text-xs lg:text-sm font-black mb-3">阶段性判断</h3>
            <p className="text-[10px] lg:text-xs font-bold leading-relaxed mb-3 text-white/90">
               配置效率损耗可能不只来自字段多，而是<span className="text-yellow-400">运营需要在业务语言、对象数据、执行规则、质量标准与激励条件之间反复翻译、搬运和核对。</span>
            </p>
            <div className="mt-auto pt-2 border-t border-white/10 text-[7px] lg:text-[8px] text-white/40">
               下一步: 对照高效与低效样本的差异，配置结果和真实活动记录，验证哪些损耗来自产品机制，哪些来自企业自身流程。
            </div>
         </div>
      </div>
    </motion.div>
  );
}
