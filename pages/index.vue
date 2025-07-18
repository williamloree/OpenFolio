<template>
  <section class="text-center py-16">
    <h1 class="text-5xl font-bold mb-4">Bienvenue sur mon Portfolio</h1>
    <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
      Je suis <strong>Votre Nom</strong>, développeur web passionné.
      Découvrez mes expériences professionnelles et mon parcours éducatif.
    </p>

    <div class="flex justify-center gap-6">
      <NuxtLink
        to="/experiences"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
      >
        Voir mes expériences
      </NuxtLink>
      <NuxtLink
        to="/education"
        class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
      >
        Voir mon éducation
      </NuxtLink>
    </div>
  </section>
</template>
