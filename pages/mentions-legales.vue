<template>
  <div class="min-h-screen my-10">
    <!-- En-tête de la page -->
    <div class="text-center py-12">
      <h1
        class="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent"
        style="background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
      >
        Mentions légales
      </h1>
      <p class="text-theme-muted text-lg max-w-2xl mx-auto">
        Informations légales concernant ce site web et son éditeur
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
        <Icon name="ph:warning" class="w-16 h-16 mx-auto mb-4" />
        <h3 class="text-xl font-bold mb-2">Erreur de chargement</h3>
        <p class="text-theme-muted">{{ error }}</p>
      </div>
    </div>

    <!-- Contenu principal -->
    <main v-else class="max-w-4xl mx-auto px-6">
      <div class="card-theme p-8 md:p-12 space-y-12">

        <!-- Éditeur du site -->
        <section>
          <h2 class="text-2xl font-bold text-theme-primary mb-6 flex items-center">
            <Icon name="ph:building-office" class="w-6 h-6 mr-3" />
            Éditeur du site
          </h2>
          <div class="bg-theme-secondary rounded-xl p-6 space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <h3 class="font-semibold text-theme-primary mb-2">Propriétaire</h3>
                <p class="text-theme-secondary">{{ legalInfo.editor.name }}</p>
              </div>
              <div>
                <h3 class="font-semibold text-theme-primary mb-2">Statut</h3>
                <p class="text-theme-secondary">{{ legalInfo.editor.status }}</p>
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <h3 class="font-semibold text-theme-primary mb-2">Adresse</h3>
                <p class="text-theme-secondary">
                  {{ legalInfo.editor.address.street }}<br>
                  {{ legalInfo.editor.address.postalCode }} {{ legalInfo.editor.address.city }}<br>
                  {{ legalInfo.editor.address.country }}
                </p>
              </div>
              <div>
                <h3 class="font-semibold text-theme-primary mb-2">Contact</h3>
                <p class="text-theme-secondary">
                  Email : <a :href="`mailto:${legalInfo.editor.contact.email}`" class="text-theme-primary hover:underline">{{ legalInfo.editor.contact.email }}</a><br>
                  Téléphone : <a :href="`tel:${legalInfo.editor.contact.phone.replace(/\s/g, '')}`" class="text-theme-primary hover:underline">{{ legalInfo.editor.contact.phone }}</a>
                </p>
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-4" v-if="legalInfo.editor.siret || legalInfo.editor.vatNumber">
              <div v-if="legalInfo.editor.siret">
                <h3 class="font-semibold text-theme-primary mb-2">SIRET</h3>
                <p class="text-theme-secondary font-mono">{{ legalInfo.editor.siret }}</p>
              </div>
              <div v-if="legalInfo.editor.vatNumber">
                <h3 class="font-semibold text-theme-primary mb-2">TVA</h3>
                <p class="text-theme-secondary font-mono">{{ legalInfo.editor.vatNumber }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Hébergement -->
        <section>
          <h2 class="text-2xl font-bold text-theme-primary mb-6 flex items-center">
            <Icon name="ph:cloud" class="w-6 h-6 mr-3" />
            Hébergement
          </h2>
          <div class="bg-theme-secondary rounded-xl p-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-semibold text-theme-primary mb-2">Hébergeur</h3>
                <p class="text-theme-secondary">
                  {{ legalInfo.hosting.provider }}<br>
                  {{ legalInfo.hosting.address.street }}<br>
                  {{ legalInfo.hosting.address.postalCode }} {{ legalInfo.hosting.address.city }}<br>
                  Téléphone : <a :href="`tel:${legalInfo.hosting.contact.phone.replace(/\s/g, '')}`" class="text-theme-primary hover:underline">{{ legalInfo.hosting.contact.phone }}</a><br>
                  Site web : <a :href="legalInfo.hosting.contact.website" target="_blank" class="text-theme-primary hover:underline">{{ legalInfo.hosting.contact.website }}</a>
                </p>
              </div>
              <div>
                <h3 class="font-semibold text-theme-primary mb-2">Infrastructure</h3>
                <ul class="text-theme-secondary space-y-1">
                  <li v-for="feature in legalInfo.hosting.infrastructure" :key="feature" class="flex items-center">
                    <Icon name="ph:check" class="w-4 h-4 mr-2 text-green-400" />
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Propriété intellectuelle -->
        <section>
          <h2 class="text-2xl font-bold text-theme-primary mb-6 flex items-center">
            <Icon name="ph:copyright" class="w-6 h-6 mr-3" />
            Propriété intellectuelle
          </h2>
          <div class="bg-theme-secondary rounded-xl p-6 space-y-6">
            <div>
              <h3 class="font-semibold text-theme-primary mb-2">Droits d'auteur</h3>
              <p class="text-theme-secondary">
                © {{ legalInfo.intellectualProperty.copyright.year }} {{ legalInfo.intellectualProperty.copyright.owner }}. {{ legalInfo.intellectualProperty.copyright.description }}
              </p>
            </div>
            <div>
              <h3 class="font-semibold text-theme-primary mb-2">Licence du code source</h3>
              <div class="flex items-center space-x-3 mb-3">
                <span class="bg-theme-tertiary px-3 py-1 rounded-lg text-sm font-mono">{{ legalInfo.intellectualProperty.license.type }}</span>
                <span class="text-theme-secondary">Code source libre et open source</span>
              </div>
              <p class="text-theme-secondary mb-3 text-sm">
                {{ legalInfo.intellectualProperty.license.description }}
              </p>
              <a 
                :href="legalInfo.intellectualProperty.license.githubUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center text-theme-primary hover:underline text-sm"
              >
                <Icon name="ph:github-logo" class="w-4 h-4 mr-2" />
                Voir sur GitHub
              </a>
            </div>
            <div>
              <h3 class="font-semibold text-theme-primary mb-3">Crédits</h3>
              <div class="grid md:grid-cols-2 gap-3">
                <div v-for="credit in legalInfo.intellectualProperty.credits" :key="credit.name" class="flex items-center space-x-3">
                  <Icon name="ph:link" class="w-4 h-4 text-theme-primary" />
                  <div>
                    <span class="text-theme-secondary text-sm">{{ credit.description }} par </span>
                    <a :href="credit.url" target="_blank" class="text-theme-primary hover:underline text-sm">{{ credit.name }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Responsabilité -->
        <section>
          <h2 class="text-2xl font-bold text-theme-primary mb-6 flex items-center">
            <Icon name="ph:shield-check" class="w-6 h-6 mr-3" />
            Responsabilité
          </h2>
          <div class="bg-theme-secondary rounded-xl p-6 space-y-4">
            <div>
              <h3 class="font-semibold text-theme-primary mb-2">Limitation de responsabilité</h3>
              <p class="text-theme-secondary">
                {{ legalInfo.liability.accuracy }}
              </p>
            </div>
            <div>
              <h3 class="font-semibold text-theme-primary mb-2">Disponibilité du service</h3>
              <p class="text-theme-secondary">
                {{ legalInfo.liability.availability }}
              </p>
            </div>
            <div>
              <h3 class="font-semibold text-theme-primary mb-2">Liens externes</h3>
              <p class="text-theme-secondary">
                {{ legalInfo.liability.externalLinks }}
              </p>
            </div>
          </div>
        </section>

        <!-- Droit applicable -->
        <section>
          <h2 class="text-2xl font-bold text-theme-primary mb-6 flex items-center">
            <Icon name="ph:gavel" class="w-6 h-6 mr-3" />
            Droit applicable
          </h2>
          <div class="bg-theme-secondary rounded-xl p-6 space-y-3">
            <p class="text-theme-secondary">
              <strong>Juridiction :</strong> {{ legalInfo.applicableLaw.law }}
            </p>
            <p class="text-theme-secondary">
              <strong>Tribunaux compétents :</strong> {{ legalInfo.applicableLaw.courts }}
            </p>
          </div>
        </section>

        <!-- Contact -->
        <section class="border-t border-theme pt-8">
          <h2 class="text-2xl font-bold text-theme-primary mb-6 flex items-center">
            <Icon name="ph:envelope" class="w-6 h-6 mr-3" />
            Contact pour questions légales
          </h2>
          <div class="bg-theme-secondary rounded-xl p-6">
            <p class="text-theme-secondary mb-4">
              {{ legalInfo.contact.legal.description }} :
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a 
                :href="`mailto:${legalInfo.contact.legal.email}`" 
                class="btn-theme-secondary inline-flex items-center justify-center"
              >
                <Icon name="ph:envelope" class="w-4 h-4 mr-2" />
                {{ legalInfo.contact.legal.email }}
              </a>
              <NuxtLink 
                to="/contact" 
                class="btn-theme-primary inline-flex items-center justify-center"
              >
                <Icon name="ph:chat-circle" class="w-4 h-4 mr-2" />
                Formulaire de contact
              </NuxtLink>
            </div>
          </div>
        </section>

      </div>

      <!-- Informations de dernière mise à jour -->
      <div class="text-center mt-12">
        <div class="inline-flex items-center space-x-6 bg-theme-secondary rounded-xl px-8 py-4">
          <div class="flex items-center space-x-2">
            <Icon name="ph:calendar" class="w-4 h-4 text-theme-primary" />
            <span class="text-sm text-theme-secondary">Dernière mise à jour :</span>
            <span class="text-sm font-medium text-theme-primary">{{ legalInfo.lastUpdate }}</span>
          </div>
          <div class="w-px h-4 bg-theme-tertiary"></div>
          <div class="flex items-center space-x-2">
            <Icon name="ph:tag" class="w-4 h-4 text-theme-primary" />
            <span class="text-sm text-theme-secondary">Version :</span>
            <span class="text-sm font-medium text-theme-primary">{{ legalInfo.version }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Configuration de la page
useHead({
  title: 'Mentions légales - Portfolio',
  meta: [
    { 
      name: 'description', 
      content: 'Mentions légales du portfolio - Informations sur l\'éditeur, l\'hébergeur et les droits d\'auteur.' 
    },
    { property: 'og:title', content: 'Mentions légales - Portfolio' },
    { property: 'og:description', content: 'Informations légales et juridiques du site portfolio.' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Chargement des données légales
const { data, error, loading, retry } = useJson('legal.json')

// Données légales calculées avec fallbacks
const legalInfo = computed(() => {
  if (!data.value?.legal) {
    return {
      lastUpdate: 'Décembre 2024',
      version: 'v1.0',
      editor: {
        name: '[Votre nom]',
        status: '[Statut juridique]',
        address: {
          street: '[Votre adresse]',
          city: '[Ville]',
          postalCode: '[Code postal]',
          country: '[Pays]'
        },
        contact: {
          email: '[email@domain.com]',
          phone: '[+33 X XX XX XX XX]'
        },
        siret: null,
        vatNumber: null
      },
      hosting: {
        provider: '[Nom hébergeur]',
        address: {
          street: '[Adresse hébergeur]',
          city: '[Ville]',
          postalCode: '[Code postal]',
          country: '[Pays]'
        },
        contact: {
          phone: '[Téléphone]',
          website: '[Site web]'
        },
        infrastructure: ['Serveurs sécurisés', 'SSL/TLS', 'Monitoring']
      },
      intellectualProperty: {
        copyright: {
          owner: '[Nom propriétaire]',
          year: '2024',
          description: 'Tous droits réservés.'
        },
        license: {
          type: 'MIT License',
          description: 'Code source libre.',
          githubUrl: '#'
        },
        credits: []
      },
      liability: {
        accuracy: 'Limitation de responsabilité standard.',
        availability: 'Disponibilité sous réserve.',
        externalLinks: 'Liens externes sous leur responsabilité.'
      },
      applicableLaw: {
        jurisdiction: '[Pays]',
        law: 'Droit applicable selon juridiction.',
        courts: 'Tribunaux compétents selon location.'
      },
      contact: {
        legal: {
          email: 'legal@domain.com',
          description: 'Pour questions légales'
        }
      }
    }
  }
  
  return data.value.legal
})

// Debug des données chargées
watch(data, (newData) => {
  if (newData) {
    console.log('✅ Données légales chargées:', newData.legal)
  }
}, { immediate: true })

watch(error, (newError) => {
  if (newError) {
    console.error('❌ Erreur chargement données légales:', newError)
  }
}, { immediate: true })
</script>

<style scoped>
/* Styles spécifiques à la page */
.card-theme {
  position: relative;
  overflow: hidden;
}

.card-theme::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-primary);
}

/* Style pour les liens */
a:hover {
  transition: all 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .card-theme {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .grid.md\\:grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .inline-flex.space-x-6 {
    flex-direction: column;
    space-x: 0;
    gap: 0.5rem;
  }
}
</style>