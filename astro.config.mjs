// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://manojkumarpanduga.vercel.app",
  integrations: [tailwind(), react(), sitemap()],
  output: "static",
  adapter: vercel(),
  vite: {
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
      },
    },
  },
  build: {
    inlineStylesheets: "auto",
  },
  server: {
    host: true,
    port: 4321,
  },
});
