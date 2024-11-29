import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [vue()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_KEY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
