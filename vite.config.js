import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Adjust this if your project is deployed to a subdirectory
  build: {
    outDir: 'dist', // Ensure this matches the directory you're deploying
    assetsDir: '.', // Adjust as necessary based on your asset setup
    sourcemap: false, // Set to true if you need source maps for debugging
    minify: true, // Enable minification for production
    rollupOptions: {
      // Keep your rollup options as needed for your project
      input: {
        main: './index.html' // Adjust if your entry point is different
      }
    }
  }
});
