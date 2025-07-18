<template>
  <ThemeWrapper>
    <Header />
    <main class="max-w-4xl mx-auto p-6">
      <slot />
    </main>
  </ThemeWrapper>
</template>

<script setup lang="ts">
import ThemeWrapper from '~/components/ThemeWrapper.vue'
import Header from '~/components/Header.vue'
</script>

<style scoped>
main {
  min-height: calc(100vh - 60px);
}
</style>
