<template>
  <div id="app" class="min-h-screen bg-black text-white">
    <!-- Loading global -->
    <Transition
      name="loading"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isAppLoading" class="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div class="text-center">
          <!-- Logo animé -->
          <div class="w-20 h-20 mx-auto mb-6 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            <div class="absolute inset-2 bg-black rounded-full flex items-center justify-center">
              <span class="text-2xl font-bold text-white">P</span>
            </div>
          </div>
          
          <!-- Texte de chargement -->
          <h2 class="text-xl font-semibold text-white mb-4">
            {{ loadingText }}
          </h2>
          
          <!-- Barre de progression -->
          <div class="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
            <div 
              class="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
              :style="{ width: `${loadingProgress}%` }"
            ></div>
          </div>
          
          <!-- Pourcentage -->
          <p class="text-gray-400 text-sm mt-2">{{ loadingProgress }}%</p>
        </div>
      </div>
    </Transition>

    <!-- Layout principal -->
    <div v-if="!isAppLoading" class="app-container">
      <!-- Header global -->
      <Header />
      
      <!-- Contenu principal avec transitions de page -->
      <main class="main-content pt-20">
        <NuxtPage 
          :transition="{
            name: 'page',
            mode: 'out-in',
            onEnter: (el, done) => pageTransitionEnter(el, done),
            onLeave: (el, done) => pageTransitionLeave(el, done)
          }"
        />
      </main>

      <!-- Footer global -->
      <Footer />

      <!-- Bouton scroll to top -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-2"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-2"
      >
        <button
          v-if="showScrollToTop"
          @click="scrollToTop"
          class="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 z-40 flex items-center justify-center group"
          aria-label="Retour en haut"
        >
          <svg 
            class="w-6 h-6 transform group-hover:-translate-y-0.5 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </Transition>

      <!-- Notification toast (optionnel) -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-full"
      >
        <div
          v-if="notification.show"
          class="fixed top-24 right-8 max-w-sm bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 z-50"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg v-if="notification.type === 'success'" class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <svg v-else-if="notification.type === 'error'" class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-white">{{ notification.title }}</p>
              <p class="text-sm text-gray-400 mt-1">{{ notification.message }}</p>
            </div>
            <button 
              @click="hideNotification"
              class="ml-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Éléments décoratifs de fond global -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <!-- Particules animées -->
      <div 
        v-for="(particle, index) in backgroundParticles" 
        :key="index"
        class="absolute rounded-full opacity-20"
        :class="particle.class"
        :style="particle.style"
      ></div>
      
      <!-- Grille de fond subtile -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

// État global de l'application
const isAppLoading = ref(true)
const loadingProgress = ref(0)
const loadingText = ref('Initialisation...')
const showScrollToTop = ref(false)

// Système de notifications
const notification = reactive({
  show: false,
  type: 'info' as 'success' | 'error' | 'info',
  title: '',
  message: ''
})

// Particules de fond animées
const backgroundParticles = ref([
  {
    class: 'w-2 h-2 bg-blue-500 animate-ping',
    style: 'top: 25%; left: 25%; animation-delay: 0s;'
  },
  {
    class: 'w-1 h-1 bg-purple-500 animate-pulse',
    style: 'top: 75%; right: 25%; animation-delay: 1s;'
  },
  {
    class: 'w-1.5 h-1.5 bg-green-500 animate-bounce',
    style: 'bottom: 25%; left: 33%; animation-delay: 2s;'
  },
  {
    class: 'w-2 h-2 bg-pink-500 animate-ping',
    style: 'top: 50%; right: 33%; animation-delay: 3s;'
  },
  {
    class: 'w-1 h-1 bg-yellow-500 animate-pulse',
    style: 'top: 15%; right: 15%; animation-delay: 4s;'
  }
])

// Configuration SEO globale
useHead({
  htmlAttrs: {
    lang: 'fr',
    class: 'dark'
  },
  bodyAttrs: {
    class: 'overflow-x-hidden'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' }
  ]
})

// Gestion du scroll
const handleScroll = () => {
  showScrollToTop.value = window.scrollY > 500
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Système de notifications
const showNotification = (type: 'success' | 'error' | 'info', title: string, message: string) => {
  notification.type = type
  notification.title = title
  notification.message = message
  notification.show = true
  
  // Auto-hide après 5 secondes
  setTimeout(() => {
    hideNotification()
  }, 5000)
}

const hideNotification = () => {
  notification.show = false
}

// Transitions de page personnalisées
const pageTransitionEnter = (el: Element, done: () => void) => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(20px)'
  
  setTimeout(() => {
    el.style.transition = 'all 0.3s ease-out'
    el.style.opacity = '1'
    el.style.transform = 'translateY(0)'
    done()
  }, 50)
}

const pageTransitionLeave = (el: Element, done: () => void) => {
  el.style.transition = 'all 0.2s ease-in'
  el.style.opacity = '0'
  el.style.transform = 'translateY(-20px)'
  
  setTimeout(() => {
    done()
  }, 200)
}

// Simulation du chargement initial
const simulateLoading = async () => {
  const steps = [
    { progress: 20, text: 'Chargement des composants...' },
    { progress: 40, text: 'Initialisation du thème...' },
    { progress: 60, text: 'Préparation des données...' },
    { progress: 80, text: 'Configuration des animations...' },
    { progress: 100, text: 'Finalisation...' }
  ]

  for (const step of steps) {
    await new Promise(resolve => setTimeout(resolve, 300))
    loadingProgress.value = step.progress
    loadingText.value = step.text
  }

  // Petit délai final pour l'effet
  await new Promise(resolve => setTimeout(resolve, 500))
  isAppLoading.value = false
}

// Hook du routeur pour les transitions
const router = useRouter()

router.beforeEach((to, from) => {
  // Analytics de navigation (optionnel)
  if (process.client && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: to.fullPath,
    })
  }
})

// Lifecycle hooks
onMounted(() => {
  // Démarrer le chargement
  simulateLoading()
  
  // Event listeners
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Gestion des erreurs globales
  window.addEventListener('error', (event) => {
    console.error('Erreur globale:', event.error)
    showNotification('error', 'Erreur', 'Une erreur est survenue')
  })

  // Gestion de la connectivité
  window.addEventListener('online', () => {
    showNotification('success', 'Connexion rétablie', 'Vous êtes de nouveau en ligne')
  })

  window.addEventListener('offline', () => {
    showNotification('error', 'Hors ligne', 'Vérifiez votre connexion internet')
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Exposition des fonctions globales
provide('showNotification', showNotification)
</script>

<style scoped>
/* Grille de fond */
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Transitions de page */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Animation de chargement */
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.3s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

/* Optimisations de performance */
.app-container {
  contain: layout style paint;
}

.main-content {
  min-height: calc(100vh - 80px);
  will-change: transform;
}

/* Responsive design */
@media (max-width: 768px) {
  .fixed.bottom-8.right-8 {
    bottom: 1rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
  }
  
  .fixed.top-24.right-8 {
    top: 5rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}

/* Accessibilité */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Mode sombre forcé */
#app {
  color-scheme: dark;
}
</style>