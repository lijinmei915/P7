const names: Record<string, string> = {
  directory: '目录一', chapter: '案例一封面', insight1: '行业洞察', insight2: '现有流程',
  persona: '关键角色', survey: '业务调研', signal: '信息传递', taskDecision: '任务决策',
  operatorStudy: '运营研究', userJourney: '用户旅程', rootCause: '问题归因', bizModel: '业务模型',
  solutionMap: '方案全景', directory2: '目录二', chapter2: '案例二封面', directory3: '目录三', chapter3: '案例三封面', ending: '结束页',
};
export const pageName = (id: string) => names[id] || id;
