import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // ✨ 确保这里是 @vitejs/plugin-react

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 
})
