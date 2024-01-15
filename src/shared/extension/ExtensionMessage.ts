export const ExtensionMessage = {
  ENTRY_SAVED: 'entrySaved'
} as const

export type ExtensionMessage = EnumType<typeof ExtensionMessage>
