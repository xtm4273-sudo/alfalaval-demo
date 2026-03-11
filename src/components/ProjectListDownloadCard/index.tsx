import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import type { ProjectListExcelData } from '../../types/index.ts';

interface ProjectListDownloadCardProps {
  data: ProjectListExcelData;
}

const flexibilityColor: Record<string, string> = {
  '可调整': '#2E7D32',
  '建议保留': '#E65100',
  '战略客户': '#C62828',
};

const ProjectListDownloadCard: React.FC<ProjectListDownloadCardProps> = ({ data }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();

    const headerRow = [
      '项目编号',
      '客户/地点',
      '产品与服务',
      '计划开始',
      '计划结束',
      '人数',
      '当前工程师',
      '可调整性',
      '备注',
    ];

    const dataRows = data.rows.map((row) => [
      row.projectId,
      row.customerAddress,
      row.productService,
      row.plannedStart,
      row.plannedEnd,
      row.headcount,
      row.assignedEngineers,
      row.flexibility,
      row.note ?? '',
    ]);

    const wsData = [headerRow, ...dataRows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    ws['!cols'] = [
      { wch: 10 },
      { wch: 14 },
      { wch: 14 },
      { wch: 10 },
      { wch: 10 },
      { wch: 6 },
      { wch: 14 },
      { wch: 10 },
      { wch: 12 },
    ];

    XLSX.utils.book_append_sheet(wb, ws, '受影响项目列表');

    const notesData = [
      ['说明', ''],
      ['生成时间', new Date().toLocaleString('zh-CN')],
      ['时间范围', data.timeRangeLabel],
      ['插单任务', data.urgentTaskSummary],
      ['项目数量', String(data.rows.length)],
      ['', ''],
      ['用途', '可根据此表在 Excel 中填写建议新时间，上传后进行项目批量重排'],
    ];
    const wsNotes = XLSX.utils.aoa_to_sheet(notesData);
    wsNotes['!cols'] = [{ wch: 12 }, { wch: 50 }];
    XLSX.utils.book_append_sheet(wb, wsNotes, '说明');

    XLSX.writeFile(wb, data.fileName);
    setDownloaded(true);
  };

  const thStyle: React.CSSProperties = {
    padding: '6px 8px',
    background: '#1E88E5',
    color: '#fff',
    fontWeight: 600,
    textAlign: 'center',
    border: '1px solid #1565C0',
    fontSize: '10px',
    whiteSpace: 'nowrap',
  };

  const tdStyle: React.CSSProperties = {
    padding: '5px 6px',
    textAlign: 'center',
    border: '1px solid #E0E0E0',
    fontSize: '10px',
    whiteSpace: 'nowrap',
  };

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #FFF3E0',
        borderRadius: '12px',
        padding: '14px 16px',
        minWidth: '280px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '18px' }}>📋</span>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>
            受影响项目列表
          </div>
          <div style={{ fontSize: '11px', color: '#888' }}>{data.timeRangeLabel}</div>
        </div>
      </div>

      <div
        style={{
          padding: '8px 10px',
          background: '#FFF8E1',
          borderRadius: '8px',
          marginBottom: '10px',
          fontSize: '11px',
          color: '#555',
        }}
      >
        {data.urgentTaskSummary}
      </div>

      <div style={{ overflowX: 'auto', marginBottom: '12px' }}>
        <table
          style={{
            borderCollapse: 'collapse',
            fontSize: '11px',
            width: '100%',
            minWidth: '640px',
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>项目编号</th>
              <th style={thStyle}>客户/地点</th>
              <th style={thStyle}>产品与服务</th>
              <th style={thStyle}>计划开始</th>
              <th style={thStyle}>计划结束</th>
              <th style={thStyle}>人数</th>
              <th style={thStyle}>当前工程师</th>
              <th style={thStyle}>可调整性</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={row.projectId} style={{ backgroundColor: i % 2 === 0 ? '#FAFAFA' : '#fff' }}>
                <td style={tdStyle}>{row.projectId}</td>
                <td style={{ ...tdStyle, textAlign: 'left' }}>{row.customerAddress}</td>
                <td style={tdStyle}>{row.productService}</td>
                <td style={tdStyle}>{row.plannedStart}</td>
                <td style={tdStyle}>{row.plannedEnd}</td>
                <td style={tdStyle}>{row.headcount}</td>
                <td style={{ ...tdStyle, textAlign: 'left' }}>{row.assignedEngineers}</td>
                <td
                  style={{
                    ...tdStyle,
                    color: flexibilityColor[row.flexibility] ?? '#333',
                    fontWeight: 600,
                  }}
                >
                  {row.flexibility}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleDownload}
        style={{
          width: '100%',
          padding: '10px',
          background: downloaded ? '#4CAF50' : '#E65100',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          transition: 'background 0.2s',
        }}
      >
        <span>{downloaded ? '✅' : '⬇️'}</span>
        <span>{downloaded ? '已下载' : `下载 Excel（${data.fileName}）`}</span>
      </button>
    </div>
  );
};

export default ProjectListDownloadCard;
