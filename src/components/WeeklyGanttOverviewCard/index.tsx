import React from 'react';
import type { WeeklyGanttOverview } from '../../types/index.ts';

interface WeeklyGanttOverviewCardProps {
  data: WeeklyGanttOverview;
}

const WeeklyGanttOverviewCard: React.FC<WeeklyGanttOverviewCardProps> = ({ data }) => {
  return (
    <div className="weekly-gantt-overview-card">
      <div className="card-title">
        <span>📊</span>
        <span>周排班甘特总览</span>
      </div>
      <div className="weekly-gantt-total">总预计差旅费：¥{data.totalTravelCost.toLocaleString()}</div>

      <div className="weekly-gantt-table">
        <div className="weekly-gantt-header">
          <div className="weekly-gantt-engineer-col">工程师</div>
          {data.dateHeaders.map((date) => (
            <div key={date} className="weekly-gantt-day-col">{date}</div>
          ))}
        </div>

        {data.rows.map((row) => (
          <div key={row.engineerName} className="weekly-gantt-row">
            <div className="weekly-gantt-engineer-col">
              {row.engineerAvatar} {row.engineerName}
            </div>
            <div className="weekly-gantt-track">
              {row.tasks.map((task, index) => (
                <div
                  key={`${row.engineerName}-${index}`}
                  className="weekly-gantt-block"
                  style={{ backgroundColor: task.color }}
                >
                  {task.label}（{task.startDate}~{task.endDate}）
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyGanttOverviewCard;
