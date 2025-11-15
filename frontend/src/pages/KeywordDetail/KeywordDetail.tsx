import { Layout, Typography, Card } from 'antd';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
const { Content } = Layout;
const { Text } = Typography;

export default function KeywordDetail() {
  const { id, uploadId } = useParams();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader title="Keyword Detail" backLink={`/upload/${uploadId}`} />
      <Content style={{ padding: '24px' }}>
        <Card>
          <Text>Keyword Detail Page for Upload ID: {uploadId}, Keyword ID: {id}</Text>
        </Card>
      </Content>
    </Layout>
  );
}
