import { forEach } from 'lodash'
import { STORAGE_ENTRY_KEY } from '../extension'
import type { StorageSerializer } from '../extension/StorageSerializer/StorageSerializer'
import type { Entry } from '../types'
import type { EntriesRepository } from './EntriesRepository'
import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { ExtensionMessage } from '../extension/ExtensionMessage'

interface Props {
  serializer: StorageSerializer
  entriesRef?: Ref<Record<string, Entry>>
}

export const createChromeEntriesRepository = ({
  serializer,
  entriesRef
}: Props): EntriesRepository => {
  type Message = {
    action: string
    data: Record<string, Entry>
  }

  const loadEntries = async (): Promise<Record<string, Entry>> => {
    let entries: Record<string, Entry> = {}
    try {
      const result = await chrome.storage.local.get(STORAGE_ENTRY_KEY)
      entries = serializer.load(result[STORAGE_ENTRY_KEY])
    } catch (error) {
      console.error('Error while loading entries', error)
    }
    return entries
  }

  const saveEntries = async (entries: Record<string, Entry>) => {
    try {
      await chrome.storage.local.set({ [STORAGE_ENTRY_KEY]: serializer.dump(entries) })
      await chrome.runtime.sendMessage({ action: ExtensionMessage.ENTRY_SAVED, data: entries })
    } catch (error) {
      console.error('Error while saving entries', error)
    }
  }

  const restoreTabs = async (urls: string[]) => {
    forEach(urls, (url: string) => {
      chrome.tabs.create({ url })
    })
  }

  const chromeListener = (
    message: Message,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    if (message.action === 'entrySaved' && !!entriesRef) {
      loadEntries().then((r) => (entriesRef.value = r))
    }
  }

  const init = () => {
    onMounted(() => {
      chrome.runtime.onMessage.addListener(chromeListener)
    })

    onBeforeUnmount(() => {
      chrome.runtime.onMessage.removeListener(chromeListener)
    })
  }

  return {
    init,
    loadEntries,
    restoreTabs,
    saveEntries
  }
}
