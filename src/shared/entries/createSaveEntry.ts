import type { Entry } from '../types/Entry'
import { type TabObject } from '../extension/TabObject'
import type { EntriesRepository } from './EntriesRepository'
import { createEntry } from './createEntry'

export const createSaveEntry =
  ({ entriesRepository }: { entriesRepository: EntriesRepository }) =>
  async (tabs: TabObject[]) => {
    const { entry, entryId } = createEntry(tabs)

    let entries: Record<string, Entry> = {}

    try {
      entries = await entriesRepository.loadEntries()
      entries[entryId] = entry
      await entriesRepository.saveEntries(entries)
    } catch (error) {
      console.error('Error while loading entries', error)
    }
  }
