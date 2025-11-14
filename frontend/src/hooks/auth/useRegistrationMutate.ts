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
  id: string;
  email: string;
  name?: string;
}

const registrationRequest = async (params: RegistrationCredentials): Promise<RegistrationResponse> => {
  const { data } = await axios.post('/signup', params);
  return data;
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
