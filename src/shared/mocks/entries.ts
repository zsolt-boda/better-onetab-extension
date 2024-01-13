import type { Entry } from '../types'
import { subDays } from 'date-fns'

export const ENTRIES: Record<string, Entry> = {
  '01111': {
    id: '01111',
    createdAt: new Date(),
    isLocked: false,
    isFavorite: false,
    tabs: [
      {
        title: 'Facebook | Profile',
        url: 'https://facebook.com/me/profile',
        position: 0,
        meta: {
          description: null,
          img: null,
          status: 'loading'
        }
      },
      {
        title: 'Youtube | Minecraft',
        url: 'https://youtube.com/search?v=minecraft',
        position: 1,
        meta: {
          description: null,
          img: null,
          status: 'error'
        }
      }
    ]
  },
  '022222': {
    id: '022222',
    createdAt: subDays(new Date(), 1),
    isLocked: true,
    isFavorite: true,
    tabs: [
      {
        title: 'Facebook | Profile',
        url: 'https://facebook.com/me/profile',
        position: 0,
        meta: {
          description: null,
          img: null,
          status: 'loading'
        }
      },
      {
        title: 'Youtube | Minecraft',
        url: 'https://youtube.com/search?v=minecraft',
        position: 1,
        meta: {
          description: null,
          img: null,
          status: 'error'
        }
      }
    ]
  },
  '03333': {
    id: '03333',
    createdAt: subDays(new Date(), 5),
    isLocked: false,
    isFavorite: false,
    tabs: [
      {
        title: 'Facebook | Profile',
        url: 'https://facebook.com/me/profile',
        position: 0,
        meta: {
          description: null,
          img: null,
          status: 'loading'
        }
      },
      {
        title: 'Youtube | Minecraft',
        url: 'https://youtube.com/search?v=minecraft',
        position: 1,
        meta: {
          description: null,
          img: null,
          status: 'error'
        }
      }
    ]
  }
}
