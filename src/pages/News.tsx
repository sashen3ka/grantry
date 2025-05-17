import React, { useEffect, useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
  link?: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('news');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setNews(parsed);
      } catch (err) {
        console.error('Ошибка загрузки новостей', err);
      }
    }
  }, []);

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const sorted = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-center mb-6">Актуальные новости</h1>

      {sorted.length === 0 ? (
        <p className="text-gray-500">Новостей пока нет</p>
      ) : (
        <ul className="space-y-4">
          {sorted.map((n) => (
            <li
              key={n.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
            >
              <div className="flex justify-between items-start mb-1">
                <h2 className="text-lg font-semibold text-gray-900">{n.title}</h2>
                <button
                  onClick={() => toggleExpanded(n.id)}
                  className="bg-sky-800 hover:bg-sky-600 text-white font-medium py-2 px-5 rounded text-sm transition"
                >
                  {expandedId === n.id ? 'Скрыть' : 'Читать подробнее'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {new Date(n.date).toLocaleDateString('ru-RU')}
              </p>
              {expandedId === n.id && (
                <>
                  <p className="text-sm text-gray-700 mb-2 whitespace-pre-line">{n.content}</p>
                  {n.link && (
                    <a
                      href={n.link.startsWith('http') ? n.link : `https://${n.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm text-blue-600 hover:underline"
                    >
                      Подробнее
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