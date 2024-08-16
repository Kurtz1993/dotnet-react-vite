import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { generateCerts } from './aspnetcore-certs';

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        react({}),
        checker({ typescript: true, overlay: true }),
        svgr(),
    ],
    server: {
        port: 3000,
        strictPort: true,
        https: generateCerts(),
        proxy: {
            // proxy API requests to the ASP.NET backend
            '/api': {
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
                // target taken from src/setupProxy.js in ASP.NET React template
                target: process.env.ASPNETCORE_HTTPS_PORT
                    ? `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}`
                    : process.env.ASPNETCORE_URLS
                        ? process.env.ASPNETCORE_URLS.split(';')[0]
                        : 'http://localhost:40457',
            },
        },
    },
});
