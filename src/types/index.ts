// 任务需求信息
export interface TaskRequirement {
  id: string;
  address: string;         // 地址（县一级城市或区）
  industry: string;        // 行业
  product: string;         // 产品（如GPHE）
  productModel: string;    // 产品型号（如M30）
  application: string;     // 应用（如Pretro）
  serviceType: string;     // 服务类型（如M5）
  standardHours: number;   // 标准工时
  startTime: string;       // 任务开始时间
  endTime: string;         // 任务结束时间
  peopleCount: number;     // 人数
}

// 工程师数据
export interface Engineer {
  id: string;
  name: string;
  location: string;           // 地点
  travelDistance: number;     // 差旅成本（交通距离km）
  dailyRate: number;          // 日费率
  skills: string[];           // 技能列表
  utilizationRate: number;    // 利用率 (%)
  customerExperience: number;  // 客户经验（服务次数）
  isAvailable: boolean;       // 是否可用
  avatar: string;             // 头像
  rank?: number;              // 推荐排名
  recommendationReason?: string; // 推荐理由
}

// 排班记录
export interface ScheduledTask {
  engineerId: string;
  engineerName: string;
  engineerAvatar: string;
  taskAddress: string;
  taskType: string;
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'in-progress' | 'flexible' | 'free';
}

// 受影响任务变更
export interface AffectedTaskChange {
  engineerName: string;
  engineerAvatar: string;
  originalTask: string;
  newArrangement: string;
  changeType: 'reassigned' | 'delayed' | 'added' | 'freed';
}

// 重排方案
export interface ReschedulePlan {
  planLabel?: string;
  urgentTaskInfo: string;
  assignedEngineers: { name: string; avatar: string; reason: string }[];
  affectedChanges: AffectedTaskChange[];
}

// 预排任务
export interface PreScheduleTask {
  id: string;
  address: string;
  product: string;
  productModel: string;
  serviceType: string;
  requiredSkills: string[];
  estimatedDays: number;
  headcount: number;
  timeWindowStart: string;
  timeWindowEnd: string;
  priority: 'normal' | 'urgent';
}

// 工程师周可用性
export interface EngineerDailyAvailability {
  date: string;
  dayLabel: string;
  status: 'free' | 'busy' | 'leave';
  note?: string;
}

export interface EngineerWeeklyAvailability {
  engineerId: string;
  engineerName: string;
  engineerAvatar: string;
  location: string;
  days: EngineerDailyAvailability[];
}

// 预排差旅费
export interface TravelCostEstimate {
  engineerName: string;
  fromCity: string;
  toCity: string;
  transportType: string;
  transportCost: number;
  hotelNights: number;
  hotelCostPerNight: number;
  localTaxiCost: number;
  totalCost: number;
}

// 预排结果
export interface PreScheduleAssignment {
  engineerName: string;
  engineerAvatar: string;
  startDate: string;
  endDate: string;
  reason: string;
  travelCost: TravelCostEstimate;
}

export interface PreScheduleResultItem {
  taskId: string;
  taskTitle: string;
  address: string;
  serviceType: string;
  estimatedDays: number;
  priority: 'normal' | 'urgent';
  assignedEngineers: PreScheduleAssignment[];
  totalCost: number;
}

export interface PreScheduleResultSet {
  totalEstimatedCost: number;
  results: PreScheduleResultItem[];
}

export interface PreScheduleSummary {
  totalTasks: number;
  involvedEngineers: number;
  totalEstimatedCost: number;
  crossWeekTasks: number;
  status: string;
}

// 周排班甘特总览
export interface WeeklyGanttTask {
  label: string;
  startDate: string;
  endDate: string;
  color: string;
}

export interface WeeklyGanttRow {
  engineerName: string;
  engineerAvatar: string;
  tasks: WeeklyGanttTask[];
}

export interface WeeklyGanttOverview {
  dateHeaders: string[];
  rows: WeeklyGanttRow[];
  totalTravelCost: number;
}

