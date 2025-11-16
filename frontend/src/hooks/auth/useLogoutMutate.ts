import { useMutation } from '@tanstack/react-query';
import useAuth from '../../context/Auth/useAuthContext';
import axiosInstance from '../../lib/axios';

const useLogoutMutate = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete('/logout')
      return response.data;
    },
    onSuccess: () => {
      logout();
      window.location.href = '/login';
    },
  });
};

export default useLogoutMutate;
