import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"], // Example for splitting vendor libraries into a separate chunk
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit (default is 500 kB)
  },
});
