import React from 'react';
import { motion } from 'framer-motion';
import type {
  ChatMessage as ChatMessageType,
  Engineer,
  TaskRequirement,
  ScheduledTask,
  ReschedulePlan,
  AffectedTaskChange,
  PreScheduleTask,
  EngineerWeeklyAvailability,
  PreScheduleResultSet,
  PreScheduleSummary,
  WeeklyGanttOverview,
  DispatchQualityReport,
  UtilizationDashboard,
  TravelCostMonitor,
  OTComplianceReport,
  CapabilityMappingReport,
  WeeklyReportData,
  PendingFeedbackList,
  SurveyPushData,
  PhoneCallbackData,
  FeedbackSummaryData,
  FeedbackAnomalyReport,
  WeChatSurveyData,
} from '../../types/index.ts';
import EngineerList from './EngineerList';
import TaskInfoCard from '../TaskInfoCard';
import ScheduleOverviewCard from '../ScheduleOverviewCard';
import ReschedulePlanCard from '../ReschedulePlanCard';
import ChangeSummaryCard from '../ChangeSummaryCard';
import PreScheduleTaskListCard from '../PreScheduleTaskListCard';
import EngineerWeeklyAvailabilityCard from '../EngineerWeeklyAvailabilityCard';
import PreScheduleResultCard from '../PreScheduleResultCard';
import PreScheduleSummaryCard from '../PreScheduleSummaryCard';
import WeeklyGanttOverviewCard from '../WeeklyGanttOverviewCard';
import DispatchQualityScoreCard from '../DispatchQualityScoreCard';
import UtilizationDashboardCard from '../UtilizationDashboardCard';
import TravelCostMonitorCard from '../TravelCostMonitorCard';
import OTComplianceAlertCard from '../OTComplianceAlertCard';
import CapabilityMappingCard from '../CapabilityMappingCard';
import WeeklyReportCard from '../WeeklyReportCard';
import PendingFeedbackListCard from '../PendingFeedbackListCard';
import SurveyPushCard from '../SurveyPushCard';
import PhoneCallbackInputCard from '../PhoneCallbackInputCard';
import FeedbackSummaryCard from '../FeedbackSummaryCard';
import FeedbackAnomalyAlertCard from '../FeedbackAnomalyAlertCard';
import WeChatSurveyCard from '../WeChatSurveyCard';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isSelf = message.sender === 'dispatcher' || message.sender === 'coordinator' || message.sender === 'customer';
  const isSystem = message.sender === 'system';

  // 系统消息
  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="system-message"
      >
        <div className="system-message-content">
          {message.content}
        </div>
      </motion.div>
    );
  }

  // 渲染消息内容
  const renderContent = () => {
    switch (message.contentType) {
      case 'engineer-list':
        return (
          <EngineerList
            engineers={message.extraData as Engineer[]}
          />
        );
      case 'task-info':
        return <TaskInfoCard task={message.extraData as TaskRequirement} />;
      case 'schedule-overview':
        return <ScheduleOverviewCard schedule={message.extraData as ScheduledTask[]} />;
      case 'reschedule-plan':
        return <ReschedulePlanCard plan={message.extraData as ReschedulePlan} />;
      case 'change-summary':
        return <ChangeSummaryCard changes={message.extraData as AffectedTaskChange[]} />;
      case 'pre-schedule-task-list':
        return <PreScheduleTaskListCard tasks={message.extraData as PreScheduleTask[]} />;
      case 'engineer-weekly-availability':
        return <EngineerWeeklyAvailabilityCard rows={message.extraData as EngineerWeeklyAvailability[]} />;
      case 'pre-schedule-result':
        return <PreScheduleResultCard data={message.extraData as PreScheduleResultSet} />;
      case 'pre-schedule-summary':
        return <PreScheduleSummaryCard summary={message.extraData as PreScheduleSummary} />;
      case 'weekly-gantt-overview':
        return <WeeklyGanttOverviewCard data={message.extraData as WeeklyGanttOverview} />;
      case 'dispatch-quality-score':
        return <DispatchQualityScoreCard data={message.extraData as DispatchQualityReport} />;
      case 'utilization-dashboard':
        return <UtilizationDashboardCard data={message.extraData as UtilizationDashboard} />;
      case 'travel-cost-monitor':
        return <TravelCostMonitorCard data={message.extraData as TravelCostMonitor} />;
      case 'ot-compliance-alert':
        return <OTComplianceAlertCard data={message.extraData as OTComplianceReport} />;
      case 'capability-mapping':
        return <CapabilityMappingCard data={message.extraData as CapabilityMappingReport} />;
      case 'weekly-report':
        return <WeeklyReportCard data={message.extraData as WeeklyReportData} />;
      case 'pending-feedback-list':
        return <PendingFeedbackListCard data={message.extraData as PendingFeedbackList} />;
      case 'survey-push':
        return <SurveyPushCard data={message.extraData as SurveyPushData} />;
      case 'phone-callback':
        return <PhoneCallbackInputCard data={message.extraData as PhoneCallbackData} />;
      case 'feedback-summary':
        return <FeedbackSummaryCard data={message.extraData as FeedbackSummaryData} />;
      case 'feedback-anomaly-alert':
        return <FeedbackAnomalyAlertCard data={message.extraData as FeedbackAnomalyReport} />;
      case 'wechat-survey':
        return <WeChatSurveyCard data={message.extraData as WeChatSurveyData} />;
      case 'text':
      default:
        // 处理@提及
        let content = message.content;
        if (message.mentionedUser) {
          content = content.replace(
            `@${message.mentionedUser}`,
            `<span style="color: #1E88E5; font-weight: 500;">@${message.mentionedUser}</span>`
          );
        }
        return (
          <div
            className="text-sm whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`chat-message ${isSelf ? 'self' : ''}`}
    >
      {/* 头像 */}
      <div className="avatar">
        {message.senderAvatar}
      </div>

      {/* 消息气泡 */}
      <div className={`message-bubble ${isSelf ? 'self' : ''}`}>
        {/* 发送者名称 */}
        <div style={{
          fontSize: '12px',
          color: '#999999',
          marginBottom: '4px',
          textAlign: isSelf ? 'right' : 'left'
        }}>
          {message.senderName}
        </div>

        {/* 消息内容 */}
        <div
          className={`message-content ${isSelf ? 'self' : 'other'}`}
          style={[
            'engineer-list',
            'task-info',
            'schedule-overview',
            'reschedule-plan',
            'change-summary',
            'pre-schedule-task-list',
            'engineer-weekly-availability',
            'pre-schedule-result',
            'pre-schedule-summary',
            'weekly-gantt-overview',
            'dispatch-quality-score',
            'utilization-dashboard',
            'travel-cost-monitor',
            'ot-compliance-alert',
            'capability-mapping',
            'weekly-report',
            'pending-feedback-list',
            'survey-push',
            'phone-callback',
            'feedback-summary',
            'feedback-anomaly-alert',
            'wechat-survey',
          ].includes(message.contentType)
            ? { backgroundColor: 'transparent', padding: 0, boxShadow: 'none' }
            : {}
          }
        >
          {renderContent()}
        </div>

        {/* 时间戳 */}
        <div style={{
          fontSize: '12px',
          color: '#999999',
          marginTop: '4px',
          textAlign: isSelf ? 'right' : 'left'
        }}>
          {message.timestamp}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;