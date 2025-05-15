import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewGrant from './pages/NewGrant' // ✅ импортируй страницу

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-grant" element={<NewGrant />} /> {/* ✅ маршрут */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
