import { useParams } from 'react-router-dom';

export default function UploadDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Upload Detail</h1>
      <p>Upload ID: {id}</p>
    </div>
  );
}
