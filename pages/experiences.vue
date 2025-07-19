<template>
  <div class="min-h-screen bg-black text-white">
    <div class="max-w-4xl mx-auto px-6 py-12">
      <!-- En-tête de section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Mon Expérience
        </h1>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Découvrez mon parcours professionnel et les projets sur lesquels j'ai travaillé
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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

      <!-- Timeline des expériences -->
      <div v-else-if="data?.experiences?.length" class="relative">
        <!-- Ligne verticale -->
        <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

        <!-- Expériences -->
        <div class="space-y-12">
          <div
            v-for="(experience, index) in data.experiences"
            :key="experience.id"
            class="relative flex items-start"
          >
            <!-- Point sur la timeline -->
            <div 
              :class="[
                'absolute left-6 w-4 h-4 rounded-full border-4 border-black z-10',
                getTimelineColor(index)
              ]"
            ></div>
            
            <!-- Contenu -->
            <div class="ml-20 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 group hover:transform hover:scale-[1.02]">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {{ experience.role }}
                  </h3>
                  <p class="text-blue-400 font-semibold">{{ experience.company }}</p>
                </div>
                <div class="flex items-center text-gray-400 text-sm mt-2 md:mt-0">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z" />
                  </svg>
                  {{ experience.start }} - {{ experience.end || 'Présent' }}
                </div>
              </div>

              <p class="text-gray-300 mb-4 leading-relaxed">
                {{ experience.description }}
              </p>

              <!-- Compétences utilisées -->
              <div v-if="experience.technologies?.length" class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in experience.technologies"
                  :key="tech"
                  :class="[
                    'px-3 py-1 rounded-full text-sm border',
                    getTechColor(tech)
                  ]"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Réalisations -->
              <div v-if="experience.achievements?.length" class="space-y-2">
                <div
                  v-for="achievement in experience.achievements"
                  :key="achievement"
                  class="flex items-center text-gray-300 text-sm"
                >
                  <svg class="w-4 h-4 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ achievement }}
                </div>
              </div>

              <!-- Localisation -->
              <div v-if="experience.location" class="mt-4 flex items-center text-gray-400 text-sm">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ experience.location }}
              </div>

              <!-- Type de contrat -->
              <div v-if="experience.type" class="mt-2 inline-block">
                <span :class="[
                  'px-2 py-1 rounded-md text-xs font-medium',
                  experience.type === 'CDI' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                  experience.type === 'CDD' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                  experience.type === 'Freelance' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                  experience.type === 'Stage' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                  'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                ]">
                  {{ experience.type }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section compétences techniques -->
      <div v-if="skillsData?.skillCategories?.length" class="mt-20">
        <h2 class="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Compétences Techniques
        </h2>

        <!-- Loading state pour les compétences -->
        <div v-if="skillsLoading" class="flex justify-center items-center py-10">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>

        <!-- Error state pour les compétences -->
        <div v-else-if="skillsError" class="text-center py-10">
          <p class="text-red-400 text-sm">{{ skillsError }}</p>
        </div>

        <!-- Grille des compétences -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="skillCategory in skillsData.skillCategories"
            :key="skillCategory.id"
            :class="[
              'bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 transition-all duration-300',
              getSkillCategoryHoverColor(skillCategory.color)
            ]"
          >
            <div class="flex items-center mb-4">
              <div 
                :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center mr-3',
                  getSkillCategoryBgColor(skillCategory.color)
                ]"
              >
                <!-- Icône Frontend -->
                <svg v-if="skillCategory.icon === 'code'" :class="['w-5 h-5', getSkillCategoryTextColor(skillCategory.color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                
                <!-- Icône Backend -->
                <svg v-else-if="skillCategory.icon === 'server'" :class="['w-5 h-5', getSkillCategoryTextColor(skillCategory.color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4l4 4" />
                </svg>
                
                <!-- Icône Database -->
                <svg v-else-if="skillCategory.icon === 'database'" :class="['w-5 h-5', getSkillCategoryTextColor(skillCategory.color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
                
                <!-- Icône Cloud -->
                <svg v-else-if="skillCategory.icon === 'cloud'" :class="['w-5 h-5', getSkillCategoryTextColor(skillCategory.color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                
                <!-- Icône Tools -->
                <svg v-else-if="skillCategory.icon === 'tools'" :class="['w-5 h-5', getSkillCategoryTextColor(skillCategory.color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                
                <!-- Icône par défaut -->
                <svg v-else :class="['w-5 h-5', getSkillCategoryTextColor(skillCategory.color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white">{{ skillCategory.name }}</h3>
            </div>
            
            <div
              v-for="skill in skillCategory.skills"
              :key="skill.name"
              class="mb-4 last:mb-0"
            >
              <div class="flex justify-between items-center mb-2">
                <div>
                  <span class="text-gray-300">{{ skill.name }}</span>
                  <span v-if="skill.experience" class="text-xs text-gray-500 block">{{ skill.experience }}</span>
                </div>
                <span :class="['font-semibold', getSkillCategoryTextColor(skillCategory.color)]">{{ skill.level }}%</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-2">
                <div 
                  :class="['h-2 rounded-full transition-all duration-1000', getSkillCategoryBarColor(skillCategory.color)]"
                  :style="{ width: `${skill.level}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to action -->
      <div class="text-center mt-20">
        <p class="text-gray-400 mb-6">Intéressé par mon profil ?</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:votre.email@example.com"
            class="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Me contacter
          </a>
          <NuxtLink 
            to="/education"
            class="px-8 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-200 inline-flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 19 7.5 19s3.332-.523 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.247 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
            </svg>
            Voir ma formation
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
  title: 'Mes Expériences - Portfolio',
  meta: [
    { name: 'description', content: 'Découvrez mon parcours professionnel et mes expériences en développement web.' },
    { property: 'og:title', content: 'Mes Expériences - Portfolio' },
    { property: 'og:description', content: 'Parcours professionnel d\'un développeur Full-Stack passionné.' }
  ]
})

