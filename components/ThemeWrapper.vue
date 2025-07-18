<template>
  <div :style="{ backgroundColor: theme?.background, color: theme?.text }" class="min-h-screen p-8">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useJson } from '~/utils/useJson'
const { data: theme } = useJson('theme.json')
</script>
