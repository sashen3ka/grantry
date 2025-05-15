import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Главная страница</h1>
      <p className="mb-6">Описание проекта и кнопка входа</p>

      <Link
        to="/login"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Войти
      </Link>
    </div>
  )
}
