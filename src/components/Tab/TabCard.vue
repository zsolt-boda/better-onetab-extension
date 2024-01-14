<script setup lang="ts">
import { computed } from 'vue'
import { type Entry, type TabInformation } from '../../shared/types/'
import { useTabsStore } from '@/stores/tabs'

const props = defineProps<TabInformation & { entryId: Entry['id'] }>()
const pageName = computed(() => new URL(props.url).hostname)
const description = computed<string>(() => props.meta.description ?? '')
const imgSrc = computed<string>(() => props.meta.img!)

const tabs = useTabsStore()

const handleDeleteClick = () => {
  tabs.deleteTab(props.entryId, props.id)
}

const handleRestoreClick = () => {
  tabs.restoreTab(props.entryId, props.id)
}
</script>

<template>
  <PCard class="wrapper" @click="handleRestoreClick">
    <template #header>
      <img class="img" :src="imgSrc" alt="img" />
    </template>
    <template #title>
      <h3 class="title">{{ props.title }}</h3>
    </template>
    <template #subtitle>
      <PChip>
        {{ pageName }}
      </PChip>
    </template>
    <template #content>
      <p class="description">{{ description }}</p>
    </template>
    <template #footer>
      <div class="actions">
        <PButton @click.stop="handleRestoreClick" text rounded icon="pi pi-link" />
        <PButton @click.stop="handleDeleteClick" text rounded icon="pi pi-trash" />
      </div>
    </template>
  </PCard>
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

.img {
  width: 100%;
}

.title {
  margin: 8px 0;
}

.description {
  padding: 0;
  margin: 0;
}

.actions {
  margin-top: 8px;
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
