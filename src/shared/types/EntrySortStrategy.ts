export const EntrySortStrategy = {
  NEWEST: 'Newest to oldest',
  OLDEST: 'Oldest to newest'
} as const
export type EntrySortStrategy = EnumType<typeof EntrySortStrategy>
