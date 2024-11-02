import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../redux/peopleSlice';
import { Link, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';

const PeopleListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { characters, loading } = useSelector((state: RootState) => state.people);
  
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    dispatch(fetchCharacters(page));
  }, [dispatch, page]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="container">
      <h1 className="my-4">Список персонажей</h1>
      <div className="mb-4">
        <Link to="/" className="btn btn-secondary">Назад на главную</Link>
      </div>
      <ul className="list-group mb-4">
        {characters.map((character) => (
          <li key={character.id} className="list-group-item">
            <Link to={`/people/details/${character.id}`} className="link-primary">{character.name}</Link>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between">
        {page > 1 && (
          <Link to={`/people?page=${page - 1}`} className="btn btn-secondary">
            Назад
          </Link>
        )}
        <Link to={`/people?page=${page + 1}`} className="btn btn-secondary">
          Вперед
        </Link>
      </div>
    </div>
  );
};

export default PeopleListPage;
