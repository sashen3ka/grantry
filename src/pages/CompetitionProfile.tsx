import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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
            <h1 className="text-3xl font-bold">{competition.title}</h1>

            <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Грантодатель:</strong> {grantor ? (
                    <Link to={`/grantors/${grantor.id}`} className="text-blue-600 hover:underline">{grantor.name}</Link>
                ) : 'Неизвестно'}</p>
                <p><strong>Формат:</strong> {competition.format}</p>
                <p><strong>Регион:</strong> {competition.region}</p>
                <p><strong>Даты проведения:</strong> {competition.dates}</p>
                <p><strong>Сумма:</strong> {competition.amount}</p>
                {Array.isArray(competition.types) && competition.types.length > 0 ? (
                    <p><strong>Типы участников:</strong> {competition.types.join(', ')}</p>
                ) : (
                    <p><strong>Типы участников:</strong> —</p>
                )}

                <p><strong>Описание:</strong> {competition.description}</p>
                <p><strong>Методология:</strong> {competition.methodology}</p>
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
