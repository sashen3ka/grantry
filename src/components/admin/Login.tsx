import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const validUsername = 'admin'
    const validPassword = 'admin123!'

    if (username === validUsername && password === validPassword) {
      localStorage.setItem('user', JSON.stringify({ username, role: 'admin' }))
      navigate('/dashboard')
    } else {
      alert('Неверный логин или пароль')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-20 border rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Вход в систему</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Логин"
          className="w-full px-4 py-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
