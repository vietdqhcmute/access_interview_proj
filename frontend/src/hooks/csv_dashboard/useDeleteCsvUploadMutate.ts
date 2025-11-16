import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../lib/axios';
import useNotification from '../../context/Notification/useNotification';

const useDeleteCsvUploadMutate = (id: number) => {
  const { notifySuccess, notifyError } = useNotification();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(`/csv_upload/${id}`)
      return response.data;
    },
    onSuccess: () => {
      notifySuccess('CSV upload deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['csvUpload'] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message;
      notifyError(errorMessage);
    },
  });
};

export default useDeleteCsvUploadMutate;
