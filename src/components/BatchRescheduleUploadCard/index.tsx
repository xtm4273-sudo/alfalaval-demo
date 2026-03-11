import React from 'react';
import type { BatchRescheduleUploadData } from '../../types/index.ts';

interface BatchRescheduleUploadCardProps {
  data: BatchRescheduleUploadData;
}

const BatchRescheduleUploadCard: React.FC<BatchRescheduleUploadCardProps> = ({ data }) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DCEEFB',
        borderRadius: '12px',
        padding: '14px 16px',
        minWidth: '280px',
        maxWidth: '420px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            background: '#FFF3E0',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            flexShrink: 0,
          }}
        >
          📋
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#1a1a1a',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            项目批量重排表
          </div>
          <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
            {data.fileName} · 共 {data.rowCount} 条
          </div>
        </div>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 700,
            color: '#E65100',
            background: '#FFF3E0',
            padding: '2px 6px',
            borderRadius: '4px',
            flexShrink: 0,
          }}
        >
          XLS
        </div>
      </div>

      {data.previewItems.length > 0 && (
        <div
          style={{
            overflowX: 'auto',
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            marginTop: '8px',
          }}
        >
          <table
            style={{
              borderCollapse: 'collapse',
              fontSize: '11px',
              width: '100%',
              minWidth: '320px',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: '5px 6px',
                    background: '#F5F5F5',
                    fontWeight: 600,
                    textAlign: 'left',
                    border: '1px solid #E0E0E0',
                  }}
                >
                  项目ID
                </th>
                <th
                  style={{
                    padding: '5px 6px',
                    background: '#F5F5F5',
                    fontWeight: 600,
                    textAlign: 'center',
                    border: '1px solid #E0E0E0',
                  }}
                >
                  建议开始
                </th>
                <th
                  style={{
                    padding: '5px 6px',
                    background: '#F5F5F5',
                    fontWeight: 600,
                    textAlign: 'center',
                    border: '1px solid #E0E0E0',
                  }}
                >
                  建议结束
                </th>
                <th
                  style={{
                    padding: '5px 6px',
                    background: '#F5F5F5',
                    fontWeight: 600,
                    textAlign: 'left',
                    border: '1px solid #E0E0E0',
                  }}
                >
                  备注
                </th>
              </tr>
            </thead>
            <tbody>
              {data.previewItems.map((item, i) => (
                <tr
                  key={item.projectId}
                  style={{ backgroundColor: i % 2 === 0 ? '#FAFAFA' : '#fff' }}
                >
                  <td
                    style={{
                      padding: '4px 6px',
                      border: '1px solid #E0E0E0',
                      fontWeight: 600,
                    }}
                  >
                    {item.projectId}
                  </td>
                  <td
                    style={{
                      padding: '4px 6px',
                      border: '1px solid #E0E0E0',
                      textAlign: 'center',
                    }}
                  >
                    {item.suggestedStart}
                  </td>
                  <td
                    style={{
                      padding: '4px 6px',
                      border: '1px solid #E0E0E0',
                      textAlign: 'center',
                    }}
                  >
                    {item.suggestedEnd}
                  </td>
                  <td
                    style={{
                      padding: '4px 6px',
                      border: '1px solid #E0E0E0',
                      color: '#666',
                      maxWidth: '120px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.reason ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BatchRescheduleUploadCard;
