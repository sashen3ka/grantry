import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="w-full px-4 py-3 flex items-center">
                <Link to="/" className="text-xl font-semibold text-gray-900 tracking-tight hover:text-blue-600 transition">
                    Грантовые конкурсы
                </Link>
                <nav className="ml-auto flex space-x-6 text-sm font-medium text-gray-700">
                    <Link to="/catalog" className="hover:text-blue-600 transition-colors duration-200">
                        Каталог грантодателей
                    </Link>
                    <Link to="/compare" className="hover:text-blue-600 transition-colors duration-200">
                        Сравнение конкурсов
                    </Link>
                    <Link to="/resources">Полезные материалы</Link>
                    <Link to="/news" className="hover:text-blue-600 transition-colors duration-200">
                        Новости
                    </Link>
                </nav>
            </div>
        </header>
    );
}
