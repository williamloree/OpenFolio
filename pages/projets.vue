<template>
  <div class="min-h-screen bg-black text-white">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <!-- En-tête de section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Mes Projets
        </h1>
        <p class="text-gray-400 text-lg max-w-3xl mx-auto">
          Découvrez une sélection de mes réalisations les plus marquantes. 
          Chaque projet reflète ma passion pour l'innovation et l'excellence technique.
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-20">
        <div class="text-red-400 mb-4">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-bold mb-2">Erreur de chargement</h3>
          <p class="text-gray-400">{{ error }}</p>
        </div>
      </div>

      <!-- Contenu principal -->
      <div v-else-if="data?.projects?.length">
        <!-- Filtres -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button
            v-for="filter in filters"
            :key="filter.id"
            @click="activeFilter = filter.id"
            :class="[
              'px-6 py-3 rounded-full transition-all duration-300 font-medium',
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            ]"
          >
            <span class="mr-2">{{ filter.icon }}</span>
            {{ filter.name }}
          </button>
        </div>

        <!-- Grille de projets -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <TransitionGroup
            name="project"
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-8"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
            move-class="transition duration-300 ease-in-out"
          >
            <div
              v-for="project in filteredProjects"
              :key="project.id"
              class="group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
              @click="openProjectModal(project)"
            >
              <!-- Image du projet -->
              <div class="relative h-48 overflow-hidden">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <!-- Badge de statut -->
                <div class="absolute top-4 right-4">
                  <span 
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      getStatusBadgeColor(project.status)
                    ]"
                  >
                    {{ getStatusText(project.status) }}
                  </span>
                </div>

                <!-- Overlay avec actions -->
                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div class="flex space-x-3">
                    <button
                      v-if="project.liveUrl"
                      @click.stop="openUrl(project.liveUrl)"
                      class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      title="Voir le projet"
                    >
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                    <button
                      v-if="project.githubUrl"
                      @click.stop="openUrl(project.githubUrl)"
                      class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      title="Code source"
                    >
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Contenu de la carte -->
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {{ project.title }}
                  </h3>
                  <div class="flex items-center text-gray-400 text-sm">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z" />
                    </svg>
                    {{ project.year }}
                  </div>
                </div>

                <p class="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {{ project.description }}
                </p>

                <!-- Technologies utilisées -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    v-for="tech in project.technologies.slice(0, 3)"
                    :key="tech"
                    :class="[
                      'px-2 py-1 rounded-md text-xs border',
                      getTechColor(tech)
                    ]"
                  >
                    {{ tech }}
                  </span>
                  <span
                    v-if="project.technologies.length > 3"
                    class="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-md text-xs border border-gray-500/30"
                  >
                    +{{ project.technologies.length - 3 }}
                  </span>
                </div>

                <!-- Métriques du projet -->
                <div v-if="project.metrics" class="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                  <div class="text-center">
                    <div class="text-lg font-bold text-cyan-400">{{ project.metrics.duration }}</div>
                    <div class="text-xs text-gray-500">Durée</div>
                  </div>
                  <div class="text-center">
                    <div class="text-lg font-bold text-green-400">{{ project.metrics.team }}</div>
                    <div class="text-xs text-gray-500">Équipe</div>
                  </div>
                  <div class="text-center">
                    <div class="text-lg font-bold text-purple-400">{{ project.metrics.impact }}</div>
                    <div class="text-xs text-gray-500">Impact</div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Section statistiques -->
        <div class="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 mb-16">
          <h2 class="text-2xl font-bold text-center mb-8 text-white">
            Statistiques des Projets
          </h2>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-cyan-400 mb-2">{{ projectStats.total }}</div>
              <div class="text-gray-400 text-sm">Projets réalisés</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-400 mb-2">{{ projectStats.completed }}</div>
              <div class="text-gray-400 text-sm">Terminés</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-400 mb-2">{{ projectStats.technologies }}</div>
              <div class="text-gray-400 text-sm">Technologies</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-400 mb-2">{{ projectStats.clients }}</div>
              <div class="text-gray-400 text-sm">Clients satisfaits</div>
            </div>
          </div>
        </div>

        <!-- Call to action -->
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-4 text-white">
            Vous avez un projet en tête ?
          </h2>
          <p class="text-gray-400 mb-8 max-w-2xl mx-auto">
            Je serais ravi de discuter de votre prochain projet et de voir comment nous pouvons créer quelque chose d'extraordinaire ensemble.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:votre.email@example.com"
              class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center font-medium"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Discutons de votre projet
            </a>
            <NuxtLink
              to="/experiences"
              class="px-8 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-200 inline-flex items-center justify-center font-medium"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2h-4a2 2 0 00-2-2V6m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6" />
              </svg>
              Voir mes expériences
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- État vide -->
      <div v-else class="text-center py-20">
        <div class="text-gray-500 mb-4">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 class="text-xl font-bold mb-2 text-white">Aucun projet trouvé</h3>
          <p class="text-gray-400">Les projets seront bientôt disponibles.</p>
        </div>
      </div>
    </div>

    <!-- Modal de détail du projet -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selectedProject"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        @click="closeProjectModal"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="selectedProject"
            class="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
            @click.stop
          >
            <!-- Header du modal -->
            <div class="relative">
              <img
                :src="selectedProject.image"
                :alt="selectedProject.title"
                class="w-full h-64 object-cover rounded-t-2xl"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-2xl"></div>
              <button
                @click="closeProjectModal"
                class="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Contenu du modal -->
            <div class="p-8">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-3xl font-bold text-white">{{ selectedProject.title }}</h2>
                <span 
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-medium',
                    getStatusBadgeColor(selectedProject.status)
                  ]"
                >
                  {{ getStatusText(selectedProject.status) }}
                </span>
              </div>

              <p class="text-gray-300 text-lg mb-8 leading-relaxed">
                {{ selectedProject.fullDescription || selectedProject.description }}
              </p>

              <!-- Technologies complètes -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-white mb-4">Technologies utilisées</h3>
                <div class="flex flex-wrap gap-3">
                  <span
                    v-for="tech in selectedProject.technologies"
                    :key="tech"
                    :class="[
                      'px-4 py-2 rounded-lg text-sm border',
                      getTechColor(tech)
                    ]"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Fonctionnalités -->
              <div v-if="selectedProject.features?.length" class="mb-8">
                <h3 class="text-xl font-semibold text-white mb-4">Fonctionnalités clés</h3>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li
                    v-for="feature in selectedProject.features"
                    :key="feature"
                    class="flex items-center text-gray-300"
                  >
                    <svg class="w-5 h-5 mr-3 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ feature }}
                  </li>
                </ul>
              </div>

              <!-- Métriques détaillées -->
              <div v-if="selectedProject.metrics" class="mb-8">
                <h3 class="text-xl font-semibold text-white mb-4">Métriques du projet</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-gray-800/50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-cyan-400 mb-1">{{ selectedProject.metrics.duration }}</div>
                    <div class="text-gray-400 text-sm">Durée de développement</div>
                  </div>
                  <div class="bg-gray-800/50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-green-400 mb-1">{{ selectedProject.metrics.team }}</div>
                    <div class="text-gray-400 text-sm">Taille de l'équipe</div>
                  </div>
                  <div class="bg-gray-800/50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-purple-400 mb-1">{{ selectedProject.metrics.impact }}</div>
                    <div class="text-gray-400 text-sm">Impact/Résultat</div>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row gap-4">
                <a
                  v-if="selectedProject.liveUrl"
                  :href="selectedProject.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center font-medium"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Voir le projet
                </a>
                <a
                  v-if="selectedProject.githubUrl"
                  :href="selectedProject.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-200 inline-flex items-center justify-center font-medium"
                >
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Code source
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useJson } from '~/utils/useJson'

