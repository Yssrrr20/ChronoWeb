// src/app/admin/news-management/page.js
import React from 'react';

const PlusIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);


export default function NewsManagementPage() {
  return (
    <div>
      {/* Baris Judul dan Tombol Create New */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          News Management
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2">
          <PlusIcon className="h-5 w-5" />
          <span>Create New Article</span>
        </button>
      </div>

      {/* Baris Search dan Filter */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Search Input */}
          <div className="md:col-span-2"> 
            <label htmlFor="search_articles" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search Articles
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search_articles"
                id="search_articles"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search by title, author, or content..."
              />
            </div>
          </div>

          {/* Filter Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                className="appearance-none block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Categories</option>
                <option>Technology</option>
                <option>Business</option>
                <option>Science</option>
                <option>Lifestyle</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <ChevronDownIcon className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Filter Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <div className="relative">
              <select
                id="status"
                name="status"
                className="appearance-none block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Statuses</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Under Review</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <ChevronDownIcon className="h-4 w-4" />
              </div>
            </div>
          </div>

           <div>
            <label htmlFor="date_range" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date Range
            </label>
            <input
              type="text" 
              name="date_range"
              id="date_range"
              placeholder="Select date range"
              className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Placeholder untuk Tabel Artikel */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Article List
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Tabel daftar artikel akan ditampilkan di sini.
        </p>
      </div>

      {/* Placeholder untuk Pagination */}
      <div className="mt-6">
        <p className="text-center text-gray-500 dark:text-gray-400">
          
        </p>
      </div>

    </div>
  );
}