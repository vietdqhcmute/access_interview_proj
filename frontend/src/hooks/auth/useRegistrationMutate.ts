import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import axios from '../../lib/axios';

interface RegistrationCredentials {
  user: {
    email: string;
    password: string;
  }
}

interface RegistrationResponse {
  id: string;
  email: string;
  name?: string;
}

const registrationRequest = async (params: RegistrationCredentials): Promise<RegistrationResponse> => {
  const { data } = await axios.post('/users/registration', params);
  return data;
};

const useRegistrationMutate = (successCallback: (data: RegistrationResponse) => void) => {

  return useMutation({
    mutationFn: registrationRequest,
    onSuccess: (data) => {
      successCallback(data);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      message.error(errorMessage);
    },
  });
};

export default useRegistrationMutate;
