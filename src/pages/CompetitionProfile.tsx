import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Coins, Users } from 'lucide-react';

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

interface Grantor {
  id: number;
  name: string;
}

export default function CompetitionProfile() {
  const { id } = useParams();
  const competitionId = Number(id);

  const [competition, setCompetition] = useState<Competition | null>(null);
  const [grantor, setGrantor] = useState<Grantor | null>(null);

  useEffect(() => {
    const competitions: Competition[] = JSON.parse(localStorage.getItem('competitions') || '[]');
    const grantors: Grantor[] = JSON.parse(localStorage.getItem('grantors') || '[]');

    const found = competitions.find((c) => c.id === competitionId);
    setCompetition(found || null);

    if (found) {
      const g = grantors.find((g) => g.id === found.grantorId);
      setGrantor(g || null);
    }
  }, [competitionId]);

  if (!competition) {
    return <div className="p-6">Конкурс не найден</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-20 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{competition.title}</h1>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4 max-w-3xl">
        <p className="text-sm text-gray-700">
          <strong>Грантодатель:</strong>{' '}
          {grantor ? (
            <Link to={`/grantors/${grantor.id}`} className="text-blue-600 hover:underline">
              {grantor.name}
            </Link>
          ) : 'Неизвестно'}
        </p>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span><strong>Дата проведения:</strong> {new Date(competition.dates).toLocaleDateString('ru-RU')}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span><strong>Регион:</strong> {competition.region}</span>
          </div>
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-gray-500" />
            <span><strong>Сумма:</strong> {competition.amount}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span><strong>Типы участников:</strong> {Array.isArray(competition.types) && competition.types.length > 0 ? competition.types.join(', ') : '—'}</span>
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-2 pt-4">
          <p><strong>Формат:</strong> {competition.format}</p>
          <p><strong>Описание:</strong> {competition.description}</p>
          <p><strong>Методология:</strong> {competition.methodology}</p>
        </div>
      </div>

      <Link
        to="/compare"
        className="inline-block mt-4 text-sm text-blue-600 hover:underline"
      >
        ← Назад к списку конкурсов
      </Link>
    </div>
  );
}
