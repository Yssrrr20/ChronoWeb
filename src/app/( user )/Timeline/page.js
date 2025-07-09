// src/app/(user)/timeline/page.js
import React from 'react';
// Import komponen yang relevan jika ada (misal: NewsCard jika masih dipakai)
// import NewsCard from '@/components/user/NewsCard';

// Data mockNewsTimeline (sesuaikan atau ambil dari API)
const mockNewsTimeline = [
  {
    timeBlock: '10:00',
    articles: [
      { id: 1, category: 'Technology', title: 'Perusahaan Health Tech asal Australia, Brain Eye bersiap meluncurkan teknologi...', description: 'Perusahaan Health Tech asal Australia, Brain Eye bersiap meluncurkan teknologi...', readTime: '5 min read', imageUrl: '/placeholder-tech.jpg' },
      { id: 2, category: 'Business', title: 'Pedagang dagang yang dipicu Presiden Trump disebut Presiden Direktur Krom Bank Indonesia, Anton Hermawan juga akan bertimbas ke sektor...', description: 'Pemerintah Provinsi (Pemprov) DKI Jakarta menetapkan tarif khusus layanan Transjakarta...', readTime: '4 min read', imageUrl: '/placeholder-business.jpg' },
    ]
  },
  {
    timeBlock: '11:00',
    articles: [
      { id: 3, category: 'Environment', title: 'Gubernur Bali Wayan Koster melarang produsen air minum dalam kemasan...', description: 'Gubernur Bali Wayan Koster melarang produsen air minum dalam kemasan...', readTime: '6 min read', imageUrl: '/placeholder-env.jpg' },
      { id: 4, category: 'Sports', title: 'Sebanyak 48 negara dari 6 konfederasi termasuk Timnas Indonesia U-17, terlibat di Piala Dunia U-17 2025 yang berlangsung di Qatar...', description: 'Sebanyak 48 negara dari 6 konfederasi termasuk Timnas Indonesia U-17, terlibat di Piala Dunia U-17 2025 yang berlangsung di Qatar...', readTime: '3 min read', imageUrl: '/placeholder-sports.jpg' },
    ]
  },
  {
    timeBlock: '12:00',
    articles: [
      { id: 5, category: 'Health', title: 'Tingkat keparahan gagal ginjal bisa dilihat dari estimasi laju filtrasi glomerulus...', description: 'Tingkat keparahan gagal ginjal bisa dilihat dari estimasi laju filtrasi glomerulus...', readTime: '5 min read', imageUrl: '/placeholder-health.jpg' },
      { id: 6, category: 'Entertainment', title: 'Jumbo resmi memecahkan rekor. Kali ini, perolehan film animas...', description: 'Jumbo resmi memecahkan rekor. Kali ini, perolehan film animas...', readTime: '4 min read', imageUrl: '/placeholder-entertainment.jpg' },
    ]
  },
];

export default function TimelineUserPage() { // Ganti nama fungsi jika diperlukan
  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Header dengan filter - Mengambil inspirasi dari UI gambar */}
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <select className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none text-sm text-gray-800 dark:text-gray-200">
            <option>All Categories</option>
          </select>
          <select className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none text-sm text-gray-800 dark:text-gray-200">
            <option>June 15, 2023</option>
            <option>Today</option>
          </select>
        </div>
        <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
          <span>Timeline</span>
          <span>List</span>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mt-8">
        Today's Timeline (10:00 - 17:00)
      </h2>

      {mockNewsTimeline.map((block) => (
        <div key={block.timeBlock} className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
            {block.timeBlock}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {block.articles.map((news) => (
              <div key={news.id} className="flex bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transform transition-transform hover:scale-[1.01]">
                <div className="w-1/3 flex-shrink-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs">
                  [Gambar di sini]
                </div>
                <div className="p-4 flex-1">
                  <span className="text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase">{news.category}</span>
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mt-1 mb-2 leading-tight">
                    {news.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                    {news.description}
                  </p>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">{news.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-8">
        <button className="bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}