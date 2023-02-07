import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
import baseConfig from './base';
export default defineConfig({
  ...baseConfig,
  base: '/elesign',
  build: {
    outDir: 'docs',
    assetsInlineLimit: 0,
  },
});
