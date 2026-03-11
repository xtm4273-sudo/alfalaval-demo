import React from 'react';
import type { ProgressReportData } from '../../types/index.ts';

interface Props {
  data: ProgressReportData;
}

const ProgressReportCard: React.FC<Props> = ({ data }) => {
  const isOnTrack = data.status === 'on-track';

  const headerBg = isOnTrack
    ? 'linear-gradient(135deg, #e8f5e9, #c8e6c9)'
    : 'linear-gradient(135deg, #fff3e0, #ffe0b2)';
  const headerBorder = isOnTrack ? '#a5d6a7' : '#ffcc80';
  const accentColor = isOnTrack ? '#2e7d32' : '#e65100';
  const badgeBg = isOnTrack ? '#e8f5e9' : '#fff3e0';
  const badgeColor = isOnTrack ? '#2e7d32' : '#e65100';
  const progressBarColor = isOnTrack ? '#4caf50' : '#ff9800';

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
        minWidth: 260,
        maxWidth: 360,
        border: `1px solid ${headerBorder}`,
      }}
    >
      {/* 头部 */}
      <div
        style={{
          background: headerBg,
          borderBottom: `1px solid ${headerBorder}`,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span style={{ fontSize: '22px' }}>{data.engineerAvatar}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#222' }}>
            {data.engineerName} · 日终进度汇报
          </div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
            📍 {data.taskAddress}
          </div>
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: badgeColor,
            background: badgeBg,
            border: `1px solid ${headerBorder}`,
            padding: '3px 9px',
            borderRadius: '10px',
            whiteSpace: 'nowrap',
          }}
        >
          {isOnTrack ? '✅ 按时完成' : '⚠️ 进度滞后'}
        </span>
      </div>

      {/* 内容 */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* 任务名 */}
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>
          🔧 {data.taskName}
        </div>

        {/* 进度条 */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '12px', color: '#666' }}>完成进度</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: accentColor }}>
              {data.progressPercent}%
            </span>
          </div>
          <div
            style={{
              height: '8px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${data.progressPercent}%`,
                height: '100%',
                backgroundColor: progressBarColor,
                borderRadius: '4px',
                transition: 'width 0.6s ease',
              }}
            />
          </div>
        </div>

        {/* 详情行 */}
        <div
          style={{
            backgroundColor: '#fafafa',
            borderRadius: '8px',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            fontSize: '12px',
            color: '#444',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#888' }}>完成情况</span>
            <span style={{ fontWeight: 500 }}>{data.actualProgress}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#888' }}>计划完工</span>
            <span style={{ fontWeight: 500 }}>{data.plannedCompletion}</span>
          </div>
          {data.estimatedCompletion && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>预计完工</span>
              <span style={{ fontWeight: 500, color: accentColor }}>{data.estimatedCompletion}</span>
            </div>
          )}
          {data.delayReason && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>延期原因</span>
              <span style={{ fontWeight: 500, color: '#e65100', maxWidth: '180px', textAlign: 'right' }}>
                {data.delayReason}
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          padding: '6px 14px',
          backgroundColor: '#fafafa',
          borderTop: '1px solid #f0f0f0',
          fontSize: '10px',
          color: '#bbb',
          textAlign: 'right',
        }}
      >
        智能派单助手 · 已同步至排班系统
      </div>
    </div>
  );
};

export default ProgressReportCard;
