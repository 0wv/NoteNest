import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: 'https://fonts.googleapis.com"',
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&display=swap",
        },
      ],
    },
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  vite: {
    plugins: [
      tailwindcss(),
      nodePolyfills({
        protocolImports: true,
      }),
    ],
  },
});
