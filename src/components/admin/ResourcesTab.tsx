import React, { useEffect, useState } from 'react'

interface Resource {
  id: number
  title: string
  content: string
  link?: string
}

export default function ResourcesTab() {
  const [resources, setResources] = useState<Resource[]>([])
  const [form, setForm] = useState<Resource>({
    id: Date.now(),
    title: '',
    content: '',
    link: '',
  })

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('resources') || '[]')
    setResources(stored)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updated = [...resources, form]
    localStorage.setItem('resources', JSON.stringify(updated))
    setResources(updated)
    setForm({ id: Date.now(), title: '', content: '', link: '' })
  }

  const handleDelete = (id: number) => {
    if (!confirm('Удалить материал?')) return
    const updated = resources.filter((r) => r.id !== id)
    localStorage.setItem('resources', JSON.stringify(updated))
    setResources(updated)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Добавить материал</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <input
            type="text"
            name="title"
            placeholder="Заголовок"
            className="w-full px-4 py-2 border rounded"
            value={form.title}
            onChange={handleChange}
          />
          <textarea
            name="content"
            placeholder="Описание или совет"
            className="w-full px-4 py-2 border rounded h-24"
            value={form.content}
            onChange={handleChange}
          />
          <input
            type="text"
            name="link"
            placeholder="Ссылка (необязательно)"
            className="w-full px-4 py-2 border rounded"
            value={form.link}
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
        <h2 className="text-xl font-semibold mb-4">Полезные материалы</h2>
        {resources.length === 0 ? (
          <p className="text-gray-600">Материалы пока не добавлены</p>
        ) : (
          <ul className="space-y-4">
            {resources.map((r) => (
              <li
                key={r.id}
                className="border p-4 rounded shadow-sm bg-white flex flex-col gap-2"
              >
                <h3 className="text-lg font-bold">{r.title}</h3>
                <p className="text-sm text-gray-700">{r.content}</p>
                {r.link && (
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    Перейти по ссылке
                  </a>
                )}
                <button
                  onClick={() => handleDelete(r.id)}
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
