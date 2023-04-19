import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { BASE_LINK } from './src/constants/quiz';

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE_LINK,
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  plugins: [react()],
});
