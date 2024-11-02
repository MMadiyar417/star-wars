import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="my-4">Главная страница</h1>
      <div>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Назад
        </button>
        <Link to="/people">
          <button className="btn btn-primary">Персонажи</button>
        </Link>
        <Link to="/planets">
          <button className="btn btn-primary">Планеты</button>
        </Link>
        <Link to="/starships">
          <button className="btn btn-primary">Космические корабли</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
