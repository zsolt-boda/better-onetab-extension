export interface TabInformation {
  title: string
  url: string
  meta: {
    status: 'loading' | 'error' | 'finished'
    description: string | null
    img: string | null
  }
}
