import { ENTRIES } from '@/shared/mocks/entries'
import type { Entry } from '@/shared/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { sumBy, size } from 'lodash'

const TabStyle = {
  CARD: 'card',
  LIST: 'list'
} as const

type TabStyle = EnumType<typeof TabStyle>

const EntrySortStrategy = {
  NEWEST: 'Newest to oldest',
  OLDEST: 'Oldest to newest'
} as const

type EntrySortStrategy = EnumType<typeof EntrySortStrategy>

const EntryDisplayStrategy = {
  SHOW_ALL: 'Show all',
  ONLY_FAVORITE: 'Show favorite'
} as const

type EntryDisplayStrategy = EnumType<typeof EntryDisplayStrategy>

export const useTabsStore = defineStore('tabs', () => {
  const entryDisplayStrategy = ref<EntryDisplayStrategy>(EntryDisplayStrategy.SHOW_ALL)
  const tabStyle = ref<TabStyle>(TabStyle.CARD)
  const entrySortingStrategy = ref<EntrySortStrategy>(EntrySortStrategy.NEWEST)
  const entries = ref<Entry[]>(ENTRIES)

  const sortedEntries = computed<Entry[]>(() => entries.value)
  const numberOfTabs = computed<number>(() =>
    sumBy(entries.value, (entry: Entry) => size(entry.tabs))
  )

  const setTabStyle = (style: TabStyle) => {
    tabStyle.value = style
  }

  const setEntrySortingStrategy = (strategy: EntrySortStrategy) => {
    entrySortingStrategy.value = strategy
  }

  const setEntryDisplayStrategy = (strategy: EntryDisplayStrategy) => {
    entryDisplayStrategy.value = strategy
  }

  const deleteEntry = (entryId: Entry['id']) => {
    console.log('Delete', entryId)
  }

  const restoreEntry = (entryId: Entry['id']) => {
    console.log('Restore', entryId)
  }

  const toggleLockOnEntry = (entryId: Entry['id']) => {
    console.log('Toggle lock', entryId)
  }

  const toggleFavoriteEntry = (entryId: Entry['id']) => {
    console.log('Toggle favorite', entryId)
  }

  return {
    entries: sortedEntries,
    tabStyle,
    numberOfTabs,
    entrySortingStrategy,
    entryDisplayStrategy,
    restoreEntry,
    toggleLockOnEntry,
    setTabStyle,
    setEntrySortingStrategy,
    toggleFavoriteEntry,
    deleteEntry,
    setEntryDisplayStrategy
  }
})
