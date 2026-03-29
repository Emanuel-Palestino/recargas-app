import { BaitProductType, Carrier, TelcelProductType } from "./Carriers";

export type ScheduledTransaction = {
  id: number,
  creationDate: string,
  success: boolean,
  targetDay: number,
  targetMonth: number,
  targetYear: number,
  phone: string,
  amount: number,
  carrier: Carrier,
  extraData: TelcelProductType | BaitProductType,
}