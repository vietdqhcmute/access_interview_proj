import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

const useFetchCsvUpload = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['csvUpload'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/csv_upload`);
      return response.data;
    },
    refetchInterval: 5000, // Poll every 5 seconds
  });

  return {
    data: data || [],
    error,
    isLoading,
    refetch,
  };
};

export default useFetchCsvUpload;
