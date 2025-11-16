import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

const useFetchKeywordDetail = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['keywordDetail', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/keywords/${id}`);
      return response.data;
    },
    refetchInterval: 5000, // Poll every 5 seconds
  });

  return {
    data: data || {},
    error,
    isLoading,
    refetch,
  };
};

export default useFetchKeywordDetail;
