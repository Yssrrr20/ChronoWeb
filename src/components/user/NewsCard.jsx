const BookmarkIcon = () => ( <svg className="h-5 w-5 text-gray-500 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg> );
const ShareIcon = () => ( <svg className="h-5 w-5 text-gray-500 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12" /></svg> );

export default function NewsCard({ category, title, description, time, readTime }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Placeholder untuk Gambar */}
      <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-gray-400 dark:text-gray-500 text-sm">Image Placeholder</span>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{category}</p>
          <div className="flex space-x-3">
            <button><BookmarkIcon /></button>
            <button><ShareIcon /></button>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 flex-grow">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-auto">
          <span>{time}</span>
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
}