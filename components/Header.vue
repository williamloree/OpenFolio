<template>
  <header class="p-4 bg-gray-900 text-white flex justify-between items-center">
    <h1 class="text-xl font-bold">Mon Portfolio</h1>
    <nav>
      <ul class="flex gap-4">
        <li><NuxtLink to="/">Accueil</NuxtLink></li>
        <li><NuxtLink to="/experiences">Expériences</NuxtLink></li>
        <li><NuxtLink to="/education">Éducation</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
// Pas de logique pour l'instant, c'est un composant statique
</script>
