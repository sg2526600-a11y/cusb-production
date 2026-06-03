import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        target: 'es2015',
        cssCodeSplit: true,
        sourcemap: false,
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        {
                            name: 'react-vendor',
                            test: /node_modules[\\/](react|react-dom)[\\/]/,
                        },
                        {
                            name: 'router',
                            test: /node_modules[\\/]react-router-dom[\\/]/,
                        },
                        {
                            name: 'seo',
                            test: /node_modules[\\/]react-helmet-async[\\/]/,
                        },
                        {
                            name: 'forms',
                            test: /node_modules[\\/](react-hook-form|zod)[\\/]/,
                        },
                        {
                            name: 'supabase',
                            test: /node_modules[\\/]@supabase[\\/]supabase-js[\\/]/,
                        },
                    ],
                },
            },
        },
    },
    server: {
        port: 5173,
        open: false,
    },
});
