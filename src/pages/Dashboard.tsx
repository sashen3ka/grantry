import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardAdmin from './DashboardAdmin'
import DashboardGrantor from './DashboardGrantor.tsx'

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

  if (!role) return <div className="p-6">Загрузка...</div>

  return role === 'admin' ? <DashboardAdmin /> : <DashboardGrantor />
}
