<template>
  <div class="min-h-screen my-10">
    <div class="text-center py-12">
      <h1
        class="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent"
        style="
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        "
      >
        Politique de confidentialité
      </h1>
      <p class="text-theme-muted text-lg max-w-2xl mx-auto">
        Protection de vos données personnelles et respect de votre vie privée
      </p>
    </div>
    <!-- Contenu principal -->
    <main class="max-w-4xl mx-auto px-6">
      <div class="card-theme p-8 md:p-12 space-y-12">
        <!-- Introduction -->
        <section>
          <div
            class="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8"
          >
            <div class="flex items-start space-x-3">
              <Icon
                name="ph:check-circle"
                class="w-6 h-6 text-green-400 mt-1 flex-shrink-0"
              />
              <div>
                <h3 class="font-semibold text-green-400 mb-2">
                  Engagement de confidentialité
                </h3>
                <p class="text-theme-secondary">
                  Ce site est conçu pour respecter votre vie privée.
                  <strong>Aucune donnée personnelle n'est collectée</strong>
                  sans votre consentement explicite.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Données collectées -->
        <section>
          <h2
            class="text-2xl font-bold text-theme-primary mb-6 flex items-center"
          >
            <Icon name="ph:database" class="w-6 h-6 mr-3" />
            Données collectées
          </h2>

          <div class="space-y-6">
            <!-- Aucune donnée personnelle -->
            <div class="bg-theme-secondary rounded-xl p-6">
              <h3
                class="font-semibold text-theme-primary mb-3 flex items-center"
              >
                <Icon name="ph:user-x" class="w-5 h-5 mr-2" />
                Aucune donnée personnelle
              </h3>
              <p class="text-theme-secondary mb-4">
                Ce portfolio ne collecte aucune information personnelle
                identifiable :
              </p>
              <ul class="space-y-2 text-theme-secondary">
                <li class="flex items-center">
                  <Icon name="ph:x" class="w-4 h-4 mr-2 text-red-400" /> Pas de
                  nom, prénom, email
                </li>
                <li class="flex items-center">
                  <Icon name="ph:x" class="w-4 h-4 mr-2 text-red-400" /> Pas
                  d'adresse ou téléphone
                </li>
                <li class="flex items-center">
                  <Icon name="ph:x" class="w-4 h-4 mr-2 text-red-400" /> Pas de
                  profil utilisateur
                </li>
                <li class="flex items-center">
                  <Icon name="ph:x" class="w-4 h-4 mr-2 text-red-400" /> Pas de
                  compte ou inscription
                </li>
              </ul>
            </div>

            <!-- Données techniques -->
            <div class="bg-theme-secondary rounded-xl p-6">
              <h3
                class="font-semibold text-theme-primary mb-3 flex items-center"
              >
                <Icon name="ph:gear" class="w-5 h-5 mr-2" />
                Données techniques anonymes
              </h3>
              <p class="text-theme-secondary mb-4">
                Seules ces données techniques sont collectées automatiquement :
              </p>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-medium text-theme-primary mb-2">
                    Navigation
                  </h4>
                  <ul class="space-y-1 text-sm text-theme-secondary">
                    <li>• Pages visitées</li>
                    <li>• Durée de visite</li>
                    <li>• Navigateur utilisé</li>
                    <li>• Résolution d'écran</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-theme-primary mb-2">Technique</h4>
                  <ul class="space-y-1 text-sm text-theme-secondary">
                    <li>• Adresse IP (anonymisée)</li>
                    <li>• Système d'exploitation</li>
                    <li>• Performances de chargement</li>
                    <li>• Erreurs techniques</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Stockage local -->
            <div class="bg-theme-secondary rounded-xl p-6">
              <h3
                class="font-semibold text-theme-primary mb-3 flex items-center"
              >
                <Icon name="ph:hard-drives" class="w-5 h-5 mr-2" />
                Stockage local (LocalStorage)
              </h3>
              <p class="text-theme-secondary mb-4">
                Seules vos préférences sont sauvegardées localement dans votre
                navigateur :
              </p>
              <div class="bg-theme-tertiary rounded-lg p-4">
                <h4 class="font-medium text-theme-primary mb-2">
                  Données stockées :
                </h4>
                <ul class="space-y-1 text-sm text-theme-secondary">
                  <li>
                    •
                    <span class="font-mono bg-theme-primary/20 px-1 rounded"
                      >theme_preference</span
                    >
                    : Votre thème choisi (ocean, cyberpunk, etc.)
                  </li>
                  <li>
                    •
                    <span class="font-mono bg-theme-primary/20 px-1 rounded"
                      >visited_pages</span
                    >
                    : Pages déjà visitées (pour l'UX)
                  </li>
                </ul>
                <p class="text-xs text-theme-muted mt-3">
                  Ces données restent sur votre appareil et ne sont jamais
                  transmises.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Finalités du traitement -->
        <section>
          <h2
            class="text-2xl font-bold text-theme-primary mb-6 flex items-center"
          >
            <Icon name="ph:target" class="w-6 h-6 mr-3" />
            Finalités du traitement
          </h2>
          <div class="bg-theme-secondary rounded-xl p-6">
            <p class="text-theme-secondary mb-4">
              Les données techniques sont utilisées uniquement pour :
            </p>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="text-center">
                <div
                  class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3"
                >
                  <Icon name="ph:user-focus" class="w-6 h-6 text-blue-400" />
                </div>
                <h3 class="font-medium text-theme-primary mb-2">
                  Expérience utilisateur
                </h3>
                <p class="text-sm text-theme-secondary">
                  Améliorer la navigation et l'ergonomie
                </p>
              </div>
              <div class="text-center">
                <div
                  class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3"
                >
                  <Icon name="ph:speedometer" class="w-6 h-6 text-green-400" />
                </div>
                <h3 class="font-medium text-theme-primary mb-2">Performance</h3>
                <p class="text-sm text-theme-secondary">
                  Optimiser les temps de chargement
                </p>
              </div>
              <div class="text-center">
                <div
                  class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3"
                >
                  <Icon name="ph:chart-line" class="w-6 h-6 text-purple-400" />
                </div>
                <h3 class="font-medium text-theme-primary mb-2">
                  Statistiques
                </h3>
                <p class="text-sm text-theme-secondary">
                  Générer des stats anonymes
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Cookies et tracking -->
        <section>
          <h2
            class="text-2xl font-bold text-theme-primary mb-6 flex items-center"
          >
            <Icon name="ph:cookie" class="w-6 h-6 mr-3" />
            Cookies et tracking
          </h2>

          <div class="space-y-6">
            <!-- Pas de cookies -->
            <div
              class="bg-green-500/10 border border-green-500/20 rounded-xl p-6"
            >
              <h3 class="font-semibold text-green-400 mb-3 flex items-center">
                <Icon name="ph:check-circle" class="w-5 h-5 mr-2" />
                Politique sans cookies
              </h3>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-theme-primary mb-2">
                    Ce que nous NE faisons PAS :
                  </h4>
                  <ul class="space-y-1 text-sm text-theme-secondary">
                    <li>❌ Pas de cookies de tracking</li>
                    <li>❌ Pas de Google Analytics</li>
                    <li>❌ Pas de réseaux sociaux intégrés</li>
                    <li>❌ Pas de publicité</li>
                    <li>❌ Pas de scripts tiers</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-theme-primary mb-2">
                    Ce que nous utilisons :
                  </h4>
                  <ul class="space-y-1 text-sm text-theme-secondary">
                    <li>✅ LocalStorage uniquement</li>
                    <li>✅ Stockage local de préférences</li>
                    <li>✅ Pas de transmission de données</li>
                    <li>✅ Contrôle total utilisateur</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Gestion du stockage -->
            <div class="bg-theme-secondary rounded-xl p-6">
              <h3 class="font-semibold text-theme-primary mb-3">
                Gestion de vos données locales
              </h3>
              <p class="text-theme-secondary mb-4">
                Vous avez un contrôle total sur les données stockées localement
                :
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <button
                  @click="clearLocalData"
                  class="btn-theme-secondary inline-flex items-center justify-center"
                >
                  <Icon name="ph:trash" class="w-4 h-4 mr-2" />
                  Effacer mes données locales
                </button>
                <button
                  @click="showLocalData"
                  class="btn-theme-primary inline-flex items-center justify-center"
                >
                  <Icon name="ph:eye" class="w-4 h-4 mr-2" />
                  Voir mes données stockées
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Vos droits RGPD -->
        <section>
          <h2
            class="text-2xl font-bold text-theme-primary mb-6 flex items-center"
          >
            <Icon name="ph:scales" class="w-6 h-6 mr-3" />
            Vos droits (RGPD)
          </h2>
          <div class="bg-theme-secondary rounded-xl p-6">
            <p class="text-theme-secondary mb-6">
              Conformément au Règlement Général sur la Protection des Données
              (RGPD), vous disposez des droits suivants :
            </p>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <Icon name="ph:eye" class="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <h3 class="font-medium text-theme-primary">
                      Droit d'accès
                    </h3>
                    <p class="text-sm text-theme-secondary">
                      Connaître les données vous concernant
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <Icon name="ph:pencil" class="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h3 class="font-medium text-theme-primary">
                      Droit de rectification
                    </h3>
                    <p class="text-sm text-theme-secondary">
                      Corriger des données inexactes
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <Icon name="ph:trash" class="w-5 h-5 text-red-400 mt-1" />
                  <div>
                    <h3 class="font-medium text-theme-primary">
                      Droit à l'effacement
                    </h3>
                    <p class="text-sm text-theme-secondary">
                      Supprimer vos données
                    </p>
                  </div>
                </div>
              </div>
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <Icon name="ph:export" class="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h3 class="font-medium text-theme-primary">
                      Droit à la portabilité
                    </h3>
                    <p class="text-sm text-theme-secondary">
                      Récupérer vos données
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <Icon
                    name="ph:hand-palm"
                    class="w-5 h-5 text-orange-400 mt-1"
                  />
                  <div>
                    <h3 class="font-medium text-theme-primary">
                      Droit d'opposition
                    </h3>
                    <p class="text-sm text-theme-secondary">
                      Vous opposer au traitement
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <Icon name="ph:pause" class="w-5 h-5 text-yellow-400 mt-1" />
                  <div>
                    <h3 class="font-medium text-theme-primary">
                      Droit de limitation
                    </h3>
                    <p class="text-sm text-theme-secondary">
                      Limiter le traitement
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-6 p-4 bg-theme-tertiary rounded-lg">
              <p class="text-sm text-theme-secondary">
                <strong>Note :</strong> Étant donné que ce site ne collecte
                aucune donnée personnelle, la plupart de ces droits ne
                s'appliquent pas. Seules vos préférences locales peuvent être
                effacées.
              </p>
            </div>
          </div>
        </section>

        <!-- Contact DPO -->
        <section>
          <h2
            class="text-2xl font-bold text-theme-primary mb-6 flex items-center"
          >
            <Icon name="ph:user-circle-gear" class="w-6 h-6 mr-3" />
            Contact pour la protection des données
          </h2>
          <div class="bg-theme-secondary rounded-xl p-6">
            <p class="text-theme-secondary mb-4">
              Pour exercer vos droits ou toute question relative à la protection
              des données :
            </p>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-semibold text-theme-primary mb-2">
                  Délégué à la Protection des Données
                </h3>
                <p class="text-theme-secondary">
                  Email :
                  <a
                    href="mailto:[dpo@votre-domain.com]"
                    class="text-theme-primary hover:underline"
                    >[dpo@votre-domain.com]</a
                  ><br />
                  Courrier : [Adresse DPO]<br />
                  Réponse sous 30 jours maximum
                </p>
              </div>
              <div>
                <h3 class="font-semibold text-theme-primary mb-2">
                  Autorité de contrôle
                </h3>
                <p class="text-theme-secondary">
                  En cas de litige, vous pouvez saisir la CNIL :<br />
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    class="text-theme-primary hover:underline"
                    >www.cnil.fr</a
                  ><br />
                  3 Place de Fontenoy - TSA 80715<br />
                  75334 PARIS CEDEX 07
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Sécurité -->
        <section>
          <h2
            class="text-2xl font-bold text-theme-primary mb-6 flex items-center"
          >
            <Icon name="ph:lock" class="w-6 h-6 mr-3" />
            Sécurité des données
          </h2>
          <div class="bg-theme-secondary rounded-xl p-6">
            <p class="text-theme-secondary mb-4">
              Nous mettons en place des mesures techniques et organisationnelles
              pour protéger vos données :
            </p>
            <div class="grid md:grid-cols-3 gap-4">
              <div class="text-center">
                <div
                  class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3"
                >
                  <Icon name="ph:certificate" class="w-6 h-6 text-green-400" />
                </div>
                <h3 class="font-medium text-theme-primary mb-2">
                  Chiffrement SSL/TLS
                </h3>
                <p class="text-xs text-theme-secondary">
                  Connexion sécurisée HTTPS
                </p>
              </div>
              <div class="text-center">
                <div
                  class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3"
                >
                  <Icon name="ph:shield-check" class="w-6 h-6 text-blue-400" />
                </div>
                <h3 class="font-medium text-theme-primary mb-2">
                  Headers de sécurité
                </h3>
                <p class="text-xs text-theme-secondary">
                  CSP, HSTS, X-Frame-Options
                </p>
              </div>
              <div class="text-center">
                <div
                  class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3"
                >
                  <Icon name="ph:code" class="w-6 h-6 text-purple-400" />
                </div>
                <h3 class="font-medium text-theme-primary mb-2">
                  Code sécurisé
                </h3>
                <p class="text-xs text-theme-secondary">
                  Protection XSS, validation
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Modifications -->
        <section>
          <h2
            class="text-2xl font-bold text-theme-primary mb-6 flex items-center"
          >
            <Icon name="ph:clock-clockwise" class="w-6 h-6 mr-3" />
            Modifications de cette politique
          </h2>
          <div class="bg-theme-secondary rounded-xl p-6">
            <p class="text-theme-secondary mb-4">
              Cette politique de confidentialité peut être mise à jour
              occasionnellement. Nous vous informerons de tout changement
              important par :
            </p>
            <ul class="space-y-2 text-theme-secondary">
              <li class="flex items-center">
                <Icon name="ph:bell" class="w-4 h-4 mr-2 text-blue-400" />
                Notification sur le site web
              </li>
              <li class="flex items-center">
                <Icon name="ph:calendar" class="w-4 h-4 mr-2 text-green-400" />
                Mise à jour de la date de modification
              </li>
              <li class="flex items-center">
                <Icon
                  name="ph:file-text"
                  class="w-4 h-4 mr-2 text-purple-400"
                />
                Historique des versions disponible
              </li>
            </ul>
          </div>
        </section>
      </div>

      <!-- Informations de dernière mise à jour -->
      <div class="text-center mt-12 space-y-4">
        <div
          class="inline-flex items-center space-x-4 bg-theme-secondary rounded-xl px-6 py-4"
        >
          <div class="flex items-center space-x-2">
            <Icon name="ph:calendar" class="w-4 h-4 text-theme-primary" />
            <span class="text-sm text-theme-secondary"
              >Dernière mise à jour :</span
            >
            <span class="text-sm font-medium text-theme-primary">{{
              lastUpdate
            }}</span>
          </div>
          <div class="w-px h-4 bg-theme-tertiary"></div>
          <div class="flex items-center space-x-2">
            <Icon name="ph:tag" class="w-4 h-4 text-theme-primary" />
            <span class="text-sm text-theme-secondary">Version :</span>
            <span class="text-sm font-medium text-theme-primary">v2.0</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Configuration de la page
useHead({
  title: "Politique de confidentialité - Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Politique de confidentialité du portfolio - Protection des données personnelles et respect de la vie privée.",
    },
    {
      property: "og:title",
      content: "Politique de confidentialité - Portfolio",
    },
    {
      property: "og:description",
      content:
        "Notre engagement pour la protection de vos données personnelles.",
    },
    { name: "robots", content: "noindex, nofollow" },
  ],
});

