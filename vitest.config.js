import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Required for React DOM testing
    setupFiles: ['./src/setupTests.js'], // From your earlier setup
    globals: true, // Enables Vitest globals (test, expect, etc.)
  },
});