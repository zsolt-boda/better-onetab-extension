import type { TabInformation } from './TabInformation'

export interface Entry {
  id: string
  createdAt: string
  tabs: TabInformation & { position: number }
  isLocked: boolean
}
