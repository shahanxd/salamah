import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  // Use import.meta.env.VITE_API_BASE in code for API base URL
=======
>>>>>>> parent of 6be6841 (fixed render vercel connectivity)
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import '@fontsource/inter/variable.css'; @import '@fontsource/jetbrains-mono/variable.css';`,
      },
    },
  },
})
// Use import.meta.env.VITE_API_BASE in your React code for API calls
