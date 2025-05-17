import React, { useState, useEffect } from 'react';
import { grantors as staticGrantors } from '../data/grantors';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const [allGrantors, setAllGrantors] = useState(staticGrantors);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('grantors');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setAllGrantors([...staticGrantors, ...parsed]);
        }
      } catch (err) {
        console.error('Ошибка парсинга grantors из localStorage', err);
      }
    }
  }, []);

  const filtered = allGrantors.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Каталог грантодателей</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Начните писать название..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">Нет грантодателей.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((g) => (
            <div key={g.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition">
              <div className="flex justify-between items-center">
                <Link
                  to={`/grantors/${g.id}`}
                  className="text-lg font-medium text-gray-900 hover:underline visited:text-gray-900"
                >
                  {g.name}
                </Link>
                <button
                  onClick={() => setExpandedId(expandedId === g.id ? null : g.id)}
                  className="bg-sky-800 hover:bg-sky-600 text-white font-medium py-2 px-5 rounded text-sm transition"
                >
                  {expandedId === g.id ? 'Скрыть' : 'Подробнее'}
                </button>
              </div>
              {expandedId === g.id && (
                <div className="mt-2 text-sm text-gray-700">
                  <p>{g.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
