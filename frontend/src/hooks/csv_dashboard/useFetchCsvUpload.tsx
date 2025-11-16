import { useQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";
import axiosInstance from "../../lib/axios";

const useFetchCsvUpload = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['csvUpload'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/csv_upload`);
      return response.data;
    }
  });

  return {
    data: camelcaseKeys(data, { deep: true }) || [],
    error,
    isLoading,
    refetch,
  };
};

export default useFetchCsvUpload;
