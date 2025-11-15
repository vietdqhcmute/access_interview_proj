import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const useFetchCsvUploadDetail = (id: number) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['csvUploadDetail', id],
    queryFn: async () => {
      const response = await axios.get(`/api/csv_upload/${id}`);
      return response.data;
    }
  });

  return {
    data: camelcaseKeys(data, { deep: true }) || {},
    error,
    isLoading,
    refetch,
  };
};

export default useFetchCsvUploadDetail;
