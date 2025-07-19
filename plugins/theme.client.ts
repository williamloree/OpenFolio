// plugins/theme.client.ts
export default defineNuxtPlugin({
  name: 'theme-loader',
  async setup() {
    if (process.client) {
      const { initializeTheme } = useTheme()
      
      // Attendre que le DOM soit prêt
      await nextTick()
      
      // Initialiser le thème
      await initializeTheme()
      
      console.log('🎨 Plugin de thème initialisé')
    }
  }
})