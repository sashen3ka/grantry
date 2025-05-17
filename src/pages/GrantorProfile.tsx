import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Coins } from 'lucide-react';

interface Grantor {
  id: number;
  name: string;
  description: string;
  website?: string;
  vk?: string;
  telegram?: string;
}

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

function normalizeUrl(url?: string): string | undefined {
  if (!url) return undefined;
  return url.startsWith('http') ? url : `https://${url}`;
}

export default function GrantorProfile() {
  const { id } = useParams();
  const grantorId = Number(id);

  const [grantor, setGrantor] = useState<Grantor | null>(null);
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
    const g = JSON.parse(localStorage.getItem('grantors') || '[]');
    const found = g.find((gr: Grantor) => gr.id === grantorId);
    setGrantor(found || null);

    const comps = JSON.parse(localStorage.getItem('competitions') || '[]');
    setCompetitions(comps.filter((c: Competition) => c.grantorId === grantorId));
  }, [grantorId]);

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

  if (!grantor) return <div className="p-6">Грантодатель не найден</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{grantor.name}</h1>

      <div className="space-y-3 max-w-3xl">
        <p className="text-sm text-gray-700">{grantor.description}</p>

        <div className="text-sm text-gray-700 space-y-1 pt-2">
          {grantor.website && (
            <p>
              <span className="text-sm text-gray-700">Ссылка на официальный сайт:</span>{' '}
              <a href={normalizeUrl(grantor.website)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {normalizeUrl(grantor.website)}
              </a>
            </p>
          )}
          {grantor.vk && (
            <p>
              <span className="font-medium text-gray-700">Страница во ВКонтакте:</span>{' '}
              <a href={normalizeUrl(grantor.vk)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {normalizeUrl(grantor.vk)}
              </a>
            </p>
          )}
          {grantor.telegram && (
            <p>
              <span className="font-medium text-gray-700">Канал в Telegram:</span>{' '}
              <a href={normalizeUrl(grantor.telegram)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {normalizeUrl(grantor.telegram)}
              </a>
            </p>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-4">Конкурсы этого грантодателя</h2>

      <div className="flex gap-4 mb-6 items-center">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="px-4 py-2 border rounded text-sm hover:bg-gray-100"
        >
          {filterOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
        </button>
        <input
          type="text"
          placeholder="Название конкурса..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 py-1.5 border rounded text-sm"
        />
      </div>

      {filterOpen && (
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 max-w-3xl space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Регион:</label>
              <input
                type="text"
                value={filters.region}
                onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                className="w-full border px-3 py-1.5 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Сумма от:</label>
              <input
                type="number"
                value={filters.amountMin}
                onChange={(e) => setFilters({ ...filters, amountMin: e.target.value })}
                className="w-full border px-3 py-1.5 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Сумма до:</label>
              <input
                type="number"
                value={filters.amountMax}
                onChange={(e) => setFilters({ ...filters, amountMax: e.target.value })}
                className="w-full border px-3 py-1.5 rounded"
              />
            </div>
          </div>

          <div>
            <p className="font-medium text-sm mb-2">Формат:</p>
            <div className="flex flex-wrap gap-4">
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
            <p className="font-medium text-sm mb-2">Типы участников:</p>
            <div className="flex flex-wrap gap-4">
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
        <p className="text-gray-500">Нет конкурсов</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((c) => (
            <li key={c.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition">
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

      <Link
        to="/catalog"
        className="inline-block mt-10 text-sm text-blue-600 hover:underline"
      >
        ← Назад к каталогу грантодателей
      </Link>
    </div>
  );
}
