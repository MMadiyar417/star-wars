import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const PeopleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const character = useSelector((state: RootState) => state.people.characters.find(c => c.id === Number(id)));

  if (!character) return <div className="text-center">Загрузка...</div>;

  return (
    <div className="container">
      <h1 className="my-4">Детали персонажа</h1>
      <div className="mb-4">
        <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Назад</button>
        <Link to={`/people/edit/${id}`} className="btn btn-warning">Редактировать</Link>
      </div>
      <p>Имя: {character.name}</p>
      <p>Рост: {character.height}</p>
      <p>Вес: {character.mass}</p>
    </div>
  );
};

export default PeopleDetailPage;
