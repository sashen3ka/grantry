import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-top"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
