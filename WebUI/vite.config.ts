import child_process from 'child_process';
import fs from 'fs';
import {fileURLToPath, URL} from 'node:url';
import {cpus} from 'os';
import path from 'path';
import {env} from 'process';

import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== '' ? `${env.APPDATA}/ASP.NET/https` : `${env.HOME}/.aspnet/https`;

const certificateName = 'reactapp1.client';
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (
        0 !==
        child_process.spawnSync(
            'dotnet',
            ['dev-certs', 'https', '--export-path', certFilePath, '--format', 'Pem', '--no-password'],
            {stdio: 'inherit'}
        ).status
    ) {
        throw new Error('Could not create certificate.');
    }
}

const target = env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_URLS
        ? env.ASPNETCORE_URLS.split(';')[0]
        : 'https://localhost:7130';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    return {
        plugins: [tsconfigPaths(), react(), checker({typescript: false}), svgr()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            proxy: {
                // proxy API requests to the ASP.NET backend
                '^/api': {
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, '/api'),
                    // target taken from src/setupProxy.js in ASP.NET React template
                    target,
                },
            },
            port: 5173,
            https: {
                key: fs.readFileSync(keyFilePath),
                cert: fs.readFileSync(certFilePath),
            },
        },
        build: {
            sourcemap: mode === 'development' ? 'inline' : 'hidden',
            rollupOptions: {
                maxParallelFileOps: Math.max(1, cpus().length - 1),
                output: {
                    manualChunks: (id) => {
                        if (id.includes('@mui')) return 'vndr-mui';
                        if (id.includes('@mui/icons')) return 'vndr-mui-icons';
                        if (id.includes('redux')) return 'vndr-rdx';
                        if (id === 'react' || id === 'react-dom') return 'vndr-rct';
                        if (id.includes('node_modules')) return 'vendor';
                    },
                    sourcemapIgnoreList: (relativeSourcePath) => {
                        return relativeSourcePath.includes('node_modules');
                    },
                },
                cache: false,
            },
        },
    };
});
