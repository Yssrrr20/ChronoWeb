// src/components/Sidebar.jsx
'use client';

import React from 'react';
import NavItem from './NavItem'; 
import Link from 'next/link';

// Placeholder ikon 
const PlaceholderIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);
const NewsIcon = PlaceholderIcon;
const UserIcon = PlaceholderIcon;
const ReportsIcon = PlaceholderIcon;
const SettingsIcon = PlaceholderIcon;

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <PlaceholderIcon /> },
    { name: 'News Management', href: '/admin/news-management', icon: <NewsIcon /> },
    { name: 'User Management', href: '/admin/user-management', icon: <UserIcon /> },
    { name: 'Reports & Statistics', href: '/admin/reports-statistics', icon: <ReportsIcon /> },
    { name: 'Settings', href: '/admin/settings', icon: <SettingsIcon /> },
  ];

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-700">
      <div className="px-2 mb-10">
        <Link href="/admin/dashboard" className="text-2xl font-bold text-gray-800 dark:text-white">
          ChronoNews
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavItem
                href={item.href}
                icon={item.icon}
                text={item.name}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;