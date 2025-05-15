import React, { useState } from 'react';
import { grantors } from '../data/grantors';

const allTypes = [
  'Физические лица',
  'Юридические лица',
  'НКО',
  'ИП',
  'Субсидии',
];

export default function Catalog() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const filtered = grantors.filter((g) =>
    selectedTypes.length === 0
      ? true
      : g.type.some((t) => selectedTypes.includes(t))
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-6">
      <h1 className="text-2xl font-bold mb-4">Каталог грантодателей</h1>

      <div className="mb-6">
        <p className="font-medium mb-2">Тип финансирования:</p>
        <div className="flex flex-wrap gap-4">
          {allTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((g) => (
          <div key={g.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{g.name}</h2>
            <p className="text-sm text-gray-700">{g.description}</p>
            <p className="text-xs text-gray-500 mt-2">Типы: {g.type.join(', ')}</p>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-500">Нет результатов по выбранным фильтрам.</p>
        )}
      </div>
    </div>
  );
}
