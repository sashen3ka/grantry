import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditGrant() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const grants = JSON.parse(localStorage.getItem('grants') || '[]')
    const grant = grants.find((g: any) => g.id === Number(id))

    if (!grant) {
      alert('Заявка не найдена')
      navigate('/dashboard')
      return
    }

    setTitle(grant.title)
    setDescription(grant.description)
  }, [id, navigate])

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    const grants = JSON.parse(localStorage.getItem('grants') || '[]')
    const updated = grants.map((g: any) =>
      g.id === Number(id) ? { ...g, title, description } : g
    )
    localStorage.setItem('grants', JSON.stringify(updated))
    navigate('/dashboard')
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Редактировать заявку</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full px-4 py-2 border rounded h-32"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Сохранить изменения
        </button>
      </form>
    </div>
  )
}
