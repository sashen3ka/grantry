import React from 'react';
import { Link } from 'react-router-dom';
import { grantors } from '../data/grantors';

const GrantorsList = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Грантодатели</h1>
      <ul className="space-y-4">
        {grantors.map((g) => (
          <li key={g.id} className="border rounded p-4 shadow-sm hover:shadow transition">
            <h2 className="text-xl font-semibold">
              <Link to={`/grantors/${g.id}`} className="text-blue-600 hover:underline">
                {g.name}
              </Link>
            </h2>
            <p className="text-gray-600 mb-2">{g.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GrantorsList;
