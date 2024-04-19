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
        target:"http://192.168.1.104:8080",
        changeOrigin: true,
        rewrite: (path: string) => path.replace("/api", "")
      }
    }
  }

})
