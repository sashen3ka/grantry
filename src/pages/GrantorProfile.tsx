import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { competitions as defaultCompetitions } from '../data/competitions';
import { Calendar, MapPin, Coins, Users } from 'lucide-react';

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
  const { id } = useParams<{ id: string }>();
  const [grantor, setGrantor] = useState<Grantor | null>(null);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    import('../data/grantors').then((mod) => {
      const localData = JSON.parse(localStorage.getItem('grantors') || '[]');
      const all = [...mod.grantors, ...localData];
      const found = all.find((g) => g.id === Number(id));
      setGrantor(found || null);
    });

    const storedCompetitions = JSON.parse(localStorage.getItem('competitions') || '[]');
    const allCompetitions = [...defaultCompetitions, ...storedCompetitions];
    const filtered = allCompetitions.filter((c) => c.grantorId === Number(id));
    setCompetitions(filtered);
  }, [id]);

  if (!grantor) {
    return <div className="text-center py-10 text-gray-500">Грантодатель не найден</div>;
  }

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
     
        <div className="relative mb-4 h-10">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline"
          >
            ← Назад
          </button>
          <h1 className="text-2xl font-bold text-center">{grantor.name}</h1>
        </div>
 <div className="border rounded-xl p-4 flex flex-col justify-between transition duration-300 ease-in-out transform hover:shadow-md space-y-4">
        <p className="mb-6 text-gray-700">{grantor.description}</p>
        
        {competitions.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Конкурсы этого грантодателя:</h2>
            <div className="space-y-4">
              {competitions.map((c) => (
                <div key={c.id} className="border rounded p-4 bg-white shadow">
                  <Link to={`/competitions/${c.id}`} className="text-lg font-semibold mb-2 block hover:underline">
                    {c.title}
                  </Link>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} /> {c.dates || '—'}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} /> {c.region}
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins size={16} /> {c.amount}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} /> {c.types.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">Нет конкурсов</div>
        )}
      </div>
    </div>
  );
}