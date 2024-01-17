import type { Entry } from '../types/Entry'
import { map } from 'lodash'
import { v4 as generateId } from 'uuid'
import { type TabObject } from '../extension/TabObject'

export const createEntry = (tabs: TabObject[]): { entry: Entry; entryId: string } => {
  const entryId: Entry['id'] = generateId()

  const entry: Entry = {
    id: entryId,
    createdAt: new Date(),
    isFavorite: false,
    isLocked: false,
    tabs: map(tabs, (tab: TabObject) => ({
      id: generateId(),
      title: tab.title,
      url: tab.url,
      meta: {
        status: 'idle',
        description: '',
        img: ''
      }
    }))
  }
  return { entry, entryId }
}
