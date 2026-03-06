import React from 'react';
import type { WeeklyReportData, WeeklyKPI } from '../../types/index.ts';

interface Props {
  data: WeeklyReportData;
}

const trendIcon = (trend: 'up' | 'down' | 'flat') => {
  if (trend === 'up') return '↑';
  if (trend === 'down') return '↓';
  return '→';
};

const statusColor = { good: '#22c55e', warning: '#f59e0b', bad: '#ef4444' };

const KPIBadge: React.FC<{ kpi: WeeklyKPI }> = ({ kpi }) => (
  <div className="wr-kpi-badge">
    <div className="wr-kpi-label">{kpi.label}</div>
    <div className="wr-kpi-value" style={{ color: statusColor[kpi.status] }}>{kpi.value}</div>
    <div className="wr-kpi-trend" style={{ color: statusColor[kpi.status] }}>
      {trendIcon(kpi.trend)} {kpi.trendValue}
    </div>
  </div>
);

const WeeklyReportCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="analysis-card">
      <div className="analysis-card-header">
        <span className="analysis-card-icon">📋</span>
        <div>
          <div className="analysis-card-title">运营周报</div>
          <div className="analysis-card-subtitle">{data.weekLabel} · 生成于 {data.generatedAt}</div>
        </div>
      </div>

      {/* 摘要 */}
      <div className="wr-summary">{data.summary}</div>

      {/* 核心 KPI */}
      <div className="wr-kpi-grid">
        {data.kpis.map((kpi, i) => (
          <KPIBadge key={i} kpi={kpi} />
        ))}
      </div>

      {/* 推送预览 */}
      <div className="wr-push-section">
        <div className="wr-push-title">📱 企业微信推送预览</div>
        {data.pushPreviews.map((push, i) => (
          <div key={i} className={`wr-push-card ${push.type === 'personal' ? 'wr-push-personal' : 'wr-push-group'}`}>
            {/* 企业微信风格标题栏 */}
            <div className="wr-wecom-header">
              <span className="wr-wecom-icon">{push.type === 'group' ? '👥' : '👤'}</span>
              <div className="wr-wecom-meta">
                <span className="wr-wecom-name">
                  {push.type === 'group' ? push.groupName : push.recipientName}
                </span>
                <span className="wr-wecom-type">{push.type === 'group' ? '群消息' : '个人消息'}</span>
              </div>
              <span className="wr-wecom-source">智能分析助手</span>
            </div>
            {/* 消息内容 */}
            <div className="wr-wecom-body">
              <div className="wr-wecom-msg">{push.message}</div>
              <div className="wr-wecom-kpis">
                {push.kpis.map((kpi, j) => (
                  <div key={j} className="wr-wecom-kpi-item">
                    <div className="wr-wecom-kpi-label">{kpi.label}</div>
                    <div className="wr-wecom-kpi-val" style={{ color: statusColor[kpi.status] }}>
                      {kpi.value} <span className="wr-wecom-kpi-trend">{trendIcon(kpi.trend)}{kpi.trendValue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyReportCard;
