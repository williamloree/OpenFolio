<template>
  <ThemeWrapper>
    <Header />
    <NuxtPage />
  </ThemeWrapper>
</template>

<script setup lang="ts">
import ThemeWrapper from '~/components/ThemeWrapper.vue'
import Header from '~/components/Header.vue'
</script>

<style>
/* Style global minimal */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
