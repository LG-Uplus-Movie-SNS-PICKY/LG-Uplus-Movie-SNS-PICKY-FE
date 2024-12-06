import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    svgr(),
  ],
  server: {
    host: true,
    // proxy: {
    //   "/api": "http://localhost:3000",
    // },
  },
  resolve: {
    alias: {
      "@": "/src",
      "@api": "/src/api",
      "@assets": "/src/assets",
      "@stories": "/src/stories",
      "@constants": "/src/constants",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@provider": "/src/provider",
      "@recoil": "/src/recoil",
      "@styles": "/src/styles",
      "@type": "/src/types",
      "@routers": "/src/routers",
      "@components": "/src/components",
    },
  },
});
