// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import { SearchProvider } from '@/context/SearchContext'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ChronoNews',
  description: 'Welcome to ChronoNews',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <SearchProvider>
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}