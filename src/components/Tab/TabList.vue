<script setup lang="ts">
import type { Entry, TabInformation } from '@/shared/types'
import { useTabsStore } from '@/stores/tabs'
import { computed } from 'vue'

const props = defineProps<TabInformation & { entryId: Entry['id'] }>()
const pageName = computed(() => new URL(props.url).hostname)

const tabs = useTabsStore()

const handleDeleteClick = () => {
  tabs.deleteTab(props.entryId, props.id)
}

const handleRestoreClick = () => {
  tabs.restoreTab(props.entryId, props.id)
}
</script>

<template>
  <div class="wrapper" @click="handleRestoreClick">
    <h3 class="title">{{ props.title }}</h3>
    <PChip>{{ pageName }}</PChip>
    <div class="actions">
      <PButton @click.stop="handleRestoreClick" text rounded icon="pi pi-link" />
      <PButton @click.stop="handleDeleteClick" text rounded icon="pi pi-trash" />
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
