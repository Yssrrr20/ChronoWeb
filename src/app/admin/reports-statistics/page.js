// src/app/admin/reports-statistics/page.js
import React from 'react';

// --- Icon Components (Placeholders/SVGs) ---
const CalendarIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M12 12.75h.008v.008H12v-.008Z" />
  </svg>
);

const CategoryIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
);

const DownloadIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);


// --- Reusable Components ---

const StatCard = ({ title, value, change, changeText, urgentText }) => {
  const isPositive = change > 0;
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm relative">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-1">{value}</p>
      <div className="text-xs mt-2">
        {change && (
          <span className={`${changeColor} font-semibold`}>
            {isPositive ? '↑' : '↓'} {change}%
          </span>
        )}
        <span className="text-gray-500 dark:text-gray-400 ml-1">{changeText}</span>
      </div>
      {urgentText && (
        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">{urgentText}</p>
      )}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
        <DownloadIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

const ChartCard = ({ title, children }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <DownloadIcon className="h-5 w-5" />
                </button>
            </div>
            <div className="h-72 flex items-center justify-center text-gray-400">
                {children}
            </div>
        </div>
    );
}

// --- Page Component ---

export default function ReportsStatisticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Reports & Statistics
      </h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="relative">
          <select className="appearance-none w-48 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 py-2 pl-10 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This Year</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <CalendarIcon className="h-5 w-5" />
          </div>
           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
             <ChevronDownIcon className="h-4 w-4" />
          </div>
        </div>

        <div className="relative">
          <select className="appearance-none w-48 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 py-2 pl-10 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Technology</option>
            <option>Politics</option>
            <option>Sports</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <CategoryIcon className="h-5 w-5" />
          </div>
           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
             <ChevronDownIcon className="h-4 w-4" />
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">
          Apply Filters
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Articles" value="2,847" change={12} changeText="this month" />
        <StatCard title="Active Users" value="14,523" change={8} changeText="this month" />
        <StatCard title="Reviews Pending" value="156" urgentText="23 urgent" />
        <StatCard title="Flagged Content" value="48" urgentText="12 new" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Articles Published Trend">
            <p> For Line Chart.</p>
        </ChartCard>
        <ChartCard title="Content Categories">
             <p> For Pi/Doughnut Chart.</p>
        </ChartCard>
        <ChartCard title="Top Contributing Authors">
             <p>For Horizontal Bar Chart.</p>
        </ChartCard>
        <ChartCard title="Active Users Trend">
             <p>For Area Chart.</p>
        </ChartCard>
      </div>
    </div>
  );
}