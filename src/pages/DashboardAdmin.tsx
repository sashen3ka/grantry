import React, { useEffect, useState } from 'react'

interface Grant {
  id: number
  title: string
  description: string
  status: string
  createdAt: string
}

export default function DashboardAdmin() {
  const [grants, setGrants] = useState<Grant[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('grants') || '[]')
    setGrants(stored)
  }, [])

  const handleApprove = (id: number) => {
    const updated = grants.map((g) =>
      g.id === id ? { ...g, status: 'approved' } : g
    )
    localStorage.setItem('grants', JSON.stringify(updated))
    setGrants(updated)
  }

  const handleReject = (id: number) => {
    const updated = grants.map((g) =>
      g.id === id ? { ...g, status: 'rejected' } : g
    )
    localStorage.setItem('grants', JSON.stringify(updated))
    setGrants(updated)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Кабинет администратора</h1>

      {grants.length === 0 ? (
        <p>Пока нет заявок</p>
      ) : (
        <ul className="space-y-4">
          {grants.map((grant) => (
            <li
              key={grant.id}
              className="border p-4 rounded shadow-sm bg-white flex flex-col gap-2"
            >
              <h3 className="font-semibold text-lg">{grant.title}</h3>
              <p className="text-sm text-gray-700">{grant.description}</p>
              <span className="text-xs text-gray-500">Статус: {grant.status}</span>

              <div className="flex gap-4">
                <button
                  onClick={() => handleApprove(grant.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Одобрить
                </button>
                <button
                  onClick={() => handleReject(grant.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Отклонить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
