import React, { useEffect, useState } from 'react'

interface Competition {
  id: number
  title: string
  dates: string
  format: string
  region: string
  description: string
  methodology: string
  amount: string
  grantorId: number
}

interface Grantor {
  id: number
  name: string
}

export default function Compare() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [grantors, setGrantors] = useState<Grantor[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('competitions') || '[]')
    const g = JSON.parse(localStorage.getItem('grantors') || '[]')
    setCompetitions(stored)
    setGrantors(g)
  }, [])

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const selected = competitions.filter((c) => selectedIds.includes(c.id))

  const getGrantorName = (id: number) =>
    grantors.find((g) => g.id === id)?.name || '—'

  const rows: [string, (c: Competition) => React.ReactNode][] = [
    ['Грантодатель', (c) => getGrantorName(c.grantorId)],
    ['Формат', (c) => c.format],
    ['Регион', (c) => c.region],
    ['Сумма', (c) => c.amount],
    ['Даты проведения', (c) => c.dates],
    ['Описание', (c) => c.description],
    ['Методология', (c) => c.methodology],
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Сравнение конкурсов</h1>

      <p className="mb-4 text-gray-700">
        Отметьте конкурсы, которые хотите сравнить:
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {competitions.map((c) => (
          <label
            key={c.id}
            className="border rounded p-4 bg-white shadow hover:shadow-md transition cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(c.id)}
              onChange={() => toggleSelect(c.id)}
              className="mr-2"
            />
            {c.title}
          </label>
        ))}
      </div>

      {selected.length >= 2 ? (
        <div className="overflow-auto">
          <table className="w-full border text-sm bg-white rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Критерий</th>
                {selected.map((c) => (
                  <th key={c.id} className="border px-4 py-2 text-left">
                    {c.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, getValue]) => (
                <tr key={label}>
                  <td className="border px-4 py-2 font-medium">{label}</td>
                  {selected.map((c) => (
                    <td key={c.id + '_' + label} className="border px-4 py-2">
                      {getValue(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">
          Выберите хотя бы два конкурса для сравнения.
        </p>
      )}
    </div>
  )
}
