import React, { useState } from 'react'
import CompetitionsTab from '../components/admin/CompetitionsTab'
import GrantorsTab from '../components/admin/GrantorsTab'
import ResourcesTab from '../components/admin/ResourcesTab'
import NewsTab from '../components/admin/NewsTab'

const tabs = [
  { id: 'grantors', label: 'Грантодатели' },
  { id: 'competitions', label: 'Конкурсы' },
  { id: 'resources', label: 'Ресурсы' },
  { id: 'news', label: 'Новости' },
];


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('grantors')

  const renderTab = () => {
    switch (activeTab) {
      case 'grantors':
        return <GrantorsTab />
      case 'competitions':
        return <CompetitionsTab />
      case 'resources':
        return <ResourcesTab />
      case 'news':
        return <NewsTab />
      default:
        return null
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Кабинет администратора</h1>

      <div className="flex gap-4 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 border-b-2 transition ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>{renderTab()}</div>
    </div>
  )
}
