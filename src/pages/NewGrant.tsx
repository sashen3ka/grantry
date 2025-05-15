import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewGrant() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) {
      alert('Заполните все поля')
      return
    }

    const grant = {
      id: Date.now(),
      title,
      description,
      status: 'draft',
      createdAt: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem('grants') || '[]')
    localStorage.setItem('grants', JSON.stringify([...existing, grant]))

    navigate('/dashboard')
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Новая заявка</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Название проекта"
          className="w-full px-4 py-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Описание проекта"
          className="w-full px-4 py-2 border rounded h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Сохранить
        </button>
      </form>
    </div>
  )
}
