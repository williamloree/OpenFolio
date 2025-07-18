<template>
  <div class="experience-list">
    <h2>Expériences</h2>
    <ul>
      <li v-for="exp in data?.experiences" :key="exp.id" class="p-4 border rounded mb-2">
        <h3>{{ exp.role }} - {{ exp.company }}</h3>
        <p>{{ exp.description }}</p>
        <small>{{ exp.start }} - {{ exp.end || 'Présent' }}</small>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useJson } from '~/utils/useJson'
const { data } = useJson('experiences.json')
</script>
