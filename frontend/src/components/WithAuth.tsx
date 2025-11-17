import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import useAuth from '../context/Auth/useAuthContext';

interface WithAuthProps {
  children: React.ReactNode;
}

const WithAuth: React.FC<WithAuthProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const userInLocalStorage = localStorage.getItem('auth_user'); // Check localStorage if user reload page and cache auth data is not loaded yet
      if (!userInLocalStorage) {
        navigate('/', { replace: true });
      }
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
};

export default WithAuth;
