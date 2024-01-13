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
import { sumBy, size, values, get } from 'lodash'
import { produce } from 'immer'

const EntrySortStrategyFunctions: Record<EntrySortStrategy, EntryListTransformer> = {
  [EntrySortStrategy.NEWEST]: (entries: Entry[]): Entry[] => entries,
  [EntrySortStrategy.OLDEST]: (entries: Entry[]): Entry[] => entries
}

const EntryFilterStrategyFunctions: Record<EntryFilterStrategy, EntryListTransformer> = {
  [EntryFilterStrategy.SHOW_ALL]: (entries: Entry[]): Entry[] => entries,
  [EntryFilterStrategy.ONLY_FAVORITE]: (entries: Entry[]): Entry[] => entries
}

export const useTabsStore = defineStore('tabs', () => {
  const entryFilterStrategy = ref<EntryFilterStrategy>(EntryFilterStrategy.SHOW_ALL)
  const tabStyle = ref<TabStyle>(TabStyle.CARD)
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
    entries: entriesToShow,
    tabStyle,
    numberOfTabs,
    entrySortingStrategy,
    entryDisplayStrategy: entryFilterStrategy,
    restoreEntry,
    toggleLockOnEntry,
    setTabStyle,
    setEntrySortingStrategy,
    toggleFavoriteEntry,
    deleteEntry,
    setEntryDisplayStrategy
  }
})
