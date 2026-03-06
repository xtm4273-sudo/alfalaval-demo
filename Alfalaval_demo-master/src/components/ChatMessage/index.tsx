import React from 'react';
import { motion } from 'framer-motion';
import type { ChatMessage as ChatMessageType, Engineer, TaskRequirement } from '../../types/index.ts';
import EngineerList from './EngineerList';
import TaskInfoCard from '../TaskInfoCard';

interface ChatMessageProps {
  message: ChatMessageType;
  isAgent?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isAgent = false }) => {
  const isSelf = message.sender === 'dispatcher';
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
          style={message.contentType === 'engineer-list' || message.contentType === 'task-info'
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