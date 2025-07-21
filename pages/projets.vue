<template>
  <div class="min-h-screen text-theme-primary my-10">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <!-- En-tête de section -->
      <div class="text-center mb-16">
        <h1
          class="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent"
          style="
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          "
        >
          Mes Projets
        </h1>
        <p class="text-theme-muted text-lg max-w-3xl mx-auto">
          Découvrez une sélection de mes réalisations les plus marquantes.
          Chaque projet reflète ma passion pour l'innovation et l'excellence
          technique.
        </p>
      </div>

      <!-- Loading state amélioré -->
      <div
        v-if="loading || !isMounted"
        class="flex flex-col justify-center items-center py-20"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-theme mb-4"
          :style="{ borderColor: 'var(--primary-color)' }"
        ></div>
        <p class="text-theme-secondary">{{ loadingMessage }}</p>

        <!-- Timeout fallback -->
        <div v-if="showTimeoutWarning" class="mt-4 text-center">
          <p class="text-orange-400 text-sm mb-2">
            Le chargement prend plus de temps que prévu...
          </p>
          <button @click="forceReload" class="btn-theme-secondary text-sm">
            Réessayer
          </button>
        </div>
      </div>

      <!-- Error state amélioré -->
      <div v-else-if="error" class="text-center py-20">
        <div class="text-red-400 mb-4">
          <svg
            class="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 class="text-xl font-bold mb-2">Erreur de chargement</h3>
          <p class="text-theme-muted mb-4">{{ error }}</p>
          <button @click="retry" class="btn-theme-primary">
            <Icon name="ph:arrow-clockwise" class="w-4 h-4 mr-2" />
            Réessayer
          </button>
        </div>
      </div>

      <!-- Fallback si pas de projets -->
      <div v-else-if="!data?.projects?.length" class="text-center py-20">
        <div class="text-theme-muted mb-4">
          <Icon name="ph:folder-open" class="w-16 h-16 mx-auto mb-4" />
          <h3 class="text-xl font-bold mb-2">Aucun projet trouvé</h3>
          <p>Les projets seront bientôt disponibles.</p>
        </div>
      </div>

      <!-- Contenu principal -->
      <div v-else>
        <!-- Filtres -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button
            v-for="filter in filters"
            :key="filter.id"
            @click="activeFilter = filter.id"
            :class="[
              'px-6 py-3 rounded-full transition-all duration-300 font-medium',
              activeFilter === filter.id
                ? 'bg-theme-primary text-white shadow-theme-glow'
                : 'bg-theme-secondary text-theme-secondary hover:bg-theme-tertiary hover:text-theme-primary',
            ]"
          >
            <span class="mr-2">{{ filter.icon }}</span>
            {{ filter.name }}
          </button>
        </div>

        <!-- Grille de projets -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <TransitionGroup
            name="project"
            tag="div"
            class="contents"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
          >
            <div
              v-for="(project, index) in filteredProjects"
              :key="project.id"
              :data-index="index"
              class="card-theme p-6 hover:scale-105 transition-all duration-300 cursor-pointer group"
              @click="selectedProject = project"
            >
              <!-- Image du projet -->
              <div class="relative mb-4 overflow-hidden rounded-lg">
                <img
                  :src="project.image || '/images/placeholder-project.jpg'"
                  :alt="project.title"
                  class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  @error="handleImageError"
                />

                <span
                  class="absolute top-2 right-2 z-50"
                  :class="[
                    'px-2 py-1 rounded-full text-base font-medium',
                    project.status === 'completed'
                      ? 'bg-green-500'
                      : project.status === 'in-progress'
                      ? 'bg-yellow-500 '
                      : 'bg-blue-500 ',
                  ]"
                >
                  {{ getStatusLabel(project.status) }}
                </span>
                <div
                  class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <Icon name="ph:eye" class="w-8 h-8 text-white" />
                </div>
              </div>

              <!-- Contenu du projet -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h3
                    class="text-xl font-bold text-theme-primary group-hover:text-theme-secondary transition-colors"
                  >
                    {{ project.title }}
                  </h3>
                </div>

                <p class="text-theme-muted text-sm leading-relaxed">
                  {{ project.description }}
                </p>

                <!-- Technologies -->
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.technologies?.slice(0, 3)"
                    :key="tech"
                    class="px-2 py-1 bg-theme-tertiary text-theme-secondary rounded text-xs"
                  >
                    {{ tech }}
                  </span>
                  <span
                    v-if="project.technologies?.length > 3"
                    class="px-2 py-1 bg-theme-tertiary text-theme-muted rounded text-xs"
                  >
                    +{{ project.technologies.length - 3 }}
                  </span>
                </div>

                <!-- Actions -->
                <div class="flex space-x-3 pt-2">
                  <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 btn-theme-primary text-center text-sm py-2 flex justify-center items-center space-x-4"
                    @click.stop
                  >
                    <Icon name="ph:eye" class="w-4 h-4 mr-1" />
                    Demo
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 btn-theme-secondary text-center text-sm py-2 flex justify-center items-center space-x-4"
                    @click.stop
                  >
                    <Icon name="ph:github-logo" class="w-4 h-4 mr-1" />
                    Code
                  </a>
                  <a
                    v-if="!project.githubUrl && !project.liveUrl"
                    :href="`mailto:${profileInfo.email}`"
                    class="flex-1 btn-theme-secondary text-center text-sm py-2 flex justify-center items-center space-x-4"
                    @click.stop
                  >
                    <Icon name="material-symbols:mail" class="w-4 h-4 mr-1" />
                    Contactez-moi
                  </a>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Section statistiques -->
        <div
          class="bg-theme-secondary/30 backdrop-blur-sm rounded-2xl p-8 border border-theme mb-16"
        >
          <h2 class="text-2xl font-bold text-center mb-8 text-theme-primary">
            Statistiques des Projets
          </h2>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center">
              <div
                class="text-3xl font-bold mb-2"
                :style="{ color: 'var(--primary-color)' }"
              >
                {{ projectStats.total }}
              </div>
              <div class="text-theme-muted text-sm">Projets réalisés</div>
            </div>
            <div class="text-center">
              <div
                class="text-3xl font-bold mb-2"
                :style="{ color: 'var(--accent-color)' }"
              >
                {{ projectStats.completed }}
              </div>
              <div class="text-theme-muted text-sm">Terminés</div>
            </div>
            <div class="text-center">
              <div
                class="text-3xl font-bold mb-2"
                :style="{ color: 'var(--secondary-color)' }"
              >
                {{ projectStats.technologies }}
              </div>
              <div class="text-theme-muted text-sm">Technologies</div>
            </div>
            <div class="text-center">
              <div
                class="text-3xl font-bold mb-2"
                :style="{ color: 'var(--primary-color)' }"
              >
                {{ projectStats.clients }}
              </div>
              <div class="text-theme-muted text-sm">Clients satisfaits</div>
            </div>
          </div>
        </div>

        <!-- Call to action -->
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-4 text-theme-primary">
            Vous avez un projet en tête ?
          </h2>
          <p class="text-theme-muted mb-8 max-w-2xl mx-auto">
            Je serais ravi de discuter de votre prochain projet et de voir
            comment nous pouvons créer quelque chose d'extraordinaire ensemble.
          </p>
          <NuxtLink
            to="/contact"
            class="btn-theme-primary hover-glow transform hover:scale-105 inline-flex items-center justify-center"
          >
            <Icon name="ph:chat-circle" class="w-5 h-5 mr-2" />
            Discutons de votre projet
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Modal de projet (si sélectionné) -->
    <Teleport to="body">
      <div
        v-if="selectedProject"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        @click="selectedProject = null"
      >
        <div
          class="bg-theme-secondary rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-bold text-theme-primary">
              {{ selectedProject.title }}
            </h2>
            <button
              @click="selectedProject = null"
              class="text-theme-muted hover:text-theme-primary"
            >
              <Icon name="ph:x" class="w-6 h-6" />
            </button>
          </div>

          <img
            :src="selectedProject.image || '/images/placeholder-project.jpg'"
            :alt="selectedProject.title"
            class="w-full h-64 object-cover rounded-lg mb-4"
          />

          <p class="text-theme-secondary mb-4">
            {{ selectedProject.fullDescription || selectedProject.description }}
          </p>

          <div class="space-y-4">
            <div>
              <h3 class="font-semibold text-theme-primary mb-2">
                Technologies utilisées
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in selectedProject.technologies"
                  :key="tech"
                  class="px-3 py-1 bg-theme-tertiary text-theme-secondary rounded-full text-sm"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="flex space-x-4">
              <a
                v-if="selectedProject.demoUrl"
                :href="selectedProject.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-theme-primary"
              >
                <Icon name="ph:eye" class="w-4 h-4 mr-2" />
                Voir la démo
              </a>
              <a
                v-if="selectedProject.githubUrl"
                :href="selectedProject.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-theme-secondary"
              >
                <Icon name="ph:github-logo" class="w-4 h-4 mr-2" />
                Voir le code
              </a>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
