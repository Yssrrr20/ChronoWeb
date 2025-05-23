// src/app/admin/layout.js
import React from 'react';
import HeaderBar from '@/components/HeaderBar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-sm p-4 md:p-6">
        {/* ↓↓↓ PASTIKAN BAGIAN INI ADA DAN SESUAI ↓↓↓ */}
        <div className="flex items-center justify-between">
          {/* Sisi Kiri: Teks Sambutan */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              Welcome back, Admin
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Here's what's happening today
            </p>
          </div>

          {/* Sisi Kanan: Search, Notif, Profile */}
          <div className="flex-shrink-0">
            <HeaderBar />
          </div>
        </div>
        {/* ↑↑↑ SAMPAI SINI ↑↑↑ */}
      </header>

      <main className="flex-1 p-4 md:p-6 bg-white dark:bg-gray-700">
        {children}
      </main>
    </div>
  );
}