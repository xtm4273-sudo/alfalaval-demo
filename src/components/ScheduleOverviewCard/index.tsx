import React from 'react';
import type { ScheduledTask } from '../../types/index.ts';

interface ScheduleOverviewCardProps {
  schedule: ScheduledTask[];
}

const statusConfig = {
  'in-progress': { label: '执行中', color: '#FF9800', bg: 'rgba(255,152,0,0.1)' },
  'flexible': { label: '可调配', color: '#07C160', bg: 'rgba(7,193,96,0.1)' },
  'scheduled': { label: '已排班', color: '#1E88E5', bg: 'rgba(30,136,229,0.1)' },
  'free': { label: '空闲', color: '#9E9E9E', bg: 'rgba(0,0,0,0.06)' },
};

const ScheduleOverviewCard: React.FC<ScheduleOverviewCardProps> = ({ schedule }) => {
  return (
    <div className="schedule-overview-card">
      <div className="card-title">
        <span>📅</span>
        <span>当前工程师排班总览</span>
      </div>
      <div className="schedule-list">
        {schedule.map((item) => {
          const cfg = statusConfig[item.status];
          return (
            <div key={item.engineerId} className="schedule-item">
              <div className="schedule-item-left">
                <div className="schedule-avatar">{item.engineerAvatar}</div>
                <div className="schedule-info">
                  <div className="schedule-name">{item.engineerName}</div>
                  <div className="schedule-task">{item.taskAddress}</div>
                  <div className="schedule-type">{item.taskType}</div>
                </div>
              </div>
              <div className="schedule-item-right">
                <span
                  className="schedule-status-badge"
                  style={{ color: cfg.color, backgroundColor: cfg.bg }}
                >
                  {cfg.label}
                </span>
                {item.startDate !== '—' && (
                  <div className="schedule-date">
                    {item.startDate.slice(5)}~{item.endDate.slice(5)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleOverviewCard;
