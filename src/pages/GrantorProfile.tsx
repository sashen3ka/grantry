import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Grantor {
  id: number
  name: string
  type: string | string[]
  description: string
}

interface Competition {
  id: number
  title: string
  dates: string
  region: string
  amount: string
  description: string
  format: string
  grantorId: number
}

const GrantorProfile = () => {
  const { id } = useParams()
  const grantorId = Number(id)

  const [grantor, setGrantor] = useState<Grantor | null>(null)
  const [competitions, setCompetitions] = useState<Competition[]>([])

  useEffect(() => {
    const storedGrantors = JSON.parse(localStorage.getItem('grantors') || '[]')
    const found = storedGrantors.find((g: Grantor) => g.id === grantorId)
    setGrantor(found)

    const storedCompetitions = JSON.parse(localStorage.getItem('competitions') || '[]')
    const related = storedCompetitions.filter(
      (c: Competition) => c.grantorId === grantorId
    )
    setCompetitions(related)
  }, [grantorId])

  if (!grantor) return <div className="p-6">Грантодатель не найден</div>

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{grantor.name}</h1>
        <p className="text-gray-600 mb-4">
          Тип финансирования:{' '}
          {Array.isArray(grantor.type) ? grantor.type.join(', ') : grantor.type}
        </p>
        <p className="text-gray-700">{grantor.description}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Конкурсы этого грантодателя</h2>
        {competitions.length === 0 ? (
          <p className="text-gray-500">Нет доступных конкурсов.</p>
        ) : (
          <ul className="space-y-4">
            {competitions.map((c) => (
              <li
                key={c.id}
                className="border p-4 rounded shadow-sm bg-white hover:shadow transition"
              >
                <h3 className="text-lg font-bold mb-1">{c.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{c.description}</p>
                <p className="text-xs text-gray-500">
                  📅 {c.dates} | 📍 {c.region} | 💰 {c.amount} | {c.format}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default GrantorProfile
