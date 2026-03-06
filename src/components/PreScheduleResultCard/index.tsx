import React from 'react';
import type { PreScheduleResultSet } from '../../types/index.ts';

interface PreScheduleResultCardProps {
  data: PreScheduleResultSet;
}

const PreScheduleResultCard: React.FC<PreScheduleResultCardProps> = ({ data }) => {
  return (
    <div className="pre-schedule-result-card">
      <div className="card-title">
        <span>🧠</span>
        <span>预排结果（差旅费优先）</span>
      </div>
      <div className="pre-result-total">总预计差旅费：¥{data.totalEstimatedCost.toLocaleString()}</div>

      <div className="pre-result-list">
        {data.results.map((result) => (
          <div key={result.taskId} className="pre-result-item">
            <div className="pre-result-header">
              <span>{result.taskTitle}</span>
              <span className={`pre-task-priority ${result.priority === 'urgent' ? 'urgent' : 'normal'}`}>
                {result.priority === 'urgent' ? '紧急' : '普通'}
              </span>
            </div>
            <div className="pre-result-meta">
              {result.address} · {result.serviceType} · {result.estimatedDays}天
            </div>
            {result.assignedEngineers.map((assignment, idx) => (
              <div key={`${result.taskId}-${idx}`} className="pre-result-assignment">
                <div className="pre-result-assignment-line">
                  {assignment.engineerAvatar} {assignment.engineerName}：{assignment.startDate} ~ {assignment.endDate}
                </div>
                <div className="pre-result-assignment-reason">{assignment.reason}</div>
                <div className="pre-result-cost">
                  交通¥{assignment.travelCost.transportCost} + 酒店¥{assignment.travelCost.hotelNights * assignment.travelCost.hotelCostPerNight}
                  + 打车¥{assignment.travelCost.localTaxiCost} = ¥{assignment.travelCost.totalCost}
                </div>
              </div>
            ))}
            <div className="pre-result-item-total">任务差旅小计：¥{result.totalCost.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreScheduleResultCard;