// Chargement des données d'expériences et compétences
const { data, error, loading } = useJson('experiences.json')
const { data: skillsData, error: skillsError, loading: skillsLoading } = useJson('skills.json')

// Fonction pour obtenir la couleur du point de timeline
const getTimelineColor = (index: number) => {
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500']
  return colors[index % colors.length]
}

// Fonction pour obtenir la couleur des technologies
const getTechColor = (tech: string) => {
  const techColors: Record<string, string> = {
    'Vue.js': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Nuxt.js': 'bg-green-500/20 text-green-300 border-green-500/30',
    'React': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Node.js': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'TypeScript': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'MongoDB': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'MySQL': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'PHP': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Python': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Docker': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'AWS': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'Tailwind CSS': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'WordPress': 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  }
  
  return techColors[tech] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
}

// Fonction pour obtenir les couleurs et icônes des compétences
const getSkillCategoryBgColor = (color: string) => {
  const colors: Record<string, string> = {
    'blue': 'bg-blue-500/20',
    'green': 'bg-green-500/20',
    'purple': 'bg-purple-500/20',
    'orange': 'bg-orange-500/20',
    'pink': 'bg-pink-500/20',
    'cyan': 'bg-cyan-500/20',
    'yellow': 'bg-yellow-500/20',
    'red': 'bg-red-500/20'
  }
  return colors[color] || 'bg-gray-500/20'
}

const getSkillCategoryTextColor = (color: string) => {
  const colors: Record<string, string> = {
    'blue': 'text-blue-400',
    'green': 'text-green-400',
    'purple': 'text-purple-400',
    'orange': 'text-orange-400',
    'pink': 'text-pink-400',
    'cyan': 'text-cyan-400',
    'yellow': 'text-yellow-400',
    'red': 'text-red-400'
  }
  return colors[color] || 'text-gray-400'
}

const getSkillCategoryBarColor = (color: string) => {
  const colors: Record<string, string> = {
    'blue': 'bg-blue-500',
    'green': 'bg-green-500',
    'purple': 'bg-purple-500',
    'orange': 'bg-orange-500',
    'pink': 'bg-pink-500',
    'cyan': 'bg-cyan-500',
    'yellow': 'bg-yellow-500',
    'red': 'bg-red-500'
  }
  return colors[color] || 'bg-gray-500'
}

const getSkillCategoryHoverColor = (color: string) => {
  const colors: Record<string, string> = {
    'blue': 'hover:border-blue-500/50',
    'green': 'hover:border-green-500/50',
    'purple': 'hover:border-purple-500/50',
    'orange': 'hover:border-orange-500/50',
    'pink': 'hover:border-pink-500/50',
    'cyan': 'hover:border-cyan-500/50',
    'yellow': 'hover:border-yellow-500/50',
    'red': 'hover:border-red-500/50'
  }
  return colors[color] || 'hover:border-gray-500/50'
}

// Données des compétences techniques (fallback si pas de JSON)
const fallbackSkillsData = [
  {
    name: 'Frontend',
    icon: '<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>',
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-400',
    barColor: 'bg-blue-500',
    hoverColor: 'hover:border-blue-500/50',
    skills: [
      { name: 'Vue.js / Nuxt.js', level: 95 },
      { name: 'React / Next.js', level: 85 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 }
    ]
  },
  {
    name: 'Backend',
    icon: '<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4l4 4" /></svg>',
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-400',
    barColor: 'bg-green-500',
    hoverColor: 'hover:border-green-500/50',
    skills: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'Python / Django', level: 80 },
      { name: 'PHP / Laravel', level: 75 },
      { name: 'API REST / GraphQL', level: 85 }
    ]
  },
  {
    name: 'Base de données',
    icon: '<svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>',
    bgColor: 'bg-purple-500/20',
    textColor: 'text-purple-400',
    barColor: 'bg-purple-500',
    hoverColor: 'hover:border-purple-500/50',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MySQL', level: 85 },
      { name: 'Redis', level: 70 }
    ]
  }
]

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

  // Observer tous les éléments d'expérience
  const experienceElements = document.querySelectorAll('.ml-20')
  experienceElements.forEach((el) => observer.observe(el))
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

/* Timeline responsive */
@media (max-width: 768px) {
  .ml-20 {
    margin-left: 4rem;
  }
  
  .left-8 {
    left: 1.5rem;
  }
  
  .left-6 {
    left: 1rem;
  }
}
</style>