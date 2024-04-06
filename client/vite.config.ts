import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@/router': path.resolve(__dirname, './src/router'),
      '@/views': path.resolve(__dirname, './src/views'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/hoc': path.resolve(__dirname, './src/hoc'),
      '@/api': path.resolve(__dirname, './src/api'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/constant': path.resolve(__dirname, './src/constant'),
      '@/context': path.resolve(__dirname, './src/context'),
      '@/types': path.resolve(__dirname, './src/types'),
    },
  },
})
