import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration
 * This file configures the build tool and development server.
 * Documentation: https://vitejs.dev/config/
 */
export default defineConfig({
  // React Plugin for Fast Refresh and JSX support
  plugins: [react()],

  // Server Configuration
  server: {
    port: 5173,
    open: true, // Automatically open browser on start
  },

  // Build Optimizations
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
