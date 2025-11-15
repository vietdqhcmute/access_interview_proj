import React from 'react';
import { List, Typography, Tag, Tooltip } from 'antd';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PROCESS_STATUS, type FAILED, type PROCESSING, type SUCCESSFULL } from '../../constants/dashboard-constants';

const { Text } = Typography;

interface KeywordItem {
  id: number;
  term: string;
  status: typeof PROCESSING | typeof SUCCESSFULL | typeof FAILED;
  createdAt: string;
  errorMessage?: string;
}

interface KeyWordListProps {
  data: KeywordItem[];
  loading?: boolean;
}

const KeyWordList: React.FC<KeyWordListProps> = ({ data, loading = false }) => {
  const getStatusTag = (status: string) => {
    const statusConfig = {
      [PROCESS_STATUS.PROCESSING]: {
        color: 'processing',
        icon: <ClockCircleOutlined />,
        text: 'Processing'
      },
      [PROCESS_STATUS.SUCCESSFULL]: {
        color: 'success',
        icon: <CheckCircleOutlined />,
        text: 'Successful'
      },
      [PROCESS_STATUS.FAILED]: {
        color: 'error',
        icon: <CloseCircleOutlined />,
        text: 'Failed'
      },
    };

    const config = status ? statusConfig[status as keyof typeof statusConfig] || statusConfig.processing : statusConfig.processing;

    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Text type="secondary" key="date">
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          ]}
        >
          <List.Item.Meta
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link to={`/keyword/${item.id}`} style={{ textDecoration: 'none' }}>
                  <Text strong>{item.term}</Text>
                </Link>
                {getStatusTag(item.status)}
                {item.errorMessage && (
                  <Tooltip title={item.errorMessage}>
                    <ExclamationCircleOutlined style={{ color: '#ff4d4f', cursor: 'pointer' }} />
                  </Tooltip>
                )}
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default KeyWordList;
