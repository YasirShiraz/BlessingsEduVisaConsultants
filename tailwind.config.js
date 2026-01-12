/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#002147',
          light: '#003366',
          dark: '#001a35',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#e0c061',
          dark: '#b8922e',
        },
        brandgreen: {
          DEFAULT: '#1B5E20', // Forest Green
          light: '#2E7D32',
          dark: '#1B5E20',
        },
        lightgray: '#F5F5F5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
