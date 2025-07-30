// src/app/(user)/bookmarks/page.jsx
'use client'; 

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import NewsCard from '@/components/user/NewsCard'; 

export default function BookmarksPage() {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState(new Set());

  // Fungsi untuk mengambil daftar bookmark dari backend
  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('No authentication token found. Please log in.');
      setLoading(false);
      router.push('/auth/login');
      return;
    }

    try {
      const response = await fetch('/api/bookmarks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBookmarkedArticles(data.bookmarks); 
        const ids = new Set(data.bookmarks.map(b => b.id));
        setBookmarkedArticleIds(ids);
        console.log('Fetched bookmarks:', data.bookmarks);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch bookmarks.');
        console.error('Failed to fetch bookmarks:', errorData);
        if (response.status === 401) {
            localStorage.removeItem('authToken');
            router.push('/auth/login');
        }
      }
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      setError('An unexpected error occurred while fetching bookmarks.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Fungsi untuk toggle bookmark (mirip dengan di dashboard)
  const handleBookmarkToggle = useCallback(async (articleData, isCurrentlyBookmarked) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You need to be logged in to bookmark articles.');
      router.push('/auth/login');
      return;
    }

    try {
      let response;
      if (isCurrentlyBookmarked) {
        response = await fetch('/api/bookmarks', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ articleId: articleData.id }),
        });
      } else {
        response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ article: articleData }),
        });
      }

      if (response.ok) {
        // Perbarui state bookmark di frontend
        setBookmarkedArticleIds(prevIds => {
          const newIds = new Set(prevIds);
          if (isCurrentlyBookmarked) {
            newIds.delete(articleData.id);
          } else {
            newIds.add(articleData.id);
          }
          return newIds;
        });
        fetchBookmarks(); 
        console.log(`Bookmark ${isCurrentlyBookmarked ? 'removed' : 'added'} successfully.`);
      } else {
        const errorData = await response.json();
        alert(`Failed to ${isCurrentlyBookmarked ? 'remove' : 'add'} bookmark: ${errorData.message}`);
        console.error(`Failed to ${isCurrentlyBookmarked ? 'remove' : 'add'} bookmark:`, errorData);
      }
    } catch (error) {
      alert('An unexpected error occurred during bookmark operation.');
      console.error('Bookmark operation error:', error);
    }
  }, [router, fetchBookmarks]); 

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  if (loading) return <div className="text-center dark:text-gray-300 p-8">Loading bookmarks...</div>;
  if (error) return <div className="text-center text-red-500 dark:text-red-400 p-8">Error: {error}</div>;

  return (
    <div className="space-y-6 p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Header Halaman Bookmarks dengan Pencarian dan Filter */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Bookmarks</h1>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookmarks"
              className="pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-800 dark:text-gray-200"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {/* Filter Most Recent */}
          <select className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none text-sm text-gray-800 dark:text-gray-200">
            <option>Most Recent</option>
            <option>Oldest</option>
            <option>Category</option>
          </select>
          {/* Icon Grid/List View (opsional) */}
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
             <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid Berita yang Di bookmark */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarkedArticles.length > 0 ? (
          bookmarkedArticles.map((article) => (
            <NewsCard
              key={article.id}
              id={article.id}
              category={article.category}
              title={article.title}
              description={article.description}
              imageUrl={article.imageUrl}
              time={article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'N/A'}
              readTime={article.readTime}
              externalUrl={article.url}
              isBookmarked={bookmarkedArticleIds.has(article.id)} 
              onBookmarkToggle={handleBookmarkToggle} 
              author={article.author}
            />
          ))
        ) : (
          <div className="text-center col-span-full dark:text-gray-400">
            No articles bookmarked yet.
            <p className="mt-2 text-sm">Bookmark articles from the dashboard to see them here!</p>
          </div>
        )}
      </div>

      {/* Tombol Load More (opsional) */}
      <div className="text-center mt-8">
        <button className="bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}