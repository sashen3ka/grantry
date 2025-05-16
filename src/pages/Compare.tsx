// ✅ Compare.tsx → "Конкурсы" с фильтрацией и ссылкой на страницу конкурса
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Competition {
  id: number;
  title: string;
  dates: string;
  format: string;
  region: string;
  description: string;
  methodology: string;
  amount: string;
  grantorId: number;
}

export default function Compare() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    format: [] as string[],
    region: '',
    amountMin: '',
    amountMax: '',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('competitions') || '[]');
    setCompetitions(stored);
  }, []);

  const allFormats = ['онлайн', 'офлайн', 'гибридный'];

  const toggleFormat = (f: string) => {
    setFilters((prev) => ({
      ...prev,
      format: prev.format.includes(f)
        ? prev.format.filter((x) => x !== f)
        : [...prev.format, f],
    }));
  };

  const filtered = competitions.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesFormat =
      filters.format.length === 0 || filters.format.includes(c.format.toLowerCase());
    const matchesRegion =
      filters.region === '' || c.region.toLowerCase().includes(filters.region.toLowerCase());
    const amount = parseFloat(c.amount);
    const min = parseFloat(filters.amountMin);
    const max = parseFloat(filters.amountMax);
    const matchesAmount =
      (!filters.amountMin || amount >= min) && (!filters.amountMax || amount <= max);

    return matchesSearch && matchesFormat && matchesRegion && matchesAmount;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Конкурсы</h1>

      <div className="flex gap-4 mb-6 items-center">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100"
        >
          Фильтр
        </button>
        <input
          type="text"
          placeholder="Начните писать название конкурса..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full max-w-md"
        />
      </div>

      {filterOpen && (
        <div className="border rounded p-4 mb-6 space-y-4 bg-white shadow">
          <div>
            <p className="font-medium mb-2">Формат:</p>
            <div className="flex gap-4">
              {allFormats.map((f) => (
                <label key={f} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.format.includes(f)}
                    onChange={() => toggleFormat(f)}
                  />
                  {f}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Регион:</label>
            <input
              type="text"
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Сумма от:</label>
              <input
                type="number"
                value={filters.amountMin}
                onChange={(e) => setFilters({ ...filters, amountMin: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Сумма до:</label>
              <input
                type="number"
                value={filters.amountMax}
                onChange={(e) => setFilters({ ...filters, amountMax: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-gray-500">Нет конкурсов по заданным параметрам</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((c) => (
            <li key={c.id} className="bg-gray-100 rounded p-4">
              <h3 className="text-lg font-bold mb-1">{c.title}</h3>
              <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                <span>📅 {c.dates}</span>
                <span>📍 {c.region}</span>
              </div>
              <Link
                to={`/competitions/${c.id}`}
                className="inline-block mt-2 text-sm text-blue-600 hover:underline"
              >
                Подробнее
              </Link>
            </li>

          ))}
        </ul>
      )}
    </div>
  );
}