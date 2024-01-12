export interface PageMetadata {
  status: 'loading' | 'error' | 'finished'
  description: string | null
  img: string | null
}
