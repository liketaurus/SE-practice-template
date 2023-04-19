import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { BASE_LINK } from './src/constants/quiz';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/se-practice.pp.ua/projects/35/1/',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  plugins: [react()],
});
