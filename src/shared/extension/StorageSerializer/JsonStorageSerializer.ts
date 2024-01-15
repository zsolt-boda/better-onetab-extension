import type { Entry } from '@/shared/types'
import type { StorageSerializer } from './StorageSerializer'
import { mapValues } from 'lodash'

export const JsonStorageSerializer: StorageSerializer = {
  dump: (entries: Record<string, Entry>) => JSON.stringify(entries),
  load: (json: string) => {
    const loaded = JSON.parse(json)

    return mapValues(loaded, (inner) => ({
      ...inner,
      createdAt: new Date(inner.createdAt)
    }))
  }
}
