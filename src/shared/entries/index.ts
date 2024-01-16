import type { Ref } from 'vue'
import { JsonStorageSerializer } from '../extension/StorageSerializer'
import { createAndroidEntriesRepository } from './AndroidEntriesRepository'
import type { Entry } from '../types'
import { createChromeEntriesRepository } from './ChromeEntriesRepository'

import type { EntriesRepository } from './EntriesRepository'

export const createEntriesRepository = (
  entriesRef: Ref<Record<string, Entry>>
): EntriesRepository => {
  const platform = import.meta.env.VITE_PLATFORM
  const config = {
    serializer: JsonStorageSerializer,
    entriesRef
  }

  if (platform === 'android') return createAndroidEntriesRepository(config)
  if (platform === 'web') return createChromeEntriesRepository(config)

  return createChromeEntriesRepository(config)
}
