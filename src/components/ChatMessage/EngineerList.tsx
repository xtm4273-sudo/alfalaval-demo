import React from 'react';
import { motion } from 'framer-motion';
import type { Engineer } from '../../types/index.ts';
import EngineerCard from '../EngineerCard';

interface EngineerListProps {
  engineers: Engineer[];
  onSelect?: (engineer: Engineer) => void;
}

const EngineerList: React.FC<EngineerListProps> = ({ engineers, onSelect }) => {
  return (
    <div style={{ width: '100%' }} className="space-y-2">
      {engineers.map((engineer, index) => (
        <motion.div
          key={engineer.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <EngineerCard engineer={engineer} onSelect={onSelect} />
        </motion.div>
      ))}
    </div>
  );
};

export default EngineerList;