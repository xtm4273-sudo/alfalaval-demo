import React from 'react';
import type { EngineerPrivateMsgData } from '../../types/index.ts';

interface Props {
  data: EngineerPrivateMsgData;
}

const EngineerPrivateMsgCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="analysis-card" style={{ minWidth: 260, maxWidth: 380 }}>
      {/* 卡片头部 */}
      <div
        className="analysis-card-header"
        style={{
          background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
          borderBottom: '1px solid #bfdbfe',
        }}
      >
        <span className="analysis-card-icon">🔒</span>
        <div>
          <div className="analysis-card-title" style={{ color: '#1e40af' }}>
            私信已发送
          </div>
          <div className="analysis-card-subtitle" style={{ color: '#3b82f6' }}>
            以下为发送给各工程师的私信内容
          </div>
        </div>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: '9px',
            color: '#6b7280',
            background: '#e0e7ff',
            padding: '2px 7px',
            borderRadius: '8px',
            whiteSpace: 'nowrap',
          }}
        >
          智能派单助手
        </span>
      </div>

      {/* 私信列表 */}
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.privateMessages.map((msg, i) => (
          <div
            key={i}
            style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderTop: '3px solid #576b95',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            {/* 私聊头部 */}
            <div className="wr-wecom-header">
              <span style={{ fontSize: '18px' }}>{msg.engineerAvatar}</span>
              <div className="wr-wecom-meta">
                <span className="wr-wecom-name">{msg.engineerName}</span>
                <span className="wr-wecom-type">私信</span>
              </div>
              <span className="wr-wecom-source">智能派单助手</span>
            </div>

            {/* 私信内容气泡 */}
            <div style={{ padding: '10px 12px', background: '#fff' }}>
              <div
                style={{
                  background: '#f3f4f6',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '12px',
                  color: '#374151',
                  lineHeight: '1.7',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.taskDetails}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngineerPrivateMsgCard;
