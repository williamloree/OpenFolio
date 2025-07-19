<template>
  <div class="min-h-screen text-theme-primary">
    <div class="max-w-4xl mx-auto px-6 py-12">
      <!-- En-tête de section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent" 
            style="background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          Ma Formation
        </h1>
        <p class="text-theme-muted text-lg max-w-2xl mx-auto">
          Mon parcours académique et les certifications qui ont façonné mes compétences
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-theme"
             :style="{ borderColor: 'var(--primary-color)' }"></div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-20">
        <div class="text-red-400 mb-4">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-bold mb-2">Erreur de chargement</h3>
          <p class="text-theme-muted">{{ error }}</p>
        </div>
      </div>

      <!-- Grid de formations -->
      <div v-else-if="data?.education?.length" class="grid gap-8 mb-16">
        <div
          v-for="(education, index) in data.education"
          :key="education.id"
          class="card-theme p-8 group hover-glow transition-all duration-300"
        >
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div class="flex-1 mb-6 lg:mb-0">
              <div class="flex items-center mb-4">
                <div 
                  class="w-16 h-16 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform gradient-primary shadow-theme-glow"
                >
                  <!-- Icône Master -->
                  <svg v-if="education.type === 'master'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  
                  <!-- Icône Bachelor/Licence -->
                  <svg v-else-if="education.type === 'bachelor'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 19 7.5 19s3.332-.523 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.247 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                  </svg>
                  
                  <!-- Icône Diplôme -->
                  <svg v-else-if="education.type === 'diploma'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  
                  <!-- Icône Certificate -->
                  <svg v-else-if="education.type === 'certificate'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  
                  <!-- Icône par défaut -->
                  <svg v-else class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-bold transition-colors text-theme-primary group-hover:text-theme-secondary">
                    {{ education.degree }}
                  </h3>
                  <p class="font-semibold text-lg" :style="{ color: 'var(--secondary-color)' }">
                    {{ education.school }}
                  </p>
                </div>
              </div>
              
              <p class="text-theme-secondary mb-4 leading-relaxed">
                {{ education.description }}
              </p>

              <div class="flex items-center text-theme-muted mb-4">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z" />
                </svg>
                {{ education.startYear }} - {{ education.endYear }}
              </div>

              <!-- Matières principales -->
              <div v-if="education.subjects?.length" class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="subject in education.subjects"
                  :key="subject"
                  class="px-3 py-1 rounded-full text-sm border bg-theme-tertiary/50 text-theme-secondary border-theme"
                >
                  {{ subject }}
                </span>
              </div>

              <!-- Mention -->
              <div v-if="education.grade" class="flex items-center">
                <svg class="w-5 h-5 mr-2" :style="{ color: 'var(--accent-color)' }" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span class="font-semibold" :style="{ color: 'var(--accent-color)' }">{{ education.grade }}</span>
              </div>

              <!-- Localisation -->
              <div v-if="education.location" class="mt-2 flex items-center text-theme-muted text-sm">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ education.location }}
              </div>
            </div>

            <!-- Note/GPA -->
            <div v-if="education.gpa" class="lg:ml-8 text-center">
              <div class="w-24 h-24 rounded-full flex items-center justify-center mb-2 mx-auto gradient-primary shadow-theme-glow">
                <div class="text-center">
                  <div class="text-2xl font-bold text-white">{{ education.gpa }}</div>
                  <div class="text-xs text-white/70">/{{ education.gpaMax || 20 }}</div>
                </div>
              </div>
              <p class="text-theme-muted text-sm">{{ education.gpaLabel || 'Moyenne générale' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Certifications -->
      <div v-if="certificationsData?.certifications?.length" class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12 gradient-accent bg-clip-text text-transparent"
            style="background: var(--gradient-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          Certifications & Formations
        </h2>

        <!-- Loading state pour les certifications -->
        <div v-if="certificationsLoading" class="flex justify-center items-center py-10">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2"
               :style="{ borderColor: 'var(--secondary-color)' }"></div>
        </div>

        <!-- Error state pour les certifications -->
        <div v-else-if="certificationsError" class="text-center py-10">
          <p class="text-red-400 text-sm">{{ certificationsError }}</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="certification in certificationsData.certifications"
            :key="certification.id"
            class="card-theme p-6 group hover-glow"
          >
            <div class="flex items-start">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform bg-theme-tertiary">
                <svg class="w-6 h-6" :style="{ color: 'var(--accent-color)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold mb-2 transition-colors text-theme-primary group-hover:text-theme-secondary">
                  {{ certification.name }}
                </h3>
                <p class="text-theme-muted text-sm mb-2">
                  {{ certification.issuer }} • {{ certification.year }}
                </p>
                <p class="text-theme-secondary text-sm leading-relaxed">
                  {{ certification.description }}
                </p>
                
                <!-- Lien vers la certification -->
                <a 
                  v-if="certification.credentialUrl"
                  :href="certification.credentialUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center mt-3 text-sm font-medium transition-colors hover:underline"
                  :style="{ color: 'var(--accent-color)' }"
                >
                  Voir la certification
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Compétences linguistiques -->
      <div v-if="languagesData?.languages?.length" class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12 gradient-hero bg-clip-text text-transparent"
            style="background: var(--gradient-hero); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          Compétences Linguistiques
        </h2>

        <!-- Loading state pour les langues -->
        <div v-if="languagesLoading" class="flex justify-center items-center py-10">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2"
               :style="{ borderColor: 'var(--accent-color)' }"></div>
        </div>

        <!-- Error state pour les langues -->
        <div v-else-if="languagesError" class="text-center py-10">
          <p class="text-red-400 text-sm">{{ languagesError }}</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="language in languagesData.languages"
            :key="language.id"
            class="card-theme p-6 text-center hover-glow"
          >
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-theme-tertiary">
              <span class="text-2xl">{{ language.flag }}</span>
            </div>
            <h3 class="text-lg font-semibold text-theme-primary mb-2">{{ language.name }}</h3>
            <p class="font-semibold mb-2" :style="{ color: 'var(--secondary-color)' }">
              {{ language.level }} {{ language.certification ? `(${language.certification})` : '' }}
            </p>
            <div class="w-full bg-theme-tertiary rounded-full h-2">
              <div 
                class="h-2 rounded-full transition-all duration-500"
                :style="{ 
                  width: `${language.proficiency}%`,
                  background: 'var(--gradient-primary)'
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to action -->
      <div class="text-center">
        <p class="text-theme-muted mb-6">Découvrez maintenant mon expérience professionnelle</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/experiences"
            class="btn-theme-primary hover-glow transform hover:scale-105 inline-flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2h-4a2 2 0 00-2-2V6m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6" />
            </svg>
            Voir mes expériences
          </NuxtLink>
          <NuxtLink 
            to="/"
            class="btn-theme-secondary hover-glow inline-flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Retour à l'accueil
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useJson } from '~/utils/useJson'

// Configuration SEO
useHead({
  title: 'Ma Formation - Portfolio',
  meta: [
    { name: 'description', content: 'Découvrez mon parcours académique, mes certifications et compétences linguistiques.' },
    { property: 'og:title', content: 'Ma Formation - Portfolio' },
    { property: 'og:description', content: 'Parcours académique et certifications d\'un développeur Full-Stack.' }
  ]
})

// Chargement des données depuis JSON
const { data, error, loading } = useJson('formations.json')
const { data: certificationsData, error: certificationsError, loading: certificationsLoading } = useJson('certifications.json')
const { data: languagesData, error: languagesError, loading: languagesLoading } = useJson('languages.json')

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

  // Observer tous les éléments de formation
  const educationElements = document.querySelectorAll('.card-theme')
  educationElements.forEach((el) => observer.observe(el))
})
</script>

<style scoped>
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
</style>