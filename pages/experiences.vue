<template>
  <div class="min-h-screen text-theme-primary my-10">
    <div class="max-w-4xl mx-auto px-6 py-12">
      <!-- En-tête de section -->
      <div class="text-center mb-16">
        <h1
          class="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent"
          style="background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
        >
          Mes Expériences
        </h1>
        <p class="text-theme-muted text-lg max-w-2xl mx-auto">
          Découvrez mon parcours professionnel et les projets sur lesquels j'ai
          travaillé
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-theme"
          :style="{ borderColor: 'var(--primary-color)' }"
        ></div>
      </div>

      <!-- Error state -->
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
          <p class="text-theme-muted">{{ error }}</p>
        </div>
      </div>

      <!-- Timeline des expériences -->
      <div v-else-if="data?.experiences?.length" class="relative">
        <!-- Ligne verticale -->
        <div
          class="absolute left-8 top-0 bottom-0 w-0.5 gradient-primary"
        ></div>

        <!-- Expériences -->
        <div class="space-y-12">
          <div
            v-for="(experience, index) in data.experiences"
            :key="experience.id"
            class="relative flex items-start"
          >
            <!-- Point sur la timeline -->
            <div
              class="timeline-dot"
            ></div>

            <!-- Contenu -->
            <div
              class="ml-20 card-theme p-6 group hover-glow transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div
                class="flex flex-col md:flex-row md:items-center md:justify-between mb-4"
              >
                <div>
                  <h3
                    class="text-xl font-bold text-theme-primary group-hover:text-theme-secondary transition-colors"
                  >
                    {{ experience.role }}
                  </h3>
                  <p class="font-semibold" :style="{ color: 'var(--secondary-color)' }">
                    {{ experience.company }}
                  </p>
                </div>
                <div
                  class="flex items-center text-theme-muted text-sm mt-2 md:mt-0"
                >
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z"
                    />
                  </svg>
                  {{ experience.start }} - {{ experience.end || "Présent" }}
                </div>
              </div>

              <p class="text-theme-secondary mb-4 leading-relaxed">
                {{ experience.description }}
              </p>

              <!-- Compétences utilisées -->
              <div
                v-if="experience.technologies?.length"
                class="flex flex-wrap gap-2 mb-4"
              >
                <span
                  v-for="tech in experience.technologies"
                  :key="tech"
                  class="px-3 py-1 rounded-full text-sm border bg-theme-tertiary/50 text-theme-secondary border-theme"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Réalisations -->
              <div v-if="experience.achievements?.length" class="space-y-2">
                <div
                  v-for="achievement in experience.achievements"
                  :key="achievement"
                  class="flex items-center text-theme-secondary text-sm"
                >
                  <svg
                    class="w-4 h-4 mr-2 flex-shrink-0"
                    :style="{ color: 'var(--accent-color)' }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {{ achievement }}
                </div>
              </div>

              <!-- Localisation -->
              <div
                v-if="experience.location"
                class="mt-4 flex items-center text-theme-muted text-sm"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {{ experience.location }}
              </div>

              <!-- Type de contrat -->
              <div v-if="experience.type" class="mt-2 inline-block">
                <span
                  class="px-2 py-1 rounded-md text-xs font-medium bg-theme-tertiary/50 text-theme-secondary border border-theme"
                >
                  {{ experience.type }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section compétences techniques -->
      <div v-if="skillsData?.skillCategories?.length" class="mt-20">
        <h2
          class="text-3xl font-bold text-center mb-12 gradient-accent bg-clip-text text-transparent"
          style="background: var(--gradient-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
        >
          Compétences Techniques
        </h2>

        <!-- Loading state pour les compétences -->
        <div
          v-if="skillsLoading"
          class="flex justify-center items-center py-10"
        >
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2"
            :style="{ borderColor: 'var(--secondary-color)' }"
          ></div>
        </div>

        <!-- Error state pour les compétences -->
        <div v-else-if="skillsError" class="text-center py-10">
          <p class="text-red-400 text-sm">{{ skillsError }}</p>
        </div>

        <!-- Grille des compétences -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="skillCategory in skillsData.skillCategories"
            :key="skillCategory.id"
            class="card-theme p-6 hover-glow"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-theme-tertiary"
              >
                <!-- Icône Frontend -->
                <svg
                  v-if="skillCategory.icon === 'code'"
                  class="w-5 h-5"
                  :style="{ color: 'var(--primary-color)' }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>

                <!-- Icône Backend -->
                <svg
                  v-else-if="skillCategory.icon === 'server'"
                  class="w-5 h-5"
                  :style="{ color: 'var(--secondary-color)' }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14M5 12l4-4m-4 4l4 4"
                  />
                </svg>

                <!-- Icône Database -->
                <svg
                  v-else-if="skillCategory.icon === 'database'"
                  class="w-5 h-5"
                  :style="{ color: 'var(--accent-color)' }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>

                <!-- Icône Cloud -->
                <svg
                  v-else-if="skillCategory.icon === 'cloud'"
                  class="w-5 h-5"
                  :style="{ color: 'var(--primary-color)' }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>

                <!-- Icône Tools -->
                <svg
                  v-else-if="skillCategory.icon === 'tools'"
                  class="w-5 h-5"
                  :style="{ color: 'var(--secondary-color)' }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <!-- Icône par défaut -->
                <svg
                  v-else
                  class="w-5 h-5"
                  :style="{ color: 'var(--accent-color)' }"
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
              </div>
              <h3 class="text-lg font-semibold text-theme-primary">
                {{ skillCategory.name }}
              </h3>
            </div>

            <div
              v-for="skill in skillCategory.skills"
              :key="skill.name"
              class="mb-4 last:mb-0"
            >
              <div class="flex justify-between items-center mb-2">
                <div>
                  <span class="text-theme-secondary">{{ skill.name }}</span>
                  <span
                    v-if="skill.experience"
                    class="text-xs text-theme-muted block"
                    >{{ skill.experience }}</span
                  >
                </div>
                <span
                  class="font-semibold"
                  :style="{ color: 'var(--accent-color)' }"
                  >{{ skill.level }}%</span
                >
              </div>
              <div class="w-full bg-theme-tertiary rounded-full h-2">
                <div
                  class="h-2 rounded-full transition-all duration-1000"
                  :style="{ 
                    width: `${skill.level}%`,
                    background: 'var(--gradient-primary)'
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to action -->
      <div class="text-center mt-20">
        <p class="text-theme-muted mb-6">Intéressé par mon profil ?</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/contact"
            class="btn-theme-primary hover-glow transform hover:scale-105 inline-flex items-center justify-center"
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
          </NuxtLink>
          <NuxtLink
            to="/formations"
            class="btn-theme-secondary hover-glow inline-flex items-center justify-center"
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 19 7.5 19s3.332-.523 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.247 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253"
              />
            </svg>
            Voir mes formations
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useJson } from "~/utils/useJson";

// Configuration SEO
useHead({
  title: "Mes Expériences - Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Découvrez mon parcours professionnel et mes expériences en développement web.",
    },
    { property: "og:title", content: "Mes Expériences - Portfolio" },
    {
      property: "og:description",
      content: "Parcours professionnel d'un développeur Full-Stack passionné.",
    },
  ],
});

// Chargement des données d'expériences et compétences
const { data, error, loading } = useJson("experiences.json");
const {
  data: skillsData,
  error: skillsError,
  loading: skillsLoading,
} = useJson("skills.json");

// Animation au scroll
onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fadeInUp");
      }
    });
  }, observerOptions);

  // Observer tous les éléments d'expérience
  const experienceElements = document.querySelectorAll(".ml-20");
  experienceElements.forEach((el) => observer.observe(el));
});
</script>