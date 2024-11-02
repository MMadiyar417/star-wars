// src/pages/PeopleListPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../redux/peopleSlice';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const PeopleListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { characters, loading } = useSelector((state: RootState) => state.people);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    dispatch(fetchCharacters(page));
  }, [dispatch, page]);

  if (loading) return <div className="text-center">Загрузка...</div>;

  return (
    <div className="container">
      <h1 className="my-4">Список персонажей</h1>
      <ul className="list-group mb-4">
        {characters.map((character) => (
          <li key={character.id} className="list-group-item">
            <Link to={`/people/details/${character.id}`} className="text-decoration-none">
              {character.name}
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

export default PeopleListPage;
