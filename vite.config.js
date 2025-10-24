import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // test: { environment: 'jsdom', globals: true },
    base: process.env.NODE_ENV === 'production'
    ? '/<efolio-week5>/'
    : '/'
})

// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? '/<https://github.com/Akirakennsr/efolio-week5>/'
//     : '/'
// }
