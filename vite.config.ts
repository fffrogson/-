import { defineConfig } from 'vite'
import react from '@vitejs/react-swc' // 或 react()

export default defineConfig({
  plugins: [react()],
  base: './', // 
})
