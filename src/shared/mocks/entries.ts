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
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit egestas accumsan. Sed eget rhoncus dolor. Proin aliquam auctor sem, non luctus nunc varius eget. Etiam mollis ante et pharetra pretium. Aliquam rutrum sem urna, quis aliquet eros sagittis eu. Pellentesque quis fermentum mi. In facilisis accumsan massa. Vestibulum hendrerit libero condimentum nunc scelerisque varius. Nam eu mi cursus dolor ullamcorper dapibus ac ut felis. Nam laoreet sodales arcu, at pulvinar lectus volutpat non. Pellentesque varius neque eu tellus rhoncus, tempor efficitur ipsum volutpat. Pellentesque interdum dolor felis. Aenean dictum lorem risus, nec facilisis nisi vestibulum id. Aenean et velit vel tortor fringilla scelerisque',
          img: 'https://www.primefaces.org/static/social/primevue-preview.jpg',
          status: 'loading'
        }
      },
      {
        title: 'Youtube | Minecraft',
        url: 'https://youtube.com/search?v=minecraft',
        position: 1,
        meta: {
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit egestas accumsan. Sed eget rhoncus dolor. Proin aliquam auctor sem, non luctus nunc varius eget. Etiam mollis ante et pharetra pretium. Aliquam rutrum sem urna, quis aliquet eros sagittis eu. Pellentesque quis fermentum mi. In facilisis accumsan massa. Vestibulum hendrerit libero condimentum nunc scelerisque varius. Nam eu mi cursus dolor ullamcorper dapibus ac ut felis. Nam laoreet sodales arcu, at pulvinar lectus volutpat non. Pellentesque varius neque eu tellus rhoncus, tempor efficitur ipsum volutpat. Pellentesque interdum dolor felis. Aenean dictum lorem risus, nec facilisis nisi vestibulum id. Aenean et velit vel tortor fringilla scelerisque',
          img: 'https://www.primefaces.org/static/social/primevue-preview.jpg',
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
          img: 'https://www.primefaces.org/static/social/primevue-preview.jpg',
          status: 'loading'
        }
      },
      {
        title: 'Youtube | Minecraft',
        url: 'https://youtube.com/search?v=minecraft',
        position: 1,
        meta: {
          description: null,
          img: 'https://www.primefaces.org/static/social/primevue-preview.jpg',
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
          img: 'https://www.primefaces.org/static/social/primevue-preview.jpg',
          status: 'loading'
        }
      },
      {
        title: 'Youtube | Minecraft',
        url: 'https://youtube.com/search?v=minecraft',
        position: 1,
        meta: {
          description: null,
          img: 'https://www.primefaces.org/static/social/primevue-preview.jpg',
          status: 'error'
        }
      }
    ]
  }
}
