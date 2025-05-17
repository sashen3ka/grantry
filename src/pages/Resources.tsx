import React, { useEffect, useState } from 'react';

interface Resource {
  id: number;
  title: string;
  content: string;
  link?: string;
}

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('resources');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setResources(parsed);
      } catch (err) {
        console.error('Ошибка загрузки ресурсов', err);
      }
    }
  }, []);

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const sorted = [...resources].sort((a, b) => b.id - a.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-center mb-6">Полезные материалы</h1>

      {sorted.length === 0 ? (
        <p className="text-gray-500">Материалы пока не добавлены</p>
      ) : (
        <ul className="space-y-4">
          {sorted.map((r) => (
            <li
              key={r.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
            >
              <div className="flex justify-between items-start mb-1">
                <h2 className="text-lg font-semibold text-gray-900">{r.title}</h2>
                <button
                  onClick={() => toggleExpanded(r.id)}
                  className="bg-sky-800 hover:bg-sky-600 text-white font-medium py-2 px-5 rounded text-sm transition"
                >
                  {expandedId === r.id ? 'Скрыть' : 'Читать подробнее'}
                </button>
              </div>
              {expandedId === r.id && (
                <>
                  <p className="text-sm text-gray-700 mb-2 whitespace-pre-line">{r.content}</p>
                  {r.link && (
                    <a
                      href={r.link.startsWith('http') ? r.link : `https://${r.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm text-blue-600 hover:underline"
                    >
                      Перейти к материалу
                    </a>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}