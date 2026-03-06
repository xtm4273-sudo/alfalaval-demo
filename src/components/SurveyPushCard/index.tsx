import React from 'react';
import type { SurveyPushData } from '../../types/index.ts';

interface Props {
  data: SurveyPushData;
}

const statusConfig = {
  pending: { label: '待推送', color: '#fa8c16', bg: '#fff7e6' },
  sent: { label: '已发送', color: '#1890ff', bg: '#e6f4ff' },
  delivered: { label: '客户已收到', color: '#52c41a', bg: '#f6ffed' },
};

const StarRating: React.FC<{ rating: number; size?: number }> = ({ rating, size = 14 }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} style={{ fontSize: `${size}px`, color: s <= rating ? '#faad14' : '#e0e0e0' }}>★</span>
    ))}
  </div>
);

const SurveyPushCard: React.FC<Props> = ({ data }) => {
  const status = statusConfig[data.pushStatus];

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
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{ fontSize: '16px' }}>📨</span>
        <div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>满意度问卷推送</div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px', marginTop: '1px' }}>
            {data.channel === 'wechat' ? `企业微信群 · ${data.wechatGroupName}` : '电话渠道'}
          </div>
        </div>
        <div style={{
          marginLeft: 'auto',
          backgroundColor: status.bg,
          color: status.color,
          borderRadius: '8px',
          padding: '3px 8px',
          fontSize: '11px',
          fontWeight: 600,
        }}>
          {status.label}
        </div>
      </div>

      {/* 工单信息 */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>工单信息</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {[
            { label: '工单号', value: data.workOrderId },
            { label: '服务日期', value: data.serviceDate },
            { label: '客户', value: data.customerName },
            { label: '服务类型', value: data.serviceType },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: '10px', color: '#aaa' }}>{label}</div>
              <div style={{ fontSize: '12px', color: '#1a1a1a', fontWeight: 500, marginTop: '1px' }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '15px' }}>{data.engineerAvatar}</span>
          <span style={{ fontSize: '12px', color: '#444', fontWeight: 500 }}>工程师：{data.engineerName}</span>
        </div>
      </div>

      {/* QR 码 / 推送预览区 */}
      {data.channel === 'wechat' && (
        <div style={{ padding: '12px 14px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>企微推送内容预览</div>
          <div style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            padding: '10px',
            border: '1px solid #e8e8e8',
          }}>
            <div style={{ fontSize: '11px', color: '#07c160', fontWeight: 600, marginBottom: '4px' }}>
              🤖 服务满意度回访
            </div>
            <div style={{ fontSize: '11px', color: '#333', lineHeight: 1.5 }}>
              您好 {data.customerName}！您于 {data.serviceDate} 完成的工单 <strong>{data.workOrderId}</strong> 服务已结束，请扫码或点击链接填写 30 秒满意度评价 👇
            </div>
            {/* 模拟二维码区域 */}
            <div style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '6px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                flexDirection: 'column',
                gap: '2px',
              }}>
                {/* 模拟二维码像素格 */}
                {Array.from({ length: 5 }).map((_, row) => (
                  <div key={row} style={{ display: 'flex', gap: '2px' }}>
                    {Array.from({ length: 5 }).map((_, col) => {
                      const filled = (row === 0 || row === 4 || col === 0 || col === 4 || (row === 2 && col === 2) || (row === 1 && col === 3) || (row === 3 && col === 1));
                      return (
                        <div key={col} style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: filled ? '#1a1a1a' : '#fff',
                          borderRadius: '1px',
                        }} />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#888' }}>扫描二维码填写</div>
                <div style={{ fontSize: '10px', color: '#1890ff', marginTop: '3px', wordBreak: 'break-all' }}>
                  {data.surveyLink || 'https://survey.alfa.com/s/XXXX'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 反馈已收到 */}
      {data.feedbackReceived && (
        <div style={{ padding: '12px 14px', backgroundColor: '#f6ffed', borderTop: '1px solid #b7eb8f' }}>
          <div style={{ fontSize: '12px', color: '#52c41a', fontWeight: 600, marginBottom: '6px' }}>
            ✅ 客户已提交反馈
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <StarRating rating={data.feedbackReceived.rating} />
            <span style={{ fontSize: '12px', color: '#333', fontWeight: 500 }}>
              {data.feedbackReceived.rating} 星
            </span>
          </div>
          {data.feedbackReceived.comment && (
            <div style={{
              fontSize: '11px',
              color: '#555',
              backgroundColor: '#fff',
              borderRadius: '6px',
              padding: '6px 8px',
              marginTop: '6px',
              border: '1px solid #d9f7be',
              lineHeight: 1.5,
            }}>
              "{data.feedbackReceived.comment}"
            </div>
          )}
          <div style={{ fontSize: '10px', color: '#aaa', marginTop: '4px' }}>
            提交于 {data.feedbackReceived.submittedAt}
          </div>
        </div>
      )}

      {/* 推送时间 */}
      <div style={{
        padding: '8px 14px',
        backgroundColor: '#fafafa',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '11px', color: '#aaa' }}>推送时间：{data.pushTime}</span>
        {data.channel === 'wechat' && (
          <span style={{
            fontSize: '11px',
            color: '#07c160',
            fontWeight: 500,
          }}>
            📱 企业微信
          </span>
        )}
      </div>
    </div>
  );
};

export default SurveyPushCard;
