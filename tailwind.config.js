/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'blue': '#0066FF',
      'blue-light': '#1B76FF',
      'red': '#DF0707',
      'orange': '#FFA927',
      'green': '#1BC62C',
      'gray-dark': '2D2D2D',
      'gray': '#DADADA',
      'white': '#FFFFFF',
    },
    extend: {},
  },
  plugins: [],
}
