<template>
  <div
    class="min-h-screen bg-black text-white flex items-center justify-center px-6"
  >
    <div class="text-center max-w-2xl mx-auto">
      <!-- Animation avec le code d'erreur dynamique -->
      <div class="relative mb-8">
        <h1
          class="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text animate-pulse-glow"
        >
          {{ error.statusCode }}
        </h1>

        <!-- Éléments décoratifs animés -->
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div
            class="w-32 h-32 border-2 border-blue-500/30 rounded-full animate-spin"
          ></div>
          <div
            class="absolute top-4 left-4 w-24 h-24 border-2 border-purple-500/30 rounded-full animate-spin"
            style="animation-direction: reverse; animation-duration: 3s"
          ></div>
        </div>
      </div>

      <!-- Message d'erreur dynamique -->
      <div class="mb-8">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">
          {{ errorTitle }}
        </h2>
        <p class="text-gray-400 text-lg mb-6 leading-relaxed">
          {{ errorMessage }}
        </p>
      </div>

      <!-- Actions disponibles -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Accueil -->
        <NuxtLink
          to="/"
          class="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
        >
          <div
            class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
          >
            <svg
              class="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <h3
            class="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors"
          >
            Accueil
          </h3>
          <p class="text-gray-400 text-sm">Retour à la page principale</p>
        </NuxtLink>

        <!-- Expériences -->
        <NuxtLink
          to="/experiences"
          class="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
        >
          <div
            class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
          >
            <svg
              class="w-6 h-6 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2h-4a2 2 0 00-2-2V6m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6"
              />
            </svg>
          </div>
          <h3
            class="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors"
          >
            Expériences
          </h3>
          <p class="text-gray-400 text-sm">Mon parcours professionnel</p>
        </NuxtLink>

        <!-- Projets -->
        <NuxtLink
          to="/projets"
          class="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
        >
          <div
            class="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
          >
            <svg
              class="w-6 h-6 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3
            class="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors"
          >
            Projets
          </h3>
          <p class="text-gray-400 text-sm">Portfolio de réalisations</p>
        </NuxtLink>

        <!-- Formation -->
        <NuxtLink
          to="/formations"
          class="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105"
        >
          <div
            class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
          >
            <svg
              class="w-6 h-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 19 7.5 19s3.332-.523 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.247 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253"
              />
            </svg>
          </div>
          <h3
            class="text-white font-semibold mb-2 group-hover:text-green-400 transition-colors"
          >
            Formation
          </h3>
          <p class="text-gray-400 text-sm">Mon parcours académique</p>
        </NuxtLink>
      </div>

      <!-- Boutons d'action -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="handleError"
          class="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center font-medium"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {{ actionButtonText }}
        </button>

        <a
          href="mailto:votre.email@example.com"
          class="px-8 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-200 inline-flex items-center justify-center font-medium"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Me contacter
        </a>
      </div>

      <!-- Message en bas -->
      <div class="mt-12 text-center">
        <p class="text-gray-500 text-sm">
          💡 Astuce : Utilisez la navigation pour explorer mon portfolio
        </p>
      </div>
    </div>

    <!-- Éléments décoratifs de fond -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-20"
      ></div>
      <div
        class="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-500 rounded-full animate-pulse opacity-30"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce opacity-25"
      ></div>
      <div
        class="absolute top-1/2 right-1/3 w-2 h-2 bg-pink-500 rounded-full animate-ping opacity-20"
        style="animation-delay: 1s"
      ></div>
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props automatiquement fournies par Nuxt
interface ErrorProps {
  error: {
    statusCode: number;
    statusMessage?: string;
    message?: string;
    stack?: string;
  };
}

const props = defineProps<ErrorProps>();

// Messages dynamiques selon le type d'erreur
const errorTitle = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return "Oups ! Page introuvable";
    case 500:
      return "Erreur serveur";
    case 403:
      return "Accès interdit";
    default:
      return "Une erreur est survenue";
  }
});

const errorMessage = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return "Il semblerait que la page que vous cherchez n'existe pas ou a été déplacée. Mais ne vous inquiétez pas, explorons ensemble d'autres sections de mon portfolio !";
    case 500:
      return "Une erreur s'est produite sur le serveur. L'équipe technique a été notifiée et travaille sur une solution.";
    case 403:
      return "Vous n'avez pas les permissions nécessaires pour accéder à cette page.";
    default:
      return "Une erreur inattendue s'est produite. Veuillez réessayer ou me contacter si le problème persiste.";
  }
});

const actionButtonText = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return "Retour en arrière";
    case 500:
      return "Recharger la page";
    default:
      return "Réessayer";
  }
});

// Configuration SEO
useHead({
  title: `Erreur ${props.error.statusCode} - Portfolio`,
  meta: [
    {
      name: "description",
      content: `Erreur ${props.error.statusCode}. ${errorMessage.value}`,
    },
    { name: "robots", content: "noindex, nofollow" },
  ],
});

// Gestion des actions selon le type d'erreur
const handleError = () => {
  switch (props.error.statusCode) {
    case 404:
      // Retour en arrière ou accueil
      if (process.client && window.history.length > 1) {
        window.history.back();
      } else {
        navigateTo("/");
      }
      break;
    case 500:
      // Rechargement de la page
      if (process.client) {
        window.location.reload();
      }
      break;
    default:
      // Redirection vers l'accueil
      navigateTo("/");
      break;
  }
};

// Animation au montage
onMounted(() => {
  const animateElements = document.querySelectorAll(".group");
  animateElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("animate-fadeInUp");
    }, index * 100);
  });
});
</script>

<style scoped>
/* Grille de fond */
.bg-grid-pattern {
  background-image: linear-gradient(
      rgba(59, 130, 246, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Animation de pulsation */
@keyframes pulse-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 40px rgba(139, 92, 246, 0.8));
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
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

/* Responsive */
@media (max-width: 640px) {
  .text-8xl {
    font-size: 6rem;
  }
  .text-9xl {
    font-size: 7rem;
  }
}
</style>
