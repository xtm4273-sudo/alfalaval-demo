import React from 'react';
import { motion } from 'framer-motion';
import type { Engineer } from '../../types/index.ts';

interface EngineerCardProps {
  engineer: Engineer;
  onSelect?: (engineer: Engineer) => void;
}

const EngineerCard: React.FC<EngineerCardProps> = ({ engineer, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="engineer-card"
      onClick={() => onSelect?.(engineer)}
    >
      {/* 排名和头像 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        {engineer.rank && (
          <div className={`rank-badge rank-${engineer.rank}`}>
            {engineer.rank}
          </div>
        )}
        <div className="avatar avatar-lg">
          {engineer.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 500, color: '#333333' }}>{engineer.name}</div>
          <div style={{ fontSize: '12px', color: '#666666' }}>{engineer.location}</div>
        </div>
        {engineer.isAvailable ? (
          <span className="status-badge status-available">
            可用
          </span>
        ) : (
          <span className="status-badge status-busy">
            忙碌
          </span>
        )}
      </div>

      {/* 技能标签 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
        {engineer.skills.map((skill) => (
          <span
            key={skill}
            className="skill-tag"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* 数据指标 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        fontSize: '12px',
        color: '#666666',
        marginBottom: '8px'
      }}>
        <div>
          <span style={{ color: '#999999' }}>距离：</span>
          <span style={{ color: '#333333' }}>{engineer.travelDistance}km</span>
        </div>
        <div>
          <span style={{ color: '#999999' }}>利用率：</span>
          <span style={{ color: '#333333' }}>{engineer.utilizationRate}%</span>
        </div>
        <div>
          <span style={{ color: '#999999' }}>经验：</span>
          <span style={{ color: '#333333' }}>{engineer.customerExperience}次</span>
        </div>
      </div>

      {/* 推荐理由 */}
      {engineer.recommendationReason && (
        <div style={{
          fontSize: '12px',
          color: '#666666',
          backgroundColor: '#F5F5F5',
          borderRadius: '4px',
          padding: '8px'
        }}>
          💡 {engineer.recommendationReason}
        </div>
      )}
    </motion.div>
  );
};

export default EngineerCard;