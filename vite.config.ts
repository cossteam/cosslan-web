import path from "path"
import react from "@vitejs/plugin-react"
import pages from 'vite-plugin-pages'
import {defineConfig, loadEnv} from "vite"


export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd())
  const API_URL = `${env.VITE_API_URL ?? 'http://127.0.0.1:8888'}`
  const PORT = parseInt(`${env.VITE_PORT ?? '5173'}`);

  return {
    server: {
      host: '0.0.0.0',
      port: PORT,
      proxy: {
        '/api/v1': {
          target: API_URL,
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
  }
})