// Configuration SEO
useHead({
  title: "Mes Projets - Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Découvrez mes projets et réalisations en développement web. Réalisations en Vue.js, Nuxt.js, React et bien plus.",
    },
    { property: "og:title", content: "Mes Projets - Portfolio" },
    {
      property: "og:description",
      content: "Portfolio de projets innovants et solutions créatives.",
    },
  ],
});

// Variables d'état
const activeFilter = ref("all");
const selectedProject = ref<any>(null);
const isMounted = ref(false);
const showDebug = ref(process.dev); // Afficher debug seulement en dev
const loadingMessage = ref("Chargement des projets...");
const showTimeoutWarning = ref(false);

// Chargement des données avec retry
const { data, error, loading, retry } = useJson("projects.json");
const { data: profileData, error: profileError, loading: profileLoading } = useJson('profile.json')

const profileInfo = computed(() => {
  if (!profileData.value?.profile) {
    return {
      name: 'Portfolio',
      email: 'contact@example.com',
      phone: '+33 6 12 34 56 78',
      location: 'Nice, France'
    }
  }
  
  return {
    name: profileData.value.profile.name || 'Portfolio',
    email: profileData.value.profile.email || 'contact@example.com',
    phone: profileData.value.profile.phone || '+33 6 12 34 56 78',
    location: profileData.value.profile.location || 'Nice, France'
  }
})

