import React from 'react';
import type { EngineerCalendarData, EngineerCalendarDay } from '../../types/index.ts';

interface EngineerCalendarCardProps {
  data: EngineerCalendarData;
}

const statusConfig = {
  free: { label: '空闲', bgColor: '#E8F5E9', textColor: '#2E7D32', borderColor: '#A5D6A7' },
  busy: { label: '繁忙', bgColor: '#E3F2FD', textColor: '#1565C0', borderColor: '#90CAF9' },
  'half-busy': { label: '半天忙', bgColor: '#FFF8E1', textColor: '#E65100', borderColor: '#FFE082' },
  leave: { label: '请假', bgColor: '#FBE9E7', textColor: '#BF360C', borderColor: '#FFAB91' },
} as const;

const DayRow: React.FC<{ day: EngineerCalendarDay }> = ({ day }) => {
  const cfg = statusConfig[day.status];
  const isToday = false;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        padding: '10px 0',
        borderBottom: '1px solid #F0F0F0',
      }}
    >
      {/* 左侧：日期列 */}
      <div
        style={{
          minWidth: '48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '2px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            color: isToday ? '#1E88E5' : '#999',
            fontWeight: isToday ? 600 : 400,
          }}
        >
          {day.dayLabel}
        </span>
        <span
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: isToday ? '#1E88E5' : '#333',
            lineHeight: 1.2,
            marginTop: '2px',
          }}
        >
          {day.date}
        </span>
      </div>

      {/* 右侧：状态区域 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {day.status === 'free' || day.status === 'leave' ? (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 10px',
              borderRadius: '4px',
              backgroundColor: cfg.bgColor,
              border: `1px solid ${cfg.borderColor}`,
              width: 'fit-content',
            }}
          >
            <span style={{ fontSize: '13px', color: cfg.textColor, fontWeight: 500 }}>
              {day.status === 'free' ? '✓ 空闲' : '🏖 请假'}
            </span>
          </div>
        ) : (
          <>
            {day.tasks?.map((task, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: cfg.bgColor,
                  border: `1px solid ${cfg.borderColor}`,
                  borderLeft: `3px solid ${cfg.borderColor.replace('90', '42').replace('FF', '18')}`,
                  borderRadius: '6px',
                  padding: '7px 10px',
                }}
              >
                {/* 时间段 */}
                <div style={{ fontSize: '11px', color: cfg.textColor, fontWeight: 600, marginBottom: '3px' }}>
                  🕐 {task.startTime} – {task.endTime}
                </div>
                {/* 任务名 */}
                <div style={{ fontSize: '13px', color: '#222', fontWeight: 600, marginBottom: '2px' }}>
                  {task.taskName}
                </div>
                {/* 地点 */}
                <div style={{ fontSize: '12px', color: '#555' }}>
                  📍 在 <span style={{ color: cfg.textColor, fontWeight: 500 }}>{task.location}</span>
                  {task.customer ? (
                    <span style={{ color: '#888' }}>（{task.customer}）</span>
                  ) : null}
                </div>
              </div>
            ))}
            {/* half-busy 下午空闲提示 */}
            {day.status === 'half-busy' && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '3px 10px',
                  borderRadius: '4px',
                  backgroundColor: '#E8F5E9',
                  border: '1px solid #A5D6A7',
                  width: 'fit-content',
                }}
              >
                <span style={{ fontSize: '12px', color: '#2E7D32' }}>✓ 下午空闲</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const EngineerCalendarCard: React.FC<EngineerCalendarCardProps> = ({ data }) => {
  const freeCount = data.days.filter((d) => d.status === 'free').length;
  const halfBusyCount = data.days.filter((d) => d.status === 'half-busy').length;
  const busyCount = data.days.filter((d) => d.status === 'busy').length;

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '360px',
      }}
    >
      {/* 卡片头部 */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}
        >
          {data.engineerAvatar}
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>
            {data.engineerName} 工程师
          </div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginTop: '1px' }}>
            📅 {data.weekLabel} · {data.engineerLocation}
          </div>
        </div>
      </div>

      {/* 统计摘要行 */}
      <div
        style={{
          display: 'flex',
          backgroundColor: '#F8FAFF',
          borderBottom: '1px solid #EEF2F8',
          padding: '6px 14px',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50', display: 'inline-block' }} />
          <span style={{ fontSize: '12px', color: '#555' }}>空闲 {freeCount + halfBusyCount} 天</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1E88E5', display: 'inline-block' }} />
          <span style={{ fontSize: '12px', color: '#555' }}>有任务 {busyCount + halfBusyCount} 天</span>
        </div>
      </div>

      {/* 日历主体 */}
      <div style={{ padding: '0 14px' }}>
        {data.days.map((day) => (
          <DayRow key={day.date} day={day} />
        ))}
      </div>

      {/* 卡片底部 */}
      <div
        style={{
          padding: '8px 14px',
          backgroundColor: '#FAFAFA',
          borderTop: '1px solid #F0F0F0',
          fontSize: '11px',
          color: '#BDBDBD',
          textAlign: 'right',
        }}
      >
        数据来源：排班系统实时同步
      </div>
    </div>
  );
};

export default EngineerCalendarCard;
