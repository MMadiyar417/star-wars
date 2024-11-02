import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanets } from '../redux/planetsSlice';
import { Link, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';

const PlanetsListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { planets, loading } = useSelector((state: RootState) => state.planets);
  
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    dispatch(fetchPlanets(page));
  }, [dispatch, page]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="container">
      <h1 className="my-4">Список планет</h1>
      <div className="mb-4">
        <Link to="/" className="btn btn-secondary">Назад на главную</Link>
      </div>
      <ul className="list-group mb-4">
        {planets.map((planet) => (
          <li key={planet.id} className="list-group-item">
            <Link to={`/planets/details/${planet.id}`} className="link-primary">{planet.name}</Link>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between">
        {page > 1 && (
          <Link to={`/planets?page=${page - 1}`} className="btn btn-secondary">
            Назад
          </Link>
        )}
        <Link to={`/planets?page=${page + 1}`} className="btn btn-secondary">
          Вперед
        </Link>
      </div>
    </div>
  );
};

export default PlanetsListPage;
