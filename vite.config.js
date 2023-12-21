import { fileURLToPath, URL } from 'node:url'
import copy from 'rollup-plugin-copy'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import  { monacoEditorPlugin } from 'vite-plugin-monaco-editor';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    copy({
      targets: [
        {
          src: './node_modules/amis/sdk/**/*',
          dest: 'public/amis-sdk'
        }
      ]
    })
    //monacoEditorPlugin({}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})