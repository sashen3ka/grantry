// Обновлённая страница Compare.tsx с адаптацией под мобильные
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Coins } from 'lucide-react';


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
  types: string[];
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
    types: [] as string[],
  });

  const allFormats = ['онлайн', 'офлайн', 'гибридный'];
  const allTypes = ['НКО', 'ИП', 'Юридические лица'];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('competitions') || '[]');
    setCompetitions(stored);
  }, []);

  const toggleArrayFilter = (field: 'format' | 'types', value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((x) => x !== value)
        : [...prev[field], value],
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
    const matchesTypes =
      filters.types.length === 0 || filters.types.some((t) => c.types?.includes(t));

    return matchesSearch && matchesFormat && matchesRegion && matchesAmount && matchesTypes;
  });


return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Грантовые конкурсы</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="px-4 py-2 border rounded text-sm hover:bg-gray-100"
        >
          {filterOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
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
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 mb-6 space-y-6 max-w-3xl mx-auto">
          <div>
            <p className="font-medium mb-2">Формат:</p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              {allFormats.map((f) => (
                <label key={f} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.format.includes(f)}
                    onChange={() => toggleArrayFilter('format', f)}
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

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Сумма от:</label>
              <input
                type="number"
                value={filters.amountMin}
                onChange={(e) => setFilters({ ...filters, amountMin: e.target.value })}
                className="w-full border px-3 py-1.5 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Сумма до:</label>
              <input
                type="number"
                value={filters.amountMax}
                onChange={(e) => setFilters({ ...filters, amountMax: e.target.value })}
                className="w-full border px-3 py-1.5 rounded"
              />
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Типы участников:</p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              {allTypes.map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.types.includes(t)}
                    onChange={() => toggleArrayFilter('types', t)}
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-gray-500">Нет конкурсов по заданным параметрам</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((c) => (
            <li
              key={c.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <h3 className="text-lg font-bold mb-1">{c.title}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-600 mb-2">
  <span className="flex items-center gap-1">
    <Calendar className="w-4 h-4" />
    {new Date(c.dates).toLocaleDateString('ru-RU')}
  </span>
  <span className="flex items-center gap-1">
    <MapPin className="w-4 h-4" />
    {c.region}
  </span>
  <span className="flex items-center gap-1">
    <Coins className="w-4 h-4" />
    {c.amount}
  </span>
</div>
              <Link
                to={`/competitions/${c.id}`}
                className="inline-block text-sm text-blue-600 hover:underline"
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
