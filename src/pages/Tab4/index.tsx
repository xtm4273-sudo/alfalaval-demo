import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { ChatMessage } from '../../types/index.ts';
import { tab4Scenarios } from '../../data/mockData';
import ChatMessageComponent from '../../components/ChatMessage';

const Tab4: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<string>(tab4Scenarios[0].id);
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scenario = tab4Scenarios.find((s) => s.id === currentScenario) || tab4Scenarios[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetDemo = () => {
    setDisplayedMessages([]);
    setMessageIndex(0);
    setIsPlaying(false);
  };

  const handleScenarioChange = (scenarioId: string) => {
    setCurrentScenario(scenarioId);
    setDisplayedMessages([]);
    setMessageIndex(0);
    setIsPlaying(false);
  };

  const playNextMessage = () => {
    if (messageIndex < scenario.messages.length) {
      setDisplayedMessages((prev) => [...prev, scenario.messages[messageIndex] as ChatMessage]);
      setMessageIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying && messageIndex < scenario.messages.length) {
      const timer = setTimeout(() => {
        playNextMessage();
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, messageIndex, scenario.messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [displayedMessages]);

  const togglePlay = () => {
    if (messageIndex >= scenario.messages.length) {
      resetDemo();
      setTimeout(() => setIsPlaying(true), 100);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const nextStep = () => {
    if (messageIndex < scenario.messages.length) {
      playNextMessage();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 场景选择区 */}
      <div className="scenario-selector">
        <div className="scenario-group-tabs">
          <button className="scenario-group-tab analysis-tab active" style={{ backgroundColor: '#667eea' }}>
            🔄 智能回访
          </button>
        </div>
        <div className="analysis-scenario-grid">
          {tab4Scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => handleScenarioChange(s.id)}
              className={`scenario-btn analysis-scenario-btn ${currentScenario === s.id ? 'active' : ''}`}
            >
              {s.name.replace('场景一：', '').replace('场景二：', '').replace('场景三：', '').replace('场景四：', '')}
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

export default Tab4;
