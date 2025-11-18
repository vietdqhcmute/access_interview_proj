import { Layout, Button, Tabs, Upload, Spin, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useFetchCsvUpload from '../hooks/csv_dashboard/useFetchCsvUpload';
import { PROCESS_STATUS } from '../constants/dashboard-constants';
import { useMemo, useState } from 'react';
import CsvUploadList from '../components/csv-upload-list/CsvUploadList';
import PageHeader from '../components/PageHeader';
import useNotification from '../context/Notification/useNotification';
import { countCsvKeyword, readTextFromFile } from '../utils/handlers';
import useAuth from '../context/Auth/useAuthContext';

const { Content } = Layout;

const UPLOAD_API_DOMAIN = import.meta.env.VITE_API_URL || '/api/';

export default function Dashboard() {
  const { token } = useAuth();
  const { data: csvData, isLoading} = useFetchCsvUpload();
  const { notifySuccess, notifyError } = useNotification();
  const [activeTab, setActiveTab] = useState('done');

  const inProgressUploads = useMemo(() =>
    csvData?.data?.map((item) => item.attributes).filter((item) => item.status === PROCESS_STATUS.PROCESSING) || [],
    [csvData]
  );

  const completedUploads = useMemo(() =>
    csvData?.data?.map((item) => item.attributes).filter((item) => item.status === PROCESS_STATUS.SUCCESSFULL) || [],
    [csvData]
  );

  const failedUploads = useMemo(() =>
    csvData?.data?.map((item) => item.attributes).filter((item) => item.status === PROCESS_STATUS.FAILED) || [],
    [csvData]
  );

  const handleAddCSV = () => {
    console.log('Add CSV clicked');
  };

  const tabItems = [
    {
      key: 'done',
      label: 'Done',
      children: (
        <div style={{ padding: '24px' }}>
          <CsvUploadList data={completedUploads} loading={false} />
        </div>
      ),
    },
    {
      key: 'in-progress',
      label: 'In Progress',
      children: (
        <div style={{ padding: '24px' }}>
          <CsvUploadList data={inProgressUploads} loading={false} />
        </div>
      ),
    },
    {
      key: 'failed',
      label: 'Failed',
      children: (
        <div style={{ padding: '24px' }}>
          <CsvUploadList data={failedUploads} loading={false} />
        </div>
      ),
    },
  ];

  const validateCsvFile = (file: File) => {
    const isCsv = file.type === 'text/csv' || file.name.endsWith('.csv');
    if (!isCsv) {
      notifyError('You can only upload CSV files!');
    } else {
      readTextFromFile(file).then((text) => {
        const rowCount = countCsvKeyword(text);
        if (rowCount > 100) {
          notifyError('The CSV file must not contain more than 100 keywords.');
          return false;
        }
      }).catch((error) => {
        notifyError('Failed to read the CSV file.');
        console.error('Error reading CSV file:', error);
      });
    }

    return isCsv;
  }

  const uploadProps = {
    name: 'file',
    accept: '.csv',
    showUploadList: false,
    action: `${UPLOAD_API_DOMAIN}csv_upload`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    beforeUpload(file: File) {
      return validateCsvFile(file);
    },
    onChange(info: { file: { status?: string; name: string } }) {
      if (info.file.status === 'done') {
        notifySuccess(`${info.file.name} file uploaded successfully`);
        setActiveTab('in-progress');
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        notifyError(`${info.file.name} file upload failed.`);
        console.error(`${info.file.name} file upload failed.`);
      }
    },

  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader title="Dashboard" />
      <Content style={{ padding: '24px' }}>
        <div className='row w-full mb-2 justify-end'>
          <Upload {...uploadProps}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddCSV}
            >
              Add CSV
            </Button>
          </Upload>
        </div>
        {isLoading ? (<Row>
          <Col className='flex justify-around' span={24}>
            <Spin className='mt-4' />
          </Col>
        </Row>) : (
          <div style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
            />
          </div>
        )}
      </Content>
    </Layout>
  );
}
