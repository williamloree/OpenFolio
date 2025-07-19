# 🚀 Portfolio Personnel - Nuxt.js

Un portfolio moderne et responsive développé avec Nuxt 3, présentant mes projets, compétences et expériences professionnelles.

## 📸 Aperçu

![Portfolio Preview](https://filer.iducation.fr/preview/image/1752966503047_openfolio.png "Title")

## ✨ Fonctionnalités

- 🎨 **Design moderne** avec thème sombre/clair
- 📱 **Responsive** sur tous les appareils
- ⚡ **Performance optimisée** avec Nuxt 3
- 🎬 **Animations fluides** avec Vue Transitions
- 📊 **Statistiques des projets** dynamiques
- 🔍 **Filtrage des projets** par technologie
- 🌐 **SEO optimisé** avec meta tags dynamiques
- 🐳 **Containerisé** avec Docker

## 🛠️ Technologies Utilisées

### Frontend
- **Nuxt 3** - Framework Vue.js full-stack
- **Vue 3** - Framework JavaScript réactif
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Nuxt Icon** - Gestion des icônes

### Outils de Développement
- **ESLint** - Linting du code
- **Prettier** - Formatage du code
- **Docker** - Containerisation
- **Git** - Contrôle de version

## 🚀 Installation Rapide

### Prérequis
- Node.js 20+ 
- npm
- Git

### Installation Locale

```bash
# Cloner le projet
git clone https://github.com/williamloree/OpenFolio
cd OpenFolio

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

### 🐳 Installation avec Docker

```bash
# Builder l'image Docker
docker build -t OpenFolio .

# Lancer le conteneur
docker run -p 3000:3000 OpenFolio
```

## 📁 Structure du Projet

```txt
OpenFolio/
├── 📂 components/          # Composants Vue réutilisables
│   ├── EducationList.vue   # Liste des formations
│   └── ExperienceList.vue  # Liste des expériences
├── 📂 pages/              # Pages Nuxt (routage automatique)
│   ├── index.vue          # Page d'accueil
│   ├── projets.vue        # Page des projets
│   └── contact.vue        # Page de contact
├── 📂 public/             # Fichiers statiques
│   ├── 📂 images/         # Images du portfolio
│   └── 📂 data/           # Données JSON
├── 📂 assets/             # Ressources (CSS, images à traiter)
├── 📂 utils/              # Fonctions utilitaires
├── 📄 nuxt.config.ts      # Configuration Nuxt
├── 📄 tailwind.config.js  # Configuration Tailwind
├── 📄 Dockerfile          # Configuration Docker
└── 📄 package.json        # Dépendances du projet
```

## ⚙️ Configuration

### Données du OpenFolio

Les données sont stockées dans des fichiers JSON dans le dossier `public/data/` :

- `education.json` - Formations et diplômes
- `experiences.json` - Expériences professionnelles
- `projects.json` - Projets réalisés
- `skills.json` - Compétences techniques

#### Exemple de structure pour `projects.json`:

```json
{
  "projects": [
    {
      "id": "1",
      "title": "Mon Super Projet",
      "description": "Description courte du projet",
      "longDescription": "Description détaillée...",
      "image": "/images/projet1.jpg",
      "technologies": ["Vue.js", "Nuxt.js", "Tailwind"],
      "status": "completed",
      "demoUrl": "https://demo.example.com",
      "githubUrl": "https://github.com/user/repo",
      "featured": true
    }
  ]
}
```

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev              # Serveur de développement
npm run build            # Build de production
npm run preview          # Aperçu du build de production

# Qualité du code
npm run lint             # Vérification ESLint
npm run lint:fix         # Correction automatique ESLint

# Docker
docker build -t OpenFolio .    # Builder l'image
docker run -p 3000:3000 OpenFolio  # Lancer le conteneur
```

## 📱 Responsive Design

Le portfolio est optimisé pour tous les appareils :

- 📱 **Mobile** : 320px - 768px
- 📱 **Tablet** : 768px - 1024px  
- 💻 **Desktop** : 1024px+

## 🎨 Système de Thèmes Avancé

Le portfolio propose un système de thèmes complet et personnalisable directement via `nuxt.config.ts`.

### 🎭 Thèmes Disponibles

- 🌙 **Default** - Thème sombre moderne (défaut)
- 🌈 **Cyberpunk** - Néon et futurisme
- 🌲 **Forest** - Tons verts et naturels  
- 🌊 **Ocean** - Bleus apaisants

### ⚙️ Configuration des Thèmes

#### Dans `nuxt.config.ts` :

```typescript
export default defineNuxtConfig({
  // Changer le thème principal ici
  css: ["~/assets/themes/default.css"], // ou cyberpunk.css, forest.css, ocean.css
  
  // Configuration avancée des thèmes
  runtimeConfig: {
    public: {
      themeOptions: {
        // Mode développeur pour debug des thèmes
        devMode: process.env.NODE_ENV === 'development',
        // Thème actuel
        currentTheme: 'default',
        // Particules de fond activées
        backgroundParticles: true,
        // Transitions activées
        smoothTransitions: true
      }
    }
  }
})
```

### 🎯 Variables CSS Personnalisables

Chaque thème utilise des variables CSS définies dans `assets/themes/[theme].css` :

```css
:root {
  /* Couleurs principales */
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --accent-color: #10b981;
  
  /* Arrière-plans */
  --background-primary: #000000;
  --background-secondary: #111827;
  --background-tertiary: #1f2937;
  
  /* Textes */
  --text-primary: #ffffff;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  
  /* Gradients personnalisés */
  --gradient-hero: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-card: linear-gradient(145deg, #1f2937, #111827);
  
  /* Effets visuels */
  --shadow-glow: 0 0 20px rgba(59, 130, 246, 0.3);
  --shadow-card: 0 10px 30px rgba(0, 0, 0, 0.3);
}
```

### 🔧 Créer un Nouveau Thème

1. **Créer le fichier CSS** dans `assets/themes/mon-theme.css`
2. **Définir les variables** selon la structure ci-dessus
3. **Modifier nuxt.config.ts** :
   ```typescript
   css: ["~/assets/themes/mon-theme.css"]
   ```

### 🎮 Fonctionnalités Avancées

- **🎆 Particules animées** configurables par thème
- **✨ Transitions fluides** entre les sections
- **🐛 Mode debug** pour développement
- **📱 Responsive** sur tous les appareils
- **♿ Accessibilité** préservée

## 🚀 Déploiement

### Netlify/Vercel

```bash
# Build du projet
npm run build

# Les fichiers sont dans .output/
```

### Serveur VPS

```bash
# Builder l'image Docker
docker build -t OpenFolio .

# Lancer avec docker-compose
docker-compose up -d
```

## 📊 Performance

- ⚡ **Lighthouse Score** : 95+
- 🎯 **Core Web Vitals** : Optimisés
- 📦 **Bundle Size** : < 200KB
- 🚀 **First Paint** : < 1.5s

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commitez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

- 📧 **Email** : loreewilliam988@gmail.com
- 💼 **LinkedIn** : [Votre Profil](https://linkedin.com/in/votre-profil)
- 🐱 **GitHub** : [Votre Username](https://github.com/votre-username)
- 🌐 **Portfolio** : [votre-domaine.com](https://votre-domaine.com)

## 🙏 Remerciements

- [Nuxt.js](https://nuxt.com/) pour l'excellent framework
- [Tailwind CSS](https://tailwindcss.com/) pour le framework CSS
- [Iconify](https://iconify.design/) pour les icônes
- La communauté open source pour l'inspiration

---

⭐ **N'hésitez pas à mettre une étoile si ce projet vous a aidé !**