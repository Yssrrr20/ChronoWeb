// src/app/(user)/bookmarks/page.js
import React from 'react';
import NewsCard from '@/components/user/NewsCard'; // Pastikan path ini benar

// Data mock untuk berita yang di-bookmark
const mockBookmarkedNews = [
    { id: 1, category: 'Technology', title: 'Saatnya Pantau Kesehatan Otak Dengan Teknologi AI', description: 'Perusahaan Health Tech asal Australia, Brain Eye bersiap meluncurkan teknologi...', readTime: '8 min read', imageUrl: '/placeholder-ai.jpg' },
    { id: 2, category: 'Business', title: 'Tarif Rp1 Transjakarta untuk Wanita Berlaku 21 April', description: 'Pemerintah Provinsi (Pemprov) DKI Jakarta menetapkan tarif khusus layanan Transjakarta...', readTime: '6 min read', imageUrl: '/placeholder-transjakarta.jpg' },
    { id: 3, category: 'Science', title: 'Astronot Tertua NASA Kembali ke Bumi: Rayakan', description: 'Astronot tertua NASA yang masih aktif, Don Pettit, ia merayakan usia 70 tahun saat kembali...', readTime: '10 min read', imageUrl: '/placeholder-nasa.jpg' },
    { id: 4, category: 'Environment', title: 'Air Mineral Kemasan Plastik Dilarang di Bali', description: 'Gubernur Bali Wayan Koster melarang produsen air minum dalam kemasan...', readTime: '7 min read', imageUrl: '/placeholder-bottle.jpg' },
    { id: 5, category: 'Health', title: 'Gejala Gagal Ginjal yang Dikenal Sebagai Silent Disease', description: 'Tingkat keparahan gagal ginjal bisa dilihat dari estimasi laju filtrasi glomerulus...', readTime: '5 min read', imageUrl: '/placeholder-kidney.jpg' },
    { id: 6, category: 'Culture', title: '"Digital Art" menggunakan...', description: 'Informasi detail tentang bagaimana seni digital digunakan dalam berbagai aplikasi.', readTime: '9 min read', imageUrl: '/placeholder-digital-art.jpg' },
    // Tambahkan lebih banyak data mock jika diperlukan
];

export default function BookmarksPage() {
  return (
    <div className="space-y-6">
      {/* Header Halaman Bookmarks dengan Pencarian dan Filter */}
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
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
          {/* Icon Grid/List View (opsional, seperti di UI) */}
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
             <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid Berita yang Di-bookmark */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBookmarkedNews.map((news) => (
          // Anda perlu memastikan komponen NewsCard Anda dapat menerima 'imageUrl'
          // dan memiliki logika untuk menampilkan ikon bookmark (mungkin sebagai tombol)
          <NewsCard
            key={news.id}
            category={news.category}
            title={news.title}
            // description={news.description} // Deskripsi tidak terlihat di UI ini, jadi bisa diabaikan atau disembunyikan
            readTime={news.readTime}
            imageUrl={news.imageUrl}
            isBookmarked={true} // Karena ini halaman bookmark, diasumsikan selalu di-bookmark
            showBookmarkButton={true} // Tampilkan tombol bookmark/unbookmark
          />
        ))}
      </div>

      {/* Tombol Load More (opsional, jika Anda ingin memuat lebih banyak bookmark) */}
      <div className="text-center mt-8">
        <button className="bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}