export const Carrier = {
  TELCEL: 'TELCEL',
  MOVISTAR: 'MOVISTAR',
  ATT: 'ATT',
} as const

export type Carrier = typeof Carrier[keyof typeof Carrier]

export const TelcelProductType = {
	SALDO: 'SALDO',
	PAQUETE: 'PAQUETE',
	INTERNET: 'INTERNET',
	INTERNET_POR_TIEMPO: 'INTERNET_POR_TIEMPO',
} as const

export type TelcelProductType = typeof TelcelProductType[keyof typeof TelcelProductType]