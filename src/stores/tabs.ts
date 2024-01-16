import {
  EntryFilterStrategy,
  EntrySortStrategy,
  TabStyle,
  type Entry,
  type EntryListTransformer,
  type TabInformation
} from '@/shared/types'
import { defineStore } from 'pinia'
import { computed, onMounted, ref, shallowRef, watch } from 'vue'
import { sumBy, size, values, get, filter, find, map } from 'lodash'
import { produce } from 'immer'
import { compareAsc, compareDesc } from 'date-fns'
import type { EntriesRepository } from '@/shared/entries/EntriesRepository'
import { createEntriesRepository } from '@/shared/entries'

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
  const entryFilterStrategy = ref<EntryFilterStrategy>(EntryFilterStrategy.SHOW_ALL)
  const tabStyle = ref<TabStyle>(TabStyle.LIST)
  const entrySortingStrategy = ref<EntrySortStrategy>(EntrySortStrategy.NEWEST)
  const entries = shallowRef<Record<string, Entry>>({})

  const entriesRepository: EntriesRepository = createEntriesRepository(entries)

  entriesRepository.init()

  onMounted(() => {
    entriesRepository.loadEntries().then((r) => (entries.value = r))
  })

  // TODO: Fix double save when entries first loaded
  watch(entries, async (newEntries) => {
    await entriesRepository.saveEntries(newEntries)
  })

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

  const deleteEntry = (entryId: Entry['id'], forced: boolean = false) => {
    if (!forced && get(entries.value, `${entryId}.isLocked`, false)) return

    entries.value = produce(entries.value, (draft) => {
      delete draft[entryId]
    })
  }

  const restoreEntry = (entryId: Entry['id']) => {
    const urls: string[] = map(get(entries.value, [entryId, 'tabs'], []), 'url')
    entriesRepository.restoreTabs(urls)
    deleteEntry(entryId)
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

  const deleteTab = (entryId: Entry['id'], tabId: TabInformation['id']) => {
    entries.value = produce(entries.value, (draft) => {
      const entry = draft[entryId]
      if (entry) {
        entry.tabs = entry.tabs.filter((tab) => tab.id !== tabId)
      }
    })

    if (size(get(entries.value, `${entryId}.tabs`, [])) === 0) {
      deleteEntry(entryId, true)
    }
  }

  const restoreTab = (entryId: Entry['id'], tabId: TabInformation['id']) => {
    const tab: TabInformation = find(get(entries.value, [entryId, 'tabs'], []), { id: tabId })!
    entriesRepository.restoreTabs([tab.url])
    if (!get(entries.value, `${entryId}.isLocked`, false)) {
      deleteTab(entryId, tabId)
    }
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
    setEntryDisplayStrategy,
    restoreTab,
    deleteTab
  }
})
