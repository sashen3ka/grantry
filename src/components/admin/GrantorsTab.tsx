import React, { useEffect, useState } from 'react'

interface Grantor {
  id: number
  name: string
  type: string // физлицо, юрлицо, НКО, ИП, субсидия
  description: string
}

export default function GrantorsTab() {
  const [grantors, setGrantors] = useState<Grantor[]>([])
  const [form, setForm] = useState<Grantor>({
    id: Date.now(),
    name: '',
    type: '',
    description: '',
  })

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('grantors') || '[]')
    setGrantors(stored)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updated = [...grantors, form]
    localStorage.setItem('grantors', JSON.stringify(updated))
    setGrantors(updated)
    setForm({ id: Date.now(), name: '', type: '', description: '' })
  }

  const handleDelete = (id: number) => {
    if (!confirm('Удалить грантодателя?')) return
    const updated = grantors.filter((g) => g.id !== id)
    localStorage.setItem('grantors', JSON.stringify(updated))
    setGrantors(updated)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Добавить грантодателя</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <input
            type="text"
            name="name"
            placeholder="Наименование"
            className="w-full px-4 py-2 border rounded"
            value={form.name}
            onChange={handleChange}
          />
          <select
            name="type"
            className="w-full px-4 py-2 border rounded"
            value={form.type}
            onChange={handleChange}
          >
            <option value="">Тип финансирования</option>
            <option value="физлицо">Физлицо</option>
            <option value="юрлицо">Юрлицо</option>
            <option value="НКО">НКО</option>
            <option value="ИП">ИП</option>
            <option value="субсидия">Субсидия</option>
          </select>
          <textarea
            name="description"
            placeholder="Описание"
            className="w-full px-4 py-2 border rounded h-24"
            value={form.description}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Добавить
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Список грантодателей</h2>
        {grantors.length === 0 ? (
          <p className="text-gray-600">Пока нет грантодателей</p>
        ) : (
          <ul className="space-y-4">
            {grantors.map((g) => (
              <li
                key={g.id}
                className="border p-4 rounded shadow-sm bg-white flex flex-col gap-2"
              >
                <div>
                  <h3 className="text-lg font-bold">{g.name}</h3>
                  <p className="text-sm text-gray-700">{g.description}</p>
                  <span className="text-xs text-gray-500">Тип: {g.type}</span>
                </div>
                <button
                  onClick={() => handleDelete(g.id)}
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
