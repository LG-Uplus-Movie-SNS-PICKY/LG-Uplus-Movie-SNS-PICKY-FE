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
      "@": "/src", // src 폴더를 @로 별칭 지정
      "@assets": "/src/assets",
    },
  },
});
