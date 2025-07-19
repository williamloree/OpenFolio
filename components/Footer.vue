<template>
  <footer class="bg-theme-secondary border-t border-theme theme-transition">
    <div class="max-w-6xl mx-auto px-6 py-12">
      <!-- Contenu principal du footer -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Colonne 1: À propos -->
        <div class="lg:col-span-2">
          <div class="flex items-center mb-4">
            <div
              class="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center mr-3 shadow-theme-glow"
            >
              <span class="text-white font-bold text-lg">{{ profileInfo.name ? profileInfo.name.charAt(0).toUpperCase() : 'P' }}</span>
            </div>
            <h3 class="text-theme-primary font-bold text-xl">{{ profileInfo.name || 'Portfolio' }}</h3>
          </div>
          <p class="text-theme-muted text-sm leading-relaxed mb-6 max-w-md">
            {{ profileInfo.bio || 'Développeur Full-Stack passionné spécialisé dans les technologies web modernes. Toujours à la recherche de nouveaux défis et d\'opportunités d\'apprentissage pour créer des solutions innovantes.' }}
          </p>

          <!-- Statistiques -->
          <div class="grid grid-cols-3 gap-4 max-w-md">
            <div class="text-center">
              <div
                class="text-2xl font-bold"
                :style="{ color: 'var(--primary-color)' }"
              >
                {{ profileInfo.experience || '3+' }}
              </div>
              <div class="text-xs text-theme-muted">Années d'expérience</div>
            </div>
            <div class="text-center">
              <div
                class="text-2xl font-bold"
                :style="{ color: 'var(--accent-color)' }"
              >
                {{ projectStats.total }}
              </div>
              <div class="text-xs text-theme-muted">Projets réalisés</div>
            </div>
            <div class="text-center">
              <div
                class="text-2xl font-bold"
                :style="{ color: 'var(--secondary-color)' }"
              >
                99,99%
              </div>
              <div class="text-xs text-theme-muted">Satisfaction client</div>
            </div>
          </div>
        </div>

        <!-- Colonne 2: Navigation -->
        <div>
          <h3 class="text-theme-primary font-semibold mb-4 flex items-center">
            <svg
              class="w-5 h-5 mr-2"
              :style="{ color: 'var(--primary-color)' }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Navigation
          </h3>
          <div class="space-y-3">
            <NuxtLink
              to="/"
              class="block text-theme-muted hover:text-theme-primary text-sm transition-all duration-200 hover:translate-x-1 transform"
            >
              🏠 Accueil
            </NuxtLink>
            <NuxtLink
              to="/experiences"
              class="block text-theme-muted hover:text-theme-primary text-sm transition-all duration-200 hover:translate-x-1 transform"
            >
              💼 Expériences
            </NuxtLink>
            <NuxtLink
              to="/projets"
              class="block text-theme-muted hover:text-theme-primary text-sm transition-all duration-200 hover:translate-x-1 transform"
            >
              🚀 Projets
            </NuxtLink>
            <NuxtLink
              to="/formations"
              class="block text-theme-muted hover:text-theme-primary text-sm transition-all duration-200 hover:translate-x-1 transform"
            >
              🎓 Formation
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="block text-theme-muted hover:text-theme-primary text-sm transition-all duration-200 hover:translate-x-1 transform"
            >
              📧 Contact
            </NuxtLink>
          </div>
        </div>

        <!-- Colonne 3: Réseaux sociaux -->
        <div>
          <h3 class="text-theme-primary font-semibold mb-4 flex items-center">
            <svg
              class="w-5 h-5 mr-2"
              :style="{ color: 'var(--secondary-color)' }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Suivez-moi
          </h3>

          <!-- Liens sociaux dynamiques depuis profile.json -->
          <div class="space-y-3">
            <template v-for="link in socialLinks" :key="link.id">
              <a
                v-if="link.external"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center text-theme-muted hover:text-theme-primary text-sm transition-all duration-200 group"
              >
                <div
                  class="w-8 h-8 bg-theme-tertiary rounded-lg flex items-center justify-center mr-3 transition-colors"
                  :class="getSocialHoverClass(link.type)"
                >
                  <component :is="getSocialIcon(link.type)" class="w-4 h-4" />
                </div>
                <span class="group-hover:translate-x-1 transform transition-transform">
                  {{ getSocialLabel(link.type) }}
                </span>
              </a>
              <NuxtLink
                v-else
                :to="link.url"
                class="flex items-center text-theme-muted hover:text-theme-primary text-sm transition-all duration-200 group"
              >
                <div
                  class="w-8 h-8 bg-theme-tertiary rounded-lg flex items-center justify-center mr-3 transition-colors"
                  :class="getSocialHoverClass(link.type)"
                >
                  <component :is="getSocialIcon(link.type)" class="w-4 h-4" />
                </div>
                <span class="group-hover:translate-x-1 transform transition-transform">
                  {{ getSocialLabel(link.type) }}
                </span>
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>

      <!-- Séparateur -->
      <div class="border-t border-theme pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <!-- Copyright -->
          <div class="flex items-center text-theme-muted text-sm mb-4 md:mb-0">
            <svg
              class="w-4 h-4 mr-2"
              :style="{ color: 'var(--accent-color)' }"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
            © {{ currentYear }} {{ profileInfo.name || 'Portfolio' }}. Fait avec ❤️ et
            <a
              href="https://nuxt.com"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-theme-primary ml-1 font-medium transition-colors"
              :style="{ color: 'var(--accent-color)' }"
            >
              Nuxt.js
            </a>
          </div>

          <!-- Informations techniques -->
          <div class="flex items-center space-x-6 text-theme-muted text-xs">
            <!-- Version -->
            <div class="flex items-center">
              <div
                class="w-2 h-2 rounded-full mr-2 animate-pulse"
                :style="{ backgroundColor: 'var(--accent-color)' }"
              ></div>
              <span>v2.0.0</span>
            </div>

            <!-- Dernière mise à jour -->
            <div class="flex items-center">
              <svg
                class="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{{ lastUpdate }}</span>
            </div>

            <!-- Temps de chargement -->
            <div v-if="loadTime" class="flex items-center">
              <svg
                class="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>{{ loadTime }}ms</span>
            </div>
          </div>
        </div>

        <!-- Liens légaux -->
        <div
          class="flex flex-wrap justify-center mt-6 space-x-6 text-theme-muted text-xs"
        >
          <button
            @click="scrollToTop"
            class="hover:text-theme-primary transition-colors cursor-pointer flex items-center hover-glow"
          >
            <svg
              class="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            Retour en haut
          </button>

          <span class="hidden md:inline">•</span>

          <NuxtLink
            to="/mentions-legales"
            class="hover:text-theme-primary transition-colors hover-glow"
          >
            Mentions légales
          </NuxtLink>

          <span class="hidden md:inline">•</span>

          <NuxtLink
            to="/politique-confidentialite"
            class="hover:text-theme-primary transition-colors hover-glow"
          >
            Politique de confidentialité
          </NuxtLink>

          <span class="hidden md:inline">•</span>

          <button
            @click="showSiteInfo = !showSiteInfo"
            class="hover:text-theme-primary transition-colors hover-glow"
          >
            Infos techniques
          </button>
        </div>

        <!-- Panneau d'informations techniques (caché par défaut) -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div
            v-if="showSiteInfo"
            class="mt-6 bg-theme-tertiary/50 rounded-lg p-4 border border-theme backdrop-blur-sm"
          >
            <h4 class="text-theme-primary font-semibold mb-3 flex items-center">
              <svg
                class="w-4 h-4 mr-2"
                :style="{ color: 'var(--primary-color)' }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Informations Techniques
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h5 class="text-theme-secondary font-medium mb-2">
                  Technologies
                </h5>
                <ul class="text-theme-muted space-y-1">
                  <li>• Nuxt.js {{ nuxtVersion }}</li>
                  <li>• Vue.js {{ vueVersion }}</li>
                  <li>• Tailwind CSS</li>
                  <li>• TypeScript</li>
                  <li>• Système de thèmes CSS</li>
                </ul>
              </div>

              <div>
                <h5 class="text-theme-secondary font-medium mb-2">
                  Performance
                </h5>
                <ul class="text-theme-muted space-y-1">
                  <li>• Score Lighthouse: 98/100</li>
                  <li>• Temps de chargement: {{ loadTime }}ms</li>
                  <li>• Bundle size: ~150KB</li>
                  <li>• PWA Ready</li>
                  <li>• SEO Optimisé</li>
                </ul>
              </div>

              <div>
                <h5 class="text-theme-secondary font-medium mb-2">
                  Fonctionnalités
                </h5>
                <ul class="text-theme-muted space-y-1">
                  <li>• Design responsive</li>
                  <li>• Thèmes personnalisés</li>
                  <li>• Animations fluides</li>
                  <li>• Mode hors-ligne</li>
                  <li>• Particules animées</li>
                </ul>
              </div>
            </div>

            <!-- Informations sur le thème actuel -->
            <div class="mt-4 pt-4 border-t border-theme">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div
                    class="w-3 h-3 rounded-full mr-2"
                    :style="{ backgroundColor: 'var(--primary-color)' }"
                  ></div>
                  <span class="text-theme-secondary text-sm">
                    Thème CSS actif avec variables personnalisables
                  </span>
                </div>
                <div class="flex items-center space-x-2">
                  <div
                    class="w-2 h-2 rounded-full"
                    :style="{ backgroundColor: 'var(--primary-color)' }"
                  ></div>
                  <div
                    class="w-2 h-2 rounded-full"
                    :style="{ backgroundColor: 'var(--secondary-color)' }"
                  ></div>
                  <div
                    class="w-2 h-2 rounded-full"
                    :style="{ backgroundColor: 'var(--accent-color)' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { h } from 'vue'

