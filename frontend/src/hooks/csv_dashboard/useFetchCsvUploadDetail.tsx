import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

const useFetchCsvUploadDetail = (id: number) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['csvUploadDetail', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/csv_upload/${id}`);
      return response.data;
    }
  });

  return {
    data: data || {},
    error,
    isLoading,
    refetch,
  };
};

export default useFetchCsvUploadDetail;