// 聊天消息类型
export type MessageContentType =
  | 'text'
  | 'engineer-list'
  | 'task-info'
  | 'system'
  | 'schedule-overview'
  | 'reschedule-plan'
  | 'change-summary'
  | 'pre-schedule-task-list'
  | 'engineer-weekly-availability'
  | 'pre-schedule-result'
  | 'pre-schedule-summary'
  | 'weekly-gantt-overview'
  | 'dispatch-quality-score'
  | 'utilization-dashboard'
  | 'travel-cost-monitor'
  | 'ot-compliance-alert'
  | 'capability-mapping'
  | 'weekly-report'
  | 'pending-feedback-list'
  | 'survey-push'
  | 'phone-callback'
  | 'feedback-summary'
  | 'feedback-anomaly-alert'
  | 'wechat-survey';

// 聊天消息
export interface ChatMessage {
  id: string;
  sender: 'dispatcher' | 'agent' | 'leader' | 'engineer' | 'system' | 'coordinator' | 'customer';
  senderName: string;
  senderAvatar: string;
  content: string;
  contentType: MessageContentType;
  timestamp: string;
  extraData?:
    | Engineer[]
    | TaskRequirement
    | ScheduledTask[]
    | ReschedulePlan
    | AffectedTaskChange[]
    | PreScheduleTask[]
    | EngineerWeeklyAvailability[]
    | PreScheduleResultSet
    | PreScheduleSummary
    | WeeklyGanttOverview
    | DispatchQualityReport
    | UtilizationDashboard
    | TravelCostMonitor
    | OTComplianceReport
    | CapabilityMappingReport
    | WeeklyReportData
    | PendingFeedbackList
    | SurveyPushData
    | PhoneCallbackData
    | FeedbackSummaryData
    | FeedbackAnomalyReport
    | WeChatSurveyData;
  mentionedUser?: string;  // @的用户
}

// 演示场景
export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  messages: ChatMessage[];
}

// Tab类型
export type TabType = 'tab1' | 'tab2' | 'tab3' | 'tab4' | 'tab5';

// ========== 智能分析报告数据类型 ==========

// 场景1：AI 派工合理性评分
export interface DispatchQualityRecord {
  id: string;
  date: string;
  taskAddress: string;
  assignedEngineer: string;
  assignedEngineerId: string;
  nearestEngineer: string;
  distanceDiff: number;       // 与最近工程师的距离差(km)
  isNearestEngineer: boolean;
  engineerWorkload: number;   // 指派工程师当月已累计工时(h)
  isLowWorkloadPriority: boolean;
  score: number;              // 0-100
  flagged: boolean;
  flagReason?: string;
}

export interface DispatchQualityReport {
  month: string;
  totalRecords: number;
  avgScore: number;
  flaggedCount: number;
  records: DispatchQualityRecord[];
}

// 场景2：多维度利用率看板
export interface UtilizationGroup {
  name: string;
  rate: number;
  headcount: number;
  type: 'industry' | 'region' | 'product' | 'service';
}

export interface UtilizationTeamDetail {
  teamName: string;
  rate: number;
  headcount: number;
  status: 'high' | 'normal' | 'low';
  suggestion: string;
}

export interface UtilizationDashboard {
  layer: 1 | 2 | 3;
  period: string;
  // 第一层
  overall?: number;
  target75?: number;
  target60?: number;
  // 第二层
  groupType?: 'industry' | 'region' | 'product' | 'service';
  groups?: UtilizationGroup[];
  // 第三层
  teams?: UtilizationTeamDetail[];
  adjustmentSuggestion?: string;
}

// 场景3：差旅成本监控
export interface TravelCostTrend {
  month: string;
  ratio: number;    // 差旅工时占比(%)
}

export interface TravelCostBreakdown {
  hotelCost: number;
  transportCost: number;
  allowance: number;
  total: number;
  overBudget: boolean;
}

export interface TravelCostMonitor {
  currentMonthRatio: number;
  lastMonthRatio: number;
  targetRatio: number;         // KPI目标(下降1个百分点)
  trend: TravelCostTrend[];
  breakdown: TravelCostBreakdown;
  topTravelEngineers: { name: string; travelDays: number; cost: number }[];
}

// 场景4：OT 合规预警
export interface OTAlert {
  engineerName: string;
  engineerAvatar: string;
  leaderId: string;
  leaderName: string;
  currentOT: number;           // 当月已累计OT工时(h)
  limit: number;               // 法定上限(36h)
  remainingAllowance: number;  // 剩余可用(h)
  projectedEndDate: string;    // 预计触线日期
  riskLevel: 'red' | 'orange' | 'green';
}

