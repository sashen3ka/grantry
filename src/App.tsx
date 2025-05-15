import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewGrant from './pages/NewGrant'
import DashboardAdmin from './pages/DashboardAdmin'
import EditGrant from './pages/EditGrant'  // <-- импорт добавь

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-grant" element={<NewGrant />} />
        <Route path="/edit-grant/:id" element={<EditGrant />} />  {/* <-- новый маршрут */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
