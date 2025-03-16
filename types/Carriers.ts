export const Carrier = {
  telcel: 'telcel',
  movistar: 'movistar',
  att: 'att',
} as const

export type Carrier = typeof Carrier[keyof typeof Carrier]

export const TelcelProductType = {
	saldo: 'Saldo',
	paquete: 'Paquete',
	internet: 'Internet',
	internetTiempo: 'Internet por Tiempo',
} as const

export type TelcelProductType = typeof TelcelProductType[keyof typeof TelcelProductType]