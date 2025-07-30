// src/components/user/TrendingTimeline.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TrendingTimeline() {
  const timePoints = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [loadingTimeline, setLoadingTimeline] = useState(true);
  const [errorTimeline, setErrorTimeline] = useState(null);

  useEffect(() => {
    const fetchTrendingNews = async () => {
      setLoadingTimeline(true);
      setErrorTimeline(null);
      try {
        const response = await fetch(`/api/articles?order-by=newest&pageSize=${timePoints.length}&q=news`);
        const data = await response.json();

        if (response.ok) {
          setTrendingArticles(data.articles);
          console.log("Fetched trending articles for timeline:", data.articles);
        } else {
          setErrorTimeline(data.message || 'Failed to fetch trending articles.');
        }
      } catch (err) {
        console.error("Error fetching trending articles:", err);
        setErrorTimeline('An unexpected error occurred while fetching trending articles.');
      } finally {
        setLoadingTimeline(false);
      }
    };

    fetchTrendingNews();
  }, []);

  if (loadingTimeline) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 text-center text-gray-500 dark:text-gray-400">
        Loading Trending Timeline...
      </div>
    );
  }

  if (errorTimeline) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 text-center text-red-500 dark:text-red-400">
        Error loading Trending Timeline: {errorTimeline}
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700">
      <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
        Trending Timeline
      </h2>
      <div className="relative h-28 flex items-start"> 
        {/* Garis Timeline */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-600 transform -translate-y-1/2"></div>
        
        <div className="relative flex justify-between w-full">
          {timePoints.map((time, index) => (
            <div key={time} className="flex flex-col items-center flex-1 px-1"> 
              <div className="w-3 h-3 bg-blue-500 rounded-full z-10 border-2 border-white dark:border-gray-800"></div>
              <span className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{time}</span>
              
              {/* Tampilkan judul artikel */}
              {trendingArticles[index] && (
                <Link
                  href={trendingArticles[index].url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 // <-- Kelas yang ada
                             line-clamp-2 leading-tight" 
                  title={trendingArticles[index].title} 
                >
                  {trendingArticles[index].title}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}