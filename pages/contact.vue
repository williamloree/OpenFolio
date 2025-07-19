<template>
  <div class="min-h-screen my-10">
    <!-- En-tête de la page -->
    <div class="text-center mb-16 pt-12">
      <h1
        class="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent"
        style="background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
      >
        Contactez-moi
      </h1>
      <p class="text-theme-muted text-lg max-w-2xl mx-auto">
        Une idée, un projet ou simplement envie d'échanger ? 
        Je serais ravi de discuter avec vous !
      </p>
    </div>

    <!-- Contenu principal -->
    <main class="max-w-6xl mx-auto px-6">
      
      <!-- Statistiques de contact -->
      <section class="mb-16">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="card-theme p-6 text-center hover:scale-105 transition-transform duration-300">
            <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="ph:clock" class="w-6 h-6 text-blue-400" />
            </div>
            <div class="text-2xl font-bold text-theme-primary">< 24h</div>
            <div class="text-sm text-theme-secondary">Temps de réponse</div>
          </div>
          <div class="card-theme p-6 text-center hover:scale-105 transition-transform duration-300">
            <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="ph:users" class="w-6 h-6 text-green-400" />
            </div>
            <div class="text-2xl font-bold text-theme-primary">50+</div>
            <div class="text-sm text-theme-secondary">Clients satisfaits</div>
          </div>
          <div class="card-theme p-6 text-center hover:scale-105 transition-transform duration-300">
            <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="ph:star" class="w-6 h-6 text-purple-400" />
            </div>
            <div class="text-2xl font-bold text-theme-primary">4.9/5</div>
            <div class="text-sm text-theme-secondary">Note moyenne</div>
          </div>
          <div class="card-theme p-6 text-center hover:scale-105 transition-transform duration-300">
            <div class="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="ph:calendar" class="w-6 h-6 text-orange-400" />
            </div>
            <div class="text-2xl font-bold text-theme-primary">7j/7</div>
            <div class="text-sm text-theme-secondary">Disponibilité</div>
          </div>
        </div>
      </section>

      <div class="grid lg:grid-cols-2 gap-12">
        
        <!-- Formulaire de contact -->
        <section class="card-theme p-8">
          <h2 class="text-2xl font-bold text-theme-primary mb-6 flex items-center">
            <Icon name="ph:envelope" class="w-6 h-6 mr-3" />
            Envoyez-moi un message
          </h2>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Nom et Email -->
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label for="name" class="block text-sm font-medium text-theme-primary mb-2">
                  Nom complet *
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent text-theme-primary placeholder-theme-muted transition-all duration-300"
                  placeholder="Votre nom"
                  :class="{ 'border-red-500': errors.name }"
                />
                <p v-if="errors.name" class="text-red-400 text-xs mt-1">{{ errors.name }}</p>
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-theme-primary mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent text-theme-primary placeholder-theme-muted transition-all duration-300"
                  placeholder="votre@email.com"
                  :class="{ 'border-red-500': errors.email }"
                />
                <p v-if="errors.email" class="text-red-400 text-xs mt-1">{{ errors.email }}</p>
              </div>
            </div>

            <!-- Téléphone et Société -->
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label for="phone" class="block text-sm font-medium text-theme-primary mb-2">
                  Téléphone
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent text-theme-primary placeholder-theme-muted transition-all duration-300"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
              
              <div>
                <label for="company" class="block text-sm font-medium text-theme-primary mb-2">
                  Société
                </label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  class="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent text-theme-primary placeholder-theme-muted transition-all duration-300"
                  placeholder="Votre entreprise"
                />
              </div>
            </div>

            <!-- Type de projet -->
            <div>
              <label for="projectType" class="block text-sm font-medium text-theme-primary mb-2">
                Type de projet *
              </label>
              <select
                id="projectType"
                v-model="form.projectType"
                required
                class="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent text-theme-primary transition-all duration-300"
                :class="{ 'border-red-500': errors.projectType }"
              >
                <option value="">Sélectionnez un type de projet</option>
                <option value="website">Site web vitrine</option>
                <option value="ecommerce">E-commerce</option>
                <option value="webapp">Application web</option>
                <option value="mobile">Application mobile</option>
                <option value="api">API / Backend</option>
                <option value="consultation">Consultation technique</option>
                <option value="maintenance">Maintenance</option>
                <option value="other">Autre</option>
              </select>
              <p v-if="errors.projectType" class="text-red-400 text-xs mt-1">{{ errors.projectType }}</p>
            </div>

            <!-- Budget -->
            <div>
              <label for="budget" class="block text-sm font-medium text-theme-primary mb-2">
                Budget estimé
              </label>
              <select
                id="budget"
                v-model="form.budget"
                class="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent text-theme-primary transition-all duration-300"
              >
                <option value="">Non défini</option>
                <option value="1000-5000">1 000€ - 5 000€</option>
                <option value="5000-10000">5 000€ - 10 000€</option>
                <option value="10000-25000">10 000€ - 25 000€</option>
                <option value="25000+">25 000€+</option>
              </select>
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium text-theme-primary mb-2">
                Message *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="5"
                class="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent text-theme-primary placeholder-theme-muted transition-all duration-300 resize-none"
                placeholder="Décrivez votre projet, vos besoins, vos délais..."
                :class="{ 'border-red-500': errors.message }"
              ></textarea>
              <p v-if="errors.message" class="text-red-400 text-xs mt-1">{{ errors.message }}</p>
              <p class="text-theme-muted text-xs mt-1">{{ form.message.length }}/1000 caractères</p>
            </div>

            <!-- Newsletter -->
            <div class="flex items-center space-x-3">
              <input
                id="newsletter"
                v-model="form.newsletter"
                type="checkbox"
                class="w-4 h-4 text-primary-color bg-theme-secondary border-theme rounded focus:ring-primary-color focus:ring-2"
              />
              <label for="newsletter" class="text-sm text-theme-secondary">
                J'aimerais recevoir des nouvelles de vos projets et articles techniques
              </label>
            </div>

            <!-- RGPD -->
            <div class="flex items-start space-x-3">
              <input
                id="rgpd"
                v-model="form.rgpd"
                type="checkbox"
                required
                class="w-4 h-4 text-primary-color bg-theme-secondary border-theme rounded focus:ring-primary-color focus:ring-2 mt-0.5"
              />
              <label for="rgpd" class="text-sm text-theme-secondary">
                J'accepte que mes données soient traitées conformément à la 
                <NuxtLink to="/politique-confidentialite" class="text-theme-primary hover:underline">
                  politique de confidentialité
                </NuxtLink> *
              </label>
            </div>

            <!-- Bouton d'envoi -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full btn-theme-primary py-4 text-lg font-medium relative overflow-hidden group"
              :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
            >
              <span v-if="!isSubmitting" class="flex items-center justify-center">
                <Icon name="ph:paper-plane-tilt" class="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Envoyer le message
              </span>
              <span v-else class="flex items-center justify-center">
                <Icon name="ph:spinner" class="w-5 h-5 mr-2 animate-spin" />
                Envoi en cours...
              </span>
            </button>
          </form>
        </section>

        <!-- Informations de contact -->
        <section class="space-y-8">
          
          <!-- Coordonnées -->
          <div class="card-theme p-8">
            <h2 class="text-2xl font-bold text-theme-primary mb-6 flex items-center">
              <Icon name="ph:address-book" class="w-6 h-6 mr-3" />
              Mes coordonnées
            </h2>
            
            <div class="space-y-6">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="ph:envelope" class="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 class="font-semibold text-theme-primary">Email</h3>
                  <a :href="`mailto:${profileInfo.email}`" class="text-theme-secondary hover:text-theme-primary transition-colors">
                    {{ profileInfo.email }}
                  </a>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="ph:phone" class="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 class="font-semibold text-theme-primary">Téléphone</h3>
                  <a :href="`tel:${profileInfo.phone.replace(/\s/g, '')}`" class="text-theme-secondary hover:text-theme-primary transition-colors">
                    {{ profileInfo.phone }}
                  </a>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="ph:map-pin" class="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 class="font-semibold text-theme-primary">Localisation</h3>
                  <p class="text-theme-secondary">{{ profileInfo.location }}</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="ph:calendar" class="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 class="font-semibold text-theme-primary">Disponibilité</h3>
                  <p class="text-theme-secondary">Lun - Ven, 9h - 18h (CET)</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Réseaux sociaux -->
          <div class="card-theme p-8">
            <h2 class="text-2xl font-bold text-theme-primary mb-6 flex items-center">
              <Icon name="ph:share-network" class="w-6 h-6 mr-3" />
              Retrouvez-moi sur
            </h2>
            
            <div class="grid grid-cols-2 gap-4">
              <a
                href="https://github.com/williamloree"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center space-x-3 p-4 bg-theme-secondary rounded-lg hover:bg-theme-tertiary transition-colors group"
              >
                <Icon name="ph:github-logo" class="w-6 h-6 text-theme-primary group-hover:scale-110 transition-transform" />
                <span class="text-theme-secondary group-hover:text-theme-primary transition-colors">GitHub</span>
              </a>
              
              <a
                href="https://linkedin.com/in/williamloree"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center space-x-3 p-4 bg-theme-secondary rounded-lg hover:bg-theme-tertiary transition-colors group"
              >
                <Icon name="ph:linkedin-logo" class="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                <span class="text-theme-secondary group-hover:text-theme-primary transition-colors">LinkedIn</span>
              </a>
              
              <a
                href="https://twitter.com/williamloree"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center space-x-3 p-4 bg-theme-secondary rounded-lg hover:bg-theme-tertiary transition-colors group"
              >
                <Icon name="ph:twitter-logo" class="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                <span class="text-theme-secondary group-hover:text-theme-primary transition-colors">Twitter</span>
              </a>
              
              <a
                href="https://instagram.com/williamloree"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center space-x-3 p-4 bg-theme-secondary rounded-lg hover:bg-theme-tertiary transition-colors group"
              >
                <Icon name="ph:instagram-logo" class="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" />
                <span class="text-theme-secondary group-hover:text-theme-primary transition-colors">Instagram</span>
              </a>
            </div>
          </div>

          <!-- FAQ rapide -->
          <div class="card-theme p-8">
            <h2 class="text-2xl font-bold text-theme-primary mb-6 flex items-center">
              <Icon name="ph:question" class="w-6 h-6 mr-3" />
              Questions fréquentes
            </h2>
            
            <div class="space-y-4">
              <details class="group">
                <summary class="flex items-center justify-between cursor-pointer text-theme-primary font-medium p-2 rounded hover:bg-theme-secondary transition-colors">
                  <span>Combien de temps pour un projet ?</span>
                  <Icon name="ph:caret-down" class="w-4 h-4 group-open:rotate-180 transition-transform" />
                </summary>
                <p class="text-theme-secondary text-sm mt-2 pl-2">
                  Cela dépend de la complexité, mais comptez 2-4 semaines pour un site vitrine, 
                  1-3 mois pour une application web complète.
                </p>
              </details>
              
              <details class="group">
                <summary class="flex items-center justify-between cursor-pointer text-theme-primary font-medium p-2 rounded hover:bg-theme-secondary transition-colors">
                  <span>Travaillez-vous en remote ?</span>
                  <Icon name="ph:caret-down" class="w-4 h-4 group-open:rotate-180 transition-transform" />
                </summary>
                <p class="text-theme-secondary text-sm mt-2 pl-2">
                  Oui, je travaille principalement en remote avec mes clients partout en France et en Europe.
                </p>
              </details>
              
              <details class="group">
                <summary class="flex items-center justify-between cursor-pointer text-theme-primary font-medium p-2 rounded hover:bg-theme-secondary transition-colors">
                  <span>Quelles technologies utilisez-vous ?</span>
                  <Icon name="ph:caret-down" class="w-4 h-4 group-open:rotate-180 transition-transform" />
                </summary>
                <p class="text-theme-secondary text-sm mt-2 pl-2">
                  Vue.js, Nuxt.js, Node.js, TypeScript, Tailwind CSS et bien d'autres selon vos besoins.
                </p>
              </details>
            </div>
          </div>
        </section>
      </div>

      <!-- Call to action final -->
      <section class="text-center mt-16 card-theme p-12">
        <h2 class="text-3xl font-bold text-theme-primary mb-4">
          Prêt à concrétiser votre projet ?
        </h2>
        <p class="text-theme-secondary text-lg mb-8 max-w-2xl mx-auto">
          N'hésitez pas à me contacter pour discuter de vos idées. 
          Je vous accompagne de la conception à la mise en ligne.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            :href="`mailto:${profileInfo.email}`"
            class="btn-theme-primary inline-flex items-center justify-center"
          >
            <Icon name="ph:envelope" class="w-5 h-5 mr-2" />
            Email direct
          </a>
          <a
            :href="`tel:${profileInfo.phone}`"
            class="btn-theme-secondary inline-flex items-center justify-center"
          >
            <Icon name="ph:phone" class="w-5 h-5 mr-2" />
            Appel direct
          </a>
          <NuxtLink
            to="/projets"
            class="btn-theme-secondary inline-flex items-center justify-center"
          >
            <Icon name="ph:folder-open" class="w-5 h-5 mr-2" />
            Voir mes réalisations
          </NuxtLink>
        </div>
      </section>
    </main>

    <!-- Notification de succès -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="showSuccessMessage"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          @click="showSuccessMessage = false"
        >
          <div class="bg-theme-secondary rounded-2xl p-8 max-w-md w-full text-center" @click.stop>
            <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ph:check-circle" class="w-8 h-8 text-green-400" />
            </div>
            <h3 class="text-xl font-bold text-theme-primary mb-2">Message envoyé !</h3>
            <p class="text-theme-secondary mb-6">
              Merci pour votre message. Je vous répondrai dans les plus brefs délais.
            </p>
            <button
              @click="showSuccessMessage = false"
              class="btn-theme-primary w-full"
            >
              Fermer
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
// Configuration SEO
useHead({
  title: 'Contact - Portfolio',
  meta: [
    { 
      name: 'description', 
      content: 'Contactez-moi pour vos projets web, applications et développements sur mesure. Réponse garantie sous 24h.' 
    },
    { property: 'og:title', content: 'Contact - Portfolio' },
    { property: 'og:description', content: 'Discutons de votre projet web ensemble !' }
  ]
})

