import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Конфигурация за твоя сайт в Netlify
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 3000
  },
  build: {
    outDir: 'dist',
    // Split large, rarely-changing dependencies into separate chunks so the
    // initial page load downloads less JavaScript and the browser can cache
    // vendor code across deploys.
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion-vendor': ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  }
})
