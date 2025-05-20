// Обновлённая страница Compare.tsx с адаптацией под мобильные
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Coins, Users } from 'lucide-react';

interface Competition {
  id: number;
  name?: string;
  title?: string;
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
  const allTypes = ['НКО', 'ИП', 'Юридические лица', 'Субсидии', 'Физические лица'];

  useEffect(() => {
    import('../data/competitions').then((mod) => {
      const fileData = mod.competitions;
      const stored = localStorage.getItem('competitions');
      const localData = stored ? JSON.parse(stored) : [];
      setCompetitions([...fileData, ...localData]);
    });
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
    const competitionName = c.name || c.title || '';
    const matchesSearch = competitionName.toLowerCase().includes(search.toLowerCase());
    const matchesFormat =
      filters.format.length === 0 ||
      filters.format.includes(c.format.toLowerCase());
    const matchesRegion =
      !filters.region || c.region.toLowerCase().includes(filters.region.toLowerCase());
    const matchesAmount = (!filters.amountMin || +c.amount >= +filters.amountMin) &&
      (!filters.amountMax || +c.amount <= +filters.amountMax);
    const matchesTypes =
      filters.types.length === 0 ||
      filters.types.some((type) => c.types.includes(type));

    return (
      matchesSearch && matchesFormat && matchesRegion && matchesAmount && matchesTypes
    );
  });

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Грантовые конкурсы</h1>

      <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="bg-sky-800 hover:bg-sky-600 text-white font-medium py-2 px-5 rounded text-sm transition"
        >
          {filterOpen ? 'Фильтры' : 'Фильтры'}
        </button>
        <input
          type="text"
          placeholder="Начните писать название конкурса..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-5 py-2 rounded transition h-[40px] w-full sm:w-[720px] md:w-[768px]"

        />
      </div>

      {filterOpen && (
        <div className="border rounded p-4 mb-4 space-y-3 bg-gray-50">
          <div>
            <label className="font-semibold">Формат:</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {allFormats.map((format) => (
                <button
                  key={format}
                  className={`px-3 py-1 border rounded text-sm font-medium transition ${filters.format.includes(format)
                    ? 'bg-sky-800 text-white'
                    : 'bg-white text-gray-800 hover:bg-sky-100'
                    }`}
                  onClick={() => toggleArrayFilter('format', format)}
                >
                  {format}

                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold">Типы участников:</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {allTypes.map((type) => (
                <button
                  key={type}
                  className={`px-3 py-1 border rounded text-sm font-medium transition ${filters.types.includes(type)
                    ? 'bg-sky-800 text-white'
                    : 'bg-white text-gray-800 hover:bg-sky-100'
                    }`}
                  onClick={() => toggleArrayFilter('types', type)}
                >
                  {type}

                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold">Регион:</label>
            <input
              type="text"
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-semibold">Мин. сумма:</label>
              <input
                type="number"
                value={filters.amountMin}
                onChange={(e) => setFilters({ ...filters, amountMin: e.target.value })}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <div className="flex-1">
              <label className="font-semibold">Макс. сумма:</label>
              <input
                type="number"
                value={filters.amountMax}
                onChange={(e) => setFilters({ ...filters, amountMax: e.target.value })}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((c) => {
          const competitionName = c.name || c.title || 'Без названия';
          return (
            <div key={c.id} className="border rounded-xl p-4 flex flex-col justify-between transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">{competitionName}</h2>
                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} /> <span>{c.dates || '—'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} /> <span>{c.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins size={16} /> <span>{c.amount}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Users size={16} /> <span>{c.types.join(', ')}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Link
                  to={`/competitions/${c.id}`}
                  className="bg-sky-800 hover:bg-sky-600 text-white font-medium py-2 px-5 rounded text-sm transition"
                >
                  Подробнее
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
