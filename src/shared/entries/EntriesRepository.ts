import type { Entry } from '../types'

export interface EntriesRepository {
  restoreTabs: (urls: string[]) => Promise<void>
  loadEntries: () => Promise<Record<string, Entry>>
  saveEntries: (entries: Record<string, Entry>) => Promise<void>
  init: () => void
}
