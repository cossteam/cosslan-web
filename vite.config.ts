import path from "path"
import react from "@vitejs/plugin-react"
import pages from 'vite-plugin-pages'
import { defineConfig } from "vite"

export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
      }
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
  plugins: [
    react(),
    pages({
      importMode: 'sync',
      exclude: ['**/_*.tsx', '**/*-form.tsx', '**/*-component.tsx'],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
