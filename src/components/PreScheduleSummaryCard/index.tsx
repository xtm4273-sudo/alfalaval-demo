import React from 'react';
import type { PreScheduleSummary } from '../../types/index.ts';

interface PreScheduleSummaryCardProps {
  summary: PreScheduleSummary;
}

const PreScheduleSummaryCard: React.FC<PreScheduleSummaryCardProps> = ({ summary }) => {
  return (
    <div className="pre-schedule-summary-card">
      <div className="card-title">
        <span>✅</span>
        <span>预排方案汇总</span>
      </div>
      <div className="pre-summary-grid">
        <div><span>任务总数：</span>{summary.totalTasks}</div>
        <div><span>涉及工程师：</span>{summary.involvedEngineers}</div>
        <div><span>预计差旅费：</span>¥{summary.totalEstimatedCost.toLocaleString()}</div>
        <div><span>跨周任务：</span>{summary.crossWeekTasks}</div>
        <div className="pre-summary-status"><span>状态：</span>{summary.status}</div>
      </div>
    </div>
  );
};

export default PreScheduleSummaryCard;
