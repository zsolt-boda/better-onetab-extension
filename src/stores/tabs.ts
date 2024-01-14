import { ENTRIES } from '@/shared/mocks/entries'
import {
  EntryFilterStrategy,
  EntrySortStrategy,
  TabStyle,
  type Entry,
  type EntryListTransformer
} from '@/shared/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { sumBy, size, values, get, filter } from 'lodash'
import { produce } from 'immer'
import { useToast } from 'primevue/usetoast'
import { compareAsc, compareDesc } from 'date-fns'

const EntrySortStrategyFunctions: Record<EntrySortStrategy, EntryListTransformer> = {
  [EntrySortStrategy.NEWEST]: (entries: Entry[]): Entry[] =>
    entries.sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt))),
  [EntrySortStrategy.OLDEST]: (entries: Entry[]): Entry[] =>
    entries.sort((a, b) => compareAsc(new Date(a.createdAt), new Date(b.createdAt)))
}

const EntryFilterStrategyFunctions: Record<EntryFilterStrategy, EntryListTransformer> = {
  [EntryFilterStrategy.SHOW_ALL]: (entries: Entry[]): Entry[] => entries,
  [EntryFilterStrategy.ONLY_FAVORITE]: (entries: Entry[]): Entry[] =>
    filter(entries, { isFavorite: true })
}

export const useTabsStore = defineStore('tabs', () => {
  const toast = useToast()

  const entryFilterStrategy = ref<EntryFilterStrategy>(EntryFilterStrategy.SHOW_ALL)
  const tabStyle = ref<TabStyle>(TabStyle.LIST)
  const entrySortingStrategy = ref<EntrySortStrategy>(EntrySortStrategy.NEWEST)
  const entries = ref<Record<string, Entry>>(ENTRIES)

  const entriesToShow = computed<Entry[]>(() => {
    const defaultEntries = values(entries.value)

    const entryFilterFunction: EntryListTransformer = get(
      EntryFilterStrategyFunctions,
      entryFilterStrategy.value
    )

    const entrySortingFunction: EntryListTransformer = get(
      EntrySortStrategyFunctions,
      entrySortingStrategy.value
    )
    const filteredEntries: Entry[] = entryFilterFunction(defaultEntries)
    const sortedEntries: Entry[] = entrySortingFunction(filteredEntries)

    return sortedEntries
  })

  const numberOfTabs = computed<number>(() =>
    sumBy(entriesToShow.value, (entry: Entry) => size(entry.tabs))
  )

  const setTabStyle = (style: TabStyle) => {
    tabStyle.value = style
  }

  const setEntrySortingStrategy = (strategy: EntrySortStrategy) => {
    entrySortingStrategy.value = strategy
  }

  const setEntryDisplayStrategy = (strategy: EntryFilterStrategy) => {
    entryFilterStrategy.value = strategy
  }

  const deleteEntry = (entryId: Entry['id']) => {
    entries.value = produce(entries.value, (draft) => {
      delete draft[entryId]
    })
  }

  const restoreEntry = (entryId: Entry['id']) => {
    console.log('Restore', entryId)
  }

  const toggleLockOnEntry = (entryId: Entry['id']) => {
    entries.value = produce(entries.value, (draft) => {
      draft[entryId].isLocked = !draft[entryId].isLocked
    })
  }

  const toggleFavoriteEntry = (entryId: Entry['id']) => {
    entries.value = produce(entries.value, (draft) => {
      draft[entryId].isFavorite = !draft[entryId].isFavorite
    })
  }

  return {
    entriesToShow,
    tabStyle,
    numberOfTabs,
    entrySortingStrategy,
    entryFilterStrategy,
    restoreEntry,
    toggleLockOnEntry,
    setTabStyle,
    setEntrySortingStrategy,
    toggleFavoriteEntry,
    deleteEntry,
    setEntryDisplayStrategy
  }
})
