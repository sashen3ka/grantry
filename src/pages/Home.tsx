import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:py-28">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Главная страница</h1>
      <p className="text-base sm:text-lg text-gray-800 mb-6 max-w-xl">
        Портал для поиска и сравнения актуальных конкурсов для НКО, ИП и юрлиц
      </p>
      <Link
        to="/compare"
        className="inline-block bg-sky-800 hover:bg-sky-600 text-white font-medium py-2 px-5 rounded text-sm transition"
      >
        Все конкурсы
      </Link>
    </div>
  )
}
