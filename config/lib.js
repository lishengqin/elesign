import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
import baseConfig from './base';
export default defineConfig({
  ...baseConfig,
  build: {
    lib: {
      entry: path.resolve(__dirname, '../src/elesign/index.js'),
      name: `${process.env.npm_package_name}`,
      formats: ['es', 'cjs', 'umd'],
      fileName: format => `${format}/index.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        dir: 'lib',
        globals: {
          vue: 'vue',
        },
      },
    },
  },
  publicDir: false, // public文件内的内容不打包进去
});
