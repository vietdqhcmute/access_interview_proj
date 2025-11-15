import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const useFetchCsvUpload = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['csvUpload'],
    queryFn: async () => {
      const response = await axios.get(`/api/csv_upload`);
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
