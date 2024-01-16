import { STORAGE_ENTRY_KEY } from './../extension/index'
import { forEach } from 'lodash'
import type { StorageSerializer } from '../extension/StorageSerializer/StorageSerializer'
import type { Entry } from '../types'
import type { EntriesRepository } from './EntriesRepository'
import { type Ref } from 'vue'
import { ENTRIES } from '../mocks/entries'
import { Browser } from '@capacitor/browser'
import { Storage } from '@capacitor/storage'

interface Props {
  serializer: StorageSerializer
  entriesRef: Ref<Record<string, Entry>>
}

export const createAndroidEntriesRepository = ({ serializer }: Props): EntriesRepository => {
  const loadEntries = async (): Promise<Record<string, Entry>> => {
    let entries: Record<string, Entry> = ENTRIES
    try {
      const result = await Storage.get({ key: STORAGE_ENTRY_KEY })
      entries = serializer.load(result.value as string)
    } catch (error) {
      console.error('Error while loading entries', error)
    }
    return entries
  }

  const saveEntries = async (entries: Record<string, Entry>) => {
    try {
      await Storage.set({
        key: STORAGE_ENTRY_KEY,
        value: serializer.dump(entries)
      })
    } catch (error) {
      console.error('Error while saving entries', error)
    }
  }

  const restoreTabs = async (urls: string[]) => {
    forEach(urls, (url: string) => {
      Browser.open({ url })
    })
  }

  const init = () => {}

  return {
    init,
    loadEntries,
    restoreTabs,
    saveEntries
  }
}
