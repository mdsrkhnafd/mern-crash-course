import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
      },
    },
  },
  build: {
    outDir: "dist", // ✅ Ensures output goes to "dist/"
    emptyOutDir: true, // ✅ Clears old builds
    assetsDir: "assets", // ✅ Ensures static files go inside "assets/"
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js", // ✅ Fix for missing main.js
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
