import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Two pages, one app: index.html (/) and playbook.html (/playbook). Each has
// its own head, canonical and structured data; both boot src/main.tsx, which
// picks the page from the URL. Vercel serves playbook.html at /playbook
// (cleanUrls in vercel.json).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        playbook: resolve(__dirname, 'playbook.html'),
      },
    },
  },
})
