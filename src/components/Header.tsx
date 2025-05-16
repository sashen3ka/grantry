import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition"
        >
          Грантовые конкурсы
        </Link>

        <nav className="flex-1 ml-12">
          <ul className="flex justify-center space-x-6 text-base text-gray-600 font-normal">
            <li>
              <Link to="/catalog" className="hover:text-blue-600 transition">
                Каталог грантодателей
              </Link>
            </li>
            <li>
              <Link to="/compare" className="hover:text-blue-600 transition">
                Конкурсы
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-blue-600 transition">
                Полезные материалы
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-blue-600 transition">
                Новости
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
