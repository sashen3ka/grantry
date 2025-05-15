import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Grant {
  id: number
  title: string
  description: string
  status: string
  createdAt: string
}

export default function DashboardGrantor() {
  const [grants, setGrants] = useState<Grant[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('grants') || '[]')
    setGrants(stored)
  }, [])

  const handleDelete = (id: number) => {
    const updated = grants.filter((g) => g.id !== id)
    localStorage.setItem('grants', JSON.stringify(updated))
    setGrants(updated)
  }

  const handleSubmit = (id: number) => {
    const updated = grants.map((g) =>
      g.id === id ? { ...g, status: 'submitted' } : g
    )
    localStorage.setItem('grants', JSON.stringify(updated))
    setGrants(updated)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Кабинет грантодателя</h1>

      <Link
        to="/new-grant"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Создать заявку
      </Link>

      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Ваши заявки</h2>
        {grants.length === 0 ? (
          <p className="text-gray-600">Пока нет заявок</p>
        ) : (
          <ul className="space-y-2">
            {grants.map((grant) => (
              <li
                key={grant.id}
                className="border p-4 rounded shadow-sm bg-white flex flex-col gap-2"
              >
                <div>
                  <h3 className="font-semibold text-lg">{grant.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{grant.description}</p>
                  <span className="text-xs text-gray-500">Статус: {grant.status}</span>
                </div>

                <div className="flex gap-4">
                  <Link
                    to={`/edit-grant/${grant.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Редактировать
                  </Link>

                  <button
                    onClick={() => handleSubmit(grant.id)}
                    className="text-green-700 hover:underline text-sm"
                  >
                    Отправить на модерацию
                  </button>

                  <button
                    onClick={() => handleDelete(grant.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
