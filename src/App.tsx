import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout.tsx';
import AdminLayout from './layouts/AdminLayout.tsx';

import Home from './pages/Home';
import Login from './components/admin/Login.tsx';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Competitions from './pages/Competitions';
import Compare from './pages/Compare';
import Resources from './pages/Resources';
import News from './pages/News';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публичный интерфейс */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/news" element={<News />} />
        </Route>

        {/* Админская часть с другим хедером */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Отдельная страница логина без хедера */}
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
