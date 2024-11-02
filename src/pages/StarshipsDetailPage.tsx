import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const StarshipsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const starship = useSelector((state: RootState) => 
    state.starships.starships.find(s => s.id === Number(id))
  );

  if (!starship) return <div className="text-center">Загрузка...</div>;

  return (
    <div className="container">
      <h1 className="my-4">Детали космического корабля</h1>
      <div className="mb-4">
        <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Назад</button>
        <Link to={`/starships/edit/${id}`} className="btn btn-warning">Редактировать</Link>
      </div>
      <p>Название: {starship.name}</p>
      <p>Модель: {starship.model}</p>
      <p>Производитель: {starship.manufacturer}</p>
    </div>
  );
};

export default StarshipsDetailPage;
