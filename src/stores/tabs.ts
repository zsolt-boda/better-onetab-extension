import type { Entry } from '@/shared/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTabsStore = defineStore('tabs', () => {
  const entries = ref<Entry[]>([])

  const sortedEntries = computed<Entry[]>(() => entries.value)

  const restoreEntry = (entryId: Entry['id']) => {
    console.log('Restore', entryId)
  }

  const toggleLockOnEntry = (entryId: Entry['id']) => {
    console.log('Toggle lock', entryId)
  }

  return { entries: sortedEntries, restoreEntry, toggleLockOnEntry }
})
