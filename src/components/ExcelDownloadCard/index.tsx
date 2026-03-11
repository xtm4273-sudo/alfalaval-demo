import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import type { ExcelScheduleData } from '../../types/index.ts';

interface ExcelDownloadCardProps {
  data: ExcelScheduleData;
}

const ExcelDownloadCard: React.FC<ExcelDownloadCardProps> = ({ data }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();

    // 构建表头行：工程师 | 所在城市 | 日期1 | 日期2 | ...
    const headerRow = ['工程师', '所在城市', ...data.dateHeaders];

    // 构建数据行
    const dataRows = data.rows.map((row) => {
      const taskCells = data.dateHeaders.map((date) => row.tasks[date] || '');
      return [row.engineerName, row.location, ...taskCells];
    });

    // 添加空行和汇总行
    const summaryRow = ['预估差旅费合计', `¥${data.totalTravelCost.toLocaleString()}`, ...data.dateHeaders.map(() => '')];

    const wsData = [headerRow, ...dataRows, [], summaryRow];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // 设置列宽
    ws['!cols'] = [
      { wch: 10 },
      { wch: 12 },
      ...data.dateHeaders.map(() => ({ wch: 18 })),
    ];

    // 标注表头样式（xlsx 社区版不支持富样式，仅设置列宽）
    XLSX.utils.book_append_sheet(wb, ws, '周排班计划');

    // 添加说明 Sheet
    const notesData = [
      ['说明', ''],
      ['生成时间', new Date().toLocaleString('zh-CN')],
      ['排班周期', data.weekLabel],
      ['工程师人数', String(data.rows.length)],
      ['预估差旅费', `¥${data.totalTravelCost.toLocaleString()}`],
      ['', ''],
      ['排单原则', '优先本地工程师（零跨城差旅），技能完全匹配优先，跨城支援选高铁最短路径'],
    ];
    const wsNotes = XLSX.utils.aoa_to_sheet(notesData);
    wsNotes['!cols'] = [{ wch: 16 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(wb, wsNotes, '排单说明');

    XLSX.writeFile(wb, data.fileName);
    setDownloaded(true);
  };

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #E8F5E9',
      borderRadius: '12px',
      padding: '14px 16px',
      minWidth: '240px',
    }}>
      {/* 标题 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '18px' }}>📊</span>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>周排班计划</div>
          <div style={{ fontSize: '11px', color: '#888' }}>{data.weekLabel}</div>
        </div>
      </div>

      {/* 预览表格 */}
      <div style={{ overflowX: 'auto', marginBottom: '12px' }}>
        <table style={{ borderCollapse: 'collapse', fontSize: '11px', width: '100%', minWidth: '360px' }}>
          <thead>
            <tr>
              <th style={thStyle}>工程师</th>
              {data.dateHeaders.map((d) => (
                <th key={d} style={thStyle}>{d.replace(' ', '\n')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#FAFAFA' : '#fff' }}>
                <td style={tdNameStyle}>
                  <span style={{ marginRight: '4px' }}>{row.engineerAvatar}</span>
                  {row.engineerName}
                </td>
                {data.dateHeaders.map((date) => {
                  const task = row.tasks[date] || '';
                  return (
                    <td key={date} style={{ ...tdStyle, color: task ? '#1565C0' : '#ccc' }}>
                      {task || '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 差旅费汇总 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 10px',
        background: '#F1F8E9',
        borderRadius: '8px',
        marginBottom: '12px',
      }}>
        <span style={{ fontSize: '12px', color: '#555' }}>预估差旅费合计</span>
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#2E7D32' }}>
          ¥{data.totalTravelCost.toLocaleString()}
        </span>
      </div>

      {/* 下载按钮 */}
      <button
        onClick={handleDownload}
        style={{
          width: '100%',
          padding: '10px',
          background: downloaded ? '#4CAF50' : '#1E88E5',
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

const thStyle: React.CSSProperties = {
  padding: '6px 8px',
  background: '#1E88E5',
  color: '#fff',
  fontWeight: 600,
  textAlign: 'center',
  whiteSpace: 'pre-line',
  border: '1px solid #1565C0',
  fontSize: '10px',
};

const tdStyle: React.CSSProperties = {
  padding: '5px 6px',
  textAlign: 'center',
  border: '1px solid #E0E0E0',
  fontSize: '10px',
  whiteSpace: 'nowrap',
};

const tdNameStyle: React.CSSProperties = {
  ...tdStyle,
  textAlign: 'left',
  fontWeight: 600,
  color: '#333',
  whiteSpace: 'nowrap',
};

export default ExcelDownloadCard;
