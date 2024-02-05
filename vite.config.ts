import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'
import dotenv from 'rollup-plugin-dotenv'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dotenv(), svelte()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Add more aliases here
    },
  },
})
