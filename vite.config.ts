import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署在 /<repo>/ 子路径下，需要设置 base
  base: '/alfalaval-demo/',
})
