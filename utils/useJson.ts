import { ref } from 'vue'

export function useJson(file: string) {
  const data = ref(null)
  const error = ref(null)

  onMounted(async () => {
    try {
      const response = await fetch(`/data/${file}`)
      if (!response.ok) throw new Error('Impossible de charger ' + file)
      data.value = await response.json()
    } catch (err) {
      error.value = err
    }
  })

  return { data, error }
}
