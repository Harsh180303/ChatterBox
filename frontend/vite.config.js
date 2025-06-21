import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // only for testing in mobile
  server: {
    host: '0.0.0.0', // 👈 Important part
    port: 5173,       // Optional: custom port
  },
})
