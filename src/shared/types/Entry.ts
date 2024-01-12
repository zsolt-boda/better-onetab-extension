import type { TabInformation } from './TabInformation'

export interface Entry {
  id: string
  createdAt: Date
  tabs: (TabInformation & { position: number })[]
  isLocked: boolean
}
