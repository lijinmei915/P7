import React from 'react';
import { 
  Users, Clock, MonitorSmartphone, ArrowDown,
  AlertTriangle, AlertCircle, XCircle, FileSpreadsheet, RefreshCw, 
  MessageSquareWarning, Ban, Sparkles, Layers, ShieldAlert, ZapOff
} from 'lucide-react';
import StandardPageLayout from '../components/StandardPageLayout';

export default function TaskDecisionPage({ onBack }: { onBack?: () => void }) {
  const methodStrip = (
    <div className="flex items-center gap-4 bg-white/80 border border-slate-200/70 shadow-sm px-3.5 py-1.5 rounded-xl shrink-0">
      <div className="text-[11px] font-black text-[var(--color-primary)] tracking-widest uppercase border-r border-slate-200 pr-3">Method</div>
      <div className="flex gap-3 text-[11px] text-slate-600 font-medium">
        <div className="flex items-center gap-1"><Users className="w-3 h-3 text-slate-400"/> 6位管理者</div>
        <div className="flex items-center gap-1"><MonitorSmartphone className="w-3 h-3 text-slate-400"/> 20min 观察</div>
        <div className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400"/> 30min 访谈</div>
      </div>
    </div>
  );

  return (
    <StandardPageLayout
      pageKey="taskDecision"
      phaseTitle="PHASE 02 / TASK DECISION MAP"
      pageNumber="10"
      title="从一次异常定位任务，还原管理者改版前的7步判断与断裂卡点"
      subtitle="以典型个案 M03 展开：还原管理者在缺乏数字化闭环工具时，如何依靠肉身跨系统搬砖、抽丝剥茧与在断点中艰难决策。"
      onBack={onBack}
      titleRight={methodStrip}
      contentClassName="flex-1 flex flex-col gap-2.5 lg:gap-3 min-h-0 relative z-10 overflow-hidden"
    >
      {/* Layer 1: MACRO LEVEL (01-02 宏观大盘与报警断层) */}
        <div className="rounded-2xl p-2.5 lg:p-3 bg-white/85 backdrop-blur-xl border border-white shadow-[0_4px_20px_rgba(24,83,255,0.06)] relative overflow-hidden flex flex-col md:flex-row items-center gap-3 shrink-0">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[var(--color-primary)]"></div>
          
          <div className="flex items-center gap-3 shrink-0 md:w-56">
            <div className="w-7 h-7 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center font-black text-xs shadow-md shrink-0">
              L1
            </div>
            <div>
              <div className="text-[11px] font-black tracking-widest text-[var(--color-primary)] uppercase">MACRO · 宏观大盘</div>
              <div className="text-xs font-black text-slate-800">01-02 战局感知与紧迫性</div>
            </div>
          </div>

          {/* Business Core Metric Context */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2.5 w-full">
            <div className="bg-[#F8FAFC] border border-slate-200/70 p-2 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">S级战略战役异动</div>
                <div className="text-xs font-black text-slate-800 mt-0.5">夏季冰饮专案 (预算42%)</div>
              </div>
              <span className="bg-red-50 text-red-500 font-black text-[11px] px-2 py-0.5 rounded-full border border-red-200/50">
                ROI -18% (破红线)
              </span>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200/70 p-2 rounded-xl flex items-center justify-around text-center">
              <div>
                <div className="text-xs font-black text-slate-800">12/30 天</div>
                <div className="text-[11px] text-slate-400 font-bold">时间过1/3</div>
              </div>
              <div className="w-px h-6 bg-slate-200"></div>
              <div>
                <div className="text-xs font-black text-red-500">72%</div>
                <div className="text-[11px] text-slate-400 font-bold">费用已烧</div>
              </div>
              <div className="w-px h-6 bg-slate-200"></div>
              <div>
                <div className="text-xs font-black text-slate-700">需踩刹车</div>
                <div className="text-[11px] text-slate-400 font-bold">严重超耗</div>
              </div>
            </div>

            {/* Pain Point Callout 1 */}
            <div className="bg-amber-50/80 border border-amber-200/80 p-2 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-black text-amber-800 uppercase flex items-center gap-1">
                  改版前痛点①：报警严重滞后 · 噪音淹没
                </div>
                <div className="text-[11px] text-amber-700 leading-snug mt-0.5">
                  日常数十张报表同时飘红，靠肉眼翻查；已烧掉72%预算才被动发现，错失前置预警黄金期。
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 2: MESO LEVEL (03-05 归因透镜与证据断层 - 漏斗主体) */}
        <div className="flex-1 grid grid-cols-12 gap-3 min-h-0">
          
          {/* Step 03: 空间收窄 */}
          <div className="col-span-12 md:col-span-4 bg-white/85 backdrop-blur-xl border border-white rounded-2xl p-3 flex flex-col shadow-sm justify-between min-h-0">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-black tracking-widest text-[var(--color-primary)] uppercase">03 · 锁定异常范围</span>
                <span className="text-[11px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded">多维切片</span>
              </div>
              <div className="text-xs font-black text-slate-800 mb-2">下钻大区，找出失血源头</div>

              <div className="space-y-1.5">
                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between text-[11px] text-slate-500">
                  <span>华北大区</span><span>费用77% / 销69% (正常)</span>
                </div>
                <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)] flex justify-between items-center text-[11px] font-black text-[var(--color-primary)] shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span>华东大区 (严重失血)</span>
                  </div>
                  <span className="text-red-500 font-black">销46% (拖累全盘)</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between text-[11px] text-slate-500">
                  <span>华南大区</span><span>费用71% / 销66% (正常)</span>
                </div>
              </div>
            </div>

            {/* Pain Point Callout 2 */}
            <div className="mt-2.5 p-2 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-black text-amber-800">改版前痛点②：跨系统人肉拼接数据</div>
                <div className="text-[11px] text-amber-700 leading-tight mt-0.5">
                  切片大区需跨财务、ERP与分销系统导3张表Excel比对，定位单一大区耗时超过40分钟。
                </div>
              </div>
            </div>
          </div>

          {/* Step 04: 并列假设 */}
          <div className="col-span-12 md:col-span-4 bg-white/85 backdrop-blur-xl border border-white rounded-2xl p-3 flex flex-col shadow-sm justify-between min-h-0">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-black tracking-widest text-[var(--color-primary)] uppercase">04 · 建立并列假设</span>
                <span className="text-[11px] bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold px-1.5 py-0.5 rounded">归因假设树</span>
              </div>
              <div className="text-xs font-black text-slate-800 mb-2">不盲目追责，形成可验证假设</div>

              <div className="space-y-1.5">
                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-700">假设 A：策略力度不匹配</div>
                    <div className="text-[11px] text-slate-400">竞品降价 / 折扣门槛偏高</div>
                  </div>
                  <span className="text-[11px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold">待验</span>
                </div>

                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-700">假设 B：终端供货断货</div>
                    <div className="text-[11px] text-slate-400">经销商缺货无销量</div>
                  </div>
                  <span className="text-[11px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold">待验</span>
                </div>

                <div className="p-1.5 rounded-lg bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-black text-[var(--color-primary)]">假设 C：门店陈列质量作假</div>
                    <div className="text-[11px] text-slate-500">陈列未达标 / 虚假摆拍</div>
                  </div>
                  <span className="text-[11px] bg-[var(--color-primary)] text-white px-1.5 py-0.5 rounded font-bold">重点</span>
                </div>
              </div>
            </div>

            {/* Pain Point Callout 3 */}
            <div className="mt-2.5 p-2 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-1.5">
              <ZapOff className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-black text-amber-800">改版前痛点③：归因全凭主观拍脑袋</div>
                <div className="text-[11px] text-amber-700 leading-tight mt-0.5">
                  系统无历史异常智能聚类，老管理者凭经验猜，新管理者盲目责怪业代，归因缺乏结构化推导。
                </div>
              </div>
            </div>
          </div>

          {/* Step 05: 证据验真收敛 */}
          <div className="col-span-12 md:col-span-4 bg-white/85 backdrop-blur-xl border border-white rounded-2xl p-3 flex flex-col shadow-sm justify-between min-h-0">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-black tracking-widest text-[var(--color-primary)] uppercase">05 · 多维证据矩阵核对</span>
                <span className="text-[11px] bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded border border-red-100">真凶锁定</span>
              </div>
              <div className="text-xs font-black text-slate-800 mb-2">多源数据现场交叉比对</div>

              <div className="grid grid-cols-2 gap-1.5">
                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-slate-400">进销存</span>
                    <span className="text-[11px] text-slate-500 font-bold bg-slate-200 px-1 rounded">排除断货</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 mt-1">缺货率仅 8% (正常)</div>
                </div>

                <div className="p-1.5 rounded-lg bg-red-50/70 border border-red-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-red-500">重点店覆盖</span>
                    <span className="text-[11px] text-red-600 font-bold bg-red-100 px-1 rounded">致命漏洞</span>
                  </div>
                  <div className="text-[11px] font-black text-red-600 mt-1">A类店覆盖率仅 38%</div>
                </div>

                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-slate-400">打卡率</span>
                    <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-1 rounded">虚假繁荣</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 mt-1">提交率看似 86%</div>
                </div>

                <div className="p-1.5 rounded-lg bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-amber-600">照片复核</span>
                    <span className="text-[11px] text-amber-700 font-bold bg-amber-100 px-1 rounded">人工盲区</span>
                  </div>
                  <div className="text-[11px] font-black text-amber-700 mt-1">34% 照片重复/假拍</div>
                </div>
              </div>
            </div>

            {/* Pain Point Callout 4 */}
            <div className="mt-2 p-2 rounded-xl bg-red-50/80 border border-red-200 flex items-start gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-black text-red-800">改版前痛点④：证据链孤岛 · 人工复核失效</div>
                <div className="text-[11px] text-red-700 leading-tight mt-0.5">
                  系统无AI质检，数十万张陈列照全靠抽检，86%的高打卡率掩盖了34%假执行与核心店失守。
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Layer 3: MICRO LEVEL (06-07 决策派单与闭环缺失断层) */}
        <div className="rounded-2xl p-2.5 lg:p-3 bg-[#1E293B] text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-4 shrink-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary)] via-[#38BDF8] to-amber-500"></div>
          
          {/* Step 06 动作派发与痛点 */}
          <div className="flex-1 w-full flex flex-col md:flex-row items-start md:items-center gap-3 border-b md:border-b-0 md:border-r border-slate-700/60 pb-3 md:pb-0 md:pr-4">
            <div className="w-7 h-7 rounded-xl bg-[#38BDF8] text-slate-900 flex items-center justify-center font-black text-xs shrink-0">
              06
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-black text-[#38BDF8] uppercase tracking-wider">06 ACTION · 责权利交割动作</div>
              <div className="text-xs font-bold text-white mt-0.5">区经督导：24h内重新举证，停拨争议补贴</div>
              
              {/* Pain Point 5 */}
              <div className="flex items-center gap-1.5 text-[11px] text-amber-300 mt-1.5 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                <MessageSquareWarning className="w-3 h-3 text-amber-400 shrink-0" />
                <span>改版前痛点⑤：微信群口头叮嘱，缺乏任务工单流转与权责留痕</span>
              </div>
            </div>
          </div>

          {/* Step 07 闭环追踪与痛点 */}
          <div className="w-full md:w-56 shrink-0 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-700/60 pb-3 md:pb-0 md:pr-4">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider">07 CLOSE LOOP · 结果闭环</div>
            <div className="text-xs font-bold text-white mt-0.5">跟踪质量回升与ROI止跌</div>
            {/* Pain Point 6 */}
            <div className="text-[11px] text-amber-300 mt-1 flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-md">
              <Ban className="w-3 h-3 text-amber-400 shrink-0" />
              <span>改版前痛点⑥：无回升自动销项机制，不了了之</span>
            </div>
          </div>

          {/* 阶段性核心诊断结论 (为后续产品解法直接铺垫) */}
          <div className="w-full md:w-80 shrink-0">
            <div className="text-[11px] font-black text-[#38BDF8] tracking-widest uppercase flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
              AS-IS DIAGNOSIS · 核心断层诊断
            </div>
            <p className="text-[11px] lg:text-[11px] font-medium text-white/90 leading-snug">
              并非管理者缺少业务判断力，而是旧系统导致<span className="text-[#38BDF8] font-bold">“大盘告警、归因下钻、真实证据、行动交割”四层严重脱节</span>，沦为肉身高成本救火。
            </p>
            <div className="text-[11px] text-white/40 mt-1.5">
              ➔ 对应后续产品解法：智能分级雷达 + 一键下钻树 + AI证据中台 + 闭环工单
            </div>
          </div>
        </div>
    </StandardPageLayout>
  );
}
