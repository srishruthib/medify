import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this 'build' configuration object
  build: {
    outDir: 'build', // This tells Vite to output the production files into a 'build' folder
  },
})
