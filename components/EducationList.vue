<template>
  <div class="education-list">
    <h2>Éducation</h2>
    <ul>
      <li v-for="edu in data?.education" :key="edu.id" class="p-4 border rounded mb-2">
        <h3>{{ edu.school }} - {{ edu.degree }}</h3>
        <p>{{ edu.description }}</p>
        <small>{{ edu.year }}</small>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useJson } from '~/utils/useJson'
const { data } = useJson('education.json')
</script>
