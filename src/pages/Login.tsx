import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Введите email и пароль')
      return
    }

    // Роль теперь всегда admin
    localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }))
    navigate('/dashboard')
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-20 border rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Вход в систему</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Войти
        </button>
      </form>
    </div>
  )
}
