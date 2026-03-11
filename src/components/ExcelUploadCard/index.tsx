import React from 'react';
import type { ExcelUploadData } from '../../types/index.ts';

interface ExcelUploadCardProps {
  data: ExcelUploadData;
}

const ExcelUploadCard: React.FC<ExcelUploadCardProps> = ({ data }) => {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      background: '#fff',
      border: '1px solid #DCEEFB',
      borderRadius: '10px',
      padding: '10px 14px',
      minWidth: '200px',
      maxWidth: '280px',
    }}>
      {/* 文件图标 */}
      <div style={{
        width: '40px',
        height: '40px',
        background: '#E8F5E9',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        flexShrink: 0,
      }}>
        📋
      </div>

      {/* 文件信息 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#1a1a1a',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {data.fileName}
        </div>
        <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
          共 {data.rowCount} 条任务
        </div>
      </div>

      {/* Excel 标识 */}
      <div style={{
        fontSize: '10px',
        fontWeight: 700,
        color: '#217346',
        background: '#E8F5E9',
        padding: '2px 6px',
        borderRadius: '4px',
        flexShrink: 0,
      }}>
        XLS
      </div>
    </div>
  );
};

export default ExcelUploadCard;
