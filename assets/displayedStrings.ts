import { Carrier, TelcelProductType } from "@/types/Carriers";
import { CustomerType } from "@/types/CustomerType";

export const DISPLAYED_CARRIER: Record<Carrier, string> = {
  [Carrier.TELCEL]: 'Telcel',
  [Carrier.MOVISTAR]: 'Movistar',
  [Carrier.ATT]: 'AT&T',
}

export const DISPLAYED_TELCEL_PRODUCT_TYPE: Record<TelcelProductType, string> = {
  [TelcelProductType.SALDO]: 'Saldo',
  [TelcelProductType.PAQUETE]: 'Paquete',
  [TelcelProductType.INTERNET]: 'Internet',
  [TelcelProductType.INTERNET_POR_TIEMPO]: 'Internet por tiempo',
}

export const DISPLAYED_CUSTOMER_TYPE: Record<CustomerType, string> = {
  [CustomerType.GUESS]: 'Cliente Invitado',
  [CustomerType.REGISTERED]: 'Cliente Registrado',
}