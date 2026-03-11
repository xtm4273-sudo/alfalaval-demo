import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { ChatMessage } from '../../types/index.ts';
import { tab1Scenarios, tab3Scenarios } from '../../data/mockData';
import ChatMessageComponent from '../../components/ChatMessage';

const scenarioGroups = [
  { id: 'normal', label: '普通派单', type: 'normal' as const, scenarios: tab1Scenarios.slice(0, 2) },
  { id: 'urgent', label: '🚨 插单重排', type: 'urgent' as const, scenarios: tab1Scenarios.slice(2, 5) },
  { id: 'pre', label: '📅 周预排', type: 'normal' as const, scenarios: tab1Scenarios.slice(5, 6) },
  { id: 'calendar', label: '🗓 工程师日历', type: 'normal' as const, scenarios: tab1Scenarios.slice(6) },
  { id: 'analysis', label: '📊 智能分析', type: 'analysis' as const, scenarios: tab3Scenarios },
];

const allScenarios = [...tab1Scenarios, ...tab3Scenarios];

const Tab1: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>('normal');
  const [currentScenario, setCurrentScenario] = useState<string>('scenario1');
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scenario = allScenarios.find((s) => s.id === currentScenario) || tab1Scenarios[0];
  const currentGroup = scenarioGroups.find((g) => g.id === activeGroup) || scenarioGroups[0];
  const isAnalysisGroup = activeGroup === 'analysis';

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

  // 切换分组
  const handleGroupChange = (groupId: string) => {
    const group = scenarioGroups.find((g) => g.id === groupId);
    if (!group) return;
    setActiveGroup(groupId);
    setCurrentScenario(group.scenarios[0].id);
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
      {/* 场景选择区 */}
      <div className="scenario-selector">
        {/* 分组标签栏 */}
        <div className="scenario-group-tabs">
          {scenarioGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => handleGroupChange(group.id)}
              className={`scenario-group-tab ${group.type}-tab ${activeGroup === group.id ? 'active' : ''}`}
            >
              {group.label}
            </button>
          ))}
        </div>
        {/* 当前分组的场景按钮 */}
        {isAnalysisGroup ? (
          <div className="analysis-scenario-grid">
            {currentGroup.scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => handleScenarioChange(s.id)}
                className={`scenario-btn analysis-scenario-btn ${currentScenario === s.id ? 'active' : ''}`}
              >
                {s.name.replace(/^场景[一二三四五六七八九十]：/, '')}
              </button>
            ))}
          </div>
        ) : (
          <div className="scenario-scroll-area">
            {currentGroup.scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => handleScenarioChange(s.id)}
                className={`scenario-btn ${currentGroup.type === 'urgent' ? 'urgent' : ''} ${currentScenario === s.id ? 'active' : ''}`}
              >
                {s.name.replace('插单-', '').replace('预排-', '')}
              </button>
            ))}
          </div>
        )}
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