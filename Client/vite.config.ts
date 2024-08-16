import react from '@vitejs/plugin-react';
import { cpus } from 'os';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { generateCerts } from './aspnetcore-certs';

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            tsconfigPaths(),
            react({}),
            checker({ typescript: true, overlay: true }),
            svgr(),
        ],
        build: {
            outDir: './build',
            sourcemap: mode === 'development' || 'hidden',
            //? See https://github.com/vitejs/vite/issues/2433#issuecomment-1482851550 for more information
            rollupOptions: {
                maxParallelFileOps: Math.max(1, cpus().length - 1),
                output: {
                    manualChunks: (id) => {
                        if (id.includes('@material-ui')) return 'vndr-mui';
                        if (id.includes('redux')) return 'vndr-rdx';
                        if (id.includes('sentry')) return 'vndr-stry';
                        if (id.includes('logrocket')) return 'vndr-lgrk';
                        if (id.includes('twilio')) return 'vndr-twl';
                        if (id === 'react' || id === 'react-dom') return 'vndr-rct';
                        if (id.includes('react')) return 'vndr-othr';
                        if (id.includes('node_modules')) return 'vendor';
                    },
                    sourcemapIgnoreList: (relativeSourcePath) => {
                        return relativeSourcePath.includes('node_modules');
                    },
                },
                cache: false,
            },
        },
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
    };
});
