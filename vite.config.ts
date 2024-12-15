import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

import prerender from "@prerenderer/rollup-plugin";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    svgr(),
    prerender({
      routes: ["/", "/counter", "/otherpage/1", "/otherpage/2", "/otherpage/3"],
      renderer: "@prerenderer/renderer-puppeteer",
      server: {
        port: 3000,
        host: "localhost",
      },
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      },
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/http:/i, "https:")
          .replace(
            /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
            "https://www.picky-movie.com//"
          );
      },
    }),
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
      "@util": "/src/util",
    },
  },
});
