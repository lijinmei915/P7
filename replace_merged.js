import fs from 'fs';
let code = fs.readFileSync('src/pages/SurveyPage.tsx', 'utf8');

const startMarker = '{/* Insights - 3 Columns */}';
const endMarker = '          </div>\n\n        </div>';

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `{/* Merged Insights & Directions - 4 Columns */}
          <div className="flex flex-col mt-2 mb-2 shrink-0 border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-slate-50/50">
             {/* Header */}
             <div className="bg-[#111318] p-3 xl:p-4 flex flex-col items-center justify-center border-b border-slate-800">
                <div className="text-[#FFD600] text-[11px] xl:text-[12px] font-bold tracking-widest mb-2">
                   8项关键结果不是根因，而是4个待验证方向
                </div>
                <div className="flex gap-4 text-[10px] text-white/50 font-medium">
                   <span>M: 管理者</span>
                   <span>O: 运营人员</span>
                   <span>R: 业代</span>
                </div>
             </div>
             
             {/* 4 Columns Grid */}
             <div className="grid grid-cols-4 divide-x divide-slate-200">
                
                {/* Column 1 */}
                <div className="p-3 xl:p-4 flex flex-col h-full bg-white/50">
                   <div className="mb-4">
                      <div className="font-bold text-slate-800 text-[12px] xl:text-[13px] mb-1">结果解释</div>
                      <div className="text-[10px] xl:text-[11px] text-slate-500 leading-tight">管理者异常下钻</div>
                   </div>
                   <div className="flex flex-col gap-2.5 mt-auto">
                      {/* M10 */}
                      <div className="bg-white border border-slate-200 p-2 xl:p-2.5 rounded shadow-sm">
                         <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-base xl:text-lg font-black text-slate-800 leading-none">67%</span>
                            <span className="text-[9px] font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded-sm leading-none">M10</span>
                         </div>
                         <div className="text-[10px] xl:text-[11px] font-bold text-slate-700 leading-snug">需要查看3个及以上位置</div>
                      </div>
                      {/* M16 */}
                      <div className="bg-white border border-slate-200 p-2 xl:p-2.5 rounded shadow-sm">
                         <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-base xl:text-lg font-black text-slate-800 leading-none">64%</span>
                            <span className="text-[9px] font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded-sm leading-none">M16</span>
                         </div>
                         <div className="text-[10px] xl:text-[11px] font-bold text-slate-700 leading-snug">难区分策略与执行问题</div>
                      </div>
                   </div>
                </div>

                {/* Column 2 */}
                <div className="p-3 xl:p-4 flex flex-col h-full bg-white/50">
                   <div className="mb-4">
                      <div className="font-bold text-slate-800 text-[12px] xl:text-[13px] mb-1">规则与传递</div>
                      <div className="text-[10px] xl:text-[11px] text-slate-500 leading-tight">运营配置与协调</div>
                   </div>
                   <div className="flex flex-col gap-2.5 mt-auto">
                      {/* O12 */}
                      <div className="bg-white border border-slate-200 p-2 xl:p-2.5 rounded shadow-sm">
                         <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-base xl:text-lg font-black text-slate-800 leading-none">73%</span>
                            <span className="text-[9px] font-bold text-white bg-slate-500 px-1.5 py-0.5 rounded-sm leading-none">O12</span>
                         </div>
                         <div className="text-[10px] xl:text-[11px] font-bold text-slate-700 leading-snug">使用企微或Excel补充状态</div>
                      </div>
                      {/* O14 */}
                      <div className="bg-white border border-slate-200 p-2 xl:p-2.5 rounded shadow-sm">
                         <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-base xl:text-lg font-black text-slate-800 leading-none">64%</span>
                            <span className="text-[9px] font-bold text-white bg-slate-500 px-1.5 py-0.5 rounded-sm leading-none">O14</span>
                         </div>
                         <div className="text-[10px] xl:text-[11px] font-bold text-slate-700 leading-snug">难区分提交与检核通过</div>
                      </div>
                   </div>
                </div>

                {/* Column 3 */}
                <div className="p-3 xl:p-4 flex flex-col h-full bg-white/50">
                   <div className="mb-4">
                      <div className="font-bold text-slate-800 text-[12px] xl:text-[13px] mb-1">质量确认</div>
                      <div className="text-[10px] xl:text-[11px] text-slate-500 leading-tight">现场作业与举证</div>
                   </div>
                   <div className="flex flex-col gap-2.5 mt-auto">
                      {/* O18 */}
                      <div className="bg-white border border-slate-200 p-2 xl:p-2.5 rounded shadow-sm">
                         <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-base xl:text-lg font-black text-slate-800 leading-none">58%</span>
                            <span className="text-[9px] font-bold text-white bg-slate-500 px-1.5 py-0.5 rounded-sm leading-none">O18</span>
                         </div>
                         <div className="text-[10px] xl:text-[11px] font-bold text-slate-700 leading-snug">仍需人工解释举证标准</div>
                      </div>
                      {/* R13 */}
                      <div className="bg-white border border-slate-200 p-2 xl:p-2.5 rounded shadow-sm">
                         <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-base xl:text-lg font-black text-slate-800 leading-none">42%</span>
                            <span className="text-[9px] font-bold text-slate-900 bg-[#FFD600] px-1.5 py-0.5 rounded-sm leading-none">R13</span>
                         </div>
                         <div className="text-[10px] xl:text-[11px] font-bold text-slate-700 leading-snug">现场遇到拍照不合格</div>
                      </div>
                   </div>
                </div>

                {/* Column 4 */}
                <div className="p-3 xl:p-4 flex flex-col h-full bg-white/50">
                   <div className="mb-4">
                      <div className="font-bold text-slate-800 text-[12px] xl:text-[13px] mb-1">反馈与激励</div>
                      <div className="text-[10px] xl:text-[11px] text-slate-500 leading-tight">退回审核与奖励</div>
                   </div>
                   <div className="flex flex-col gap-2.5 mt-auto">
                      {/* R15 */}
                      <div className="bg-white border border-slate-200 p-2 xl:p-2.5 rounded shadow-sm">
                         <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-base xl:text-lg font-black text-slate-800 leading-none">57%</span>
                            <span className="text-[9px] font-bold text-slate-900 bg-[#FFD600] px-1.5 py-0.5 rounded-sm leading-none">R15</span>
                         </div>
                         <div className="text-[10px] xl:text-[11px] font-bold text-slate-700 leading-snug">1天以上才知道结果</div>
                      </div>
                      {/* R17 */}
                      <div className="bg-white border border-slate-200 p-2 xl:p-2.5 rounded shadow-sm">
                         <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-base xl:text-lg font-black text-slate-800 leading-none">49%</span>
                            <span className="text-[9px] font-bold text-slate-900 bg-[#FFD600] px-1.5 py-0.5 rounded-sm leading-none">R17</span>
                         </div>
                         <div className="text-[10px] xl:text-[11px] font-bold text-slate-700 leading-snug">看不清审核与奖励进度</div>
                      </div>
                   </div>
                </div>

             </div>
`;
  code = code.substring(0, startIndex) + replacement + code.substring(endIndex);
  fs.writeFileSync('src/pages/SurveyPage.tsx', code);
  console.log("Replacement merged perfectly.");
} else {
  console.log("Could not find markers.");
}
