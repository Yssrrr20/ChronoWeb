// src/components/NavItem.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Placeholder ikon sederhana
const IconPlaceholder = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const NavItem = ({ icon, text, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  const activeClasses = isActive
    ? 'bg-blue-100 text-blue-700' // Warna saat aktif
    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'; // Warna default dan hover

  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-md group ${activeClasses}`}
    >
      {icon ? React.cloneElement(icon, { className: `mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}` }) : <IconPlaceholder className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`} />}
      <span>{text}</span>
    </Link>
  );
};

export default NavItem;