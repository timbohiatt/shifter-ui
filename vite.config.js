import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  /*server: {
    proxy: {
      "/api": {
        target: "34.78.47.231:8080/api/v1/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },*/
  plugins: [vue()],
})
