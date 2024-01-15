import type { Entry } from '@/shared/types'

export interface StorageSerializer {
  load: (json: string) => Record<string, Entry>
  dump: (entries: Record<string, Entry>) => string
}
