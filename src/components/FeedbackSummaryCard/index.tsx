import React from 'react';
import type { FeedbackSummaryData } from '../../types/index.ts';

interface Props {
  data: FeedbackSummaryData;
}

const StarMini: React.FC<{ rating: number }> = ({ rating }) => (
  <div style={{ display: 'flex', gap: '1px' }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} style={{ fontSize: '11px', color: s <= Math.round(rating) ? '#faad14' : '#e0e0e0' }}>★</span>
    ))}
  </div>
);

const ratingColor = (r: number) => r >= 4.5 ? '#52c41a' : r >= 3.5 ? '#1890ff' : r >= 2.5 ? '#fa8c16' : '#ff4d4f';

const FeedbackSummaryCard: React.FC<Props> = ({ data }) => {
  const maxBarCount = Math.max(...data.ratingDistribution.map((d) => d.count), 1);

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      width: '100%',
      minWidth: '260px',
    }}>
      {/* 标题栏 */}
      <div style={{
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '16px' }}>📊</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>满意度汇总报告</div>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px' }}>{data.period}</div>
          </div>
        </div>
      </div>

      {/* 核心指标 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px',
        backgroundColor: '#f0f0f0',
        borderBottom: '1px solid #f0f0f0',
      }}>
        {[
          { label: '综合均分', value: data.avgRating.toFixed(1), unit: '/ 5', color: ratingColor(data.avgRating) },
          { label: '响应率', value: `${data.responseRate}%`, unit: '', color: '#1890ff' },
          { label: '总工单数', value: String(data.totalWorkOrders), unit: '条', color: '#722ed1' },
        ].map(({ label, value, unit, color }) => (
          <div key={label} style={{
            backgroundColor: '#fff',
            padding: '10px 8px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color }}>{value}<span style={{ fontSize: '11px', color: '#aaa', fontWeight: 400 }}>{unit}</span></div>
            <div style={{ fontSize: '10px', color: '#999', marginTop: '2px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* 评分分布 */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>评分分布</div>
        {data.ratingDistribution.slice().reverse().map((item) => (
          <div key={item.rating} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
            <div style={{ fontSize: '12px', color: '#555', width: '24px', textAlign: 'right', flexShrink: 0 }}>{item.rating}★</div>
            <div style={{ flex: 1, backgroundColor: '#f5f5f5', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
              <div style={{
                width: `${(item.count / maxBarCount) * 100}%`,
                height: '100%',
                backgroundColor: ratingColor(item.rating),
                borderRadius: '4px',
                transition: 'width 0.3s',
              }} />
            </div>
            <div style={{ fontSize: '11px', color: '#aaa', width: '24px', flexShrink: 0 }}>{item.count}</div>
          </div>
        ))}
      </div>

      {/* 渠道分布 */}
      <div style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>回收渠道</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { label: '企业微信', count: data.wechatChannelCount, color: '#07c160' },
            { label: '电话回访', count: data.phoneChannelCount, color: '#fa8c16' },
          ].map(({ label, count, color }) => {
            const pct = Math.round((count / data.respondedCount) * 100);
            return (
              <div key={label} style={{
                flex: 1,
                backgroundColor: color + '12',
                borderRadius: '8px',
                padding: '8px 10px',
                border: `1px solid ${color}30`,
              }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color }}>{count}</div>
                <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>{label}</div>
                <div style={{ fontSize: '10px', color: color, fontWeight: 500 }}>{pct}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 工程师排行 */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>工程师满意度排行</div>
        {data.byEngineer.map((eng, idx) => (
          <div key={eng.engineerName} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 0',
            borderBottom: idx < data.byEngineer.length - 1 ? '1px solid #fafafa' : 'none',
          }}>
            <div style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: idx === 0 ? '#faad14' : idx === 1 ? '#bfbfbf' : idx === 2 ? '#d48806' : '#f0f0f0',
              color: idx < 3 ? '#fff' : '#aaa',
              fontSize: '10px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {idx + 1}
            </div>
            <span style={{ fontSize: '15px' }}>{eng.engineerAvatar}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: 500, color: '#1a1a1a' }}>{eng.engineerName}</div>
              <div style={{ fontSize: '10px', color: '#aaa' }}>{eng.workOrderCount} 条工单 · 响应率 {eng.responseRate}%</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: ratingColor(eng.avgRating) }}>
                {eng.avgRating.toFixed(1)}
              </div>
              <StarMini rating={eng.avgRating} />
            </div>
            {eng.flaggedCount > 0 && (
              <div style={{
                backgroundColor: '#fff1f0',
                color: '#ff4d4f',
                borderRadius: '5px',
                padding: '1px 5px',
                fontSize: '10px',
                fontWeight: 600,
              }}>
                {eng.flaggedCount}⚠
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackSummaryCard;
