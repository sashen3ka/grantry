// CompetitionProfile.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Coins, Users } from 'lucide-react';
import { grantors as staticGrantors } from '../data/grantors';

interface Competition {
    id: number;
    name?: string;
    title?: string;
    dates: string;
    format: string;
    region: string;
    description: string;
    methodology: string;
    amount: string;
    grantorId: number;
    types: string[];
}

export default function CompetitionProfile() {
    const { id } = useParams<{ id: string }>();
    const [competition, setCompetition] = useState<Competition | null>(null);
    const [grantor, setGrantor] = useState<{ id: number; name: string } | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        import('../data/competitions').then((mod) => {
            const fileData = mod.competitions;
            const localData = JSON.parse(localStorage.getItem('competitions') || '[]');
            const all = [...fileData, ...localData];
            const found = all.find((c) => c.id === Number(id));
            setCompetition(found || null);

            // загружаем и статичных, и локальных грантодателей
            import('../data/grantors').then((gm) => {
                const stored = JSON.parse(localStorage.getItem('grantors') || '[]');
                const allGrantors = [...gm.grantors, ...stored];
                const related = allGrantors.find((g) => g.id === found?.grantorId);
                setGrantor(related || null);
            });
        });
    }, [id]);


    if (!competition) {
        return <div className="text-center py-10 text-gray-500">Конкурс не найден</div>;
    }

    const competitionName = competition.name || competition.title || 'Без названия';

    return (

        <div className="px-4 py-6 max-w-3xl mx-auto">
            <div className="relative mb-4 h-10">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline"
                >
                    ← Назад
                </button>
                <h1 className="text-2xl font-bold text-center">{competitionName}</h1>
            </div>


            <div className="border rounded-xl p-4 flex flex-col justify-between transition duration-300 ease-in-out transform hover:shadow-md space-y-4">

                <div className="space-y-3 text-gray-700">
                    <div className="flex items-center gap-2">
                        <Calendar size={18} /> Дата: {competition.dates || '—'}
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={18} /> Регион: {competition.region}
                    </div>
                    <div className="flex items-center gap-2">
                        <Coins size={18} /> Сумма: {competition.amount} ₽
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={18} /> Типы: {competition.types.join(', ')}
                    </div>
                    <div>
                        <h2 className="font-semibold mt-4 mb-1">Описание</h2>
                        <p>{competition.description}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold mt-4 mb-1">Методология</h2>
                        <p>{competition.methodology}</p>
                    </div>
                </div>

                {grantor && (
                    <div className="flex items-center gap-2 mt-8">
                        <span className="text-lg font-semibold">Грантодатель:</span>
                        <Link
                            to={`/grantors/${grantor.id}`}
                            className="text-lg font-semibold hover:underline"
                        >
                            {grantor.name}
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}
