export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
  nitro: {
    preset: "node-server",
    routeRules: {
      "/data/**": {
        headers: {
          "Cache-Control": "max-age=300", // 5 minutes
        },
      },
    },
  },
  // Choisir le thème ici : 'default', 'cyberpunk', 'forest', 'ocean'
  css: ["~/assets/themes/default.css"],
  app: {
    head: {
      title: "Portfolio Open Source",
      meta: [
        {
          name: "description",
          content: "Portfolio open source administrable via JSON",
        },
      ],
      link: [
        {
          rel: "preload",
          href: "/data/projects.json",
          as: "fetch",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/data/experiences.json",
          as: "fetch",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/data/profile.json",
          as: "fetch",
          crossorigin: "anonymous",
        },
      ],
    },
  },
});
