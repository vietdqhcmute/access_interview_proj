import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchKeywordDetail = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['keywordDetail', id],
    queryFn: async () => {
      const response = await axios.get(`/api/keywords/${id}`);
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

export default useFetchKeywordDetail;
