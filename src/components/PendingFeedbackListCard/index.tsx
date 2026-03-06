import React from 'react';
import type { PendingFeedbackList, PendingFeedbackItem } from '../../types/index.ts';

interface Props {
  data: PendingFeedbackList;
}

const channelLabel = (channel: PendingFeedbackItem['channel']) =>
  channel === 'wechat' ? '企微' : '电话';

const channelColor = (channel: PendingFeedbackItem['channel']) =>
  channel === 'wechat' ? '#07c160' : '#fa8c16';

const statusLabel = (status: PendingFeedbackItem['status']) => {
  if (status === 'pending') return '待发起';
  if (status === 'sent') return '已推送';
  return '已完成';
};

const statusColor = (status: PendingFeedbackItem['status']) => {
  if (status === 'pending') return '#ff4d4f';
  if (status === 'sent') return '#1890ff';
  return '#52c41a';
};

const urgencyColor = (days: number) => {
  if (days >= 4) return '#ff4d4f';
  if (days >= 2) return '#fa8c16';
  return '#52c41a';
};

const PendingFeedbackListCard: React.FC<Props> = ({ data }) => {
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '16px' }}>📋</span>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>待回访工单</span>
        </div>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.25)',
          borderRadius: '10px',
          padding: '2px 8px',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 600,
        }}>
          {data.totalPending} 条待处理
        </div>
      </div>

      {/* 列表 */}
      <div style={{ padding: '8px 0' }}>
        {data.items.map((item, idx) => (
          <div key={item.workOrderId} style={{
            padding: '10px 14px',
            borderBottom: idx < data.items.length - 1 ? '1px solid #f0f0f0' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '15px' }}>{item.engineerAvatar}</span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#1a1a1a' }}>
                    {item.workOrderId}
                  </div>
                  <div style={{ fontSize: '11px', color: '#666', marginTop: '1px' }}>
                    {item.customerName} · {item.engineerName}
                  </div>
                </div>
              </div>
              <div style={{
                backgroundColor: statusColor(item.status) + '18',
                color: statusColor(item.status),
                borderRadius: '6px',
                padding: '2px 7px',
                fontSize: '11px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}>
                {statusLabel(item.status)}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', color: '#888' }}>
                📍 {item.address}
              </span>
              <span style={{ fontSize: '11px', color: '#888' }}>
                🔧 {item.serviceType}
              </span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  backgroundColor: channelColor(item.channel) + '1a',
                  color: channelColor(item.channel),
                  borderRadius: '5px',
                  padding: '1px 6px',
                  fontSize: '11px',
                  fontWeight: 500,
                }}>
                  {channelLabel(item.channel)}
                </span>
                <span style={{
                  color: urgencyColor(item.daysSinceCompletion),
                  fontSize: '11px',
                  fontWeight: 600,
                }}>
                  完工 {item.daysSinceCompletion} 天
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部提示 */}
      <div style={{
        backgroundColor: '#fffbe6',
        borderTop: '1px solid #ffe58f',
        padding: '8px 14px',
        fontSize: '11px',
        color: '#ad6800',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
      }}>
        <span>⚠️</span>
        <span>距完工 4 天以上工单需优先处理，避免超出回访时限</span>
      </div>
    </div>
  );
};

export default PendingFeedbackListCard;
