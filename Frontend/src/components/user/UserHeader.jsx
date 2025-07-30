'use client';

import React from 'react';
import Link from 'next/link';
import { useSearch } from '@/context/SearchContext';

const BellIcon = () => (
  <svg className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.001 2.001 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export default function UserHeader() {
  const { searchQuery, setSearchQuery, initiateSearch } = useSearch(); 

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      initiateSearch(searchQuery); 
      e.target.blur(); 
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 md:p-6 flex justify-between items-center relative z-20">
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <Link href="/user/dashboard" className="text-xl font-bold text-gray-800 dark:text-white flex-shrink-0">
          ChronoNews
        </Link>
      </div>

      <div className="relative flex-grow mx-4 max-w-lg">
        <input
          type="text"
          placeholder="Search for news..."
          className="w-full px-4 py-2 pl-10 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500
                     bg-gray-100 dark:bg-gray-700 dark:border-gray-600 // <-- Pastikan background
                     text-gray-900 dark:text-white" 
          value={searchQuery} 
          onChange={handleSearchInputChange} 
          onKeyDown={handleSearchSubmit} 
        />
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="flex items-center space-x-4 flex-shrink-0">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <BellIcon />
        </button>
        {/* Placeholder untuk avatar user*/}
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
          U
        </div>
      </div>
    </header>
  );
}