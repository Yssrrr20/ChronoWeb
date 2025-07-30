// src/lib/backend/services/guardianNewsService.js

const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY;
const BASE_URL = 'https://content.guardianapis.com/';

class GuardianNewsService {
  static async fetchArticles(options = {}) {
    if (!GUARDIAN_API_KEY) {
      console.error('Guardian API Key is not configured in environment variables!');
      throw new Error('Guardian API Key is missing or invalid.');
    }

    const params = new URLSearchParams({
      'api-key': GUARDIAN_API_KEY,
      'show-fields': 'trailText,thumbnail,body',
      'page-size': options.pageSize || 10,
      'order-by': options.orderBy || 'newest',
      'show-tags': 'contributor',
      ...options.additionalParams,
    });

    if (options.query && options.query.trim() !== '') {
      params.append('q', options.query.trim());
    }

    if (options.section && options.section.trim() !== '' && options.section.toLowerCase() !== 'all') {
      params.append('section', options.section.trim().toLowerCase());
    }
    
    if (options.fromDate) {
      params.append('from-date', options.fromDate);
    }
    if (options.toDate) {
      params.append('to-date', options.toDate);
    }

    const url = `${BASE_URL}search?${params.toString()}`;
    console.log('Fetching Guardian URL:', url); 

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok || data.response.status !== 'ok') {
        console.error('Error from Guardian API:', data.response.message || JSON.stringify(data.response) || 'Unknown error');
        throw new Error(data.response.message || 'Failed to fetch articles from Guardian API');
      }

      const formattedArticles = data.response.results.map(article => ({
        id: article.id,
        category: article.sectionName,
        title: article.webTitle,
        description: article.fields?.trailText || '',
        url: article.webUrl,
        imageUrl: article.fields?.thumbnail || '/placeholder-news-image.jpg',
        fullContent: article.fields?.body || '',
        publishedAt: article.webPublicationDate,
        author: article.tags?.[0]?.webTitle || 'Unknown Author',
        readTime: `${Math.ceil((article.fields?.body?.length || 0) / 1500) || 5} min read`
      }));

      return formattedArticles;

    } catch (error) {
      console.error('Network or Guardian API call error:', error);
      console.error('Full Error Object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
      throw new Error('Could not fetch articles from Guardian API.');
    }
  }

  static async fetchArticleById(articleId) {
    if (!GUARDIAN_API_KEY) {
      console.error('Guardian API Key is not configured!');
      throw new Error('Guardian API Key is missing or invalid.');
    }

    const params = new URLSearchParams({
      'api-key': GUARDIAN_API_KEY,
      'show-fields': 'body,trailText,thumbnail',
    });

    const url = `${BASE_URL}${articleId}?${params.toString()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok || data.response.status !== 'ok') {
        console.error('Error from Guardian API (single article):', data.response.message || 'Unknown error');
        throw new Error(data.response.message || 'Failed to fetch single article from Guardian API');
      }

      const article = data.response.content;

      if (!article) {
        throw new Error('Article not found or content missing.');
      }

      return {
        id: article.id,
        category: article.sectionName,
        title: article.webTitle,
        description: article.fields?.trailText || '',
        url: article.webUrl,
        imageUrl: article.fields?.thumbnail || '/placeholder-news-image.jpg',
        fullContent: article.fields?.body || '',
        publishedAt: article.webPublicationDate,
        author: article.tags?.[0]?.webTitle || 'Unknown Author',
        readTime: `${Math.ceil((article.fields?.body?.length || 0) / 1500) || 5} min read`
      };

    } catch (error) {
      console.error('Network or Guardian API call error (single article):', error);
      throw new Error('Could not fetch single article from Guardian API.');
    }
  }
}

export default GuardianNewsService;