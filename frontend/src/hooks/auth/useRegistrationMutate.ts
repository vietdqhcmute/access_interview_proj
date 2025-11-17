import { useMutation } from '@tanstack/react-query';
import axios from '../../lib/axios';
import type { FixMeLater } from '../../utils/types';

interface RegistrationCredentials {
  user: {
    name: string;
    email: string;
    password: string;
  }
}

interface RegistrationResponse {
  data: {
    id: string;
    email: string;
    name?: string;
  };
  status: {
    code: number;
    message: string;
  };
}

const registrationRequest = async (params: RegistrationCredentials): Promise<RegistrationResponse> => {
  const response = await axios.post('/signup', params);
  return response.data;
};

const useRegistrationMutate = (successCallback: (data: RegistrationResponse) => void, errorCallback: (error: any) => void) => {

  return useMutation({
    mutationFn: registrationRequest,
    onSuccess: (data) => {
      successCallback(data);
    },
    onError: (error: FixMeLater) => {
      errorCallback(error);
    },
  });
};

export default useRegistrationMutate;
