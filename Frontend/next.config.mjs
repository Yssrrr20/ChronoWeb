/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    // Tambahkan hostname Cloudinary di sini
    remotePatterns: [
      {
        protocol: 'https', // Protokolnya biasanya https
        hostname: 'res.cloudinary.com', // Ini adalah hostname dari URL gambar Cloudinary Anda
        port: '', // Biarkan kosong jika tidak ada port spesifik
        pathname: '/dkchjb0st/image/upload/**', // Sesuaikan dengan pathname bucket/folder Anda
                                             // '/dkchjb0st/image/upload/**' berarti semua path di bawah itu
      },
    ],
  },

};

export default nextConfig;
