import React from 'react';
import { List } from 'antd';
import CsvUploadListItem from './CsvUploadListItem';

interface CsvUploadItem {
  id: number;
  filename: string;
  totalKeyword: number;
  processedKeywords: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

interface CsvUploadListProps {
  data: CsvUploadItem[];
  loading?: boolean;
}

const CsvUploadList: React.FC<CsvUploadListProps> = ({ data, loading = false }) => {

  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => <CsvUploadListItem key={item.id} item={item} />}
    />
  );
};

export default CsvUploadList;
