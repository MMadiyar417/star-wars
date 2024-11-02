// src/pages/PlanetsListPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanets } from '../redux/planetsSlice';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlanetsListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { planets, loading } = useSelector((state: RootState) => state.planets);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    dispatch(fetchPlanets(page));
  }, [dispatch, page]);

  if (loading) return <div className="text-center">Загрузка...</div>;

  return (
    <div className="container">
      <h1 className="my-4">Список планет</h1>
      <ul className="list-group mb-4">
        {planets.map((planet) => (
          <li key={planet.id} className="list-group-item">
            <Link to={`/planets/details/${planet.id}`} className="text-decoration-none">
              {planet.name}
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

export default PlanetsListPage;
