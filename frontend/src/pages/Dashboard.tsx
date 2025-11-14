import { Layout, Avatar, Button, Tabs, Dropdown, Upload } from 'antd';
import { PlusOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import useAuth from "../context/Auth/useAuthContext";
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAddCSV = () => {
    console.log('Add CSV clicked');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: 'Log out',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const tabItems = [
    {
      key: 'done',
      label: 'Done',
      children: (
        <div style={{ padding: '24px' }}>
          <p>Done items will appear here</p>
        </div>
      ),
    },
    {
      key: 'in-progress',
      label: 'In Progress',
      children: (
        <div style={{ padding: '24px' }}>
          <p>In progress items will appear here</p>
        </div>
      ),
    },
    {
      key: 'failed',
      label: 'Failed',
      children: (
        <div style={{ padding: '24px' }}>
          <p>Failed items will appear here</p>
        </div>
      ),
    },
  ];

  const getAvatarContent = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return <UserOutlined />;
  };

  const uploadProps = {
    name: 'file',
    accept: '.csv',
    showUploadList: false,
    action: '/api/upload', // Replace with your actual upload URL
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    onChange(info: any) {
      if (info.file.status === 'done') {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fff',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
            <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <Avatar
                style={{
                  backgroundColor: '#1890ff',
                }}
                size="large"
              >
                {getAvatarContent()}
              </Avatar>

              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
                <span style={{ fontWeight: 500, fontSize: '14px' }}>{user?.name || 'User'}</span>
                <span style={{ fontSize: '12px', color: '#666' }}>{user?.email || ''}</span>
              </div>
            </div>
          </Dropdown>
        </div>
      </Header>

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
        <div style={{
          background: '#fff',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}>
          <Tabs defaultActiveKey="done" items={tabItems} />
        </div>
      </Content>
    </Layout>
  );
}
