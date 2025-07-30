// src/app/(user)/articles/[id]/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; 

export default function ArticleDetailPage() {
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArticleDetails = async () => {
      if (!id) return; // Pastikan ID ada

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
        // Panggil API detail artikel
        const response = await fetch(`/api/articles/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setArticle(data.article);
          console.log('Fetched article details:', data.article);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch article details.');
          console.error('Failed to fetch article details:', errorData);
          if (response.status === 401) {
              localStorage.removeItem('authToken');
              router.push('/auth/login');
          }
        }
      } catch (err) {
        console.error('Error fetching article details:', err);
        setError('An unexpected error occurred while fetching article details.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [id, router]); 

  if (loading) return <div className="text-center dark:text-gray-300 p-8">Loading article...</div>;
  if (error) return <div className="text-center text-red-500 dark:text-red-400 p-8">Error: {error}</div>;
  if (!article) return <div className="text-center dark:text-gray-300 p-8">Article not found.</div>;

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {article.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
        By {article.author} | {new Date(article.publishedAt).toLocaleString()} | {article.readTime}
      </p>
      <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase mb-4">{article.category}</p>

      {article.imageUrl && (
        <div className="mb-6 rounded-lg overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={800} 
            height={450} 
            layout="responsive" 
            objectFit="cover"
            className="w-full h-auto"
          />
        </div>
      )}

      <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
        {article.description} 
      </p>

      {/* Menampilkan konten penuh artikel (body HTML) */}
      <div
        className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200" 
        dangerouslySetInnerHTML={{ __html: article.fullContent }} 
      />

      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-semibold flex items-center"
        >
          Read full article on {article.source?.name || 'The Guardian'}
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </div>
    </div>
  );
}