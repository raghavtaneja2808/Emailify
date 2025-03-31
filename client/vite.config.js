import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  assetsInclude: ['**/*.glb'],  // 👈 Add this line
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // Ensure this points to `/src`
    },
  },
  server:{
    port:3000,
    host:'0.0.0.0',
    proxy: {
       "/api/": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/auth/google": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
