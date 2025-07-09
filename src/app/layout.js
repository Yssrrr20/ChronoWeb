// src/app/layout.js
import './globals.css'; //
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] }); //

export const metadata = {
  title: 'ChronoNews', // Judul diubah agar lebih general
  description: 'Welcome to ChronoNews',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Kelas 'flex' dihapus dari body agar tidak mengganggu layout per bagian */}
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        {children} {/* Hanya me-render children tanpa komponen layout tambahan */}
      </body>
    </html>
  );
}