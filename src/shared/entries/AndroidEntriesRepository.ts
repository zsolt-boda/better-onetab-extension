import { STORAGE_ENTRY_KEY } from './../extension/index'
import { forEach } from 'lodash'
import type { StorageSerializer } from '../extension/StorageSerializer/StorageSerializer'
import type { Entry } from '../types'
import type { EntriesRepository } from './EntriesRepository'
import { onBeforeMount, onMounted, type Ref } from 'vue'
import { ENTRIES } from '../mocks/entries'
import { Browser } from '@capacitor/browser'
import { Storage } from '@capacitor/storage'
import { App, type URLOpenListenerEvent } from '@capacitor/app'
import { createEntry } from './createEntry'
import type { TabObject } from '../extension/TabObject'

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

  const handleAppUrlOpen = async (event: URLOpenListenerEvent) => {
    console.error('handling')
    const tab: TabObject = {
      favIconUrl: '',
      title: 'This is a tab',
      url: event.url
    }
    const { entry, entryId } = createEntry([tab])

    let entries: Record<string, Entry> = {}
    try {
      entries = await loadEntries()
      entries[entryId] = entry
      await saveEntries(entries)
    } catch (error) {
      console.error('There was an error while saving shared url')
    }
  }

  const init = () => {
    onMounted(() => {
      console.error('Mounted')
      App.addListener('appUrlOpen', handleAppUrlOpen)
    })

    onBeforeMount(() => {
      App.removeAllListeners()
    })
  }

  return {
    init,
    loadEntries,
    restoreTabs,
    saveEntries
  }
}
