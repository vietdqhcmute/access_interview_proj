import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

interface UseFetchCsvUploadDetailParams {
  id: number;
  page?: number;
  per_page?: number;
  term?: string;
}

const useFetchCsvUploadDetail = ({ id, page = 1, per_page = 25, term }: UseFetchCsvUploadDetailParams) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['csvUploadDetail', id, page, per_page, term],
    queryFn: async () => {
      const params: { page: number; per_page: number; term?: string } = { page, per_page };
      if (term) params.term = term;
      const response = await axiosInstance.get(`/csv_upload/${id}`, { params });
      return response.data;
    }
  });

  return {
    data: data?.data || {},
    meta: data?.meta || {},
    error,
    isLoading,
    refetch,
  };
};

export default useFetchCsvUploadDetail;
