<script setup lang="ts">
import { RouterView } from 'vue-router'
import DefaultLayout from './components/DefaultLayout.vue'
import { usePlatformStore } from './stores/platform'
const platform = usePlatformStore()
</script>

<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>
