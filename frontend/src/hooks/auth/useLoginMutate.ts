import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import axios from '../../lib/axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  token: string;
}

const loginRequest = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>('/login', credentials);
  return data;
};

const useLoginMutate = (successCallback: () => void) => {

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      successCallback(data);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      message.error(errorMessage);
    },
  });
};

export default useLoginMutate;
