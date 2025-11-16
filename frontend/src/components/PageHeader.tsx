import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Avatar, Dropdown, type MenuProps } from 'antd';
import { ArrowLeftOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import useAuth from '../context/Auth/useAuthContext';
import useLogoutMutate from '../hooks/auth/useLogoutMutate';

const { Header } = Layout;

interface PageHeaderProps {
  title: string;
  backLink?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { title, backLink } = props;
  const { user } = useAuth();

  const logoutMutation = useLogoutMutate();


  const getAvatarContent = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return <UserOutlined />;
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: 'Log out',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#fff',
      padding: '0 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {backLink && <Link to={backLink} style={{ textDecoration: 'none' }}>
          <ArrowLeftOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
        </Link>}
        <h2 style={{ margin: 0 }}>{title}</h2>
      </div>
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
  )
}

export default PageHeader
