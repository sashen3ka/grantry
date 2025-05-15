import React, { useEffect, useState, useMemo } from 'react'

interface Competition {
  id: number
  title: string
  dates: string
  format: string
  region: string
  description: string
  methodology: string
  amount: string
}

export default function Competitions() {
  const [all, setAll] = useState<Competition[]>([])
  const [search, setSearch] = useState('')
  const [regionFilter, setRegionFilter] = useState('')
  const [formatFilter, setFormatFilter] = useState('')

  // Загрузка данных
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('competitions') || '[]')
    setAll(stored)
  }, [])

  // Получаем уникальные регионы и форматы для селектов
  const regions = useMemo(
    () => Array.from(new Set(all.map((c) => c.region))).filter((r) => r),
    [all]
  )
  const formats = useMemo(
    () => Array.from(new Set(all.map((c) => c.format))).filter((f) => f),
    [all]
  )

  // Фильтрация + поиск
  const filtered = useMemo(() => {
    return all.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
      const matchRegion = regionFilter ? c.region === regionFilter : true
      const matchFormat = formatFilter ? c.format === formatFilter : true
      return matchSearch && matchRegion && matchFormat
    })
  }, [all, search, regionFilter, formatFilter])

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Грантовые конкурсы</h1>

      {/* Фильтры */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Поиск по названию и описанию"
          className="flex-1 px-4 py-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="">Все регионы</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          className="px-4 py-2 border rounded"
          value={formatFilter}
          onChange={(e) => setFormatFilter(e.target.value)}
        >
          <option value="">Все форматы</option>
          {formats.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Список конкурсов */}
      {filtered.length === 0 ? (
        <p className="text-gray-600">По заданным критериям ничего не найдено.</p>
      ) : (
        <ul className="space-y-6">
          {filtered.map((c) => (
            <li
              key={c.id}
              className="border rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{c.title}</h2>
              <div className="text-sm text-gray-500 mb-4">
                📅 {c.dates} | 📍 {c.region} | 💰 {c.amount}
              </div>
              <p className="text-gray-700 mb-4">{c.description}</p>
              <div className="flex gap-4">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-sm">
                  {c.format}
                </span>
                <button
                  className="text-sm text-blue-600 hover:underline"
                  // можно реализовать детализацию позже
                  onClick={() => {}}
                >
                  Подробнее
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
