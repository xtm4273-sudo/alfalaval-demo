import React from 'react';
import type { UtilizationDashboard } from '../../types/index.ts';

interface Props {
  data: UtilizationDashboard;
}

const ProgressBar: React.FC<{ rate: number; max?: number; showMarkers?: boolean; target75?: number; target60?: number }> = ({
  rate,
  max = 100,
  showMarkers = false,
  target75,
  target60,
}) => {
  const pct = Math.min((rate / max) * 100, 100);
  const color = rate >= 80 ? '#ef4444' : rate >= 60 ? '#22c55e' : '#f59e0b';

  return (
    <div className="util-bar-track" style={{ position: 'relative' }}>
      <div className="util-bar-fill" style={{ width: `${pct}%`, background: color }} />
      {showMarkers && target75 && (
        <div className="util-bar-marker" style={{ left: `${target75}%` }} title={`目标上限 ${target75}%`} />
      )}
      {showMarkers && target60 && (
        <div className="util-bar-marker util-bar-marker-low" style={{ left: `${target60}%` }} title={`目标下限 ${target60}%`} />
      )}
    </div>
  );
};

const statusLabel = (status: 'high' | 'normal' | 'low') => {
  const map = { high: { text: '高负荷', color: '#ef4444' }, normal: { text: '正常', color: '#22c55e' }, low: { text: '低利用', color: '#f59e0b' } };
  return map[status];
};

const UtilizationDashboardCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="analysis-card">
      <div className="analysis-card-header">
        <span className="analysis-card-icon">📈</span>
        <div>
          <div className="analysis-card-title">
            利用率看板
            <span className="util-layer-badge">第{data.layer === 1 ? '一' : data.layer === 2 ? '二' : '三'}层</span>
          </div>
          <div className="analysis-card-subtitle">{data.period}</div>
        </div>
      </div>

      {/* 第一层：整体利用率 */}
      {data.layer === 1 && data.overall !== undefined && (
        <div className="util-layer1">
          <div className="util-overall-number" style={{ color: data.overall >= 60 && data.overall <= 75 ? '#22c55e' : '#f59e0b' }}>
            {data.overall}%
          </div>
          <div className="util-overall-label">全团队整体利用率</div>
          <div className="util-bar-wrap">
            <ProgressBar rate={data.overall} showMarkers target75={data.target75} target60={data.target60} />
            <div className="util-bar-scale">
              <span>0%</span>
              <span style={{ position: 'absolute', left: `${data.target60}%`, transform: 'translateX(-50%)' }}>{data.target60}%↑</span>
              <span style={{ position: 'absolute', left: `${data.target75}%`, transform: 'translateX(-50%)' }}>{data.target75}%↑</span>
              <span>100%</span>
            </div>
          </div>
          <div className="util-targets">
            <span className="util-target-tag">业务好时目标：≤{data.target75}%</span>
            <span className="util-target-tag util-target-tag-low">业务一般时目标：≥{data.target60}%</span>
          </div>
          <div className="util-status-hint">
            {data.overall > (data.target75 ?? 75)
              ? '⚠ 利用率偏高，注意防止过载'
              : data.overall < (data.target60 ?? 60)
              ? '⚠ 利用率偏低，资源存在闲置'
              : '✅ 整体利用率处于健康区间'}
          </div>
        </div>
      )}

      {/* 第二层：分组对比 */}
      {data.layer === 2 && data.groups && (
        <div className="util-layer2">
          <div className="util-group-header">
            <span>行业分组</span>
            <span>利用率</span>
          </div>
          {data.groups.map((g) => (
            <div key={g.name} className="util-group-row">
              <div className="util-group-name">{g.name}<span className="util-headcount">{g.headcount}人</span></div>
              <div className="util-group-bar-wrap">
                <ProgressBar rate={g.rate} />
                <span className="util-group-rate" style={{ color: g.rate >= 80 ? '#ef4444' : g.rate >= 60 ? '#22c55e' : '#f59e0b' }}>
                  {g.rate}%
                </span>
              </div>
            </div>
          ))}
          <div className="util-ref-line-note">参考线：60%（下限）｜75%（上限）</div>
        </div>
      )}

      {/* 第三层：团队级别 */}
      {data.layer === 3 && data.teams && (
        <div className="util-layer3">
          {data.teams.map((team) => {
            const sl = statusLabel(team.status);
            return (
              <div key={team.teamName} className={`util-team-card util-team-${team.status}`}>
                <div className="util-team-header">
                  <span className="util-team-name">{team.teamName}</span>
                  <span className="util-team-badge" style={{ color: sl.color, borderColor: sl.color }}>{sl.text}</span>
                  <span className="util-team-rate" style={{ color: sl.color }}>{team.rate}%</span>
                </div>
                <ProgressBar rate={team.rate} />
                <div className="util-team-suggestion">💡 {team.suggestion}</div>
              </div>
            );
          })}
          {data.adjustmentSuggestion && (
            <div className="util-adjustment-box">
              <div className="util-adjustment-title">📋 调配建议</div>
              <div className="util-adjustment-content">{data.adjustmentSuggestion}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UtilizationDashboardCard;
