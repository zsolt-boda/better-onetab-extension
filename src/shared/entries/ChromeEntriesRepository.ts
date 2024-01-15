import { forEach } from 'lodash'
import { STORAGE_ENTRY_KEY } from '../extension'
import type { StorageSerializer } from '../extension/StorageSerializer/StorageSerializer'
import type { Entry } from '../types'
import type { EntriesRepository } from './EntriesRepository'

export const createChromeEntriesRepository = (
  serializer: StorageSerializer
): EntriesRepository => ({
  loadEntries: async (): Promise<Record<string, Entry>> => {
    let entries: Record<string, Entry> = {}
    try {
      const result = await chrome.storage.local.get(STORAGE_ENTRY_KEY)
      entries = serializer.load(result[STORAGE_ENTRY_KEY])
    } catch (error) {
      console.error('Error while loading entries', error)
    }
    return entries
  },
  saveEntries: async (entries: Record<string, Entry>) => {
    try {
      await chrome.storage.local.set({ [STORAGE_ENTRY_KEY]: serializer.dump(entries) })
    } catch (error) {
      console.error('Error while saving entries', error)
    }
  },

  restoreTabs: async (urls: string[]) => {
    forEach(urls, (url: string) => {
      chrome.tabs.create({ url })
    })
  }
})
