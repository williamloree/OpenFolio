<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-theme-secondary/80 backdrop-blur-md border-b border-theme theme-transition"
  >
    <nav class="max-w-6xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo/Brand -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div
            class="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-theme-glow"
          >
            <span class="text-white font-bold text-lg">P</span>
          </div>
          <span class="text-theme-primary font-semibold text-xl hidden sm:block group-hover:text-theme-secondary transition-colors"
            >Portfolio</span
          >
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            to="/"
            class="nav-link text-theme-secondary hover:text-theme-primary transition-colors duration-200 relative group"
          >
            <span>Accueil</span>
            <div
              class="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300"
              :style="{ backgroundColor: 'var(--primary-color)' }"
            ></div>
          </NuxtLink>

          <NuxtLink
            to="/experiences"
            class="nav-link text-theme-secondary hover:text-theme-primary transition-colors duration-200 relative group"
          >
            <span>Expériences</span>
            <div
              class="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300"
              :style="{ backgroundColor: 'var(--primary-color)' }"
            ></div>
          </NuxtLink>

          <NuxtLink
            to="/projets"
            class="nav-link text-theme-secondary hover:text-theme-primary transition-colors duration-200 relative group"
          >
            <span>Projets</span>
            <div
              class="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300"
              :style="{ backgroundColor: 'var(--primary-color)' }"
            ></div>
          </NuxtLink>

          <NuxtLink
            to="/formations"
            class="nav-link text-theme-secondary hover:text-theme-primary transition-colors duration-200 relative group"
          >
            <span>Formations</span>
            <div
              class="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300"
              :style="{ backgroundColor: 'var(--primary-color)' }"
            ></div>
          </NuxtLink>

          <a
            href="mailto:votre.email@example.com"
            class="btn-theme-primary hover-glow transition-all duration-200 transform hover:scale-105"
          >
            Contact
          </a>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden text-theme-secondary hover:text-theme-primary p-2 rounded-lg bg-theme-tertiary hover:bg-theme-secondary transition-colors"
        >
          <svg
            v-if="!isMobileMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden mt-4 py-4 border-t border-theme bg-theme-secondary/50 rounded-lg backdrop-blur-sm"
        >
          <div class="flex flex-col space-y-4 px-4">
            <NuxtLink
              to="/"
              class="text-theme-secondary hover:text-theme-primary transition-colors duration-200 py-2 hover:bg-theme-tertiary rounded-lg px-3"
              @click="closeMobileMenu"
            >
              Accueil
            </NuxtLink>

            <NuxtLink
              to="/experiences"
              class="text-theme-secondary hover:text-theme-primary transition-colors duration-200 py-2 hover:bg-theme-tertiary rounded-lg px-3"
              @click="closeMobileMenu"
            >
              Expériences
            </NuxtLink>

            <NuxtLink
              to="/projets"
              class="text-theme-secondary hover:text-theme-primary transition-colors duration-200 py-2 hover:bg-theme-tertiary rounded-lg px-3"
              @click="closeMobileMenu"
            >
              Projets
            </NuxtLink>

            <NuxtLink
              to="/formations"
              class="text-theme-secondary hover:text-theme-primary transition-colors duration-200 py-2 hover:bg-theme-tertiary rounded-lg px-3"
              @click="closeMobileMenu"
            >
              Formations
            </NuxtLink>

            <a
              href="mailto:votre.email@example.com"
              class="btn-theme-primary text-center mt-4 block"
            >
              Contact
            </a>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- Indicateur de progression de scroll -->
    <div 
      class="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
      :style="{ 
        width: `${scrollProgress}%`, 
        backgroundColor: 'var(--accent-color)',
        boxShadow: `0 0 10px var(--accent-color)`
      }"
    ></div>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false);
const scrollProgress = ref(0);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Gestion du scroll pour la barre de progression
const updateScrollProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = (scrollTop / docHeight) * 100;
};

// Fermer le menu mobile lors du changement de route
const route = useRoute();
watch(
  () => route.path,
  () => {
    closeMobileMenu();
  }
);

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress);
});
</script>