// src/components/user/NewsCard.jsx
import Link from 'next/link';

const BookmarkIconFilled = () => ( <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg> );
const BookmarkIconOutline = () => ( <svg className="h-5 w-5 text-gray-500 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg> );
const ShareIcon = () => ( <svg className="h-5 w-5 text-gray-500 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12" /></svg> );

export default function NewsCard({ 
  id, 
  category, 
  title, 
  description, 
  time, 
  readTime, 
  imageUrl, 
  externalUrl,
  isBookmarked,
  onBookmarkToggle,
  author,
  articlePublishedAtRaw
}) {
  const articleHref = externalUrl;

  const articleDataForBookmark = {
    id: id,
    title: title,
    description: description,
    url: externalUrl,
    imageUrl: imageUrl,
    category: category,
    publishedAt: articlePublishedAtRaw,
    readTime: readTime,
    author: author || 'Unknown Author',
  };

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Bookmark button clicked for article ID:', articleDataForBookmark.id, 'Frontend isBookmarked status (from prop):', isBookmarked);
    if (onBookmarkToggle) {
      onBookmarkToggle(articleDataForBookmark, isBookmarked);
    }
  };

  const recordReadingHistory = async (article) => {
    console.log('--- recordReadingHistory STARTED ---'); 
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('Cannot record reading history: User not logged in (no token found).'); 
      console.log('--- recordReadingHistory ENDED (no token) ---'); 
      return;
    }
    console.log('Token found. Attempting to send POST to /api/reading-history for ID:', article.id); 
    try {
      const response = await fetch('/api/reading-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ article }),
      });
      if (!response.ok) {
        console.error('Failed to record reading history:', await response.json());
      } else {
        console.log('Reading history recorded successfully for:', article.id);
      }
    } catch (error) {
      console.error('Error recording reading history (during fetch or processing):', error); 
    } finally {
      console.log('--- recordReadingHistory FINISHED ---'); 
    }
  };

  const handleArticleClick = (e) => {
    console.log('Article link clicked for ID:', articleDataForBookmark.id); 
    recordReadingHistory(articleDataForBookmark);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col transform transition-transform hover:scale-[1.02]">
      <Link 
        href={articleHref || '#'}
        target="_blank" 
        rel="noopener noreferrer" 
        className="block" 
        onClick={handleArticleClick} 
      >
        <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
          ) : (
            <span className="text-gray-400 dark:text-gray-500 text-sm">Image Placeholder</span>
          )}
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{category}</p>
          <div className="flex space-x-3">
            <button onClick={handleBookmarkClick} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              {isBookmarked ? <BookmarkIconFilled /> : <BookmarkIconOutline />}
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><ShareIcon /></button>
          </div>
        </div>
        
        <Link 
          href={articleHref || '#'}
          target="_blank" 
          rel="noopener noreferrer" 
          className="block"
          onClick={handleArticleClick} 
        >
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 flex-grow hover:text-blue-600 transition-colors">{title}</h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-auto">
          <span>{time}</span>
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
}