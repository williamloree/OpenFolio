// composables/useTheme.ts
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: {
    primary: string
    secondary: string
    tertiary: string
  }
  text: {
    primary: string
    secondary: string
    muted: string
  }
  border: string
  success: string
  warning: string
  error: string
  info: string
}

interface ThemeGradients {
  primary: string
  accent: string
  hero: string
  card: string
}

interface ThemeShadows {
  glow: string
  card: string
  hover: string
}

interface ThemeParticle {
  class: string
  style: string
}

export interface Theme {
  name: string
  displayName: string
  colors: ThemeColors
  gradients: ThemeGradients
  shadows: ThemeShadows
  typography: {
    fontFamily: string
    fontSize: Record<string, string>
  }
  animations: {
    duration: Record<string, string>
    easing: Record<string, string>
  }
  spacing: Record<string, string>
  borderRadius: Record<string, string>
  particles: ThemeParticle[]
}

// État global du thème
const currentTheme: Ref<Theme | null> = ref(null)
const isThemeLoaded = ref(false)

export const useTheme = () => {
  const config = useRuntimeConfig()
  
  // Charger le thème configuré par le développeur
  const loadDeveloperTheme = async (): Promise<Theme | null> => {
    const selectedTheme = config.public.selectedTheme as string
    const themeOptions = config.public.themeOptions
    
    if (themeOptions.devMode) {
      console.log(`🎨 Chargement du thème: ${selectedTheme}`)
    }
    
    try {
      let themeData: Theme | null = null
      
      if (selectedTheme === 'default') {
        const { data } = await useJson('theme.json')
        themeData = data.value
      } else {
        const { data } = await useJson(`theme-${selectedTheme}.json`)
        themeData = data.value
      }
      
      if (themeData) {
        currentTheme.value = themeData
        applyThemeToDOM(themeData)
        isThemeLoaded.value = true
        
        if (themeOptions.devMode) {
          console.log(`✅ Thème "${themeData.displayName}" chargé avec succès`)
        }
        
        return themeData
      }
    } catch (error) {
      console.error(`❌ Erreur lors du chargement du thème ${selectedTheme}:`, error)
      
      // Fallback vers le thème par défaut
      if (selectedTheme !== 'default') {
        try {
          const { data: defaultTheme } = await useJson('theme.json')
          if (defaultTheme.value) {
            currentTheme.value = defaultTheme.value
            applyThemeToDOM(defaultTheme.value)
            isThemeLoaded.value = true
            console.log('📦 Fallback vers le thème par défaut')
            return defaultTheme.value
          }
        } catch (fallbackError) {
          console.error('❌ Impossible de charger le thème par défaut:', fallbackError)
        }
      }
    }
    return null
  }

  // Appliquer le thème au DOM
  const applyThemeToDOM = (theme: Theme) => {
    const root = document.documentElement
    const themeOptions = config.public.themeOptions
    
    // Variables CSS personnalisées
    root.style.setProperty('--primary-color', theme.colors.primary)
    root.style.setProperty('--secondary-color', theme.colors.secondary)
    root.style.setProperty('--accent-color', theme.colors.accent)
    root.style.setProperty('--background-primary', theme.colors.background.primary)
    root.style.setProperty('--background-secondary', theme.colors.background.secondary)
    root.style.setProperty('--background-tertiary', theme.colors.background.tertiary)
    root.style.setProperty('--text-primary', theme.colors.text.primary)
    root.style.setProperty('--text-secondary', theme.colors.text.secondary)
    root.style.setProperty('--text-muted', theme.colors.text.muted)
    root.style.setProperty('--border-color', theme.colors.border)
    root.style.setProperty('--gradient-primary', theme.gradients.primary)
    root.style.setProperty('--gradient-accent', theme.gradients.accent)
    root.style.setProperty('--gradient-hero', theme.gradients.hero)
    root.style.setProperty('--gradient-card', theme.gradients.card)
    root.style.setProperty('--shadow-glow', theme.shadows.glow)
    root.style.setProperty('--shadow-card', theme.shadows.card)
    root.style.setProperty('--shadow-hover', theme.shadows.hover)
    root.style.setProperty('--font-family', theme.typography.fontFamily)
    
    // Appliquer les styles au body
    document.body.style.fontFamily = theme.typography.fontFamily
    document.body.style.backgroundColor = theme.colors.background.primary
    document.body.style.color = theme.colors.text.primary
    
    // Ajouter la classe du thème au body pour les styles CSS spécifiques
    document.body.className = document.body.className.replace(/theme-\w+/g, '')
    document.body.classList.add(`theme-${theme.name}`)
    
    // Désactiver les animations si configuré
    if (!themeOptions.enableAnimations) {
      root.style.setProperty('--animation-duration', '0ms')
      document.body.classList.add('no-animations')
    }
    
    if (themeOptions.devMode) {
      console.log('🎯 Variables CSS appliquées:', {
        primary: theme.colors.primary,
        background: theme.colors.background.primary,
        font: theme.typography.fontFamily
      })
    }
  }

  // Getters
  const getTheme = computed(() => currentTheme.value)
  const getColors = computed(() => currentTheme.value?.colors || null)
  const getGradients = computed(() => currentTheme.value?.gradients || null)
  const getParticles = computed(() => {
    const themeOptions = config.public.themeOptions
    if (!themeOptions.enableParticles) return []
    return currentTheme.value?.particles || []
  })
  
  const isLoaded = computed(() => isThemeLoaded.value)

  // Obtenir une couleur spécifique avec fallback
  const getColor = (colorPath: string, fallback = '#3b82f6'): string => {
    if (!currentTheme.value) return fallback
    
    const paths = colorPath.split('.')
    let value: any = currentTheme.value.colors
    
    for (const path of paths) {
      value = value?.[path]
      if (value === undefined) return fallback
    }
    
    return value || fallback
  }

  // Obtenir des informations sur le thème actuel
  const getThemeInfo = computed(() => {
    if (!currentTheme.value) return null
    
    return {
      name: currentTheme.value.name,
      displayName: currentTheme.value.displayName,
      isLoaded: isThemeLoaded.value,
      config: config.public.selectedTheme
    }
  })

  // Initialiser le thème (appelé automatiquement par le plugin)
  const initializeTheme = async () => {
    if (process.client && !isThemeLoaded.value) {
      await loadDeveloperTheme()
    }
  }

  // Debug pour le développeur (seulement en mode dev)
  const debugTheme = () => {
    if (config.public.themeOptions.devMode && currentTheme.value) {
      console.group('🎨 Debug Thème')
      console.log('Thème actuel:', currentTheme.value.name)
      console.log('Configuration:', config.public.selectedTheme)
      console.log('Couleurs:', currentTheme.value.colors)
      console.log('Particules activées:', config.public.themeOptions.enableParticles)
      console.log('Animations activées:', config.public.themeOptions.enableAnimations)
      console.groupEnd()
    }
  }

  return {
    // État
    currentTheme: readonly(currentTheme),
    isLoaded,
    
    // Méthodes
    initializeTheme,
    debugTheme,
    
    // Getters
    getTheme,
    getColors,
    getGradients,
    getParticles,
    getColor,
    getThemeInfo
  }
}