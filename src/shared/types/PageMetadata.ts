export interface PageMetadata {
  status: 'loading' | 'error' | 'finished' | 'idle'
  description: string | null | undefined
  img: string | null | undefined
}
