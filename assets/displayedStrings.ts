import { BaitProductType, Carrier, TelcelProductType } from "@/types/Carriers";
import { CustomerType } from "@/types/CustomerType";

export const DISPLAYED_CARRIER: Record<Carrier, string> = {
  [Carrier.TELCEL]: 'Telcel',
  [Carrier.MOVISTAR]: 'Movistar',
  [Carrier.ATT]: 'AT&T',
  [Carrier.BAIT]: 'Bait',
}

export const DISPLAYED_PRODUCT_TYPE: Record<TelcelProductType | BaitProductType, string> = {
  [TelcelProductType.SALDO]: 'Saldo',
  [TelcelProductType.PAQUETE]: 'Paquete',
  [TelcelProductType.INTERNET]: 'Internet',
  [TelcelProductType.INTERNET_POR_TIEMPO]: 'Internet por tiempo',
  [BaitProductType.INTERNET_EN_CASA]: 'Internet en casa',
  [BaitProductType.INTERNET_PORTATIL]: 'Internet portátil',
}

export const DISPLAYED_CUSTOMER_TYPE: Record<CustomerType, string> = {
  [CustomerType.GUESS]: 'Cliente Invitado',
  [CustomerType.REGISTERED]: 'Cliente Registrado',
}