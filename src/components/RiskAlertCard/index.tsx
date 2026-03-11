import React from 'react';
import type { RiskAlertData } from '../../types/index.ts';

interface Props {
  data: RiskAlertData;
}

const RiskAlertCard: React.FC<Props> = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(230,81,0,0.12)',
        minWidth: 260,
        maxWidth: 360,
        border: '1px solid #ffcc80',
      }}
    >
      {/* 头部 */}
      <div
        style={{
          background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
          borderBottom: '1px solid #ffcc80',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '20px' }}>⚠️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#bf360c' }}>
            进度风险预警
          </div>
          <div style={{ fontSize: '11px', color: '#e65100', marginTop: '1px' }}>
            已自动通知：{data.recipients.join('、')}
          </div>
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#fff',
            background: '#e65100',
            padding: '3px 9px',
            borderRadius: '10px',
            whiteSpace: 'nowrap',
          }}
        >
          延期 {data.delayDays} 天
        </span>
      </div>

      {/* 工程师 + 任务信息 */}
      <div
        style={{
          padding: '10px 14px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span style={{ fontSize: '24px' }}>{data.engineerAvatar}</span>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#222' }}>
            {data.engineerName}
          </div>
          <div style={{ fontSize: '11px', color: '#888' }}>📍 {data.taskAddress}</div>
        </div>
      </div>

      {/* 详情 */}
      <div
        style={{
          margin: '10px 14px',
          backgroundColor: '#fff8f0',
          borderRadius: '8px',
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
          fontSize: '12px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#888' }}>任务</span>
          <span style={{ fontWeight: 500, color: '#333' }}>{data.taskName}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#888' }}>原计划完工</span>
          <span style={{ fontWeight: 500, color: '#333' }}>{data.plannedCompletion}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#888' }}>预计实际完工</span>
          <span style={{ fontWeight: 600, color: '#e65100' }}>{data.estimatedCompletion}</span>
        </div>
        <div
          style={{
            borderTop: '1px dashed #ffcc80',
            paddingTop: '7px',
          }}
        >
          <div style={{ color: '#888', marginBottom: '3px' }}>延期原因</div>
          <div style={{ fontWeight: 500, color: '#bf360c' }}>{data.delayReason}</div>
        </div>
      </div>

      {/* 影响 & 建议 */}
      <div
        style={{
          margin: '0 14px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        <div
          style={{
            backgroundColor: '#fce4ec',
            borderRadius: '6px',
            padding: '7px 10px',
            fontSize: '12px',
          }}
        >
          <span style={{ color: '#880e4f', fontWeight: 600 }}>影响：</span>
          <span style={{ color: '#444' }}>{data.impact}</span>
        </div>
        <div
          style={{
            backgroundColor: '#e3f2fd',
            borderRadius: '6px',
            padding: '7px 10px',
            fontSize: '12px',
          }}
        >
          <span style={{ color: '#0d47a1', fontWeight: 600 }}>建议：</span>
          <span style={{ color: '#444' }}>{data.suggestion}</span>
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
        智能派单助手 · 自动风险识别
      </div>
    </div>
  );
};

export default RiskAlertCard;
