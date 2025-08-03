import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/db': {
        target: 'http://localhost:2000',
        changeOrigin: true,
      },
      '/project': {
        target: 'http://localhost:2000',
        changeOrigin: true,
      },
      '/file': {
        target: 'http://localhost:2000',
        changeOrigin: true,
      },
      '/command': {
        target: 'http://localhost:2000',
        changeOrigin: true,
      },
      '/library': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/q.js',
        assetFileNames: 'assets/q.[ext]'
      }
    }
  }
});
