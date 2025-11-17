import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

export interface CsvUploadData {
  id: number;
  filename: string;
  totalKeyword: number;
  processedKeywords: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

interface CsvUploadResponse {
  data: Array<{
    id: string;
    type: string;
    attributes: CsvUploadData;
  }>;
}

const useFetchCsvUpload = () => {
  const { data, error, isLoading, refetch } = useQuery<CsvUploadResponse>({
    queryKey: ['csvUpload'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/csv_upload`);
      return response.data;
    },
    refetchInterval: 5000, // Poll every 5 seconds
  });

  return {
    data: data || { data: [] },
    error,
    isLoading,
    refetch,
  };
};

export default useFetchCsvUpload;
