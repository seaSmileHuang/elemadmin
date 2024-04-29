import vue from '@vitejs/plugin-vue';
import path from "path";
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    // 指定symbolId格式
    symbolId: "icon-[name]",
  })
  ],
  resolve: {
    alias: {
      "@":path.resolve("src")
    }
  },
  server: {
    host:"0.0.0.0",
    proxy: {
      "/api": {
        target:"http://192.168.1.104:8080",
        changeOrigin: true,
        rewrite: (path: string) => path.replace("/api", "")
      }
    }
  }

})
