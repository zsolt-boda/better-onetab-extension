<script setup lang="ts">
import type { TabInformation } from '@/shared/types'
import { useTabsStore } from '@/stores/tabs'
import { computed } from 'vue'

const props = defineProps<TabInformation>()
const pageName = computed(() => new URL(props.url).hostname)

const tabs = useTabsStore()
</script>

<template>
  <div class="wrapper">
    <h3 class="title">{{ props.title }}</h3>
    <PChip>{{ pageName }}</PChip>
    <div class="actions">
      <PButton text rounded icon="pi pi-link" />
      <PButton text rounded icon="pi pi-trash" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}

.wrapper:hover {
  background-color: var(--surface-50);
}

.title {
  margin: 8px 0;
}

.actions {
  margin-top: 8px;
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
