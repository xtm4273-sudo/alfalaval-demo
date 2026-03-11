import React from 'react';
import type { ReportLink } from '../../types/index.ts';

interface Props {
  data: ReportLink;
}

const ReportLinkCard: React.FC<Props> = ({ data }) => {
  const scoreColor =
    data.avgScore >= 80 ? '#16a34a' :
    data.avgScore >= 70 ? '#d97706' : '#dc2626';

  const normalCount = data.totalRecords - data.flaggedCount;

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e8ef',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,82,165,0.07)',
      width: '100%',
      maxWidth: '380px',
    }}>
      {/* 顶部色带 */}
      <div style={{
        background: 'linear-gradient(135deg, #0052a5 0%, #0073e6 100%)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div style={{
          width: '32px', height: '32px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', flexShrink: 0,
        }}>
          📊
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600, lineHeight: 1.3 }}>
            {data.title}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: '11px', marginTop: '2px' }}>
            生成于 {data.generatedAt}
          </div>
        </div>
      </div>

      {/* 指标行 */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #f0f2f7',
      }}>
        <div style={{ flex: 1, padding: '12px 14px', textAlign: 'center', borderRight: '1px solid #f0f2f7' }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: scoreColor, lineHeight: 1 }}>
            {data.avgScore}
          </div>
          <div style={{ fontSize: '11px', color: '#8a94a6', marginTop: '3px' }}>平均评分</div>
        </div>
        <div style={{ flex: 1, padding: '12px 14px', textAlign: 'center', borderRight: '1px solid #f0f2f7' }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#dc2626', lineHeight: 1 }}>
            {data.flaggedCount}
          </div>
          <div style={{ fontSize: '11px', color: '#8a94a6', marginTop: '3px' }}>异常标注</div>
        </div>
        <div style={{ flex: 1, padding: '12px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#16a34a', lineHeight: 1 }}>
            {normalCount}
          </div>
          <div style={{ fontSize: '11px', color: '#8a94a6', marginTop: '3px' }}>正常记录</div>
        </div>
      </div>

      {/* 摘要文字 */}
      <div style={{ padding: '10px 16px', fontSize: '12px', color: '#4b5563', lineHeight: 1.6 }}>
        {data.summary}
      </div>

      {/* 查看报告按钮 */}
      <div style={{ padding: '0 16px 14px' }}>
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            background: '#eff4ff',
            color: '#0052a5',
            border: '1px solid #c7d8f8',
            borderRadius: '8px',
            padding: '9px 16px',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.15s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#0052a5';
            (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#eff4ff';
            (e.currentTarget as HTMLAnchorElement).style.color = '#0052a5';
          }}
        >
          <span>查看完整报告</span>
          <span style={{ fontSize: '14px' }}>↗</span>
        </a>
      </div>
    </div>
  );
};

export default ReportLinkCard;