export interface OTComplianceReport {
  month: string;
  totalEngineers: number;
  alertCount: number;
  alerts: OTAlert[];
}

// 场景5：能力-区域需求 Mapping
export interface CapabilityCell {
  skill: string;
  region: string;
  demandScore: number;    // 需求热度 1-5
  supplyCount: number;    // 具备该技能工程师数量
  gap: 'shortage' | 'surplus' | 'balanced';
}

export interface CapabilityInsight {
  type: 'shortage' | 'surplus';
  description: string;
  recommendation: string;
}

export interface CapabilityMappingReport {
  skills: string[];
  regions: string[];
  matrix: CapabilityCell[];
  insights: CapabilityInsight[];
}

// 场景6：自动周报
export interface WeeklyKPI {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'flat';
  trendValue: string;
  status: 'good' | 'warning' | 'bad';
}

export interface WeeklyReportPush {
  type: 'group' | 'personal';
  recipientName: string;
  groupName?: string;
  message: string;
  kpis: WeeklyKPI[];
}

export interface WeeklyReportData {
  weekLabel: string;
  generatedAt: string;
  summary: string;
  kpis: WeeklyKPI[];
  pushPreviews: WeeklyReportPush[];
}

// ========== 智能反馈数据类型 ==========

// 待回访工单条目
export interface PendingFeedbackItem {
  workOrderId: string;
  customerName: string;
  engineerName: string;
  engineerAvatar: string;
  completedDate: string;
  daysSinceCompletion: number;
  channel: 'wechat' | 'phone';
  status: 'pending' | 'sent' | 'completed';
  serviceType: string;
  address: string;
}

export interface PendingFeedbackList {
  items: PendingFeedbackItem[];
  totalPending: number;
}

// 问卷推送数据
export interface SurveyPushData {
  workOrderId: string;
  customerName: string;
  engineerName: string;
  engineerAvatar: string;
  serviceType: string;
  serviceDate: string;
  channel: 'wechat' | 'phone';
  wechatGroupName?: string;
  pushStatus: 'sent' | 'pending' | 'delivered';
  pushTime: string;
  surveyLink?: string;
  feedbackReceived?: {
    rating: number;
    comment: string;
    submittedAt: string;
  };
}

// 电话回访录入数据
export interface PhoneCallbackData {
  workOrderId: string;
  customerName: string;
  engineerName: string;
  engineerAvatar: string;
  serviceType: string;
  serviceDate: string;
  coordinatorName: string;
  callTime: string;
  rating: number;
  issueCategories: string[];
  comment: string;
  needsFollowUp: boolean;
  saved: boolean;
}

// 满意度汇总
export interface FeedbackEngineerStat {
  engineerName: string;
  engineerAvatar: string;
  workOrderCount: number;
  avgRating: number;
  flaggedCount: number;
  responseRate: number;
}

export interface FeedbackSummaryData {
  period: string;
  totalWorkOrders: number;
  respondedCount: number;
  responseRate: number;
  avgRating: number;
  ratingDistribution: { rating: number; count: number; label: string }[];
  byEngineer: FeedbackEngineerStat[];
  wechatChannelCount: number;
  phoneChannelCount: number;
}

// 异常工单预警
export interface FeedbackAnomalyItem {
  workOrderId: string;
  customerName: string;
  engineerName: string;
  engineerAvatar: string;
  leaderName: string;
  leaderAvatar: string;
  rating: number;
  issueCategory: string;
  customerComment: string;
  serviceDate: string;
  alertSentAt: string;
  alertStatus: 'sent' | 'acknowledged' | 'resolved';
}

export interface FeedbackAnomalyReport {
  period: string;
  totalAnomalies: number;
  alerts: FeedbackAnomalyItem[];
}

// 客户端企微问卷
export interface WeChatSurveyDimension {
  key: string;
  label: string;
  rating: number;
}

export interface WeChatSurveyData {
  workOrderId: string;
  engineerName: string;
  serviceType: string;
  serviceDate: string;
  dimensions: WeChatSurveyDimension[];
  overallRating: number;
  comment: string;
  submitted: boolean;
  submittedAt?: string;
}