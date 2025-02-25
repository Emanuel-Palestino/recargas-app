export const CustomerType = {
  guess: 'guess',
  registered: 'registered',
} as const

export type CustomerType = typeof CustomerType[keyof typeof CustomerType]