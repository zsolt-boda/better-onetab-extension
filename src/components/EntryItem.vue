<script setup lang="ts">
import type { Entry } from '@/shared/types'
import { useTabsStore } from '@/stores/tabs'
import { format } from 'date-fns'
import { computed } from 'vue'

const props = defineProps<{ entry: Entry }>()

const favoriteIconSrc = computed<string>(() =>
  props.entry.isFavorite ? 'pi pi-star-fill' : 'pi pi-star'
)

const lockedIconSrc = computed<string>(() =>
  props.entry.isLocked ? 'pi pi-lock' : 'pi pi-lock-open'
)

const tabs = useTabsStore()

const handleFavoriteClick = () => {
  tabs.toggleFavoriteEntry(props.entry.id)
}

const handleRestoreClick = () => {
  tabs.restoreEntry(props.entry.id)
}

const handleLockClick = () => {
  tabs.toggleLockOnEntry(props.entry.id)
}

const handleDeleteClick = () => {
  tabs.deleteEntry(props.entry.id)
}

const createdAtTimeString = computed<string>(() => format(props.entry.createdAt, 'yyyy-MM-dd'))
const numberOfTabsInEntry = computed<number>(() => props.entry.tabs.length)
</script>

<template>
  <PPanel class="item">
    <template #header>
      <div class="header">
        <PButton @click="handleFavoriteClick" text rounded :icon="favoriteIconSrc" />
        <div>Created: {{ createdAtTimeString }}</div>
        <span>-</span>
        <div>Tabs: {{ numberOfTabsInEntry }}</div>
      </div>
    </template>
    <template #icons>
      <div class="icons">
        <PButton @click="handleRestoreClick" text rounded icon="pi pi-link" />
        <PButton @click="handleLockClick" text rounded :icon="lockedIconSrc" />
        <PButton @click="handleDeleteClick" text rounded icon="pi pi-trash" />
      </div>
    </template>
    <slot></slot>
  </PPanel>
</template>

<style scoped>
.item {
  padding-top: 20px;
}

.icons,
.header {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
