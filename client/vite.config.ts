import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/router': path.resolve(__dirname, './src/router'),
      '@/views': path.resolve(__dirname, './src/views'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/hoc': path.resolve(__dirname, './src/hoc'),
    },
  },
})
