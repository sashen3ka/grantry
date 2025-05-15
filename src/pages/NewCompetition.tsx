import React, { useState } from 'react'

interface GrantCompetition {
  id: number
  title: string
  dates: string
  format: string
  region: string
  description: string
  methodology: string
  amount: string
}

export default function NewCompetition({
  onCreated,
}: {
  onCreated?: (list: GrantCompetition[]) => void
}) {
  const [form, setForm] = useState<GrantCompetition>({
    id: Date.now(),
    title: '',
    dates: '',
    format: '',
    region: '',
    description: '',
    methodology: '',
    amount: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const existing = JSON.parse(localStorage.getItem('competitions') || '[]')
    const updated = [...existing, form]

    localStorage.setItem('competitions', JSON.stringify(updated))
    onCreated?.(updated)

    // Очистить форму
    setForm({
      id: Date.now(),
      title: '',
      dates: '',
      format: '',
      region: '',
      description: '',
      methodology: '',
      amount: '',
    })
  }

  return (
    <div className="max-w-2xl p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Создать грантовый конкурс</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Наименование"
          className="w-full px-4 py-2 border rounded"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="dates"
          placeholder="Даты проведения"
          className="w-full px-4 py-2 border rounded"
          value={form.dates}
          onChange={handleChange}
        />
        <input
          type="text"
          name="format"
          placeholder="Формат (онлайн, офлайн и т.д.)"
          className="w-full px-4 py-2 border rounded"
          value={form.format}
          onChange={handleChange}
        />
        <input
          type="text"
          name="region"
          placeholder="Регион"
          className="w-full px-4 py-2 border rounded"
          value={form.region}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Описание"
          className="w-full px-4 py-2 border rounded h-24"
          value={form.description}
          onChange={handleChange}
        />
        <textarea
          name="methodology"
          placeholder="Методические рекомендации"
          className="w-full px-4 py-2 border rounded h-24"
          value={form.methodology}
          onChange={handleChange}
        />
        <input
          type="text"
          name="amount"
          placeholder="Сумма"
          className="w-full px-4 py-2 border rounded"
          value={form.amount}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Сохранить конкурс
        </button>
      </form>
    </div>
  )
}
