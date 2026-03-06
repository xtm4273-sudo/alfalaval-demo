import { useState } from 'react';
import type { TabType } from './types/index.ts';
import TabSwitcher from './components/TabSwitcher';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Tab5 from './pages/Tab5';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('tab1');

  return (
    <div className="app-container">
      {/* 手机端模拟容器 */}
      <div className="phone-container">
        {/* 标题栏 */}
        <div className="header">
          <div className="header-title">
            <span style={{ fontSize: '18px' }}>🤖</span>
            <span style={{ fontWeight: 500 }}>智能派单助手</span>
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Demo演示</div>
        </div>

        {/* Tab切换 */}
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 内容区域 */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {activeTab === 'tab1' && <Tab1 />}
          {activeTab === 'tab2' && <Tab2 />}
          {activeTab === 'tab3' && <Tab3 />}
          {activeTab === 'tab4' && <Tab4 />}
          {activeTab === 'tab5' && <Tab5 />}
        </div>
      </div>
    </div>
  );
}

export default App;