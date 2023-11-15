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
            'blue-light-light': '#88B0FA',
            'red': '#DF0707',
            'orange': '#FFA927',
            'green': '#1BC62C',
            'white': '#FFFFFF',
            'gray': '#DADADA',
            'light-gray': '#F8F8F8',
            'gray-light-dark': '#CBCBCB',
            'gray-dark': '#2D2D2D',
            'black-full': '#000000',
        },
        extend: {},
    },
    plugins: [],
}
