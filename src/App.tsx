import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Compare from './pages/Compare';
import Resources from './pages/Resources';
import News from './pages/News';
import GrantorProfile from './pages/GrantorProfile';
import CompetitionProfile from './pages/CompetitionProfile';


// Admin pages
import Dashboard from './pages/Dashboard';
import Login from './components/admin/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Публичный интерфейс */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/news" element={<News />} />
          <Route path="/grantors/:id" element={<GrantorProfile />} />
          <Route path="/competitions/:id" element={<CompetitionProfile />} />


        </Route>

        {/* Админская часть */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Страница логина */}
        <Route path="/admin/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
