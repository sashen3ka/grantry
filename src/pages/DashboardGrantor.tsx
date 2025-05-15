import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface Grant {
    id: number
    title: string
    description: string
    status: 'draft' | 'submitted' | 'approved' | 'rejected'
    createdAt: string
}

export default function DashboardGrantor() {
    const [grants, setGrants] = useState<Grant[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('grants') || '[]')
        const parsed: Grant[] = stored.map((g: any) => ({
            ...g,
            status: normalizeStatus(g.status),
        }))
        setGrants(parsed)
    }, [])

    const normalizeStatus = (status: string): Grant['status'] => {
        if (['draft', 'submitted', 'approved', 'rejected'].includes(status)) {
            return status as Grant['status']
        }
        return 'draft'
    }

    const handleDelete = (id: number) => {
        if (!window.confirm('Вы уверены, что хотите удалить заявку?')) return
        const updated = grants.filter((g) => g.id !== id)
        localStorage.setItem('grants', JSON.stringify(updated))
        setGrants(updated)
    }

    const handleSubmit = (id: number) => {
        const grant = grants.find((g) => g.id === id)

        if (!grant) return alert('Заявка не найдена.')

        // Блок-схема: выбран ли "сохранить" → у нас данные уже сохранены в черновике
        // Проверка: заполнены ли поля
        if (!grant.title.trim() || !grant.description.trim()) {
            return alert('Пожалуйста, заполните все поля перед отправкой на модерацию.')
        }

        const updated = grants.map((g) =>
            g.id === id ? { ...g, status: 'submitted' as Grant['status'] } : g
        )

        localStorage.setItem('grants', JSON.stringify(updated))
        setGrants(updated)
        alert('Заявка успешно отправлена на модерацию.')
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    const statusColors: Record<string, string> = {
        draft: 'bg-gray-300 text-gray-800',
        submitted: 'bg-blue-200 text-blue-800',
        approved: 'bg-green-200 text-green-800',
        rejected: 'bg-red-200 text-red-800',
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Кабинет грантодателя</h1>
            </header>

            <Link
                to="/new-grant"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Создать заявку
            </Link>

            <section>
                <h2 className="text-xl font-semibold mb-4">Ваши заявки</h2>
                {grants.length === 0 ? (
                    <p className="text-gray-600">Пока нет заявок</p>
                ) : (
                    <ul className="space-y-4">
                        {grants.map((grant) => (
                            <li
                                key={grant.id}
                                className="border p-4 rounded shadow-sm bg-white flex flex-col gap-3"
                            >
                                <div>
                                    <h3 className="font-semibold text-lg">{grant.title}</h3>
                                    <p className="text-gray-700">{grant.description}</p>
                                    <time className="text-xs text-gray-500">
                                        {new Date(grant.createdAt).toLocaleDateString()}
                                    </time>
                                    <span
                                        className={`inline-block mt-1 px-2 py-0.5 rounded text-sm font-medium ${statusColors[grant.status] || 'bg-gray-300 text-gray-800'
                                            }`}
                                    >
                                        {grant.status}
                                    </span>
                                </div>

                                <div className="flex gap-4">
                                    <Link
                                        to={`/edit-grant/${grant.id}`}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Редактировать
                                    </Link>

                                    {(grant.status === 'draft' || grant.status === 'rejected') && (
                                        <button
                                            onClick={() => handleSubmit(grant.id)}
                                            className="text-green-700 hover:underline text-sm"
                                        >
                                            Отправить на модерацию
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(grant.id)}
                                        className="text-red-600 hover:underline text-sm"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}
