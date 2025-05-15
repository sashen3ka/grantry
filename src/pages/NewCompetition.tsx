import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

export default function NewCompetition() {
  const navigate = useNavigate()

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const existing = JSON.parse(localStorage.getItem('competitions') || '[]')
    localStorage.setItem('competitions', JSON.stringify([...existing, form]))
    navigate('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-12 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Создать грантовый конкурс</h1>
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
