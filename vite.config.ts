import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import path from 'path';


export default defineConfig({
    plugins: [
        react(),
        Pages({
            dirs: ['src/pages'],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@requests': path.resolve(__dirname, './src/requests'),
            '@ressources': path.resolve(__dirname, './src/ressources'),
        },
    },
})