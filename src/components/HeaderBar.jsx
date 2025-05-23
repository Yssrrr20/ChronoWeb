// src/components/HeaderBar.jsx
'use client';

import React from 'react';

// Placeholder untuk ikon-ikon (Anda bisa menggantinya dengan Heroicons nanti)
const SearchIcon = () => (
  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BellIcon = () => (
  <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const UserAvatar = () => (
  <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs">
    A {/* Inisial Admin */}
  </div>
);


const HeaderBar = () => {
  return (
    <div className="flex items-center justify-end space-x-4">
      {/* Search Bar */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          // Lebar bisa disesuaikan, misal "md:w-64"
        />
      </div>

      {/* Notification Icon */}
      <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        <BellIcon />
        {/* Badge Notifikasi (contoh) */}
        <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-1 bg-red-500 rounded-full"></span>
        <span className="sr-only">View notifications</span>
      </button>

      {/* Profile Picture */}
      <div>
        <UserAvatar />
      </div>
    </div>
  );
};

export default HeaderBar;