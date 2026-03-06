import React from 'react';
import type { DispatchQualityReport } from '../../types/index.ts';

interface Props {
  data: DispatchQualityReport;
}

const ScoreCircle: React.FC<{ score: number; flagged: boolean }> = ({ score, flagged }) => {
  const color = flagged ? '#ef4444' : score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';
  return (
    <div className="dq-score-circle" style={{ borderColor: color, color }}>
      {score}
    </div>
  );
};

const DispatchQualityScoreCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="analysis-card">
      <div className="analysis-card-header">
        <span className="analysis-card-icon">📊</span>
        <div>
          <div className="analysis-card-title">派工合理性评分报告</div>
          <div className="analysis-card-subtitle">{data.month} · 共 {data.totalRecords} 条记录</div>
        </div>
      </div>

      {/* 汇总指标 */}
      <div className="dq-summary-row">
        <div className="dq-summary-item">
          <div className="dq-summary-value" style={{ color: '#6366f1' }}>{data.avgScore}</div>
          <div className="dq-summary-label">平均评分</div>
        </div>
        <div className="dq-summary-divider" />
        <div className="dq-summary-item">
          <div className="dq-summary-value" style={{ color: '#ef4444' }}>{data.flaggedCount}</div>
          <div className="dq-summary-label">异常标注</div>
        </div>
        <div className="dq-summary-divider" />
        <div className="dq-summary-item">
          <div className="dq-summary-value" style={{ color: '#22c55e' }}>{data.totalRecords - data.flaggedCount}</div>
          <div className="dq-summary-label">正常记录</div>
        </div>
      </div>

      {/* 评分图例 */}
      <div className="dq-legend">
        <span className="dq-legend-item"><span className="dq-dot" style={{ background: '#22c55e' }} />≥80 优</span>
        <span className="dq-legend-item"><span className="dq-dot" style={{ background: '#f59e0b' }} />60-79 良</span>
        <span className="dq-legend-item"><span className="dq-dot" style={{ background: '#ef4444' }} />&lt;60 需关注</span>
      </div>

      {/* 记录列表 */}
      <div className="dq-records">
        {data.records.map((record) => (
          <div key={record.id} className={`dq-record ${record.flagged ? 'dq-record-flagged' : ''}`}>
            <div className="dq-record-header">
              <ScoreCircle score={record.score} flagged={record.flagged} />
              <div className="dq-record-info">
                <div className="dq-record-title">
                  {record.date} · {record.taskAddress}
                  {record.flagged && <span className="dq-flag-badge">⚠ 异常</span>}
                </div>
                <div className="dq-record-engineer">指派：{record.assignedEngineer}</div>
              </div>
            </div>
            <div className="dq-indicators">
              <span className={`dq-indicator ${record.isNearestEngineer ? 'pass' : 'fail'}`}>
                {record.isNearestEngineer ? '✓' : '✗'} 就近选择
                {!record.isNearestEngineer && ` (+${record.distanceDiff}km)`}
              </span>
              <span className={`dq-indicator ${record.isLowWorkloadPriority ? 'pass' : 'fail'}`}>
                {record.isLowWorkloadPriority ? '✓' : '✗'} 工时均衡
                <span className="dq-workload">({record.engineerWorkload}h)</span>
              </span>
            </div>
            {record.flagged && record.flagReason && (
              <div className="dq-flag-reason">{record.flagReason}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DispatchQualityScoreCard;