// Configuration SEO
useHead({
  title: 'Mes Projets - Portfolio',
  meta: [
    { name: 'description', content: 'Découvrez mes projets de développement web et applications. Réalisations en Vue.js, Nuxt.js, React et bien plus.' },
    { property: 'og:title', content: 'Mes Projets - Portfolio' },
    { property: 'og:description', content: 'Portfolio de projets innovants et solutions créatives.' }
  ]
})

// Chargement des données depuis JSON
const { data, error, loading } = useJson('projects.json')

// État des filtres et modal
const activeFilter = ref('all')
const selectedProject = ref(null)

// Filtres disponibles (générés dynamiquement depuis les données)
const filters = computed(() => {
  if (!data.value?.projects?.length) {
    return [{ id: 'all', name: 'Tous', icon: '🎯' }]
  }

  const categories = [...new Set(data.value.projects.map(p => p.category))]
  const filterMap = {
    'web': { name: 'Applications Web', icon: '🌐' },
    'mobile': { name: 'Mobile', icon: '📱' },
    'ecommerce': { name: 'E-commerce', icon: '🛒' },
    'dashboard': { name: 'Dashboards', icon: '📊' },
    'api': { name: 'API', icon: '⚡' },
    'desktop': { name: 'Desktop', icon: '💻' }
  }

  return [
    { id: 'all', name: 'Tous', icon: '🎯' },
    ...categories.map(cat => ({
      id: cat,
      name: filterMap[cat]?.name || cat,
      icon: filterMap[cat]?.icon || '📦'
    }))
  ]
})

