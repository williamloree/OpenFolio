export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
  nitro: {
    preset: "node-server",
  },
  css: ["~/assets/main.css"],
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
  plugins: ["~/plugins/debug-theme.client.ts", "~/plugins/theme.client.ts"],
  runtimeConfig: {
    public: {
      // Choisir le thème ici : 'default', 'cyberpunk', 'forest', 'ocean'
      selectedTheme: "cyberpunk",
      themeOptions: {
        forceTheme: true,
        enableAnimations: true,
        enableParticles: true,
        devMode: true,
      },
    },
  },
});
