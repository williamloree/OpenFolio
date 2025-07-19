// plugins/debug-theme.client.ts
export default defineNuxtPlugin({
  name: "debug-theme",
  setup() {
    if (process.client) {
      const config = useRuntimeConfig();

      // Debug immédiat
      console.group("🔍 Debug Thème - Configuration");
      console.log("selectedTheme:", config.public.selectedTheme);
      console.log("themeOptions:", config.public.themeOptions);
      console.log("process.client:", process.client);
      console.groupEnd();

      // Vérifier les fichiers de thème
      const checkThemeFiles = async () => {
        const themes = [
          "theme.json",
          "theme-cyberpunk.json",
          "theme-forest.json",
          "theme-ocean.json",
        ];

        console.group("📁 Vérification des fichiers de thème");
        for (const file of themes) {
          try {
            const response = await fetch(`/data/${file}`);
            if (response.ok) {
              const data = await response.json();
              console.log(`✅ ${file}:`, data.displayName || "OK");
            } else {
              console.error(
                `❌ ${file}: ${response.status} ${response.statusText}`
              );
            }
          } catch (error) {
            console.error(`❌ ${file}:`, error);
          }
        }
        console.groupEnd();
      };

      // Vérifier après 1 seconde
      setTimeout(checkThemeFiles, 1000);

      // Ajouter une fonction globale de debug
      window.debugTheme = () => {
        const { currentTheme, getThemeInfo } = useTheme();
        console.group("🎨 État actuel du thème");
        console.log("currentTheme:", currentTheme.value);
        console.log("themeInfo:", getThemeInfo.value);
        console.log("Variables CSS appliquées:");
        const root = document.documentElement;
        console.log(
          "--primary-color:",
          getComputedStyle(root).getPropertyValue("--primary-color")
        );
        console.log(
          "--background-primary:",
          getComputedStyle(root).getPropertyValue("--background-primary")
        );
        console.groupEnd();
      };

      console.log("🛠️ Fonction de debug disponible: window.debugTheme()");
    }
  },
});
