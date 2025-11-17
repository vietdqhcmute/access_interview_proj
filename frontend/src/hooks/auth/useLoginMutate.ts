import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import type { AxiosResponse } from 'axios';
import axios from '../../lib/axios';
import useNotification from '../../context/Notification/useNotification';

interface LoginCredentials {
  user: {
    email: string;
    password: string;
  }
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  token?: string;
}

const loginRequest = async (credentials: LoginCredentials): Promise<AxiosResponse<LoginResponse>> => {
  const response = await axios.post<LoginResponse>('/login', credentials);
  return response;
};

const getTokenFromResponse = (response: AxiosResponse<LoginResponse>): string => {
  const authorizationHeader = response.headers['authorization'] || response.data.token || '';
  const token = authorizationHeader.startsWith('Bearer ')
    ? authorizationHeader.slice(7)
    : authorizationHeader;
  return token;
}

const useLoginMutate = (successCallback: (data: LoginResponse, token: string) => void) => {
  const { notifySuccess, notifyError } = useNotification();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      const token = getTokenFromResponse(response);
      successCallback(response.data, token);
      notifySuccess('Logged in successfully.');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      notifyError(errorMessage);
    },
  });
};

export default useLoginMutate;
