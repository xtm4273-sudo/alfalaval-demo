import React from 'react';
import type { TabType } from '../../types/index.ts';

interface TabSwitcherProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ activeTab, onTabChange }) => {
  return (
    <div style={{ display: 'flex', backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <button
        className={activeTab === 'tab1' ? 'tab-btn active' : 'tab-btn'}
        onClick={() => onTabChange('tab1')}
      >
        派单员对话
      </button>
      <button
        className={activeTab === 'tab2' ? 'tab-btn active' : 'tab-btn'}
        onClick={() => onTabChange('tab2')}
      >
        群组通知
      </button>
    </div>
  );
};

export default TabSwitcher;