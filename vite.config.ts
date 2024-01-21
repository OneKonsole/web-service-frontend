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
            '@config': path.resolve(__dirname, './src/config'),
            '@context': path.resolve(__dirname, './src/context'),
            "@provider": path.resolve(__dirname, './src/provider'),
            '@resources': path.resolve(__dirname, './src/resources'),
            '@worker': path.resolve(__dirname, './src/worker'),
        },
    },
    server: {
        proxy: {
            '/realms/test-sso/protocol/openid-connect': {
                target: 'http://127.0.0.1:1238',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/realms\/test-sso\/protocol\/openid-connect/, ''),
            },
            '/users/': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/users\//, ''),
            },
            '/logout': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/logout\//, ''),
            },
            '/prometheus-api/': {
                target: 'http://mimir.onekonsole.emetral.fr',
                changeOrigin: true,
                secure: false,
                ssl: false,
                rewrite: (path) => path.replace(/^\/prometheus-api\//, ''),
                protocolRewrite: 'http',
                followRedirects: true,
            },
        },
    }
})