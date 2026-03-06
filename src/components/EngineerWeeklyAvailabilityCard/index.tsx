import React from 'react';
import type { EngineerWeeklyAvailability } from '../../types/index.ts';

interface EngineerWeeklyAvailabilityCardProps {
  rows: EngineerWeeklyAvailability[];
}

const statusLabelMap = {
  free: '空闲',
  busy: '已排',
  leave: '请假',
} as const;

const EngineerWeeklyAvailabilityCard: React.FC<EngineerWeeklyAvailabilityCardProps> = ({ rows }) => {
  const headers = rows[0]?.days ?? [];

  return (
    <div className="engineer-weekly-availability-card">
      <div className="card-title">
        <span>📅</span>
        <span>工程师周可用性</span>
      </div>
      <div className="weekly-availability-table">
        <div className="weekly-row weekly-header">
          <div className="weekly-engineer-cell">工程师</div>
          {headers.map((day) => (
            <div key={`${day.date}-${day.dayLabel}`} className="weekly-day-cell">
              <div>{day.dayLabel}</div>
              <div>{day.date}</div>
            </div>
          ))}
        </div>
        {rows.map((row) => (
          <div key={row.engineerId} className="weekly-row">
            <div className="weekly-engineer-cell">
              <span>{row.engineerAvatar}</span>
              <span>{row.engineerName}（{row.location}）</span>
            </div>
            {row.days.map((day) => (
              <div key={`${row.engineerId}-${day.date}`} className={`weekly-status-cell ${day.status}`}>
                <div>{statusLabelMap[day.status]}</div>
                {day.note && <div className="weekly-status-note">{day.note}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngineerWeeklyAvailabilityCard;
