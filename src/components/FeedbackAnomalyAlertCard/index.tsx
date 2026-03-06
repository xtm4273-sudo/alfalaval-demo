import React from 'react';
import type { FeedbackAnomalyReport } from '../../types/index.ts';

interface Props {
  data: FeedbackAnomalyReport;
}

const alertStatusConfig = {
  sent: { label: '已推送 Leader', color: '#1890ff', bg: '#e6f4ff' },
  acknowledged: { label: 'Leader 已确认', color: '#fa8c16', bg: '#fff7e6' },
  resolved: { label: '已处理', color: '#52c41a', bg: '#f6ffed' },
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} style={{ fontSize: '12px', color: s <= rating ? '#ff4d4f' : '#e0e0e0' }}>★</span>
    ))}
  </div>
);

const FeedbackAnomalyAlertCard: React.FC<Props> = ({ data }) => {
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
        background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '16px' }}>🚨</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>低满意度异常工单</div>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px' }}>{data.period} · 已自动标注并推送</div>
          </div>
        </div>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.25)',
          color: '#fff',
          borderRadius: '10px',
          padding: '2px 8px',
          fontSize: '12px',
          fontWeight: 700,
        }}>
          {data.totalAnomalies} 条异常
        </div>
      </div>

      {/* 异常工单列表 */}
      <div style={{ padding: '8px 0' }}>
        {data.alerts.map((alert, idx) => {
          const stConf = alertStatusConfig[alert.alertStatus];
          return (
            <div key={alert.workOrderId} style={{
              padding: '12px 14px',
              borderBottom: idx < data.alerts.length - 1 ? '1px solid #fff1f0' : 'none',
              backgroundColor: '#fffafa',
            }}>
              {/* 工单标题行 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{
                    backgroundColor: '#ff4d4f',
                    color: '#fff',
                    borderRadius: '4px',
                    padding: '1px 5px',
                    fontSize: '10px',
                    fontWeight: 700,
                  }}>
                    低分
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#1a1a1a' }}>{alert.workOrderId}</span>
                </div>
                <div style={{
                  backgroundColor: stConf.bg,
                  color: stConf.color,
                  borderRadius: '6px',
                  padding: '2px 7px',
                  fontSize: '10px',
                  fontWeight: 600,
                }}>
                  {stConf.label}
                </div>
              </div>

              {/* 工程师 + 评分 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '14px' }}>{alert.engineerAvatar}</span>
                  <span style={{ fontSize: '12px', color: '#444' }}>{alert.engineerName}</span>
                </div>
                <StarRating rating={alert.rating} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#ff4d4f' }}>{alert.rating} 星</span>
              </div>

              {/* 问题分类 */}
              <div style={{ marginBottom: '8px' }}>
                <span style={{
                  backgroundColor: '#fff1f0',
                  color: '#ff4d4f',
                  borderRadius: '5px',
                  padding: '2px 7px',
                  fontSize: '11px',
                  fontWeight: 500,
                }}>
                  ⚡ {alert.issueCategory}
                </span>
              </div>

              {/* 客户原话 */}
              <div style={{
                backgroundColor: '#fff',
                border: '1px solid #ffd6d6',
                borderRadius: '6px',
                padding: '7px 10px',
                fontSize: '11px',
                color: '#555',
                lineHeight: 1.5,
                marginBottom: '8px',
              }}>
                客户反馈："{alert.customerComment}"
              </div>

              {/* 推送 Leader 信息 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#f5f5f5',
                borderRadius: '6px',
                padding: '6px 8px',
              }}>
                <span style={{ fontSize: '13px' }}>{alert.leaderAvatar}</span>
                <span style={{ fontSize: '11px', color: '#666' }}>
                  已推送至 <strong>{alert.leaderName}</strong> · {alert.alertSentAt}
                </span>
              </div>

              {/* 服务日期 */}
              <div style={{ marginTop: '5px', fontSize: '10px', color: '#aaa' }}>
                服务日期：{alert.serviceDate} · 客户：{alert.customerName}
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部说明 */}
      <div style={{
        padding: '8px 14px',
        backgroundColor: '#fff1f0',
        borderTop: '1px solid #ffd6d6',
        fontSize: '11px',
        color: '#ff4d4f',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
      }}>
        <span>🤖</span>
        <span>系统已自动标注并推送对应 Leader，请及时组织复盘</span>
      </div>
    </div>
  );
};

export default FeedbackAnomalyAlertCard;
