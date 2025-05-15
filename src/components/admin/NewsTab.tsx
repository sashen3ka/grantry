import React, { useEffect, useState } from 'react'

interface NewsItem {
  id: number
  title: string
  date: string
  content: string
  link?: string
}

export default function NewsTab() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [form, setForm] = useState<NewsItem>({
    id: Date.now(),
    title: '',
    date: '',
    content: '',
    link: '',
  })

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('news') || '[]')
    setNews(stored)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updated = [...news, form]
    localStorage.setItem('news', JSON.stringify(updated))
    setNews(updated)
    setForm({ id: Date.now(), title: '', date: '', content: '', link: '' })
  }

  const handleDelete = (id: number) => {
    if (!confirm('Удалить новость?')) return
    const updated = news.filter((n) => n.id !== id)
    localStorage.setItem('news', JSON.stringify(updated))
    setNews(updated)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Добавить новость</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <input
            type="text"
            name="title"
            placeholder="Заголовок"
            className="w-full px-4 py-2 border rounded"
            value={form.title}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            className="w-full px-4 py-2 border rounded"
            value={form.date}
            onChange={handleChange}
          />
          <textarea
            name="content"
            placeholder="Текст новости"
            className="w-full px-4 py-2 border rounded h-24"
            value={form.content}
            onChange={handleChange}
          />
          <input
            type="text"
            name="link"
            placeholder="Ссылка (опционально)"
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
        <h2 className="text-xl font-semibold mb-4">Список новостей</h2>
        {news.length === 0 ? (
          <p className="text-gray-600">Новостей пока нет</p>
        ) : (
          <ul className="space-y-4">
            {news.map((n) => (
              <li
                key={n.id}
                className="border p-4 rounded shadow-sm bg-white flex flex-col gap-2"
              >
                <div>
                  <h3 className="text-lg font-bold">{n.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(n.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-700">{n.content}</p>
                  {n.link && (
                    <a
                      href={n.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm underline"
                    >
                      Подробнее
                    </a>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(n.id)}
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
