<template>
  <div
    class="text-theme-primary flex flex-col items-center justify-center px-6 mt-10"
  >
    <!-- Loading state -->
    <div v-if="loading" class="text-center">
      <div class="w-20 h-20 mx-auto mb-6 relative">
        <div
          class="absolute inset-0 gradient-primary rounded-full animate-pulse"
        ></div>
        <div
          class="absolute inset-2 bg-theme-primary rounded-full flex items-center justify-center"
        >
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-theme"
            :style="{ borderColor: 'var(--primary-color)' }"
          ></div>
        </div>
      </div>
      <p class="text-theme-muted">Chargement du profil...</p>
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

    <!-- Profile Section -->
    <div v-else-if="data?.profile" class="text-center mb-12">
      <!-- Avatar -->
      <div
        class="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-theme hover:shadow-theme-glow transition-all duration-300 transform hover:scale-105"
        :style="{ borderColor: 'var(--border-color)' }"
      >
        <img
          :src="
            data.profile.avatar ||
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
          "
          :alt="data.profile.name || 'Profile'"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Name and Title -->
      <h1
        class="text-3xl font-bold mb-2 gradient-primary bg-clip-text text-transparent"
        style="background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
      >
        {{ data.profile.username || "@votre_username" }}
      </h1>
      <p class="text-theme-secondary text-lg font-light">
        {{
          data.profile.title ||
          "Développeur Full-Stack & Créateur de Solutions Web"
        }}
      </p>

      <!-- Bio optionnelle -->
      <p
        v-if="data.profile.bio"
        class="text-theme-muted text-sm mt-4 max-w-md mx-auto leading-relaxed"
      >
        {{ data.profile.bio }}
      </p>
    </div>

    <!-- Social Links -->
    <div v-if="data?.links?.length" class="space-y-4 w-full max-w-md">
      <NuxtLink
        v-for="link in data.links"
        :key="link.id"
        :href="link.url"
        :target="link.external ? '_blank' : '_self'"
        :rel="link.external ? 'noopener noreferrer' : undefined"
        :class="[
          'flex items-center p-4 rounded-lg transition-all duration-300 group hover:scale-105 hover-glow',
          getLinkStyles(link.type),
        ]"
      >
        <div
          :class="[
            'flex items-center justify-center w-10 h-10 rounded-lg mr-4 group-hover:scale-110 transition-transform',
            getLinkIconBg(link.type),
          ]"
        >
          <Icon :name="link.icon" class="w-6 h-6" />
        </div>
        <div class="flex-1">
          <h3 class="text-theme-primary font-semibold">{{ link.title }}</h3>
          <p class="text-theme-muted text-sm">{{ link.description }}</p>
        </div>
        <svg
          class="w-5 h-5 text-theme-muted group-hover:text-theme-primary group-hover:translate-x-1 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </NuxtLink>
    </div>

    <!-- Animated background particles -->
    <div class="fixed inset-0 -z-10 overflow-hidden">
      <div
        v-for="(particle, index) in backgroundParticles"
        :key="index"
        :class="['absolute rounded-full particle', particle.class]"
        :style="particle.style"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useJson } from "~/utils/useJson";

// Configuration SEO dynamique
const { data, error, loading } = useJson("profile.json");

// SEO reactif basé sur les données JSON
watchEffect(() => {
  if (data.value?.profile && data.value?.seo) {
    const profile = data.value.profile;
    const seo = data.value.seo;
    
    // Utilisation des données SEO du JSON avec fallback sur les données de profil
    const title = `${profile.name || "Portfolio"} - ${profile.title || "Développeur Full-Stack"}`;
    const description = profile.metaDescription || seo.metaDescription || `Portfolio de ${profile.name || "développeur"} spécialisé en ${profile.specialization || "développement web"}.`;
    
    useHead({
      title: title,
      meta: [
        {
          name: "description",
          content: description,
        },
        {
          name: "keywords",
          content: seo.keywords ? seo.keywords.join(", ") : "développeur, full-stack, portfolio",
        },
        {
          name: "robots",
          content: seo.robots || "index, follow",
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:image",
          content: profile.avatar || "/og-image.jpg",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: seo.canonical || "https://votre-domaine.fr",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:image",
          content: profile.avatar || "/og-image.jpg",
        },
        // Données structurées JSON-LD pour le SEO
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": profile.name,
            "jobTitle": profile.title,
            "description": profile.bio,
            "image": profile.avatar,
            "url": seo.canonical,
            "sameAs": data.value.links?.filter(link => link.external).map(link => link.url) || [],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": profile.location
            },
            "email": profile.email,
            "telephone": profile.phone
          })
        }
      ],
      link: [
        {
          rel: "canonical",
          href: seo.canonical || "https://votre-domaine.fr",
        }
      ],
    });
  } else if (!loading.value) {
    // SEO par défaut si pas de données
    useHead({
      title: "Portfolio - Développeur Full-Stack",
      meta: [
        {
          name: "description",
          content:
            "Portfolio de développeur Full-Stack spécialisé en Vue.js, Nuxt et technologies web modernes.",
        },
        {
          name: "keywords",
          content: "développeur, full-stack, vue.js, nuxt.js, portfolio",
        },
        {
          name: "robots",
          content: "index, follow",
        },
        { property: "og:title", content: "Portfolio - Développeur Full-Stack" },
        {
          property: "og:description",
          content: "Découvrez mes projets et expériences en développement web.",
        },
      ],
    });
  }
});

// Particules de fond animées (configurables via JSON ou par défaut)
const backgroundParticles = computed(() => {
  if (data.value?.particles?.length) {
    return data.value.particles;
  }

  // Particules par défaut avec classes de thème
  return [
    {
      class: "w-2 h-2 animate-float",
      style: "top: 25%; left: 25%; animation-delay: 0s; background: var(--primary-color); opacity: 0.7;",
    },
    {
      class: "w-1 h-1 animate-float",
      style: "top: 75%; right: 25%; animation-delay: 1s; background: var(--secondary-color); opacity: 0.6;",
    },
    {
      class: "w-1.5 h-1.5 animate-float",
      style: "bottom: 25%; left: 33%; animation-delay: 2s; background: var(--accent-color); opacity: 0.8;",
    },
  ];
});

// Fonctions pour les styles et icônes des liens adaptées au thème
const getLinkStyles = (type: string) => {
  // Utilise les classes de base avec les variables CSS
  const baseClass = "bg-theme-secondary hover:bg-theme-tertiary";

  // Styles spéciaux pour certains types avec les variables du thème
  const specialStyles = {
    featured: "gradient-primary hover:shadow-theme-hover",
    primary: "gradient-accent hover:shadow-theme-hover",
  };

  return specialStyles[type] || baseClass;
};

const getLinkIconBg = (type: string) => {
  // Garde les couleurs spécifiques pour les icônes de réseaux sociaux
  const colors = {
    instagram: "bg-gradient-to-br from-purple-500 to-pink-500",
    github: "bg-gray-700",
    linkedin: "bg-blue-600",
    twitter: "bg-blue-400",
    youtube: "bg-red-600",
    discord: "bg-indigo-600",
    twitch: "bg-purple-600",
    tiktok: "bg-gray-900",
    email: "bg-red-600",
    website: "bg-green-600",
    portfolio: "bg-cyan-600",
    cv: "bg-green-600",
    blog: "bg-orange-600",
    shop: "bg-yellow-600",
    paypal: "bg-blue-700",
    kofi: "bg-blue-500",
    patreon: "bg-orange-500",
  };

  return colors[type] || "bg-theme-secondary";
};
</script>