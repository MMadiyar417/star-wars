import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import LoginPage from './pages/LoginPage'; 
import { RootState } from './redux/store';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/people" element={isAuthenticated ? <PeopleListPage /> : <Navigate to="/login" />} />
        <Route path="/people/details/:id" element={isAuthenticated ? <PeopleDetailPage /> : <Navigate to="/login" />} />
        <Route path="/people/edit/:id" element={isAuthenticated ? <PeopleEditPage /> : <Navigate to="/login" />} />
        <Route path="/planets" element={isAuthenticated ? <PlanetsListPage /> : <Navigate to="/login" />} />
        <Route path="/planets/details/:id" element={isAuthenticated ? <PlanetsDetailPage /> : <Navigate to="/login" />} />
        <Route path="/planets/edit/:id" element={isAuthenticated ? <PlanetsEditPage /> : <Navigate to="/login" />} />
        <Route path="/starships" element={isAuthenticated ? <StarshipsListPage /> : <Navigate to="/login" />} />
        <Route path="/starships/details/:id" element={isAuthenticated ? <StarshipsDetailPage /> : <Navigate to="/login" />} />
        <Route path="/starships/edit/:id" element={isAuthenticated ? <StarshipsEditPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
