import fs from 'fs';
let code = fs.readFileSync('src/pages/SurveyPage.tsx', 'utf8');

const targetStr = `          {/* Black Funnel & Yellow Box (Footer of left column) */}
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
          </div>`;

const replaceStr = `          {/* Black Funnel (Footer of left column) */}
          <div className="mt-auto flex flex-col shrink-0 pb-4">
             {/* Black Trapeze */}
             <div className="bg-[#111318] rounded-xl p-4 xl:p-5 text-center relative shadow-lg">
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
          </div>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/pages/SurveyPage.tsx', code);
  console.log("Replaced successfully");
} else {
  console.log("Could not find the target string!");
}
