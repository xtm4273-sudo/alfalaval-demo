import React from 'react';
import type { TravelCostMonitor } from '../../types/index.ts';

interface Props {
  data: TravelCostMonitor;
}

const TravelCostMonitorCard: React.FC<Props> = ({ data }) => {
  const kpiAchieved = data.currentMonthRatio <= data.targetRatio;
  const maxRatio = Math.max(...data.trend.map((t) => t.ratio)) + 2;

  return (
    <div className="analysis-card">
      <div className="analysis-card-header">
        <span className="analysis-card-icon">✈️</span>
        <div>
          <div className="analysis-card-title">差旅成本监控</div>
          <div className="analysis-card-subtitle">差旅工时占比 KPI：目标下降至 ≤{data.targetRatio}%</div>
        </div>
      </div>

      {/* 核心指标 */}
      <div className="tc-kpi-row">
        <div className="tc-kpi-item">
          <div className="tc-kpi-value" style={{ color: kpiAchieved ? '#22c55e' : '#ef4444' }}>
            {data.currentMonthRatio}%
          </div>
          <div className="tc-kpi-label">本月占比</div>
          <div className={`tc-kpi-badge ${kpiAchieved ? 'badge-good' : 'badge-bad'}`}>
            {kpiAchieved ? '✅ 达标' : '⚠ 未达标'}
          </div>
        </div>
        <div className="tc-kpi-arrow">→</div>
        <div className="tc-kpi-item">
          <div className="tc-kpi-value" style={{ color: '#6b7280' }}>{data.lastMonthRatio}%</div>
          <div className="tc-kpi-label">上月占比</div>
          <div className="tc-kpi-change" style={{ color: data.currentMonthRatio < data.lastMonthRatio ? '#22c55e' : '#ef4444' }}>
            {data.currentMonthRatio < data.lastMonthRatio ? '↓' : '↑'}
            {Math.abs(data.currentMonthRatio - data.lastMonthRatio).toFixed(1)}%
          </div>
        </div>
        <div className="tc-kpi-arrow">→</div>
        <div className="tc-kpi-item">
          <div className="tc-kpi-value" style={{ color: '#6366f1' }}>{data.targetRatio}%</div>
          <div className="tc-kpi-label">KPI目标</div>
          <div className="tc-kpi-badge badge-target">目标值</div>
        </div>
      </div>

      {/* 趋势柱状图 */}
      <div className="tc-trend-section">
        <div className="tc-trend-title">近5个月趋势</div>
        <div className="tc-chart">
          {data.trend.map((item) => {
            const heightPct = (item.ratio / maxRatio) * 100;
            const isTarget = item.ratio <= data.targetRatio;
            return (
              <div key={item.month} className="tc-bar-wrap">
                <div className="tc-bar-value">{item.ratio}%</div>
                <div className="tc-bar-col">
                  <div
                    className="tc-bar"
                    style={{
                      height: `${heightPct}%`,
                      background: isTarget ? '#22c55e' : '#6366f1',
                    }}
                  />
                </div>
                <div className="tc-bar-label">{item.month}</div>
              </div>
            );
          })}
          <div className="tc-target-line" style={{ bottom: `${(data.targetRatio / maxRatio) * 100}%` }}>
            <span className="tc-target-line-label">目标 {data.targetRatio}%</span>
          </div>
        </div>
      </div>

      {/* 费用明细 */}
      <div className="tc-breakdown-section">
        <div className="tc-breakdown-title">本月费用明细</div>
        <div className="tc-breakdown-items">
          {[
            { label: '交通费', value: data.breakdown.transportCost, pct: Math.round((data.breakdown.transportCost / data.breakdown.total) * 100) },
            { label: '酒店费', value: data.breakdown.hotelCost, pct: Math.round((data.breakdown.hotelCost / data.breakdown.total) * 100) },
            { label: '差旅津贴', value: data.breakdown.allowance, pct: Math.round((data.breakdown.allowance / data.breakdown.total) * 100) },
          ].map((item) => (
            <div key={item.label} className="tc-breakdown-row">
              <span className="tc-breakdown-label">{item.label}</span>
              <div className="tc-breakdown-bar-track">
                <div className="tc-breakdown-bar-fill" style={{ width: `${item.pct}%` }} />
              </div>
              <span className="tc-breakdown-pct">{item.pct}%</span>
              <span className="tc-breakdown-value">¥{item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="tc-total-row">
          <span>合计</span>
          <span className={data.breakdown.overBudget ? 'tc-over-budget' : 'tc-normal-budget'}>
            ¥{data.breakdown.total.toLocaleString()}
            {data.breakdown.overBudget && ' ⚠ 超预算'}
          </span>
        </div>
      </div>

      {/* Top 差旅工程师 */}
      <div className="tc-top-section">
        <div className="tc-top-title">差旅天数 Top 3</div>
        {data.topTravelEngineers.map((eng, i) => (
          <div key={eng.name} className="tc-top-row">
            <span className="tc-top-rank">{i + 1}</span>
            <span className="tc-top-name">{eng.name}</span>
            <span className="tc-top-days">{eng.travelDays}天</span>
            <span className="tc-top-cost">¥{eng.cost.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelCostMonitorCard;
