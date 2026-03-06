import React from 'react';
import type { ReschedulePlan } from '../../types/index.ts';

interface ReschedulePlanCardProps {
  plan: ReschedulePlan;
}

const changeTypeConfig = {
  reassigned: { icon: '🔄', color: '#FF9800' },
  delayed: { icon: '⏰', color: '#FF9800' },
  added: { icon: '➕', color: '#07C160' },
  freed: { icon: '✅', color: '#07C160' },
};

const ReschedulePlanCard: React.FC<ReschedulePlanCardProps> = ({ plan }) => {
  return (
    <div className="reschedule-plan-card">
      {plan.planLabel && (
        <div className="plan-label-badge">{plan.planLabel}</div>
      )}

      {/* 紧急任务信息 */}
      <div className="plan-section">
        <div className="plan-section-title urgent">
          <span>🚨</span>
          <span>紧急任务</span>
        </div>
        <div className="plan-urgent-info">{plan.urgentTaskInfo}</div>
      </div>

      {/* 指派工程师 */}
      <div className="plan-section">
        <div className="plan-section-title assign">
          <span>👷</span>
          <span>建议指派工程师</span>
        </div>
        <div className="plan-engineers">
          {plan.assignedEngineers.map((eng, idx) => (
            <div key={idx} className="plan-engineer-item">
              <span className="plan-engineer-avatar">{eng.avatar}</span>
              <div className="plan-engineer-detail">
                <span className="plan-engineer-name">{eng.name}</span>
                <span className="plan-engineer-reason">{eng.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 受影响任务 */}
      <div className="plan-section">
        <div className="plan-section-title affected">
          <span>📋</span>
          <span>排班变更说明</span>
        </div>
        <div className="plan-affected-list">
          {plan.affectedChanges.map((change, idx) => {
            const cfg = changeTypeConfig[change.changeType];
            return (
              <div key={idx} className="plan-affected-item">
                <span className="plan-change-icon" style={{ color: cfg.color }}>
                  {cfg.icon}
                </span>
                <div className="plan-affected-content">
                  <div className="plan-affected-name">
                    {change.engineerAvatar} {change.engineerName}
                  </div>
                  <div className="plan-affected-original">原：{change.originalTask}</div>
                  <div className="plan-affected-new" style={{ color: cfg.color }}>
                    改：{change.newArrangement}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReschedulePlanCard;
