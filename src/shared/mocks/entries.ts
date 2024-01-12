import type { Entry } from '../types'
import { subDays } from 'date-fns'

export const ENTRIES: Entry[] = [
  {
    id: '01111',
    createdAt: new Date(),
    isLocked: false,
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
  {
    id: '022222',
    createdAt: subDays(new Date(), 1),
    isLocked: true,
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
  {
    id: '03333',
    createdAt: subDays(new Date(), 5),
    isLocked: false,
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
]
