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
    outDir: "dist", // ✅ Ensures Vite outputs to dist/
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendor";
            if (id.includes("chakra-ui")) return "chakra-vendor";
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
