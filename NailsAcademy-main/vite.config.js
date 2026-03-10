import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Конфигурация за твоя сайт в Netlify
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000
  },
  build: {
    outDir: 'dist',
  }
})
