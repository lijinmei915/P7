import fs from 'fs';
let code = fs.readFileSync('src/pages/SurveyPage.tsx', 'utf8');

const startMarker = '{/* Left Column (Main Process) */}';
const endMarker = '{/* Right Column (Evidence Images) */}';

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newLeftColumn = `{/* Left Column (Main Process) */}
        <div className="flex-[1.3] xl:flex-[1.4] flex flex-col min-w-0 pr-0 lg:pr-6 xl:pr-8 border-r-0 lg:border-r border-slate-100 overflow-y-auto hide-scrollbar pt-2">
          
          {/* Header */}
          <div className="mb-6 shrink-0">
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-black text-slate-800 tracking-tight mb-3 leading-snug">
              56道题完整统计，<br/>收敛出4个需要深入验证的方向
            </h2>
            <p className="text-slate-500 text-[13px] xl:text-sm font-medium leading-relaxed">
              主页面不罗列全部答案，而是依据统一规则，从 286 份有效问卷中筛出 8 个关键结果；每个结果都能回到题号、匿名答卷、人数和分母。
            </p>
          </div>

          {/* Condensed Funnel (The original 420->312->286) */}
          <div className="flex items-center justify-between bg-slate-50/50 p-4 rounded-xl border border-slate-100 mb-6 shrink-0">
             <div className="flex flex-col">
               <span className="text-[10px] text-slate-400 font-bold mb-0.5">定向发放</span>
               <span className="text-xl font-black text-slate-400">420</span>
             </div>
             <div className="flex-1 px-4 flex flex-col items-center">
               <span className="text-[9px] font-bold text-slate-400 mb-1">回收 74.3%</span>
               <div className="w-full h-px bg-slate-200 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 border-t border-r border-slate-300 rotate-45" /></div>
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] text-slate-500 font-bold mb-0.5">完成提交</span>
               <span className="text-2xl font-black text-slate-700">312</span>
             </div>
             <div className="flex-1 px-4 flex flex-col items-center">
               <span className="text-[9px] font-bold text-[#1853FF] mb-1">有效 91.7%</span>
               <div className="w-full h-[2px] bg-[#1853FF]/20 relative"><div className="absolute left-0 top-0 h-full bg-[#1853FF] w-full" /><div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#1853FF] rotate-45" /></div>
             </div>
             <div className="flex flex-col">
               <span className="text-[11px] text-[#1853FF] font-bold mb-0.5">有效样本</span>
               <span className="text-3xl font-black text-slate-900">286</span>
             </div>
          </div>

          {/* Insights - 3 Columns */}
          <div className="flex flex-col gap-4 mb-6 shrink-0">
            <div className="grid grid-cols-3 gap-3 xl:gap-4">
               {/* Role 1 */}
               <div className="flex flex-col gap-3">
                  <div className="border-b-[3px] border-slate-800 pb-2">
                    <div className="font-bold text-slate-800 text-[13px] xl:text-sm">管理者</div>
                    <div className="text-[10px] xl:text-[11px] text-slate-500 mt-0.5">52人 · 18题</div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <div className="bg-white border border-slate-100 p-2 xl:p-2.5 rounded shadow-sm">
                        <div className="flex items-baseline gap-1.5 mb-1">
                           <span className="text-base xl:text-lg font-black text-slate-800">67%</span>
                           <span className="text-[9px] xl:text-[10px] font-bold text-slate-400">M10</span>
                        </div>
                        <div className="text-[11px] xl:text-xs font-bold text-slate-700 leading-tight">需要查看3个及以上位置</div>
                     </div>
                     <div className="bg-white border border-slate-100 p-2 xl:p-2.5 rounded shadow-sm">
                        <div className="flex items-baseline gap-1.5 mb-1">
                           <span className="text-base xl:text-lg font-black text-slate-800">64%</span>
                           <span className="text-[9px] xl:text-[10px] font-bold text-slate-400">M16</span>
                        </div>
                        <div className="text-[11px] xl:text-xs font-bold text-slate-700 leading-tight">难区分策略与执行问题</div>
                     </div>
                  </div>
               </div>

               {/* Role 2 */}
               <div className="flex flex-col gap-3">
                  <div className="border-b-[3px] border-slate-400 pb-2">
                    <div className="font-bold text-slate-800 text-[13px] xl:text-sm">运营人员</div>
                    <div className="text-[10px] xl:text-[11px] text-slate-500 mt-0.5">86人 · 20题</div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <div className="bg-white border border-slate-100 p-2 xl:p-2.5 rounded shadow-sm">
                        <div className="flex items-baseline gap-1.5 mb-1">
                           <span className="text-base xl:text-lg font-black text-slate-800">73%</span>
                           <span className="text-[9px] xl:text-[10px] font-bold text-slate-400">O12</span>
                        </div>
                        <div className="text-[11px] xl:text-xs font-bold text-slate-700 leading-tight">使用企微或Excel补充状态</div>
                     </div>
                     <div className="bg-white border border-slate-100 p-2 xl:p-2.5 rounded shadow-sm">
                        <div className="flex items-baseline gap-1.5 mb-1">
                           <span className="text-base xl:text-lg font-black text-slate-800">64%</span>
                           <span className="text-[9px] xl:text-[10px] font-bold text-slate-400">O14</span>
                        </div>
                        <div className="text-[11px] xl:text-xs font-bold text-slate-700 leading-tight">难区分提交与检核通过</div>
                     </div>
                     <div className="bg-white border border-slate-100 p-2 xl:p-2.5 rounded shadow-sm">
                        <div className="flex items-baseline gap-1.5 mb-1">
                           <span className="text-base xl:text-lg font-black text-slate-800">58%</span>
                           <span className="text-[9px] xl:text-[10px] font-bold text-slate-400">O18</span>
                        </div>
                        <div className="text-[11px] xl:text-xs font-bold text-slate-700 leading-tight">仍需人工解释举证标准</div>
                     </div>
                  </div>
               </div>

               {/* Role 3 */}
               <div className="flex flex-col gap-3">
                  <div className="border-b-[3px] border-[#FFD600] pb-2">
                    <div className="font-bold text-slate-800 text-[13px] xl:text-sm">业代</div>
                    <div className="text-[10px] xl:text-[11px] text-slate-500 mt-0.5">148人 · 18题</div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <div className="bg-white border border-slate-100 p-2 xl:p-2.5 rounded shadow-sm">
                        <div className="flex items-baseline gap-1.5 mb-1">
                           <span className="text-base xl:text-lg font-black text-slate-800">42%</span>
                           <span className="text-[9px] xl:text-[10px] font-bold text-slate-400">R13</span>
                        </div>
                        <div className="text-[11px] xl:text-xs font-bold text-slate-700 leading-tight">现场遇到拍照不合格</div>
                     </div>
                     <div className="bg-white border border-slate-100 p-2 xl:p-2.5 rounded shadow-sm">
                        <div className="flex items-baseline gap-1.5 mb-1">
                           <span className="text-base xl:text-lg font-black text-slate-800">57%</span>
                           <span className="text-[9px] xl:text-[10px] font-bold text-slate-400">R15</span>
                        </div>
                        <div className="text-[11px] xl:text-xs font-bold text-slate-700 leading-tight">1天以上才知道结果</div>
                     </div>
                     <div className="bg-white border border-slate-100 p-2 xl:p-2.5 rounded shadow-sm">
                        <div className="flex items-baseline gap-1.5 mb-1">
                           <span className="text-base xl:text-lg font-black text-slate-800">49%</span>
                           <span className="text-[9px] xl:text-[10px] font-bold text-slate-400">R17</span>
                        </div>
                        <div className="text-[11px] xl:text-xs font-bold text-slate-700 leading-tight">看不清审核与奖励进度</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Black Funnel & Yellow Box (Footer of left column) */}
          <div className="mt-auto flex flex-col shrink-0 pb-4">
             {/* Black Trapeze */}
             <div className="bg-[#111318] rounded-t-xl p-4 xl:p-5 text-center relative shadow-lg">
                <div className="text-[#FFD600] text-[10px] xl:text-[11px] font-bold mb-3 xl:mb-4 tracking-wider">
                   8项关键结果不是根因，而是4个待验证方向
                </div>
                <div className="grid grid-cols-4 gap-1 xl:gap-2 divide-x divide-white/10">
                   <div className="px-1">
                      <div className="font-bold text-white text-[11px] xl:text-xs mb-1">结果解释</div>
                      <div className="text-[9px] text-white/50 leading-tight">管理者异常下钻</div>
                   </div>
                   <div className="px-1">
                      <div className="font-bold text-white text-[11px] xl:text-xs mb-1">规则与传递</div>
                      <div className="text-[9px] text-white/50 leading-tight">运营配置与协调</div>
                   </div>
                   <div className="px-1">
                      <div className="font-bold text-white text-[11px] xl:text-xs mb-1">质量确认</div>
                      <div className="text-[9px] text-white/50 leading-tight">现场作业与举证</div>
                   </div>
                   <div className="px-1">
                      <div className="font-bold text-white text-[11px] xl:text-xs mb-1">反馈与激励</div>
                      <div className="text-[9px] text-white/50 leading-tight">退回审核与奖励</div>
                   </div>
                </div>
             </div>
             {/* Yellow Box */}
             <div className="bg-[#FFD600] rounded-b-xl p-3 xl:p-4 text-center shadow-lg">
                <div className="text-[9px] xl:text-[10px] font-bold text-slate-800/60 uppercase tracking-widest mb-1">
                   Next Research Step
                </div>
                <div className="text-base xl:text-lg font-black text-slate-900 tracking-tight">
                   选择26位差异样本进入真实任务走查
                </div>
                <div className="text-[9px] xl:text-[10px] font-medium text-slate-800/70 mt-1">
                   验证问题具体发生在哪个页面、动作和角色交接中
                </div>
             </div>
          </div>

        </div>
        `;
  code = code.substring(0, startIndex) + newLeftColumn + code.substring(endIndex);
  fs.writeFileSync('src/pages/SurveyPage.tsx', code);
  console.log('Replaced left column successfully');
} else {
  console.log('Could not find markers');
}
