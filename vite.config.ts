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
  resolve: {
    alias: {
      "@": "/src",
      "@assets": "/src/assets",
      "@stories": "/src/stories",
      "@constants": "/src/constants",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@provider": "/src/provider",
      "@recoil": "/src/recoil",
      "@styles": "/src/styles",
      "@types": "/src/types",
      "@routers": "/src/routers",
    },
  },
});
