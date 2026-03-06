import React from 'react';
import type { PhoneCallbackData } from '../../types/index.ts';

interface Props {
  data: PhoneCallbackData;
}

const issueTagColors: Record<string, { bg: string; text: string }> = {
  '响应速度': { bg: '#e6f4ff', text: '#1890ff' },
  '技术能力': { bg: '#fff7e6', text: '#fa8c16' },
  '服务态度': { bg: '#f9f0ff', text: '#722ed1' },
  '配件情况': { bg: '#fff1f0', text: '#ff4d4f' },
  '整洁规范': { bg: '#f6ffed', text: '#52c41a' },
  '沟通效率': { bg: '#e6fffb', text: '#13c2c2' },
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div style={{ display: 'flex', gap: '3px' }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} style={{ fontSize: '18px', color: s <= rating ? '#faad14' : '#e0e0e0' }}>★</span>
    ))}
  </div>
);

const PhoneCallbackInputCard: React.FC<Props> = ({ data }) => {
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
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{ fontSize: '16px' }}>📞</span>
        <div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>电话回访录入</div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px', marginTop: '1px' }}>
            {data.coordinatorName} · {data.callTime}
          </div>
        </div>
        {data.saved && (
          <div style={{
            marginLeft: 'auto',
            backgroundColor: 'rgba(255,255,255,0.25)',
            color: '#fff',
            borderRadius: '8px',
            padding: '3px 8px',
            fontSize: '11px',
            fontWeight: 600,
          }}>
            ✓ 已归档
          </div>
        )}
      </div>

      {/* 工单基本信息 */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '16px' }}>{data.engineerAvatar}</span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#1a1a1a' }}>{data.workOrderId}</div>
            <div style={{ fontSize: '11px', color: '#888' }}>{data.customerName} · {data.engineerName} · {data.serviceDate}</div>
          </div>
        </div>
        <div style={{
          display: 'inline-block',
          backgroundColor: '#fff7e6',
          color: '#fa8c16',
          borderRadius: '5px',
          padding: '2px 8px',
          fontSize: '11px',
          fontWeight: 500,
        }}>
          🔧 {data.serviceType}
        </div>
      </div>

      {/* 综合评分 */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>综合满意度评分</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <StarRating rating={data.rating} />
          <span style={{
            fontSize: '20px',
            fontWeight: 700,
            color: data.rating >= 4 ? '#52c41a' : data.rating >= 3 ? '#fa8c16' : '#ff4d4f',
          }}>
            {data.rating}
          </span>
          <span style={{ fontSize: '12px', color: '#aaa' }}>/5</span>
        </div>
      </div>

      {/* 问题分类 */}
      {data.issueCategories.length > 0 && (
        <div style={{ padding: '12px 14px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>客户反馈问题</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {data.issueCategories.map((tag) => {
              const c = issueTagColors[tag] || { bg: '#f5f5f5', text: '#666' };
              return (
                <span key={tag} style={{
                  backgroundColor: c.bg,
                  color: c.text,
                  borderRadius: '6px',
                  padding: '3px 8px',
                  fontSize: '11px',
                  fontWeight: 500,
                }}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* 备注 */}
      {data.comment && (
        <div style={{ padding: '12px 14px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>客户备注</div>
          <div style={{
            fontSize: '12px',
            color: '#333',
            backgroundColor: '#fafafa',
            borderRadius: '8px',
            padding: '8px 10px',
            lineHeight: 1.6,
            border: '1px solid #f0f0f0',
          }}>
            "{data.comment}"
          </div>
        </div>
      )}

      {/* 底部状态 */}
      <div style={{
        padding: '8px 14px',
        backgroundColor: data.needsFollowUp ? '#fff1f0' : '#f6ffed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: '11px',
          color: data.needsFollowUp ? '#ff4d4f' : '#52c41a',
          fontWeight: 500,
        }}>
          {data.needsFollowUp ? '⚠️ 需要跟进处理' : '✅ 无需额外跟进'}
        </span>
        <span style={{ fontSize: '10px', color: '#aaa' }}>电话渠道录入</span>
      </div>
    </div>
  );
};

export default PhoneCallbackInputCard;
