import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // ── Required for GitHub Pages deployment ──────────────────────
  // Repo: https://github.com/sheshagiri018-sys/Future-Odyssey-A-Day-in-2050
  // Live: https://sheshagiri018-sys.github.io/Future-Odyssey-A-Day-in-2050/
  base: '/Future-Odyssey-A-Day-in-2050/',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap'],
          framer: ['framer-motion'],
          lenis: ['@studio-freight/lenis'],
        },
      },
    },
  },

  optimizeDeps: {
    include: ['three', 'gsap', 'framer-motion', '@studio-freight/lenis'],
  },
})
