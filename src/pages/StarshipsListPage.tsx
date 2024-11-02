import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarships } from '../redux/starshipsSlice';
import { Link, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';

const StarshipsListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { starships, loading } = useSelector((state: RootState) => state.starships);
  
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    dispatch(fetchStarships(page));
  }, [dispatch, page]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="container">
      <h1 className="my-4">Список космических кораблей</h1>
      <div className="mb-4">
        <Link to="/" className="btn btn-secondary">Назад на главную</Link>
      </div>
      <ul className="list-group mb-4">
        {starships.map((starship) => (
          <li key={starship.id} className="list-group-item">
            <Link to={`/starships/details/${starship.id}`} className="link-primary">{starship.name}</Link>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between">
        {page > 1 && (
          <Link to={`/starships?page=${page - 1}`} className="btn btn-secondary">
            Назад
          </Link>
        )}
        <Link to={`/starships?page=${page + 1}`} className="btn btn-secondary">
          Вперед
        </Link>
      </div>
    </div>
  );
};

export default StarshipsListPage;
