import React from 'react';
import type { CapabilityMappingReport } from '../../types/index.ts';

interface Props {
  data: CapabilityMappingReport;
}

const gapColor = {
  shortage: { bg: '#fef2f2', text: '#ef4444', label: '缺口' },
  surplus: { bg: '#eff6ff', text: '#3b82f6', label: '过剩' },
  balanced: { bg: '#f0fdf4', text: '#22c55e', label: '均衡' },
};

const demandIntensity = (score: number) => {
  const levels = ['', '#fee2e2', '#fca5a5', '#f87171', '#ef4444', '#b91c1c'];
  return levels[score] || '#f1f5f9';
};

const CapabilityMappingCard: React.FC<Props> = ({ data }) => {
  const getCell = (skill: string, region: string) =>
    data.matrix.find((c) => c.skill === skill && c.region === region);

  return (
    <div className="analysis-card">
      <div className="analysis-card-header">
        <span className="analysis-card-icon">🗺️</span>
        <div>
          <div className="analysis-card-title">能力-区域需求 Mapping</div>
          <div className="analysis-card-subtitle">技能供需热力矩阵 · 华东区域</div>
        </div>
      </div>

      {/* Excel 风格表格标题 */}
      <div className="cm-excel-sheet">
        <div className="cm-excel-sheet-title">能力-区域供需矩阵表</div>
        <div className="cm-excel-sheet-subtitle">需求评分 1–5 分 · 供给为人头数 · 缺口/均衡/过剩见单元格标识</div>
      </div>

      {/* 图例 */}
      <div className="cm-legend">
        <span className="cm-legend-title">需求热度：</span>
        {[1, 2, 3, 4, 5].map((v) => (
          <span key={v} className="cm-legend-cell" style={{ background: demandIntensity(v) }}>{v}</span>
        ))}
        <span className="cm-legend-sep">缺口标识：</span>
        <span className="cm-gap-tag shortage">缺口</span>
        <span className="cm-gap-tag surplus">过剩</span>
        <span className="cm-gap-tag balanced">均衡</span>
      </div>

      {/* 热力矩阵（Excel 表格式） */}
      <div className="cm-matrix-wrap cm-excel-table-wrap">
        <table className="cm-matrix cm-excel-table">
          <thead>
            <tr>
              <th className="cm-th-skill">技能 \ 区域</th>
              {data.regions.map((r) => (
                <th key={r} className="cm-th-region">{r.replace('华东-', '')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.skills.map((skill) => (
              <tr key={skill}>
                <td className="cm-td-skill">{skill}</td>
                {data.regions.map((region) => {
                  const cell = getCell(skill, region);
                  if (!cell) return <td key={region} className="cm-td-cell" />;
                  const gc = gapColor[cell.gap];
                  return (
                    <td
                      key={region}
                      className="cm-td-cell"
                      style={{ background: demandIntensity(cell.demandScore) }}
                      title={`需求${cell.demandScore}/供给${cell.supplyCount}人`}
                    >
                      <div className="cm-cell-demand">{cell.demandScore}</div>
                      <div className="cm-cell-supply">{cell.supplyCount}人</div>
                      <div className="cm-cell-gap-dot" style={{ background: gc.text }} title={gc.label} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CapabilityMappingCard;
