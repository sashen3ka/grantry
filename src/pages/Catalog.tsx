// ✅ Catalog.tsx — без отображения и фильтрации по типам грантодателей
import React, { useState, useEffect } from 'react';
import { grantors as staticGrantors } from '../data/grantors';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const [allGrantors, setAllGrantors] = useState(staticGrantors);
  const [expandedId, setExpandedId] = useState<number | null>(null);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Каталог грантодателей</h1>

      <div className="space-y-4">
        {allGrantors.map((g) => (
          <div key={g.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                <Link to={`/grantors/${g.id}`} className="text-blue-600 hover:underline">
                  {g.name}
                </Link>
              </h2>
              <button
                onClick={() => setExpandedId(expandedId === g.id ? null : g.id)}
                className="text-sm text-blue-600 hover:underline"
              >
                {expandedId === g.id ? 'Скрыть' : 'Подробнее'}
              </button>
            </div>
            {expandedId === g.id && (
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p>{g.description}</p>
              </div>
            )}
          </div>
        ))}

        {allGrantors.length === 0 && (
          <p className="text-gray-500">Нет грантодателей.</p>
        )}
      </div>
    </div>
  );
}