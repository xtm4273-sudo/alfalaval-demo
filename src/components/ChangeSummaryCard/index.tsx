import React from 'react';
import type { AffectedTaskChange } from '../../types/index.ts';

interface ChangeSummaryCardProps {
  changes: AffectedTaskChange[];
}

const changeTypeConfig = {
  reassigned: { icon: '🔄', label: '任务移交', color: '#FF9800', bg: 'rgba(255,152,0,0.08)' },
  delayed: { icon: '⏰', label: '任务延后', color: '#FF9800', bg: 'rgba(255,152,0,0.08)' },
  added: { icon: '➕', label: '新增任务', color: '#07C160', bg: 'rgba(7,193,96,0.08)' },
  freed: { icon: '✅', label: '不受影响', color: '#9E9E9E', bg: 'rgba(0,0,0,0.04)' },
};

const ChangeSummaryCard: React.FC<ChangeSummaryCardProps> = ({ changes }) => {
  return (
    <div className="change-summary-card">
      <div className="card-title">
        <span>✅</span>
        <span>排班变更通知</span>
      </div>
      <div className="change-list">
        {changes.map((change, idx) => {
          const cfg = changeTypeConfig[change.changeType];
          return (
            <div
              key={idx}
              className="change-item"
              style={{ backgroundColor: cfg.bg, borderLeft: `3px solid ${cfg.color}` }}
            >
              <div className="change-item-header">
                <span className="change-icon">{cfg.icon}</span>
                <span className="change-engineer">
                  {change.engineerAvatar} {change.engineerName}
                </span>
                <span className="change-type-label" style={{ color: cfg.color }}>
                  {cfg.label}
                </span>
              </div>
              <div className="change-detail">
                <div className="change-original">原安排：{change.originalTask}</div>
                <div className="change-new" style={{ color: cfg.color }}>
                  新安排：{change.newArrangement}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChangeSummaryCard;
