import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Correcting alias to map to root directory
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000,
    // Enable SPA routing support on refresh
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext'
  }
});