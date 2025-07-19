<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800"
  >
    <nav class="max-w-6xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo/Brand -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div
            class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <span class="text-white font-bold text-lg">P</span>
          </div>
          <span class="text-white font-semibold text-xl hidden sm:block"
            >Portfolio</span
          >
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            to="/"
            class="text-gray-300 hover:text-white transition-colors duration-200 relative group"
          >
            <span>Accueil</span>
            <div
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"
            ></div>
          </NuxtLink>

          <NuxtLink
            to="/experiences"
            class="text-gray-300 hover:text-white transition-colors duration-200 relative group"
          >
            <span>Expériences</span>
            <div
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"
            ></div>
          </NuxtLink>

          <NuxtLink
            to="/projets"
            class="text-gray-300 hover:text-white transition-colors duration-200 relative group"
          >
            <span>Projets</span>
            <div
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"
            ></div>
          </NuxtLink>

          <NuxtLink
            to="/formations"
            class="text-gray-300 hover:text-white transition-colors duration-200 relative group"
          >
            <span>Formation</span>
            <div
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"
            ></div>
          </NuxtLink>

          <a
            href="mailto:votre.email@example.com"
            class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Contact
          </a>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden text-gray-300 hover:text-white p-2"
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
          class="md:hidden mt-4 py-4 border-t border-gray-800"
        >
          <div class="flex flex-col space-y-4">
            <NuxtLink
              to="/"
              class="text-gray-300 hover:text-white transition-colors duration-200 py-2"
              @click="closeMobileMenu"
            >
              Accueil
            </NuxtLink>

            <NuxtLink
              to="/experiences"
              class="text-gray-300 hover:text-white transition-colors duration-200 py-2"
              @click="closeMobileMenu"
            >
              Expériences
            </NuxtLink>

            <NuxtLink
              to="/projets"
              class="text-gray-300 hover:text-white transition-colors duration-200 py-2"
              @click="closeMobileMenu"
            >
              Projets
            </NuxtLink>

            <NuxtLink
              to="/formations"
              class="text-gray-300 hover:text-white transition-colors duration-200 py-2"
              @click="closeMobileMenu"
            >
              Formation
            </NuxtLink>

            <a
              href="mailto:votre.email@example.com"
              class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-center mt-4"
            >
              Contact
            </a>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Fermer le menu mobile lors du changement de route
const route = useRoute();
watch(
  () => route.path,
  () => {
    closeMobileMenu();
  }
);
</script>
