import React, { useEffect, useState } from 'react'
import NewCompetition from '../../pages/NewCompetition'

interface Competition {
  id: number
  title: string
  dates: string
  format: string
  region: string
  description: string
  methodology: string
  amount: string
}

export default function CompetitionsTab() {
  const [competitions, setCompetitions] = useState<Competition[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('competitions') || '[]')
    setCompetitions(stored)
  }, [])

  const handleDelete = (id: number) => {
    if (!confirm('Удалить конкурс?')) return
    const updated = competitions.filter((c) => c.id !== id)
    localStorage.setItem('competitions', JSON.stringify(updated))
    setCompetitions(updated)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Создать новый конкурс</h2>
        <NewCompetition onCreated={setCompetitions} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Список конкурсов</h2>
        {competitions.length === 0 ? (
          <p className="text-gray-600">Пока нет конкурсов</p>
        ) : (
          <ul className="space-y-4">
            {competitions.map((c) => (
              <li
                key={c.id}
                className="border p-4 rounded shadow-sm bg-white flex flex-col gap-2"
              >
                <h3 className="text-lg font-bold">{c.title}</h3>
                <p className="text-sm text-gray-700">{c.description}</p>
                <div className="text-xs text-gray-500">
                  📅 {c.dates} | 📍 {c.region} | 💰 {c.amount}
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="self-start text-red-600 text-sm hover:underline"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