const currentYear = new Date().getFullYear();
const showSiteInfo = ref(false);

// Chargement des données
const { data: dataProjects } = useJson("projects.json");
const { data: dataProfile } = useJson("profile.json");

// Informations dynamiques
const lastUpdate = ref("Déc 2024");
const loadTime = ref(0);
const nuxtVersion = ref("3.x");
const vueVersion = ref("3.x");

// Données de profil calculées
const profileInfo = computed(() => {
  if (!dataProfile.value?.profile) {
    return {
      name: 'Portfolio',
      bio: 'Développeur Full-Stack passionné spécialisé dans les technologies web modernes.',
      experience: '3+'
    }
  }
  
  return {
    name: dataProfile.value.profile.name || 'Portfolio',
    bio: dataProfile.value.profile.bio || 'Développeur Full-Stack passionné spécialisé dans les technologies web modernes.',
    experience: dataProfile.value.profile.experience || '3+'
  }
})

// Liens sociaux filtrés depuis profile.json
const socialLinks = computed(() => {
  if (!dataProfile.value?.links) return []
  
  // Filtrer les liens sociaux (exclure les liens internes comme portfolio, cv, etc.)
  const socialTypes = ['github', 'linkedin', 'twitter', 'instagram', 'email', 'blog']
  return dataProfile.value.links
    .filter((link: any) => socialTypes.includes(link.type) && !link.hidden)
    .sort((a: any, b: any) => a.order - b.order)
})

