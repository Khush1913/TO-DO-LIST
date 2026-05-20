/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        glass: {
          light: 'rgba(255, 255, 255, 0.7)',
          dark: 'rgba(30, 41, 59, 0.7)',
          border: 'rgba(255, 255, 255, 0.2)',
          darkBorder: 'rgba(255, 255, 255, 0.1)'
        }
      },
      boxShadow: {
        'soft': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
}
