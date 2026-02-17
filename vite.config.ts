import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Hostinger shared hosting typically serves from domain root.
  // If you deploy under a subfolder, set `base: '/subfolder/'`.
  base: '/',
});