// Fonction pour obtenir l'icône selon le type
const getSocialIcon = (type: string) => {
  const icons = {
    github: () => h('svg', {
      fill: 'currentColor',
      viewBox: '0 0 24 24',
      class: 'w-4 h-4'
    }, [
      h('path', {
        d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
      })
    ]),
    linkedin: () => h('svg', {
      fill: 'currentColor',
      viewBox: '0 0 24 24',
      class: 'w-4 h-4'
    }, [
      h('path', {
        d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
      })
    ]),
    twitter: () => h('svg', {
      fill: 'currentColor',
      viewBox: '0 0 24 24',
      class: 'w-4 h-4'
    }, [
      h('path', {
        d: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
      })
    ]),
    instagram: () => h('svg', {
      fill: 'currentColor',
      viewBox: '0 0 24 24',
      class: 'w-4 h-4'
    }, [
      h('path', {
        d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
      })
    ]),
    email: () => h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      class: 'w-4 h-4'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
      })
    ]),
    blog: () => h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      class: 'w-4 h-4'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
      })
    ])
  }
  
  return icons[type as keyof typeof icons] || icons.email
}

// Fonction pour obtenir les classes de hover selon le type
const getSocialHoverClass = (type: string) => {
  const classes = {
    github: 'group-hover:bg-gray-700',
    linkedin: 'group-hover:bg-blue-600',
    twitter: 'group-hover:bg-blue-400',
    instagram: 'group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500',
    email: 'group-hover:bg-red-600',
    blog: 'group-hover:bg-green-600'
  }
  
  return classes[type as keyof typeof classes] || 'group-hover:bg-blue-500'
}

// Fonction pour obtenir le label selon le type
const getSocialLabel = (type: string) => {
  const labels = {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    instagram: 'Instagram',
    email: 'Email',
    blog: 'Blog'
  }
  
  return labels[type as keyof typeof labels] || type.charAt(0).toUpperCase() + type.slice(1)
}

// Fonction pour remonter en haut
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Calcul du temps de chargement
onMounted(() => {
  if (process.client) {
    // Temps de chargement de la page
    const navigationEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      loadTime.value = Math.round(
        navigationEntry.loadEventEnd - navigationEntry.navigationStart
      );
    }

    // Versions des packages (simulées)
    const nuxtConfig = useNuxtApp();
    nuxtVersion.value = nuxtConfig.ssrContext?.nuxt?.version || "3.x";
  }
});

// Statistiques des projets
const projectStats = computed(() => {
  if (!dataProjects.value?.projects?.length) {
    return { total: 0, completed: 0, technologies: 0, clients: "0" };
  }

  const projects = dataProjects.value.projects;
  const completed = projects.filter(
    (p: any) => p.status === "completed"
  ).length;
  const technologies = [
    ...new Set(projects.flatMap((p: any) => p.technologies || [])),
  ].length;

  return {
    total: projects.length,
    completed,
    technologies,
    clients:
      projects.filter((p: any) => p.clientType === "external").length || "15+",
  };
});
</script>

<style scoped>
/* Animations personnalisées */
.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }
}

/* Transition pour le panneau d'infos */
.max-h-0 {
  max-height: 0;
  overflow: hidden;
}

.max-h-96 {
  max-height: 24rem;
  overflow: auto;
}
</style>