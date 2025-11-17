import React from 'react';
import { List, Typography, Tag, Progress, Button, Popconfirm } from 'antd';
import { FileTextOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { FAILED, PROCESS_STATUS, PROCESSING, SUCCESSFULL } from '../../constants/dashboard-constants';
import useDeleteCsvUploadMutate from '../../hooks/csv_dashboard/useDeleteCsvUploadMutate';

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
  onDelete?: (id: number) => void;
}

const CsvUploadListItem: React.FC<CsvUploadListItemProps> = ({ item }) => {
  const deleteMutation = useDeleteCsvUploadMutate(item.id);

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

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <List.Item
      actions={[
        <Text type="secondary" key="date">
          {new Date(item.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </Text>,
        <Popconfirm
          key="delete"
          title="Delete this upload?"
          description="Are you sure you want to delete this CSV upload? This action cannot be undone."
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
          />
        </Popconfirm>
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
