/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        book: ['Circular-Book', 'Arial', 'sans-serif'],
        medium: ['Circular-Medium', 'Arial', 'sans-serif'],
        bold: ['Circular-Bold', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        book: 400,
        medium: 500,
        bold: 700,
      },
    },
  },
  plugins: [],
};