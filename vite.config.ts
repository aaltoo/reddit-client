import { fileURLToPath, URL } from "node:url";
import WindiCSS from "vite-plugin-windicss";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      url: "url",
    },
  },
  define: {
    "process.env": {},
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "group-home": ["src/views/HomeView.vue"],
          "group-auth": [
            "./src/views/LoginView.vue",
            "./src/views/CallbackView.vue",
          ],
          "group-subreddit": [
            "./src/views/SubredditView.vue",
            "./src/views/SubmissionView.vue",
          ],
        },
      },
    },
  },
});
