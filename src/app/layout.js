// src/app/layout.js
import './globals.css'; // Impor CSS global (termasuk Tailwind)
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar'; // <-- Mengimpor Sidebar menggunakan alias path '@/'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ChronoNews Admin', // Anda bisa sesuaikan judulnya
  description: 'Admin Dashboard untuk ChronoNews',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex bg-gray-50 dark:bg-gray-900`}> {/* 'flex' untuk layout sidebar-konten */}
        <Sidebar /> {/* <-- Komponen Sidebar kita tampilkan di sini */}
        <main className="flex-1 p-6 overflow-y-auto"> {/* Konten utama halaman */}
          {children} {/* 'children' adalah konten dari page.js */}
        </main>
      </body>
    </html>
  );
}