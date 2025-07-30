// src/app/(user)/timeline/page.jsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import NewsCard from '@/components/user/NewsCard';

// Waktu-waktu yang akan ditampilkan di timeline UI (24 jam)
const timePointsDisplay = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
];

export default function TimelinePage() {
  const [timelineArticles, setTimelineArticles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchTimelineArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('No authentication token found. Please log in.');
      setLoading(false);
      router.push('/auth/login');
      return;
    }

    const today = new Date();
    // Dapatkan tanggal 7 hari yang lalu untuk filter yang lebih longgar
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7); // Mundur 7 hari

    const formatToYYYYMMDD = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const formattedFromDate = formatToYYYYMMDD(sevenDaysAgo);
    const formattedToDate = formatToYYYYMMDD(today);

    try {
      // Panggil API articles dengan filter tanggal yang diperluas dan page-size lebih besar
      const response = await fetch(`/api/articles?order-by=newest&page-size=100&from-date=${formattedFromDate}&to-date=${formattedToDate}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        const articlesByTime = {};
        data.articles.forEach(article => {
          const publishedDate = new Date(article.publishedAt);
          // Menggunakan getHours() untuk mendapatkan jam lokal
          const hour = publishedDate.getHours();
          const timeBlockKey = `${String(hour).padStart(2, '0')}:00`;

          // Pastikan hanya waktu yang ada di timePointsDisplay yang dipertimbangkan
          if (timePointsDisplay.includes(timeBlockKey)) {
            if (!articlesByTime[timeBlockKey]) {
              articlesByTime[timeBlockKey] = [];
            }
            articlesByTime[timeBlockKey].push(article);
          }
        });

        const orderedTimeBlocks = {};
        timePointsDisplay.forEach(key => { // Iterasi melalui timePointsDisplay untuk memastikan urutan
            orderedTimeBlocks[key] = articlesByTime[key] ? articlesByTime[key].slice(0, 2) : []; // Ambil maks 2 artikel per jam
        });

        setTimelineArticles(orderedTimeBlocks);
        console.log('Timeline articles fetched and grouped:', orderedTimeBlocks);

      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch timeline articles.');
        if (response.status === 401) {
            localStorage.removeItem('authToken');
            router.push('/auth/login');
        }
      }
    } catch (err) {
      console.error('Error fetching timeline articles:', err);
      setError('An unexpected error occurred while fetching timeline articles.');
    } finally {
      setLoading(false);
    }
  }, [router]); // timePointsDisplay dihapus dari dependencies useCallback karena sudah di luar scope

  useEffect(() => {
    fetchTimelineArticles();
  }, [fetchTimelineArticles]);

  if (loading) return <div className="text-center dark:text-gray-300 p-8">Loading timeline...</div>;
  if (error) return <div className="text-center text-red-500 dark:text-red-400 p-8">Error: {error}</div>;

  return (
    <div className="space-y-6 p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Header Halaman Timeline */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Today's Timeline</h2>
        {/* Filter (opsional, bisa ditambahkan nanti) */}
        <div className="flex items-center space-x-4">
          <select className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none text-sm text-gray-800 dark:text-gray-200">
            <option>All Categories</option>
          </select>
          <select className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none text-sm text-gray-800 dark:text-gray-200">
            <option>June 15, 2023</option> {/* Placeholder tanggal */}
            <option>Today</option>
          </select>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <span>Timeline</span>
            <span>List</span>
          </div>
        </div>
      </div>

      {/* Konten Timeline per blok waktu */}
      {Object.keys(timelineArticles).length > 0 ? (
        timePointsDisplay.map(timeBlock => ( // Iterasi melalui timePointsDisplay untuk urutan yang benar
          <div key={timeBlock} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
              {timeBlock}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {timelineArticles[timeBlock] && timelineArticles[timeBlock].length > 0 ? (
                timelineArticles[timeBlock].map((article, idx) => (
                  <NewsCard
                    key={article.id + '-' + idx} // Key unik
                    category={article.category}
                    title={article.title}
                    description={article.description}
                    imageUrl={article.imageUrl}
                    time={article.publishedAt ? new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'} // Tampilkan waktu saja
                    readTime={article.readTime}
                    externalUrl={article.url}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                  No articles for {timeBlock}.
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No timeline articles found for today's selected time blocks.
          <p className="text-sm mt-2">Try adjusting the date range or checking Guardian API for recent publications.</p>
        </div>
      )}

      <div className="text-center mt-8">
        <button className="bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}