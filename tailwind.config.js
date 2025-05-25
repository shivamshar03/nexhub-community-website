/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#5686F5',
          DEFAULT: '#3563E9',
          dark: '#1E3A8A',
        },
        secondary: {
          light: '#818CF8',
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}; 