// Chargement des données de profil
const { data: profileData, error: profileError, loading: profileLoading } = useJson('profile.json')

// Données de profil calculées
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

// État du formulaire
const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
  newsletter: false,
  rgpd: false
})

// État de validation
const errors = reactive({
  name: '',
  email: '',
  projectType: '',
  message: ''
})

// État de soumission
const isSubmitting = ref(false)
const showSuccessMessage = ref(false)

// Validation du formulaire
const validateForm = () => {
  // Reset des erreurs
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  let isValid = true

  // Validation nom
  if (!form.name.trim()) {
    errors.name = 'Le nom est requis'
    isValid = false
  } else if (form.name.trim().length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères'
    isValid = false
  }

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'L\'email est requis'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Format d\'email invalide'
    isValid = false
  }

  // Validation type de projet
  if (!form.projectType) {
    errors.projectType = 'Veuillez sélectionner un type de projet'
    isValid = false
  }

  // Validation message
  if (!form.message.trim()) {
    errors.message = 'Le message est requis'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères'
    isValid = false
  } else if (form.message.length > 1000) {
    errors.message = 'Le message ne peut pas dépasser 1000 caractères'
    isValid = false
  }

  return isValid
}

// Soumission du formulaire
const submitForm = async () => {
  if (!validateForm() || !form.rgpd) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulation d'envoi (remplacez par votre API)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Ici vous ajouteriez l'appel à votre API de contact
    console.log('Formulaire soumis:', form)
    
    // Reset du formulaire
    Object.keys(form).forEach(key => {
      if (typeof form[key as keyof typeof form] === 'string') {
        form[key as keyof typeof form] = ''
      } else {
        form[key as keyof typeof form] = false
      }
    })
    
    // Afficher le message de succès
    showSuccessMessage.value = true
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
    // Ici vous géreriez l'erreur
  } finally {
    isSubmitting.value = false
  }
}

// Limite de caractères pour le message
watch(() => form.message, (newMessage) => {
  if (newMessage.length > 1000) {
    form.message = newMessage.slice(0, 1000)
  }
})
</script>

<style scoped>
/* Styles spécifiques à la page de contact */
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

/* Animation pour les icônes */
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-8px);
  }
  70% {
    transform: translateY(-4px);
  }
  90% {
    transform: translateY(-2px);
  }
}

/* Style pour les inputs */
input:focus, select:focus, textarea:focus {
  outline: none;
  ring: 2px solid var(--primary-color);
  border-color: transparent;
}

/* Style pour les details/summary */
details summary::-webkit-details-marker {
  display: none;
}

details[open] summary {
  margin-bottom: 0.5rem;
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
  
  .grid.lg\\:grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* Animation des cartes */
.card-theme:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* Style pour les liens */
a:hover {
  transition: all 0.3s ease;
}
</style>