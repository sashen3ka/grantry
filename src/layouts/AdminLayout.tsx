import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AdminHeader />
      <main className="flex-grow px-6 py-4">
        <Outlet />
      </main>
    </div>
  );
}
