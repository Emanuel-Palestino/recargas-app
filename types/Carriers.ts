export const Carrier = {
  telcel: 'telcel',
  movistar: 'movistar',
  att: 'att',
} as const

export type Carrier = typeof Carrier[keyof typeof Carrier]