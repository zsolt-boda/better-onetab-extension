export interface PageMetadata {
  status: 'loading' | 'error' | 'finished'
  description: string | null | undefined
  img: string | null | undefined
}
