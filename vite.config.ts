import vue from '@vitejs/plugin-vue'
import path from "path"
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@":path.resolve("src")
    }
  },
  server: {
    proxy: {
      "/api": {
        target:"https://eladmin.vip",
        changeOrigin: true,

      }
    }
  }

})
