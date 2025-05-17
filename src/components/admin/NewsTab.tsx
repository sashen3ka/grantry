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
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<NewsItem>({
    id: Date.now(),
    title: '',
    date: '',
    content: '',
    link: '',
  })
  const [editing, setEditing] = useState<NewsItem | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('news') || '[]')
    setNews(stored)
  }, [])

  const handleDelete = (id: number) => {
    if (!confirm('Удалить новость?')) return
    const updated = news.filter((n) => n.id !== id)
    localStorage.setItem('news', JSON.stringify(updated))
    setNews(updated)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const normalizeLink = (url: string) => {
    if (!url) return ''
    if (!/^https?:\/\//i.test(url)) {
      return 'https://' + url
    }
    return url
  }

  const hasOnlyLetters = (text: string) => {
    return /^[^\d]+$/u.test(text.trim())
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (form.title.trim().length < 5) newErrors.title = 'Заголовок слишком короткий'
    else if (!hasOnlyLetters(form.title)) newErrors.title = 'Заголовок не должен содержать цифры'

    if (!form.date) newErrors.date = 'Укажите дату'

    if (form.content.trim().length < 10) newErrors.content = 'Текст новости слишком короткий'
    else if (!hasOnlyLetters(form.content)) newErrors.content = 'Текст не должен содержать цифры в начале или середине'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const updated = editing
      ? news.map((n) => (n.id === form.id ? { ...form, link: normalizeLink(form.link || '') } : n))
      : [...news, { ...form, id: Date.now(), link: normalizeLink(form.link || '') }]
    localStorage.setItem('news', JSON.stringify(updated))
    setNews(updated)
    setForm({ id: Date.now(), title: '', date: '', content: '', link: '' })
    setEditing(null)
    setErrors({})
    setShowModal(false)
  }

  const openCreate = () => {
    setForm({ id: Date.now(), title: '', date: '', content: '', link: '' })
    setEditing(null)
    setShowModal(true)
    setErrors({})
  }

  const openEdit = (n: NewsItem) => {
    setForm(n)
    setEditing(n)
    setShowModal(true)
    setErrors({})
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <button
          onClick={openCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Добавить новость
        </button>
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
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{n.title}</h3>
                    <p className="text-xs text-gray-500">{new Date(n.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setExpandedId(expandedId === n.id ? null : n.id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {expandedId === n.id ? 'Скрыть' : 'Подробнее'}
                    </button>
                    <button
                      onClick={() => openEdit(n)}
                      className="text-sm text-green-600 hover:underline"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDelete(n.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Удалить
                    </button>
                  </div>
                </div>

                {expandedId === n.id && (
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>{n.content}</p>
                    {n.link && (
                      <a
                        href={n.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm underline"
                      >
                        Перейти по ссылке
                      </a>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl relative">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? 'Редактировать новость' : 'Новая новость'}
            </h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Заголовок"
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
              </div>
              <div>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.date && <p className="text-sm text-red-600 mt-1">{errors.date}</p>}
              </div>
              <div>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Текст новости"
                  className="w-full border px-3 py-2 rounded h-24"
                />
                {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="Ссылка (опционально)"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editing ? 'Сохранить' : 'Добавить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}