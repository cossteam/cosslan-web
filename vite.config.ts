import path from "path"
import react from "@vitejs/plugin-react"
import pages from 'vite-plugin-pages'
import { defineConfig } from "vite"

export default defineConfig({
  server: {
    host: '0.0.0.0',
    strictPort: false,
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
  plugins: [
    react(),
    pages({
      importMode: 'sync',
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
