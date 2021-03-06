import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'SHIFTER_UI__',
  /*server: {
    proxy: {
      "/api": {
        target: "http://localhost:8082/api/v1/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },*/
  mixins:[],
  plugins: [vue()],
})
