import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: "import {h} from 'vue';",
  },
  server: {
    host: '0.0.0.0',
    port: 1234,
    hmr: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    // 导入时想要省略的扩展名列表
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
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
  optimizeDeps: {
    include: ['vue'],
  },
});
