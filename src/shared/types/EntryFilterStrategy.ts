export const EntryFilterStrategy = {
  SHOW_ALL: 'Show all',
  ONLY_FAVORITE: 'Show favorite'
} as const
export type EntryFilterStrategy = EnumType<typeof EntryFilterStrategy>
