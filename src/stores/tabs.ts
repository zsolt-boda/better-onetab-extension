import { ENTRIES } from '@/shared/mocks/entries'
import type { Entry } from '@/shared/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const TabStyle = {
  CARD: 'card',
  LIST: 'list'
} as const

type TabStyle = EnumType<typeof TabStyle>

export const useTabsStore = defineStore('tabs', () => {
  const tabStyle = ref<TabStyle>(TabStyle.CARD)
  const entries = ref<Entry[]>(ENTRIES)

  const sortedEntries = computed<Entry[]>(() => entries.value)

  const restoreEntry = (entryId: Entry['id']) => {
    console.log('Restore', entryId)
  }

  const toggleLockOnEntry = (entryId: Entry['id']) => {
    console.log('Toggle lock', entryId)
  }

  return { entries: sortedEntries, tabStyle, restoreEntry, toggleLockOnEntry }
})
