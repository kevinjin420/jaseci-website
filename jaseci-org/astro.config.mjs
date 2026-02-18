import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://jaseci.kevinjin.dev",
  output: "static",
  integrations: [
    tailwind(),
    react(),
    sitemap(),
  ],
});