// Date de dernière mise à jour
const lastUpdate = ref("Décembre 2024");

// Informations sur les données locales
const localDataInfo = ref(null);

// Fonction pour effacer les données locales
const clearLocalData = () => {
  if (process.client) {
    const confirmed = confirm(
      "Êtes-vous sûr de vouloir effacer toutes vos données locales (préférences de thème, etc.) ?"
    );
    if (confirmed) {
      localStorage.clear();
      alert("Toutes vos données locales ont été effacées.");
      updateLocalDataInfo();
    }
  }
};

// Fonction pour afficher les données locales
const showLocalData = () => {
  if (process.client) {
    const data = Object.keys(localStorage).map((key) => ({
      key,
      value: localStorage.getItem(key),
    }));

    if (data.length === 0) {
      alert("Aucune donnée locale trouvée.");
    } else {
      const message = data
        .map((item) => `${item.key}: ${item.value}`)
        .join("\n");
      alert(`Vos données locales:\n\n${message}`);
    }
  }
};

// Mettre à jour les informations sur les données locales
const updateLocalDataInfo = () => {
  if (process.client) {
    const theme = localStorage.getItem("theme_preference") || "default";
    const allData = JSON.stringify(localStorage);
    const size = new Blob([allData]).size;

    localDataInfo.value = {
      theme,
      size,
    };
  }
};

// Initialiser les informations au montage
onMounted(() => {
  updateLocalDataInfo();
});
</script>

<style scoped>
/* Styles spécifiques à la page */
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
}

/* Animation pour les icônes */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Style pour les boutons */
.btn-theme-primary,
.btn-theme-secondary {
  transition: all 0.3s ease;
}

.btn-theme-primary:hover,
.btn-theme-secondary:hover {
  transform: translateY(-1px);
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

  .grid.md\\:grid-cols-2,
  .grid.md\\:grid-cols-3 {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
