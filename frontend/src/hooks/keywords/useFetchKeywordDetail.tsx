import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

const useFetchKeywordDetail = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['keywordDetail', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/keywords/${id}`);
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
