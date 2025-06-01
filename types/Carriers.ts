export const Carrier = {
  TELCEL: 'TELCEL',
  MOVISTAR: 'MOVISTAR',
  ATT: 'ATT',
	BAIT: 'BAIT',
} as const

export type Carrier = typeof Carrier[keyof typeof Carrier]

export const TelcelProductType = {
	SALDO: 'SALDO',
	PAQUETE: 'PAQUETE',
	INTERNET: 'INTERNET',
	INTERNET_POR_TIEMPO: 'INTERNET_POR_TIEMPO',
} as const

export type TelcelProductType = typeof TelcelProductType[keyof typeof TelcelProductType]

export const BaitProductType = {
	SALDO: 'SALDO',
	PAQUETE: 'PAQUETE',
	INTERNET_EN_CASA: 'INTERNET_EN_CASA',
	INTERNET_PORTATIL: 'INTERNET_PORTATIL',
} as const

export type BaitProductType = typeof BaitProductType[keyof typeof BaitProductType]