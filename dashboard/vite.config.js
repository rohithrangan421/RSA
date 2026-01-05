// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//      "^/(api|files|assets)": {
//         target: "http://sales.local:8014", 
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    port: 8080,

    proxy: {
      "^/(api|files|assets)": {
        target: "http://127.0.0.1:8014", // YOUR FRAPPE PORT
        changeOrigin: true,
        secure: false,

        headers: {
          // ⭐ REQUIRED
          "X-Frappe-Site-Name": "sales.local",
        },
      },
    },
  },
  build: {
    outDir: "../route_sales/public/dashboard",
    emptyOutDir: true,
    target: "es2015",
  },
});
