import React from 'react';
import type { TaskRequirement } from '../../types/index.ts';

interface TaskInfoCardProps {
  task: TaskRequirement;
}

const TaskInfoCard: React.FC<TaskInfoCardProps> = ({ task }) => {
  const taskFields = [
    { label: '地址', value: task.address },
    { label: '行业', value: task.industry },
    { label: '产品', value: `${task.product} ${task.productModel}` },
    { label: '应用', value: task.application },
    { label: '服务类型', value: task.serviceType },
    { label: '标准工时', value: `${task.standardHours}小时` },
    { label: '开始时间', value: task.startTime },
    { label: '结束时间', value: task.endTime },
    { label: '人数', value: `${task.peopleCount}人` },
  ];

  return (
    <div className="task-info-card">
      <div style={{
        fontSize: '14px',
        fontWeight: 500,
        color: '#1E88E5',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        📋 任务需求信息
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px'
      }}>
        {taskFields.map((field) => (
          <div key={field.label} style={{ fontSize: '12px' }}>
            <span style={{ color: '#999999' }}>{field.label}：</span>
            <span style={{ color: '#333333' }}>{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskInfoCard;