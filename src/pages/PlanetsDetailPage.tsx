import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const PlanetsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const planet = useSelector((state: RootState) => 
    state.planets.planets.find(p => p.id === Number(id))
  );

  if (!planet) return <div className="text-center">Загрузка...</div>;

  return (
    <div className="container">
      <h1 className="my-4">Детали планеты</h1>
      <div className="mb-4">
        <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Назад</button>
        <Link to={`/planets/edit/${id}`} className="btn btn-warning">Редактировать</Link>
      </div>
      <p>Название: {planet.name}</p>
      <p>Длина суток: {planet.rotation_period}</p>
      <p>Орбитальный период: {planet.orbital_period}</p>
    </div>
  );
};

export default PlanetsDetailPage;
