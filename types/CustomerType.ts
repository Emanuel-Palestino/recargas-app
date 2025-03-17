export const CustomerType = {
  GUESS: 'GUESS',
  REGISTERED: 'REGISTERED',
} as const

export type CustomerType = typeof CustomerType[keyof typeof CustomerType]