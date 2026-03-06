import React from 'react';
import type { OTComplianceReport } from '../../types/index.ts';

interface Props {
  data: OTComplianceReport;
}

const riskConfig = {
  red: { label: '🔴 高风险', color: '#ef4444', bg: '#fef2f2', barColor: '#ef4444' },
  orange: { label: '🟠 中风险', color: '#f59e0b', bg: '#fffbeb', barColor: '#f59e0b' },
  green: { label: '🟢 低风险', color: '#22c55e', bg: '#f0fdf4', barColor: '#22c55e' },
};

const OTComplianceAlertCard: React.FC<Props> = ({ data }) => {
  const redCount = data.alerts.filter((a) => a.riskLevel === 'red').length;
  const orangeCount = data.alerts.filter((a) => a.riskLevel === 'orange').length;

  return (
    <div className="analysis-card">
      <div className="analysis-card-header">
        <span className="analysis-card-icon">⏱️</span>
        <div>
          <div className="analysis-card-title">OT 合规预警</div>
          <div className="analysis-card-subtitle">{data.month} · 共 {data.totalEngineers} 名工程师</div>
        </div>
      </div>

      {/* 预警概览 */}
      <div className="ot-summary-row">
        <div className="ot-summary-item" style={{ color: '#ef4444' }}>
          <div className="ot-summary-count">{redCount}</div>
          <div className="ot-summary-label">高风险（≥30h）</div>
        </div>
        <div className="ot-summary-divider" />
        <div className="ot-summary-item" style={{ color: '#f59e0b' }}>
          <div className="ot-summary-count">{orangeCount}</div>
          <div className="ot-summary-label">中风险（20-29h）</div>
        </div>
        <div className="ot-summary-divider" />
        <div className="ot-summary-item" style={{ color: '#22c55e' }}>
          <div className="ot-summary-count">{data.totalEngineers - redCount - orangeCount}</div>
          <div className="ot-summary-label">正常（&lt;20h）</div>
        </div>
      </div>

      {/* 法规说明 */}
      <div className="ot-regulation-note">
        ⚖️ 法定OT上限：<strong>36小时/月</strong>，系统在剩余≤10h时触发预警
      </div>

      {/* 预警列表 */}
      <div className="ot-alerts">
        {data.alerts.map((alert) => {
          const cfg = riskConfig[alert.riskLevel];
          const usedPct = Math.min((alert.currentOT / alert.limit) * 100, 100);
          return (
            <div key={alert.engineerName} className="ot-alert-card" style={{ background: cfg.bg, borderLeftColor: cfg.color }}>
              <div className="ot-alert-header">
                <span className="ot-engineer-avatar">{alert.engineerAvatar}</span>
                <div className="ot-alert-info">
                  <div className="ot-engineer-name">{alert.engineerName}</div>
                  <div className="ot-leader-name">主管：{alert.leaderName}</div>
                </div>
                <span className="ot-risk-badge" style={{ color: cfg.color, borderColor: cfg.color }}>
                  {cfg.label}
                </span>
              </div>

              {/* OT 进度条 */}
              <div className="ot-progress-section">
                <div className="ot-progress-track">
                  <div className="ot-progress-fill" style={{ width: `${usedPct}%`, background: cfg.barColor }} />
                  <div className="ot-limit-marker" />
                </div>
                <div className="ot-progress-labels">
                  <span>{alert.currentOT}h 已使用</span>
                  <span>上限 {alert.limit}h</span>
                </div>
              </div>

              <div className="ot-alert-detail">
                <span className="ot-detail-item">
                  剩余 <strong style={{ color: cfg.color }}>{alert.remainingAllowance}h</strong>
                </span>
                <span className="ot-detail-sep">·</span>
                <span className="ot-detail-item">
                  预计触线：<strong>{alert.projectedEndDate}</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OTComplianceAlertCard;
