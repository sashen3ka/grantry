import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // здесь можно очистить токены/сессии, если нужно
    // localStorage.removeItem('token');
    navigate('/'); // возвращаем на публичную часть
  };

  return (
    <header className="bg-gray-100 border-b border-gray-300 shadow-sm sticky top-0 z-50">
      <div className="w-full px-6 py-3 flex items-center">
        <h1 className="text-lg font-semibold text-gray-800">Админ-панель</h1>
        <button
          onClick={handleLogout}
          className="ml-auto px-4 py-1.5 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
        >
          Выйти
        </button>
      </div>
    </header>
  );
}
