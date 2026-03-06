import React from 'react';
import type { WeChatSurveyData } from '../../types/index.ts';

interface Props {
  data: WeChatSurveyData;
}

const dimensionLabels: Record<string, string> = {
  response_speed: '响应速度',
  tech_skill: '技术能力',
  service_attitude: '服务态度',
  site_cleanup: '现场整洁',
};

const ratingLabel = (r: number) => {
  if (r === 5) return '非常满意';
  if (r === 4) return '满意';
  if (r === 3) return '一般';
  if (r === 2) return '不满意';
  return '非常不满意';
};

const StarRow: React.FC<{ rating: number; label: string }> = ({ rating, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
    <span style={{ fontSize: '12px', color: '#333', width: '72px', flexShrink: 0 }}>{label}</span>
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ fontSize: '18px', color: s <= rating ? '#faad14' : '#e8e8e8', cursor: 'default' }}>★</span>
      ))}
    </div>
    <span style={{ fontSize: '11px', color: rating >= 4 ? '#52c41a' : rating === 3 ? '#fa8c16' : '#ff4d4f', width: '48px', textAlign: 'right', flexShrink: 0 }}>
      {ratingLabel(rating)}
    </span>
  </div>
);

const WeChatSurveyCard: React.FC<Props> = ({ data }) => {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      width: '100%',
      minWidth: '260px',
      border: '1px solid #e8e8e8',
    }}>
      {/* 企微风格顶部 */}
      <div style={{
        backgroundColor: '#07c160',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          flexShrink: 0,
        }}>
          🤖
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>服务满意度回访</div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px' }}>阿法拉伐智能服务助手</div>
        </div>
      </div>

      {/* 问卷说明 */}
      <div style={{ padding: '12px 14px', backgroundColor: '#f9f9f9', borderBottom: '1px solid #ebebeb' }}>
        <div style={{ fontSize: '12px', color: '#333', lineHeight: 1.6 }}>
          您好！感谢您选择阿法拉伐服务。工程师 <strong>{data.engineerName}</strong> 于 {data.serviceDate} 为您完成了 <strong>{data.serviceType}</strong> 服务（工单 {data.workOrderId}）。
        </div>
        <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
          请花 30 秒对本次服务进行评价，帮助我们持续改进 🙏
        </div>
      </div>

      {/* 评分区域 */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '10px', fontWeight: 500 }}>各项评分</div>
        {data.dimensions.map((dim) => (
          <StarRow
            key={dim.key}
            label={dimensionLabels[dim.key] || dim.label}
            rating={dim.rating}
          />
        ))}
      </div>

      {/* 综合评分 */}
      <div style={{
        padding: '12px 14px',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: data.overallRating >= 4 ? '#f6ffed' : data.overallRating === 3 ? '#fff7e6' : '#fff1f0',
      }}>
        <span style={{ fontSize: '12px', color: '#555', fontWeight: 500 }}>综合评分</span>
        <div style={{ display: 'flex', gap: '3px' }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} style={{ fontSize: '22px', color: s <= data.overallRating ? '#faad14' : '#e8e8e8' }}>★</span>
          ))}
        </div>
        <span style={{
          fontSize: '22px',
          fontWeight: 700,
          color: data.overallRating >= 4 ? '#52c41a' : data.overallRating === 3 ? '#fa8c16' : '#ff4d4f',
        }}>
          {data.overallRating}
        </span>
        <span style={{ fontSize: '12px', color: '#aaa' }}>/5</span>
      </div>

      {/* 文字评论 */}
      {data.comment && (
        <div style={{ padding: '12px 14px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>补充意见（可选）</div>
          <div style={{
            backgroundColor: '#fafafa',
            border: '1px solid #ebebeb',
            borderRadius: '8px',
            padding: '8px 10px',
            fontSize: '12px',
            color: '#333',
            lineHeight: 1.6,
            minHeight: '48px',
          }}>
            {data.comment}
          </div>
        </div>
      )}

      {/* 提交状态 */}
      <div style={{
        padding: '10px 14px',
        backgroundColor: data.submitted ? '#f6ffed' : '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {data.submitted ? (
          <>
            <span style={{ fontSize: '12px', color: '#52c41a', fontWeight: 600 }}>✅ 感谢您的评价，已成功提交！</span>
            <span style={{ fontSize: '10px', color: '#aaa' }}>{data.submittedAt}</span>
          </>
        ) : (
          <div style={{
            flex: 1,
            backgroundColor: '#07c160',
            color: '#fff',
            borderRadius: '8px',
            padding: '8px',
            textAlign: 'center',
            fontSize: '13px',
            fontWeight: 600,
          }}>
            提交评价
          </div>
        )}
      </div>
    </div>
  );
};

export default WeChatSurveyCard;
