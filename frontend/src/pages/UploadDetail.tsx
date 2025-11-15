import { useParams } from 'react-router-dom';
import useFetchCsvUploadDetail from '../hooks/csv_dashboard/useFetchCsvUploadDetail';

export default function UploadDetail() {
  const { id } = useParams();
  const { data } = useFetchCsvUploadDetail(Number(id));

  const { data: csvDetailData } = data;

  return (
    <div>
      <h1>Upload Detail</h1>
      <p>Upload ID: {id}</p>
    </div>
  );
}
