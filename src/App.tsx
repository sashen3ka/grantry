import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/MainLayout.tsx'

import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Catalog from './pages/Catalog'
import Competitions from './pages/Competitions'
import Compare from './pages/Compare'
import Resources from './pages/Resources'
import News from './pages/News'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/news" element={<News />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Отдельная страница логина без хедера */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
