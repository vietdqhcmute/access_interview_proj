import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/Auth/useAuthContext';

interface WithAuthProps {
  children: React.ReactNode;
}

const WithoutAuth: React.FC<WithAuthProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);


  return <>{children}</>;
};

export default WithoutAuth;
