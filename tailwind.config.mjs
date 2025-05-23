/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class', // <-- PASTIKAN ATAU TAMBAHKAN BARIS INI DI DALAM OBJEK config
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Misalnya, jika ada ekstensi tema default dari create-next-app:
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config; // <-- Perhatikan menggunakan 'export default'