'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import NewsCard from '@/components/user/NewsCard';
import TrendingTimeline from '@/components/user/TrendingTimeline';
import { useSearch } from '@/context/SearchContext'; 

export default function HomePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  const [newsArticles, setNewsArticles] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true); 
  const [errorNews, setErrorNews] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTime, setSelectedTime] = useState('today');

  // State untuk bookmark
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState(new Set()); 

  const { searchQuery, triggerSearch } = useSearch(); 

  const router = useRouter();

  // Fungsi untuk mengambil profil user
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoadingUser(true);
      setErrorUser(null);
      const token = localStorage.getItem('authToken');

      if (!token) {
        setErrorUser('No authentication token found. Please log in.');
        setLoadingUser(false);
        router.push('/auth/login');
        return;
      }

      try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserProfile(data.user);
          fetchUserBookmarks(token); 
        } else {
          const errorData = await response.json();
          setErrorUser(errorData.message || 'Failed to fetch user profile.');
          if (response.status === 401) {
              localStorage.removeItem('authToken');
              router.push('/auth/login');
          }
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setErrorUser('An unexpected error occurred while fetching profile.');
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  // Fungsi baru: Mengambil daftar bookmark user
  const fetchUserBookmarks = useCallback(async (token) => {
    try {
      const response = await fetch('/api/bookmarks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const ids = new Set(data.bookmarks.map(b => b.id)); 
        setBookmarkedArticleIds(ids);
        console.log('Fetched bookmarks for user:', data.bookmarks);
      } else {
        console.error('Failed to fetch bookmarks:', await response.json());
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  }, []);

  // Fungsi untuk toggle bookmark
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
        console.log('Executing DELETE branch: Requesting to REMOVE bookmark.');
        response = await fetch('/api/bookmarks', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ articleId: articleData.id }),
        });
      } else { 
        console.log('Executing POST branch: Requesting to ADD bookmark.');
        const finalArticleData = {
          ...articleData,
          author: articleData.author || 'Unknown Author',
          publishedAt: articleData.publishedAt 
        };
        console.log('Article data sent for POST:', finalArticleData);
        
        response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ article: finalArticleData }),
        });
      }

      if (response.ok) {
        const data = await response.json();
        setBookmarkedArticleIds(prevIds => {
          const newIds = new Set(prevIds);
          if (isCurrentlyBookmarked) { 
            newIds.delete(articleData.id);
          } else { 
            newIds.add(articleData.id);
          }
          return newIds;
        });
        console.log(`Bookmark ${isCurrentlyBookmarked ? 'removed' : 'added'} successfully:`, data);
      } else {
        const errorData = await response.json();
        alert(`Failed to ${isCurrentlyBookmarked ? 'remove' : 'add'} bookmark: ${errorData.message}`);
        console.error(`Failed to ${isCurrentlyBookmarked ? 'remove' : 'add'} bookmark:`, errorData);
      }
    } catch (error) {
      alert('An unexpected error occurred during bookmark operation.');
      console.error('Bookmark operation error:', error);
    }
  }, [router]); 

  // Fungsi untuk mengambil berita dari The Guardian API
  const fetchNewsArticles = useCallback(async () => {
    console.log('fetchNewsArticles called. Setting loadingNews to TRUE.');
    setLoadingNews(true);
    setErrorNews(null);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
          params.append('section', selectedCategory);
      }
      params.append('order-by', 'newest');
      params.append('pageSize', '3'); // Jumlah artikel di dashboard

      if (searchQuery.trim() !== '') {
        params.append('q', searchQuery.trim());
      }

      console.log('Fetching news with params:', params.toString());
      const response = await fetch(`/api/articles?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setNewsArticles(data.articles);
        console.log('API call successful. Articles received:', data.articles);
        if (data.articles.length === 0) {
            console.log('No articles found for the current query.');
        }
      } else {
        const errorData = await response.json();
        setErrorNews(errorData.message || 'Failed to fetch news articles.');
        console.error('Failed to fetch news articles:', errorData);
      }
    } catch (err) {
      console.error('Error fetching news articles:', err);
      setErrorNews('An unexpected error occurred while fetching news articles.');
    } finally {
      setLoadingNews(false);
    }
  }, [selectedCategory, selectedTime, searchQuery]); 

  // useEffect untuk memicu fetchNewsArticles
  useEffect(() => {
    console.log('useEffect for news triggered.');
    fetchNewsArticles();
  }, [fetchNewsArticles, triggerSearch]); 

  // Handler untuk perubahan filter kategori
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handler untuk perubahan filter waktu
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  // Kondisi loading/error utama
  if (loadingUser || loadingNews) {
    console.log('Displaying loading state...');
    return <div className="text-center dark:text-gray-300 p-8">Loading...</div>;
  }
  if (errorUser || errorNews) {
    console.log('Displaying error state...');
    return <div className="text-center text-red-500 dark:text-red-400 p-8">Error: {errorUser || errorNews}</div>;
  }
  if (!userProfile) {
    console.log('Displaying no profile data state...');
    return <div className="text-center dark:text-gray-300 p-8">No profile data.</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {userProfile && (
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg mb-6">
          <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            Welcome, {userProfile.full_name || userProfile.username}!
          </h1>
        </div>
      )}

      <TrendingTimeline />
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <select
            className="px-4 py-2 border rounded-md focus:outline-none text-sm
                       bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="science">Science</option>
            <option value="world">World News</option>
            <option value="sport">Sport</option>
            <option value="culture">Culture</option>
            <option value="environment">Environment</option>
            <option value="politics">Politics</option>
          </select>
          <select
            className="px-4 py-2 border rounded-md focus:outline-none text-sm
                       bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white"
            value={selectedTime}
            onChange={handleTimeChange}
          >
            <option value="today">Today</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsArticles.length > 0 ? (
          newsArticles.map((news) => (
            <NewsCard key={news.id}
                      id={news.id} // ID artikel dari Guardian API
                      category={news.category}
                      title={news.title}
                      description={news.description}
                      imageUrl={news.imageUrl}
                      time={news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : 'N/A'} 
                      readTime={news.readTime}
                      externalUrl={news.url}
                      isBookmarked={bookmarkedArticleIds.has(news.id)} 
                      onBookmarkToggle={handleBookmarkToggle} 
                      author={news.author} 
                      articlePublishedAtRaw={news.publishedAt} 
            />
          ))
        ) : (
          <div className="text-center col-span-full dark:text-gray-400">No articles found.</div>
        )}
      </div>

      <div className="text-center mt-8">
        <button className="bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}