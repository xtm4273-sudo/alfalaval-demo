import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DemoScenario, ChatMessage } from '../../types/index.ts';
import { tab1Scenarios } from '../../data/mockData';
import ChatMessageComponent from '../../components/ChatMessage';

const Tab1: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<string>('scenario1');
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scenario = tab1Scenarios.find((s) => s.id === currentScenario) || tab1Scenarios[0];

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 重置演示
  const resetDemo = () => {
    setDisplayedMessages([]);
    setMessageIndex(0);
    setIsPlaying(false);
  };

  // 切换场景
  const handleScenarioChange = (scenarioId: string) => {
    setCurrentScenario(scenarioId);
    resetDemo();
  };

  // 播放下一条消息
  const playNextMessage = () => {
    if (messageIndex < scenario.messages.length) {
      setDisplayedMessages((prev) => [...prev, scenario.messages[messageIndex]]);
      setMessageIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  // 自动播放
  useEffect(() => {
    if (isPlaying && messageIndex < scenario.messages.length) {
      const timer = setTimeout(() => {
        playNextMessage();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, messageIndex, scenario.messages.length]);

  // 滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [displayedMessages]);

  // 开始/暂停演示
  const togglePlay = () => {
    if (messageIndex >= scenario.messages.length) {
      resetDemo();
      setTimeout(() => setIsPlaying(true), 100);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // 下一步
  const nextStep = () => {
    if (messageIndex < scenario.messages.length) {
      playNextMessage();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 场景选择按钮 */}
      <div className="scenario-selector">
        <div className="scenario-label">选择演示场景：</div>
        <div className="scenario-buttons">
          {tab1Scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => handleScenarioChange(s.id)}
              className={`scenario-btn ${currentScenario === s.id ? 'active' : ''}`}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className="scenario-description">{scenario.description}</div>
      </div>

      {/* 聊天区域 */}
      <div className="chat-area">
        <AnimatePresence>
          {displayedMessages.map((message) => (
            <ChatMessageComponent key={message.id} message={message} />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* 控制按钮 */}
      <div className="control-area">
        <div className="control-buttons">
          <button
            onClick={togglePlay}
            className={`control-btn ${isPlaying ? 'control-btn-warning' : 'control-btn-primary'}`}
            style={{ flex: 1 }}
          >
            {isPlaying ? '暂停' : messageIndex >= scenario.messages.length ? '重新播放' : '自动播放'}
          </button>
          <button
            onClick={nextStep}
            disabled={isPlaying || messageIndex >= scenario.messages.length}
            className="control-btn control-btn-secondary"
          >
            下一步
          </button>
          <button
            onClick={resetDemo}
            className="control-btn control-btn-secondary"
          >
            重置
          </button>
        </div>
        <div className="progress-text">
          消息进度：{messageIndex} / {scenario.messages.length}
        </div>
      </div>
    </div>
  );
};

export default Tab1;