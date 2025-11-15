import React from 'react';
import { List, Typography, Tag, Progress } from 'antd';
import { FileTextOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { FAILED, PROCESS_STATUS, PROCESSING, SUCCESSFULL } from '../../constants/dashboard-constants';

const { Text } = Typography;

interface CsvUploadItem {
  id: number;
  filename: string;
  totalKeyword: number;
  processedKeywords: number;
  status: typeof PROCESSING | typeof SUCCESSFULL | typeof FAILED;
  createdAt: string;
  updatedAt: string;
}

interface CsvUploadListItemProps {
  item: CsvUploadItem;
}

const CsvUploadListItem: React.FC<CsvUploadListItemProps> = ({ item }) => {
  const getStatusTag = (status: string) => {
    const statusConfig = {
      [PROCESS_STATUS.PROCESSING]: { color: 'processing', icon: <ClockCircleOutlined />, text: 'Processing' },
      [PROCESS_STATUS.SUCCESSFULL]: { color: 'success', icon: <CheckCircleOutlined />, text: 'Completed' },
      [PROCESS_STATUS.FAILED]: { color: 'error', icon: <CloseCircleOutlined />, text: 'Failed' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const getProgress = () => {
    if (item.totalKeyword === 0) return 0;
    return Math.round((item.processedKeywords / item.totalKeyword) * 100);
  };

  return (
    <List.Item
      actions={[
        <Text type="secondary" key="date">
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      ]}
    >
      <List.Item.Meta
        avatar={<FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link to={`/upload/${item.id}`} style={{ textDecoration: 'none' }}>
              <Typography.Link strong>{item.filename}</Typography.Link>
            </Link>
            {getStatusTag(item.status)}
          </div>
        }
        description={
          <div>
            <Text type="secondary">
              {item.processedKeywords} / {item.totalKeyword} keywords processed
            </Text>
            <Progress
              percent={getProgress()}
              size="small"
              status={item.status === 'failed' ? 'exception' : item.status === 'completed' ? 'success' : 'active'}
              style={{ marginTop: '8px' }}
            />
          </div>
        }
      />
    </List.Item>
  );
};

export default CsvUploadListItem;
