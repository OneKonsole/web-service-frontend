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
            'blue-light-light+': '#A2D4FF',
            'red': '#DF0707',
            'red-light': '#FFDADA',
            'yellow': '#FFD927',
            'yellow-light': '#FDF5DA',
            'orange': '#FFA927',
            'green': '#1BC62C',
            'green-light': '#E1F7E1',
            'white': '#FFFFFF',
            'gray': '#DADADA',
            'gray-light': '#F8F8F8',
            'gray-light-dark': '#CBCBCB',
            'gray-dark': '#2D2D2D',
            'black-full': '#000000',
        },
        extend: {},
    },
    plugins: [],
}
