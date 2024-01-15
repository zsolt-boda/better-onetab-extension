export const ExtensionCommand = {
  SEND_THIS_TAB: 'Send this tab',
  SEND_ALL_TABS: 'Send all tabs',
  SEND_ALL_EXPECT_THIS: 'Send all expect this'
} as const

export type ExtensionCommand = EnumType<typeof ExtensionCommand>
