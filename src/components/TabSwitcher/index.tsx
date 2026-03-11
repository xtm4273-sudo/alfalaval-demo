import React from 'react';
import type { TabType } from '../../types/index.ts';

interface TabSwitcherProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ activeTab, onTabChange }) => {
  return (
    <div style={{ display: 'flex', backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', flexWrap: 'wrap' }}>
      <button
        className={activeTab === 'tab1' ? 'tab-btn active' : 'tab-btn'}
        onClick={() => onTabChange('tab1')}
        style={{ fontSize: '11px' }}
      >
        派单员对话
      </button>
      <button
        className={activeTab === 'tab2' ? 'tab-btn active' : 'tab-btn'}
        onClick={() => onTabChange('tab2')}
        style={{ fontSize: '11px' }}
      >
        群组通知
      </button>
      <button
        className={activeTab === 'tab3' ? 'tab-btn active' : 'tab-btn'}
        onClick={() => onTabChange('tab3')}
        style={{ fontSize: '11px' }}
      >
        工程师对话
      </button>
      <button
        className={activeTab === 'tab4' ? 'tab-btn tab-btn-feedback active' : 'tab-btn tab-btn-feedback'}
        onClick={() => onTabChange('tab4')}
        style={{ fontSize: '11px' }}
      >
        协调员回访
      </button>
      <button
        className={activeTab === 'tab5' ? 'tab-btn tab-btn-customer active' : 'tab-btn tab-btn-customer'}
        onClick={() => onTabChange('tab5')}
        style={{ fontSize: '11px' }}
      >
        客户企微
      </button>
    </div>
  );
};

export default TabSwitcher;