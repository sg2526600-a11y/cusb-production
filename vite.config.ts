import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    target: 'es2015',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor':  ['react', 'react-dom'],
          'router':        ['react-router-dom'],
          'seo':           ['react-helmet-async'],
          'forms':         ['react-hook-form', 'zod'],
          'supabase':      ['@supabase/supabase-js'],
        },
      },
    },
  },

  server: {
    port: 5173,
    open: false,
  },
});
