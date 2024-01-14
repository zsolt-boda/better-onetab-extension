export const ExtensionCommand = {
  SEND_THIS_TAB: 'Send this tab',
  SEND_ALL_TABS: 'Send all tabs'
} as const

export type ExtensionCommand = EnumType<typeof ExtensionCommand>
