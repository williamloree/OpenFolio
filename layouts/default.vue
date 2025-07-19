<template>
  <div class="layout-wrapper theme-transition">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="navbar-container">
        <NuxtLink to="/" class="navbar-brand">
          <span class="brand-text">Portfolio</span>
        </NuxtLink>
        
        <div class="navbar-menu" :class="{ 'is-active': isMenuOpen }">
          <NuxtLink to="/" class="nav-link" @click="closeMenu">Accueil</NuxtLink>
          <NuxtLink to="/projets" class="nav-link" @click="closeMenu">Projets</NuxtLink>
          <NuxtLink to="/experiences" class="nav-link" @click="closeMenu">Expériences</NuxtLink>
          <NuxtLink to="/formations" class="nav-link" @click="closeMenu">Formation</NuxtLink>
          <NuxtLink to="/contact" class="nav-link" @click="closeMenu">Contact</NuxtLink>
        </div>
        
        <button 
          class="navbar-burger" 
          :class="{ 'is-active': isMenuOpen }"
          @click="toggleMenu"
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <!-- Contenu principal -->
    <main class="main-content">
      <!-- Particules de fond (configurables via nuxt.config.ts) -->
      <div v-if="particles.length > 0" class="background-particles">
        <div
          v-for="(particle, index) in particles"
          :key="`particle-${index}`"
          :class="particle.class"
          :style="particle.style"
        ></div>
      </div>
      
      <!-- Slot pour le contenu des pages -->
      <slot />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <p class="footer-text">
            © {{ currentYear }} Portfolio. Fait avec ❤️ et Vue.js
          </p>
          <!-- Affichage du thème en mode développeur -->
          <div v-if="isDev && themeInfo" class="footer-theme-info">
            <span class="theme-indicator">🎨 {{ themeInfo.displayName }}</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { getParticles, getThemeInfo, debugTheme } = useTheme()
const config = useRuntimeConfig()

const isMenuOpen = ref(false)
const currentYear = new Date().getFullYear()

// Récupérer les particules selon la configuration
const particles = computed(() => getParticles.value)

// Informations sur le thème (pour le debug en développement)
const themeInfo = computed(() => getThemeInfo.value)
const isDev = computed(() => config.public.themeOptions.devMode)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Debug du thème en mode développement
onMounted(() => {
  if (config.public.themeOptions.devMode) {
    setTimeout(() => {
      debugTheme()
    }, 1000)
  }
})
</script>

<style scoped>
.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  @apply fixed top-0 left-0 right-0 z-50;
  background: var(--background-secondary);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
}

.navbar-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  @apply flex items-center justify-between h-16;
}

.navbar-brand {
  @apply text-xl font-bold;
  color: var(--text-primary);
  text-decoration: none;
}

.brand-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar-menu {
  @apply hidden md:flex md:items-center md:space-x-8;
}

.navbar-menu.is-active {
  @apply flex flex-col absolute top-16 left-0 right-0;
  background: var(--background-secondary);
  border-bottom: 1px solid var(--border-color);
  @apply p-4 space-y-4 md:hidden;
}

.navbar-burger {
  @apply md:hidden flex flex-col justify-center items-center w-8 h-8;
  background: none;
  border: none;
  cursor: pointer;
}

.navbar-burger span {
  @apply block w-5 h-0.5 mb-1 last:mb-0 transition-all duration-300;
  background-color: var(--text-primary);
}

.navbar-burger.is-active span:first-child {
  transform: rotate(45deg) translate(5px, 5px);
}

.navbar-burger.is-active span:nth-child(2) {
  opacity: 0;
}

.navbar-burger.is-active span:last-child {
  transform: rotate(-45deg) translate(7px, -6px);
}

.main-content {
  @apply flex-1 relative;
  padding-top: 4rem; /* Compenser la navbar fixe */
}

.background-particles {
  @apply absolute inset-0 pointer-events-none overflow-hidden;
  z-index: -1;
}

.footer {
  @apply mt-auto;
  background: var(--background-secondary);
  border-top: 1px solid var(--border-color);
}

.footer-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8;
}

.footer-content {
  @apply flex flex-col md:flex-row justify-between items-center;
}

.footer-text {
  @apply text-sm;
  color: var(--text-secondary);
}

.footer-theme-info {
  @apply mt-2 md:mt-0;
}

.theme-indicator {
  @apply text-xs px-2 py-1 rounded-md;
  background: var(--background-tertiary);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    padding-top: 4rem;
  }
}
</style>