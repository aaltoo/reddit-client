import { fileURLToPath, URL } from "node:url";
import WindiCSS from "vite-plugin-windicss";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dynamicImport from "vite-plugin-dynamic-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS(), dynamicImport()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      url: "url",
    },
  },
  define: {
    "process.env": {},
  },
});
