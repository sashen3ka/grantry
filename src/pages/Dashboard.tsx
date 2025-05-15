import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/login')
      return
    }

    const parsed = JSON.parse(userData)
    setRole(parsed.role)
  }, [])

  if (!role) {
    return <div className="p-6">Загрузка...</div>
  }

  if (role === 'admin') {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Кабинет администратора</h1>
        <p className="mt-2">Здесь будет список заявок от грантодателей.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Кабинет грантодателя</h1>
      <p className="mt-2">Здесь будут ваши заявки и кнопка “создать грант”.</p>
    </div>
  )
}
