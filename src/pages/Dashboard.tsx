import React, { useState } from 'react';
import GrantorsTab from '../components/admin/GrantorsTab';
import CompetitionsTab from '../components/admin/CompetitionsTab';
import ResourcesTab from '../components/admin/ResourcesTab';
import NewsTab from '../components/admin/NewsTab';

const tabs = [
  { id: 'grantors', label: 'Грантодатели' },
  { id: 'competitions', label: 'Конкурсы' },
  { id: 'resources', label: 'Ресурсы' },
  { id: 'news', label: 'Новости' },
];

export default function Dashboard() {
  const [tab, setTab] = useState(() => localStorage.getItem('dashboardTab') || 'grantors');

  const renderTab = () => {
    switch (tab) {
      case 'grantors': return <GrantorsTab />;
      case 'competitions': return <CompetitionsTab />;
      case 'resources': return <ResourcesTab />;
      case 'news': return <NewsTab />;
      default: return null;
    }
  };

  const handleTabChange = (id: string) => {
    setTab(id);
    localStorage.setItem('dashboardTab', id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Кабинет администратора</h1>

      <div className="flex gap-6 border-b mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTabChange(t.id)}
            className={`pb-2 text-sm border-b-2 transition-all ${
              tab === t.id ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent text-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div>{renderTab()}</div>
    </div>
  );
}