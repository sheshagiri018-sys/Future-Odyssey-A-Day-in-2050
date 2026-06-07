import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Future-Odyssey-A-Day-in-2050/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
