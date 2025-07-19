export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
  nitro: {
    preset: "node-server",
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
    },
  },
});
