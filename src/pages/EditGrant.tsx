import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface Grant {
  id: number
  title: string
  description: string
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  createdAt: string
}

export default function EditGrant() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [grant, setGrant] = useState<Grant | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const grants: Grant[] = JSON.parse(localStorage.getItem('grants') || '[]')
    const found = grants.find((g) => g.id === Number(id))

    if (!found) {
      alert('Заявка не найдена')
      navigate('/dashboard')
      return
    }

    setGrant(found)
    setTitle(found.title)
    setDescription(found.description)
  }, [id, navigate])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      alert('Заполните все поля')
      return
    }
    if (!grant) return

    const grants: Grant[] = JSON.parse(localStorage.getItem('grants') || '[]')
    const updatedGrants = grants.map((g) =>
      g.id === grant.id ? { ...g, title, description } : g
    )

    localStorage.setItem('grants', JSON.stringify(updatedGrants))
    navigate('/dashboard')
  }

  if (!grant) return <div className="p-6">Загрузка...</div>

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Редактировать заявку</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded"
          placeholder="Название проекта"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full px-4 py-2 border rounded h-32"
          placeholder="Описание проекта"
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
