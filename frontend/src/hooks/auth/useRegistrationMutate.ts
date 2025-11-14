import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import axios from '../../lib/axios';

interface RegistrationCredentials {
  email: string;
  password: string;
}

const registrationRequest = async (credentials: RegistrationCredentials): Promise<RegistrationResponse> => {
  const { data } = await axios.post('/users/registration', credentials);
  return data;
};

const useRegistrationMutate = (successCallback: () => void) => {

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
