// src/app/admin/dashboard/page.js
import React from 'react';

// Komponen untuk menampilkan kartu statistik individual
const StatCard = ({ title, value, change, changeType }) => {
  const changeColor = changeType === 'positive' ? 'text-green-500' : 'text-red-500';
  const changeIcon = changeType === 'positive' ? '↑' : '↓';

  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-1">{value}</p>
      {change && (
        <p className={`text-xs mt-1 ${changeColor}`}>
          {changeIcon} {change}
        </p>
      )}
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div>
      {/* Kartu Statistik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Articles" value="2,547" change="+12% this month" changeType="positive" />
        <StatCard title="Pending Reviews" value="48" change="5 urgent" changeType="negative" />
        <StatCard title="Active Users" value="12,831" change="+8% this week" changeType="positive" />
        <StatCard title="Top Categories" value="Technology" change="Politics trending" />
      </div>

      {/* Panel Kiriman Terbaru */}
      <div className="mb-8 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Recent Submissions
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Tabel data untuk "Recent Submissions" akan ditampilkan di sini.
        </p>
      </div>

      {/* Panel Aktivitas Terkini dan Konten yang Ditandai */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Aktivitas Terkini */}
        <div className="lg:col-span-2 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Recent Activity
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Feed "Recent Activity" akan ditampilkan di sini.
          </p>
        </div>

        {/* Konten yang Ditandai */}
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Flagged Content
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Daftar "Flagged Content" akan ditampilkan di sini.
          </p>
        </div>
      </div>
    </div>
  );
}