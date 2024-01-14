<script setup lang="ts">
import type { Entry } from '@/shared/types'
import { useTabsStore } from '@/stores/tabs'
import { differenceInHours, differenceInMinutes, format, isToday, isYesterday } from 'date-fns'
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

const numberOfTabsInEntry = computed<number>(() => props.entry.tabs.length)

const formatDate = (date: Date): string => {
  if (isToday(date)) {
    const diffMinutes = differenceInMinutes(new Date(), date)
    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`
    }
    const diffHours = differenceInHours(new Date(), date)
    return `${diffHours} hours ago`
  }

  if (isYesterday(date)) {
    return 'Yesterday'
  }

  return format(date, 'yyyy-MM-dd')
}

const createdAtTimeString = computed<string>(() => formatDate(props.entry.createdAt))
</script>

<template>
  <PPanel class="item">
    <template #header>
      <div class="header">
        <PButton @click="handleFavoriteClick" text rounded :icon="favoriteIconSrc" />
        <div>Created: {{ createdAtTimeString }}</div>
        <span class="desktop">-</span>
        <div class="desktop">Tabs: {{ numberOfTabsInEntry }}</div>
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
