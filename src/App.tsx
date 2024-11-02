// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PeopleListPage from './pages/PeopleListPage';
import PeopleDetailPage from './pages/PeopleDetailPage';
import PeopleEditPage from './pages/PeopleEditPage';
import PlanetsListPage from './pages/PlanetsListPage';
import PlanetsDetailPage from './pages/PlanetsDetailPage';
import PlanetsEditPage from './pages/PlanetsEditPage';
import StarshipsListPage from './pages/StarshipsListPage';
import StarshipsDetailPage from './pages/StarshipsDetailPage';
import StarshipsEditPage from './pages/StarshipsEditPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeopleListPage />} />
        <Route path="/people/details/:id" element={<PeopleDetailPage />} />
        <Route path="/people/edit/:id" element={<PeopleEditPage />} />
        <Route path="/planets" element={<PlanetsListPage />} />
        <Route path="/planets/details/:id" element={<PlanetsDetailPage />} />
        <Route path="/planets/edit/:id" element={<PlanetsEditPage />} />
        <Route path="/starships" element={<StarshipsListPage />} />
        <Route path="/starships/details/:id" element={<StarshipsDetailPage />} />
        <Route path="/starships/edit/:id" element={<StarshipsEditPage />} />
      </Routes>
    </Router>
  );
};

export default App;