// Timer pour afficher l'avertissement de timeout
let timeoutTimer: NodeJS.Timeout;

// Force reload function
const forceReload = () => {
  console.log("🔄 Force reload des projets...");
  retry();
};

// Watcher pour gérer les messages de chargement
watch(loading, (isLoading) => {
  if (isLoading) {
    showTimeoutWarning.value = false;
    loadingMessage.value = "Chargement des projets...";

    // Afficher l'avertissement après 5 secondes
    timeoutTimer = setTimeout(() => {
      if (loading.value) {
        showTimeoutWarning.value = true;
        loadingMessage.value = "Connexion lente détectée...";
      }
    }, 5000);
  } else {
    clearTimeout(timeoutTimer);
    showTimeoutWarning.value = false;
  }
});

// Watcher pour débugger les changements de route
watch(
  () => useRoute().path,
  (newPath, oldPath) => {
    console.log(`🧭 Navigation: ${oldPath} → ${newPath}`);
    if (newPath === "/projets" && oldPath && oldPath !== "/projets") {
      console.log("📍 Arrivée sur /projets depuis", oldPath);
      // Force un petit délai pour laisser la page se stabiliser
      nextTick(() => {
        if (!data.value && !loading.value) {
          console.log("🔄 Relance du chargement après navigation");
          retry();
        }
      });
    }
  }
);

// Filtres disponibles (générés dynamiquement depuis les données)
const filters = computed(() => {
  if (!data.value?.projects?.length) {
    return [{ id: "all", name: "Tous", icon: "🎯" }];
  }

  const categories = [
    ...new Set(data.value.projects.map((p: any) => p.category)),
  ];
  const filterMap: Record<string, { name: string; icon: string }> = {
    web: { name: "Applications Web", icon: "🌐" },
    mobile: { name: "Mobile", icon: "📱" },
    ecommerce: { name: "E-commerce", icon: "🛒" },
    dashboard: { name: "Dashboards", icon: "📊" },
    api: { name: "API", icon: "⚡" },
    desktop: { name: "Desktop", icon: "💻" },
  };

  return [
    { id: "all", name: "Tous", icon: "🎯" },
    ...categories.map((cat: string) => ({
      id: cat,
      name: filterMap[cat]?.name || cat,
      icon: filterMap[cat]?.icon || "📦",
    })),
  ];
});

// Projets filtrés
const filteredProjects = computed(() => {
  if (!data.value?.projects?.length) return [];

  if (activeFilter.value === "all") {
    return data.value.projects;
  }
  return data.value.projects.filter(
    (project: any) => project.category === activeFilter.value
  );
});

// Statistiques des projets
const projectStats = computed(() => {
  if (!data.value?.projects?.length) {
    return { total: 0, completed: 0, technologies: 0, clients: "0" };
  }

  const projects = data.value.projects;
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
    clients: Math.ceil(projects.length * 0.8).toString(), // Simulation
  };
});

// Fonction utilitaire pour les labels de statut
const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    completed: "Terminé",
    "in-progress": "En cours",
    planning: "Planifié",
  };
  return labels[status] || status;
};

// Gestion des erreurs d'images
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/images/placeholder-project.jpg";
};

// Animations d'entrée
const onBeforeEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.opacity = "0";
  element.style.transform = "translateY(30px)";
};

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  const index = parseInt(element.dataset.index || "0");

  setTimeout(() => {
    element.style.transition = "all 0.4s ease-out";
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
    done();
  }, index * 100);
};

// Lifecycle
onMounted(() => {
  console.log("📱 Page projets montée");
  isMounted.value = true;

  // Debug des données au montage
  console.log("🔍 État initial:", {
    loading: loading.value,
    error: error.value,
    hasData: !!data.value,
    route: useRoute().path,
  });
});

onUnmounted(() => {
  clearTimeout(timeoutTimer);
});
</script>

<style scoped>
/* Animations pour les projets */
.project-enter-active,
.project-leave-active {
  transition: all 0.4s ease;
}

.project-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.project-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(1.1);
}

.project-move {
  transition: transform 0.4s ease;
}

/* Style pour les cartes de projet */
.card-theme {
  position: relative;
  overflow: hidden;
}

.card-theme::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.card-theme:hover::before {
  transform: scaleX(1);
}

/* Animation de chargement personnalisée */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Responsive */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .flex-wrap {
    gap: 0.5rem;
  }

  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
