export const Platform = {
  BROWSER: 'browser',
  EXTENSION: 'extension',
  MOBILE: 'mobile'
} as const

export type Platform = EnumType<typeof Platform>
