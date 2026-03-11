import React from 'react';
import type { Engineer } from '../../types/index.ts';

interface EngineerListProps {
  engineers: Engineer[];
  onSelect?: (engineer: Engineer) => void;
}

const EngineerList: React.FC<EngineerListProps> = ({ engineers }) => {
  const lines: string[] = [];
  engineers.forEach((e, index) => {
    const rank = e.rank ?? index + 1;
    const status = e.isAvailable ? '可用' : '忙碌';
    const skillStr = e.skills?.length ? e.skills.join('、') : '—';
    lines.push(`${rank}. ${e.name}（${e.location}）${status}`);
    lines.push(`   技能：${skillStr} | 距离${e.travelDistance}km 利用率${e.utilizationRate}% 经验${e.customerExperience}次`);
    if (e.recommendationReason) {
      lines.push(`   推荐理由：${e.recommendationReason}`);
    }
    lines.push('');
  });

  const text = lines.join('\n').trimEnd();

  return (
    <div
      style={{
        width: '100%',
        fontSize: '13px',
        lineHeight: 1.6,
        color: '#333',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {text}
    </div>
  );
};

export default EngineerList;
