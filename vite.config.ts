import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), monacoEditorPlugin({})],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    minify: 'esbuild',
    target: 'es2015',
    cssTarget: 'chrome80',
    terserOptions: {
      compress: {
        keep_infinity: true,
        // Used to delete console in production environment
        drop_console: false,
        drop_debugger: true,
      },
    },
    // Turning off brotliSize display can slightly reduce packaging time
    reportCompressedSize: false,
    chunkSizeWarningLimit: 2000,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
    // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
    include: [
      'monaco-editor/esm/vs/language/json/json.worker',
      'monaco-editor/esm/vs/language/css/css.worker',
      'monaco-editor/esm/vs/language/html/html.worker',
      'monaco-editor/esm/vs/language/typescript/ts.worker',
      'monaco-editor/esm/vs/editor/editor.worker',
    ],
  },
})
