import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const navigate = useNavigate()    // ← здесь

  const userData = localStorage.getItem('user')
  const user = userData ? JSON.parse(userData) : null

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-700">
        Грантовые конкурсы
      </Link>
      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
        {/* ссылки */}
      </nav>

      {user && !isHome && (
        <Link to="/dashboard" className="ml-6 text-sm text-blue-700 hover:underline">
          Личный кабинет
        </Link>
      )}
      {!user && !isHome && (
        <Link
          to="/login"
          className="ml-6 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Войти
        </Link>
      )}
    </header>
  )
}
