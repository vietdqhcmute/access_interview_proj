import { useParams } from 'react-router-dom';

export default function KeywordDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Keyword Detail</h1>
      <p>Keyword ID: {id}</p>
    </div>
  );
}
