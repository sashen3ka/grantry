// ✅ GrantorProfile.tsx — страница с конкурсами грантодателя в стиле Compare
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Grantor {
  id: number;
  name: string;
  description: string;
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

export default function GrantorProfile() {
  const { id } = useParams();
  const grantorId = Number(id);

  const [grantor, setGrantor] = useState<Grantor | null>(null);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const g = JSON.parse(localStorage.getItem('grantors') || '[]');
    const found = g.find((gr: Grantor) => gr.id === grantorId);
    setGrantor(found || null);

    const comps = JSON.parse(localStorage.getItem('competitions') || '[]');
    setCompetitions(comps.filter((c: Competition) => c.grantorId === grantorId));
  }, [grantorId]);

  const filtered = competitions.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!grantor) return <div className="p-6">Грантодатель не найден</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">{grantor.name}</h1>
      <p className="text-sm text-gray-700 mb-6">{grantor.description}</p>

      <h2 className="text-xl font-semibold mb-4">Конкурсы этого грантодателя</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Поиск по названию конкурса..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full max-w-md"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">Нет конкурсов</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((c) => (
            <li key={c.id} className="bg-gray-100 rounded p-4">
              <h3 className="text-lg font-bold mb-1">{c.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{c.description}</p>
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

      <Link
        to="/catalog"
        className="inline-block mt-10 text-sm text-blue-600 hover:underline"
      >
        ← Назад к каталогу грантодателей
      </Link>
    </div>
  );
}