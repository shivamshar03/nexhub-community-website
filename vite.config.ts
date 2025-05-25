import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  // Add base path for GitHub Pages - replace "nexhub" with your repository name
  base: '/'
}); 
