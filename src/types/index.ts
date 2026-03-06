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

// 聊天消息类型
export type MessageContentType = 'text' | 'engineer-list' | 'task-info' | 'system';

// 聊天消息
export interface ChatMessage {
  id: string;
  sender: 'dispatcher' | 'agent' | 'leader' | 'engineer' | 'system';
  senderName: string;
  senderAvatar: string;
  content: string;
  contentType: MessageContentType;
  timestamp: string;
  extraData?: Engineer[] | TaskRequirement;  // 额外数据（工程师列表或任务信息）
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
export type TabType = 'tab1' | 'tab2';