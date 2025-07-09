import NewsCard from '@/components/user/NewsCard';
import TrendingTimeline from '@/components/user/TrendingTimeline';

const mockNews = [
    { id: 1, category: 'Technology', title: 'Saatnya Pantau Kesehatan Otak Dengan Teknologi AI', description: 'Perusahaan Health Tech asal Australia, Brain Eye bersiap meluncurkan teknologi...', time: '2 hours ago', readTime: '5 min read' },
    { id: 2, category: 'Business', title: 'Tarif Rp1 Transjakarta untuk Wanita Berlaku 21 April', description: 'Pemerintah Provinsi (Pemprov) DKI Jakarta menetapkan tarif khusus layanan Transjakarta...', time: '4 hours ago', readTime: '4 min read' },
    { id: 3, category: 'Science', title: 'Astronot Tertua NASA Kembali ke Bumi: Rayakan', description: 'Astronot tertua NASA yang masih aktif, Don Pettit, ia merayakan usia 70 tahun saat kembali...', time: '6 hours ago', readTime: '6 min read' },
    { id: 4, category: 'Health', title: 'Gejala Gagal Ginjal yang Dikenal Sebagai Silent Disease...', description: 'Tingkat keparahan gagal ginjal bisa dilihat dari estimasi laju filtrasi glomerulus...', time: '8 hours ago', readTime: '4 min read' },
    { id: 5, category: 'Environment', title: 'Air Mineral Kemasan Plastik Dilarang di Bali', description: 'Gubernur Bali Wayan Koster melarang produsen air minum dalam kemasan...', time: '10 hours ago', readTime: '5 min read' },
    { id: 6, category: 'Innovation', title: 'AQUA Bawa Inovasi Galon Guna Ulang Berbahan Ramah Lingkungan', description: 'AQUA menghadirkan produk AMDK Galon Guna Ulang berbahan polycarbonate...', time: '12 hours ago', readTime: '4 min read' },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <TrendingTimeline />
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 focus:outline-none text-sm">
            <option>All Categories</option>
          </select>
          <select className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 focus:outline-none text-sm">
            <option>Today</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockNews.map((news) => (
          <NewsCard key={news.id} {...news} />
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}