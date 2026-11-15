import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// QA build: ship React's development build. Set here, before Vite reads it,
// so every way of invoking the build gets the same result.
process.env.NODE_ENV = 'development'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssMinify: false,
    sourcemap: false,
    modulePreload: false,
    assetsInlineLimit: 0,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 100000,
    rollupOptions: { treeshake: false },
  },
})
