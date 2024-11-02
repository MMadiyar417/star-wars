// src/pages/StarshipsListPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarships } from '../redux/starshipsSlice';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const StarshipsListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { starships, loading } = useSelector((state: RootState) => state.starships);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    dispatch(fetchStarships(page));
  }, [dispatch, page]);

  if (loading) return <div className="text-center">Загрузка...</div>;

  return (
    <div className="container">
      <h1 className="my-4">Список космических кораблей</h1>
      <ul className="list-group mb-4">
        {starships.map((starship) => (
          <li key={starship.id} className="list-group-item">
            <Link to={`/starships/details/${starship.id}`} className="text-decoration-none">
              {starship.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between">
        <button 
          className="btn btn-secondary" 
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Назад
        </button>
        <button 
          className="btn btn-primary" 
          onClick={() => setPage(prev => prev + 1)}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default StarshipsListPage;