// Projets filtrés
const filteredProjects = computed(() => {
  if (!data.value?.projects?.length) return []
  
  if (activeFilter.value === 'all') {
    return data.value.projects
  }
  return data.value.projects.filter(project => project.category === activeFilter.value)
})

// Statistiques des projets
const projectStats = computed(() => {
  if (!data.value?.projects?.length) {
    return { total: 0, completed: 0, technologies: 0, clients: '0' }
  }

  const projects = data.value.projects
  const completed = projects.filter(p => p.status === 'completed').length
  const technologies = [...new Set(projects.flatMap(p => p.technologies || []))].length
  
  return {
    total: projects.length,
    completed,
    technologies,
    clients: projects.filter(p => p.clientType === 'external').length || '15+'
  }
})

// Fonctions utilitaires
const getStatusText = (status: string) => {
  const statusMap = {
    'completed': 'Terminé',
    'in-progress': 'En cours',
    'planned': 'Planifié',
    'paused': 'En pause',
    'archived': 'Archivé'
  }
  return statusMap[status] || status
}

const getStatusBadgeColor = (status: string) => {
  const colorMap = {
    'completed': 'bg-green-500/20 text-green-300 border border-green-500/30',
    'in-progress': 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    'planned': 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    'paused': 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    'archived': 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
  return colorMap[status] || 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
}

const getTechColor = (tech: string) => {
  const techColors: Record<string, string> = {
    'Vue.js': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Nuxt.js': 'bg-green-500/20 text-green-300 border-green-500/30',
    'React': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Next.js': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Angular': 'bg-red-500/20 text-red-300 border-red-500/30',
    'Node.js': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Express': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'TypeScript': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Python': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Django': 'bg-green-500/20 text-green-300 border-green-500/30',
    'FastAPI': 'bg-green-500/20 text-green-300 border-green-500/30',
    'MongoDB': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'PostgreSQL': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'MySQL': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'Redis': 'bg-red-500/20 text-red-300 border-red-500/30',
    'Docker': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'AWS': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'Firebase': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Stripe': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Tailwind CSS': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'Bootstrap': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Sass': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    'GraphQL': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    'REST API': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Socket.io': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    'React Native': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Flutter': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Electron': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  }
  
  return techColors[tech] || 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
}

const openUrl = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const openProjectModal = (project: any) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeProjectModal = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto'
}

// Cleanup au unmount
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})

// Animation au scroll
onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp')
      }
    })
  }, observerOptions)

  // Observer les cartes de projets
  const projectCards = document.querySelectorAll('.group')
  projectCards.forEach((card) => observer.observe(card))
})
</script>

<style scoped>
/* Limitation du nombre de lignes pour la description */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animations pour les transitions de projets */
.project-enter-active,
.project-leave-active {
  transition: all 0.5s ease;
}

.project-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

.project-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.project-move {
  transition: transform 0.3s ease;
}

/* Animation d'entrée */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Effets hover personnalisés */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Responsive design */
@media (max-width: 768px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }
  
  .text-3xl {
    font-size: 1.875rem;
  }
  
  .text-lg {
    font-size: 1rem;
  }
}

/* Scrollbar personnalisée pour le modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}

/* Optimisations de performance */
.group {
  contain: layout style paint;
  will-change: transform;
}

/* Accessibilité */
@media (prefers-reduced-motion: reduce) {
  .transition,
  .transition-all,
  .transition-transform,
  .transition-opacity {
    transition-duration: 0.01ms !important;
  }
  
  .animate-fadeInUp {
    animation: none !important;
  }
}
</style>