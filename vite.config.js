import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [require('tailwindcss')],
    },
  },
  publicDir: '/media',
  build: {
    outDir: 'dist',
  },
})
