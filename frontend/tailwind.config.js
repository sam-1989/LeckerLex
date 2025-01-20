/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // enable dark mode with a class
  theme: {
    extend: {
      fontFamily: {
        book: ["Circular-Book", "Arial", "sans-serif"],
        medium: ["Circular-Medium", "Arial", "sans-serif"],
        bold: ["Circular-Bold", "Arial", "sans-serif"],
      },
      fontWeight: {
        book: 300,
        medium: 500,
        bold: 700,
      },
      colors: {
        primary: "#08AF5F",
        secondary: " ",
      },
      placeholderColor: {
        black: "#333",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
