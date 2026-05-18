import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api/auth': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/api/movies': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      },
      '/api/tv': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      },
      '/api/person': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      },
      '/api/search': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      },
      '/api/watchlist': {
        target: 'http://localhost:5003',
        changeOrigin: true,
      },
      '/api/reviews': {
        target: 'http://localhost:5004',
        changeOrigin: true,
      },
    },
  },
})