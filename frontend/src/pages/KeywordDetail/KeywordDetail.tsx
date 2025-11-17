import { Layout, Card, Row, Col, Statistic, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import useFetchKeywordDetail from '../../hooks/keywords/useFetchKeywordDetail';
import { getStatusLabel } from '../../utils/handlers';
import HtmlView from './HtmlView';
const { Content } = Layout;

interface InfoRowProps {
  label: string;
  value: string | number;
}

const ErrorRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <Row style={{ marginTop: '16px' }}>
    <Col span={24}>
      <div style={{ color: 'red' }}>
        <strong>{label}:</strong> {value}
      </div>
    </Col>
  </Row>
);

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <Row style={{ marginTop: '16px' }}>
    <Col span={24}>
      <div>
        <strong>{label}:</strong> {value}
      </div>
    </Col>
  </Row>
);

export default function KeywordDetail() {
  const { id, uploadId } = useParams();
  const { data } = useFetchKeywordDetail(id || '');
  const keywordDetailData = data?.data?.attributes || {};
  const searchResult = keywordDetailData?.searchResult || {};


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader title="Keyword Detail" backLink={`/upload/${uploadId}`} />
      <Content style={{ padding: '24px' }}>
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
                title="Term"
                value={keywordDetailData?.term || 'N/A'}
                valueStyle={{ fontSize: '16px' }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Status"
                value={getStatusLabel(keywordDetailData?.status) || 'N/A'}
                valueStyle={{ fontSize: '16px' }}
              />
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Created At:"
                value={keywordDetailData?.createdAt ? new Date(keywordDetailData.createdAt).toLocaleString() : 'N/A'}
                valueStyle={{ fontSize: '16px' }}
              />
            </Col>
          </Row>

          {keywordDetailData?.errorMessage && <ErrorRow label="Error Message" value={keywordDetailData?.errorMessage} />}
          <InfoRow label="Total Results" value={searchResult?.totalResults || 'N/A'} />
          <InfoRow label="Total Link in the Page" value={searchResult?.totalLinks || 'N/A'} />
          <InfoRow label="Total Results with Thumbnails" value={searchResult?.resultsWithThumbnails || 'N/A'} />
          <InfoRow label="Total Results with no Thumbnails" value={searchResult?.resultsWithoutThumbnails || 'N/A'} />
        </Card>

        <Typography.Title level={4}>HTML Content after Santinize</Typography.Title>
        <HtmlView htmlContent={searchResult?.htmlContent || '<p>No HTML Content Available</p>'} />
      </Content>
    </Layout>
  );
}
