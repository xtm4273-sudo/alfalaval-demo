import React from 'react';
import type { PreScheduleTask } from '../../types/index.ts';

interface PreScheduleTaskListCardProps {
  tasks: PreScheduleTask[];
}

const PreScheduleTaskListCard: React.FC<PreScheduleTaskListCardProps> = ({ tasks }) => {
  return (
    <div className="pre-schedule-task-list-card">
      <div className="card-title">
        <span>🗂️</span>
        <span>未来一周任务清单</span>
      </div>
      <div className="pre-task-list">
        {tasks.map((task) => (
          <div key={task.id} className="pre-task-item">
            <div className="pre-task-header">
              <span className="pre-task-title">{task.product} {task.productModel}</span>
              <span className={`pre-task-priority ${task.priority === 'urgent' ? 'urgent' : 'normal'}`}>
                {task.priority === 'urgent' ? '紧急' : '普通'}
              </span>
            </div>
            <div className="pre-task-grid">
              <div><span>地点：</span>{task.address}</div>
              <div><span>服务：</span>{task.serviceType}</div>
              <div><span>工期：</span>{task.estimatedDays}天</div>
              <div><span>人数：</span>{task.headcount}人</div>
              <div><span>技能：</span>{task.requiredSkills.join(' / ')}</div>
              <div><span>时间窗：</span>{task.timeWindowStart} ~ {task.timeWindowEnd}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreScheduleTaskListCard;
