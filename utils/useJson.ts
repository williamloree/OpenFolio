import { ref } from 'vue'

export function useJson(file: string) {
  const data = ref<any>(null)
  const error = ref("")
  const loading = ref(true)

  const loadData = async () => {
    try {
      loading.value = true
      error.value = ""
      
      console.log(`🔄 Tentative de chargement de: /data/${file}`)
      
      // Vérification que nous sommes côté client
      if (!process.client) {
        console.warn(`⚠️ Tentative de chargement de ${file} côté serveur ignorée`)
        return
      }

      // Ajout d'un cache-buster pour éviter la mise en cache
      const cacheBuster = new Date().getTime()
      const url = `/data/${file}?v=${cacheBuster}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Désactiver le cache pour éviter les problèmes
        cache: 'no-cache'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      // Vérifier que le content-type est bien JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        console.warn(`⚠️ Le fichier ${file} n'a pas le bon content-type: ${contentType}`)
      }
      
      const jsonData = await response.json()
      
      // Validation basique des données
      if (!jsonData) {
        throw new Error(`Le fichier ${file} est vide ou invalide`)
      }
      
      data.value = jsonData
      console.log(`✅ ${file} chargé avec succès:`, jsonData)
      
    } catch (err: any) {
      console.error(`❌ Erreur lors du chargement de ${file}:`, err)
      
      // Messages d'erreur plus spécifiques
      if (err.name === 'SyntaxError') {
        error.value = `Le fichier ${file} contient du JSON invalide`
      } else if (err.message.includes('404')) {
        error.value = `Le fichier ${file} n'existe pas dans /public/data/`
      } else if (err.message.includes('Failed to fetch')) {
        error.value = `Impossible de récupérer ${file}. Vérifiez votre connexion.`
      } else {
        error.value = `Erreur lors du chargement de ${file}: ${err.message}`
      }
      
      // Données de fallback pour éviter les erreurs d'affichage
      data.value = getDefaultData(file)
      
    } finally {
      loading.value = false
    }
  }

  // Fonction pour fournir des données par défaut
  const getDefaultData = (filename: string) => {
    const defaults: Record<string, any> = {
      'projects.json': { projects: [] },
      'experiences.json': { experiences: [] },
      'formations.json': { formations: [] },
      'skills.json': { skills: [] },
      'certifications.json': { certifications: [] },
      'languages.json': { languages: [] },
      'profile.json': { 
        profile: { 
          name: 'Portfolio', 
          title: 'Développeur',
          specialization: 'Web'
        },
        seo: {
          metaDescription: 'Portfolio de développeur',
          keywords: 'développeur,web,portfolio'
        }
      }
    }
    
    return defaults[filename] || {}
  }

  // Fonction de retry manuel
  const retry = () => {
    console.log(`🔄 Retry du chargement de ${file}`)
    loadData()
  }

  // Charger les données au montage du composant
  onMounted(() => {
    loadData()
  })

  return { data, error, loading, retry }
}

// Composable alternatif pour le chargement synchrone (SSR/SSG)
export function useJsonSync(file: string) {
  const data = ref<any>(null)
  const error = ref("")
  
  try {
    // Pour la génération statique, on peut importer directement
    if (process.server) {
      console.log(`📦 Chargement synchrone de ${file} côté serveur`)
      // Note: Cette partie nécessiterait une implémentation spécifique
      // selon votre méthode de build (SSG/SSR)
    }
  } catch (err: any) {
    console.error(`❌ Erreur lors du chargement synchrone de ${file}:`, err)
    error.value = err.message
  }
  
  return { data, error }
}

// Utilitaire pour précharger tous les JSON critiques
export function preloadJsonFiles(files: string[]) {
  if (!process.client) return
  
  files.forEach(file => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = `/data/${file}`
    link.as = 'fetch'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
  
  console.log(`🚀 Préchargement de ${files.length} fichiers JSON`)
}