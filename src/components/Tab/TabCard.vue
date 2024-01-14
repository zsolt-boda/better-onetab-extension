<script setup lang="ts">
import { computed } from 'vue'
import { type TabInformation } from '../../shared/types/'

const props = defineProps<TabInformation>()
const pageName = computed(() => new URL(props.url).hostname)
</script>

<template>
  <PCard>
    <template #header>
      <PImage :src="props.meta.img" alt="img" width="250" />
    </template>
    <template #title>
      <h3>{{ props.title }}</h3>
    </template>
    <template #subtitle>
      <PChip>
        {{ pageName }}
      </PChip>
    </template>
    <template #content>
      <p>{{ props.meta.description }}</p>
    </template>
    <template #footer>
      <PButton text rounded icon="pi pi-link" />
      <PButton text rounded icon="pi pi-trash" />
    </template>
  </PCard>
</template>
