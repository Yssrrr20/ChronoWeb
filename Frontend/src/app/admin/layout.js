// src/app/admin/layout.js
import React from 'react';
import HeaderBar from '@/components/HeaderBar';
import Sidebar from '../../components/Sidebar'; // Impor komponen Sidebar

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900"> {/* Tambahkan kelas flex dan tinggi layar penuh */}
      <Sidebar /> {/* Tambahkan Sidebar di sini */}
      <div className="flex-1 flex flex-col overflow-y-auto"> {/* Konten utama agar bisa scroll jika panjang */}
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                Welcome back, Admin
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Here's what's happening today
              </p>
            </div>
            <div className="flex-shrink-0">
              <HeaderBar />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 bg-white dark:bg-gray-700">
          {children}
        </main>
      </div>
    </div>
  );
}