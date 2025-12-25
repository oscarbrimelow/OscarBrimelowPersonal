import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/OscarBrimelowPersonal/', // Set base to repo name for GitHub Pages
})
