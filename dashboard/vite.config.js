import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../route_sales/public/dashboard",
    emptyOutDir: true,
    target: "es2015",
  },
});
