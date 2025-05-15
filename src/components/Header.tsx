import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const user = localStorage.getItem('user')
  const navigate = useNavigate()

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
        <Link to="/catalog" className="hover:text-blue-600">Каталог грантодателей</Link>
        <Link to="/competitions" className="hover:text-blue-600">Конкурсы</Link>
        <Link to="/compare" className="hover:text-blue-600">Сравнение</Link>
        <Link to="/resources" className="hover:text-blue-600">Ресурсы</Link>
        <Link to="/news" className="hover:text-blue-600">Новости</Link>
      </nav>

      {user ? (
        <button
          onClick={handleLogout}
          className="ml-6 text-sm bg-gray-200 px-3 py-1.5 rounded hover:bg-gray-300"
        >
          Выйти
        </button>
      ) : (
        <Link
          to="/login"
          className="ml-6 text-sm bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
        >
          Войти
        </Link>
      )}
    </header>
  )
}
