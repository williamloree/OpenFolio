import { ref } from 'vue'

export function useJson(file: string) {
  const data = ref<any>(null)
  const error = ref("")
  const loading = ref(true)

  onMounted(async () => {
    try {
      console.log(`Tentative de chargement de: /data/${file}`)
      const response = await fetch(`/data/${file}`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const jsonData = await response.json()
      data.value = jsonData
      console.log(`✅ ${file} chargé avec succès:`, jsonData)
    } catch (err: any) {
      console.error(`❌ Erreur lors du chargement de ${file}:`, err)
      error.value = `Impossible de charger ${file}: ${err.message}`
    } finally {
      loading.value = false
    }
  })

  return { data, error, loading }
}