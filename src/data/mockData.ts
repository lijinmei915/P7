import { RefreshCw, Gauge, LayoutDashboard } from 'lucide-react';

export const cases = [
  {
    id: '01',
    title: '营销活动质量管控',
    tags: ['活动全生命周期', '流程重构', '多角色'],
    icon: RefreshCw,
    description: '重构 SOP，打通管理者-运营-执行者协作链路，实现活动全生命周期闭环',
    isActive: true,
  },
  {
    id: '02',
    title: 'LiveBoard | Report',
    tags: ['数据赋能', '动态可视化', '千人千面'],
    icon: Gauge,
    description: 'Agent对话交互形式，结合 Skill 工具链动态生成可视化看板/报告',
    isActive: true,
  },
  {
    id: '03',
    title: 'AI组件库 | 生成式UI',
    tags: ['语义化组件', '新交互范式', '重构工作流'],
    icon: LayoutDashboard,
    description: 'AI 可读业务组件体系，驱动生成式 UI，重构产品交付，革新人机协同',
    isActive: false,
  },
];


export 
const steps = [
  { id: '01', title: '活动方案', desc: '公司确认具体方案', tags: ['营销活动系统'] },
  { id: '02', title: '活动申请', desc: '经销商申请参加活动', tags: ['营销活动系统'] },
  { id: '03', title: '活动协议', desc: '业代与门店签署协议', tags: ['营销活动系统', '外勤'] },
  { id: '04', title: '活动举证', desc: '业代举证执行数据', tags: ['营销活动系统', '外勤'] },
  { id: '05', title: '活动检核', desc: '市场检核执行情况', tags: ['营销活动系统', '外勤'] },
  { id: '06', title: '费用核销', desc: '经销商给门店核销费用', tags: ['预算系统'] },
  { id: '07', title: '门店费用发放', desc: '经销商给门店发放费用', tags: ['预算系统'] },
  { id: '08', title: '经销商费用核销', desc: '品牌商给经销商核销费用', tags: ['预算系统'] },
  { id: '09', title: '财务核算', desc: '财务生成相关凭证', tags: ['财务系统'] },
  { id: '10', title: '经营分析', desc: 'ROI及有效性评估', tags: ['BI系统'] }
];

