import { useMutation } from '@tanstack/react-query';
import useAuth from '../../context/Auth/useAuthContext';
import axiosInstance from '../../lib/axios';
import useNotification from '../../context/Notification/useNotification';

const useLogoutMutate = () => {
  const { logout } = useAuth();
  const { notifySuccess, notifyError } = useNotification();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete('/logout')
      return response.data;
    },
    onSuccess: () => {
      logout();
      window.location.href = '/login';
      notifySuccess('Logged out successfully.');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Logout failed. Please try again.';
      notifyError(errorMessage);
    },
  });
};

export default useLogoutMutate;
