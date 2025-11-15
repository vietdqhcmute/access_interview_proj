import { useParams } from 'react-router-dom';
import { Layout, Tabs, Card, Row, Col, Statistic, Tag, Progress } from 'antd';
import { FileTextOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import useFetchCsvUploadDetail from '../hooks/csv_dashboard/useFetchCsvUploadDetail';
import PageHeader from '../components/PageHeader';
import { PROCESS_STATUS } from '../constants/dashboard-constants';
import { useMemo } from 'react';
import KeyWordList from '../components/keyword-list/KeyWordList';
import { getStatusLabel } from '../utils/handlers';

const { Content } = Layout;

export default function UploadDetail() {
  const { id } = useParams();
  const { data } = useFetchCsvUploadDetail(Number(id));
  const csvDetailData = data?.data?.attributes || {};
  const keywords = csvDetailData?.keywords || [];
  const inProgressKeywords = useMemo(() =>
    keywords.filter((kw: any) => kw.status === PROCESS_STATUS.PROCESSING),
    [keywords]
  );
  const completedKeywords = useMemo(() =>
    keywords.filter((kw: any) => kw.status === PROCESS_STATUS.SUCCESSFULL),
    [keywords]
  );
  const failedKeywords = useMemo(() =>
    keywords.filter((kw: any) => kw.status === PROCESS_STATUS.FAILED),
    [keywords]
  );

  const getProgress = () => {
    if (!csvDetailData?.totalKeyword) return 0;
    return Math.round((csvDetailData.processedKeywords / csvDetailData.totalKeyword) * 100);
  };


  const tabItems = [
    {
      key: 'all',
      label: 'All Keywords',
      children: (
        <div style={{ padding: '24px' }}>
          <KeyWordList uploadId={Number(id)} data={keywords} loading={false} />
        </div>
      ),
    },
    {
      key: 'processing',
      label: 'Processing',
      children: (
        <div style={{ padding: '24px' }}>
          <KeyWordList uploadId={Number(id)} data={inProgressKeywords} loading={false} />
        </div>
      ),
    },
    {
      key: 'completed',
      label: 'Completed',
      children: (
        <div style={{ padding: '24px' }}>
          <KeyWordList uploadId={Number(id)} data={completedKeywords} loading={false} />
        </div>
      ),
    },
    {
      key: 'failed',
      label: 'Failed',
      children: (
        <div style={{ padding: '24px' }}>
          <KeyWordList data={failedKeywords} loading={false} />
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader title={`Upload Detail - ${csvDetailData?.filename || `ID: ${id}`}`} backLink="/dashboard" />

      <Content style={{ padding: '24px' }}>
        {/* CSV Upload Information Card */}
        <Card
          style={{
            marginBottom: '24px',
            borderRadius: '8px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Filename"
                value={csvDetailData?.filename || 'N/A'}
                prefix={<FileTextOutlined />}
                valueStyle={{ fontSize: '16px' }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Status"
                value={getStatusLabel(csvDetailData?.status) || 'N/A'}
                valueStyle={{ fontSize: '16px' }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Total Keywords"
                value={csvDetailData?.totalKeyword || 0}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Processed Keywords"
                value={csvDetailData?.processedKeywords || 0}
                suffix={`/ ${csvDetailData?.totalKeyword || 0}`}
              />
            </Col>
          </Row>

          <Row style={{ marginTop: '16px' }}>
            <Col span={24}>
              <div style={{ marginBottom: '8px' }}>
                <strong>Progress:</strong>
              </div>
              <Progress
                percent={getProgress()}
                status={csvDetailData?.status === 'failed' ? 'exception' : csvDetailData?.status === 'successful' ? 'success' : 'active'}
              />
            </Col>
          </Row>

          <Row style={{ marginTop: '16px' }}>
            <Col span={24}>
              <div>
                <strong>Created At:</strong> {csvDetailData?.createdAt ? new Date(csvDetailData.createdAt).toLocaleString() : 'N/A'}
              </div>
            </Col>
          </Row>
        </Card>

        {/* Keywords Tabs */}
        <div style={{
          background: '#fff',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}>
          <Tabs defaultActiveKey="all" items={tabItems} />
        </div>
      </Content>
    </Layout>
  );
}
