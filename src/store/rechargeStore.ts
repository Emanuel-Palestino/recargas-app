import { Carrier, ProductType, TelcelProductType } from '@/types/Carriers'
import { create } from 'zustand'

type RechargeStore = {
  phoneNumber: string
  carrier: Carrier
  recargaType: ProductType
  amount: number
  benefits: string
  isScheduledRecharge: boolean
  targetDateTs: number
}

type RechargeStoreActions = {
  setPhoneNumber: (phoneNumber: string) => void
  setCarrier: (carrier: Carrier) => void
  setRecargaType: (recargaType: ProductType) => void
  setAmount: (amount: number) => void
  setBenefits: (benefits: string) => void
  setIsScheduledRecharge: (isScheduled: boolean) => void
  setTargetDateTs: (targetDateTs: number) => void
  resetState: () => void
}

export type RechargeStoreState = RechargeStore & RechargeStoreActions

export const useRechargeStore = create<RechargeStoreState>()((set) => ({
  phoneNumber: '',
  carrier: Carrier.TELCEL,
  recargaType: TelcelProductType.PAQUETE,
  amount: 0,
  benefits: '',
  isScheduledRecharge: false,
  targetDateTs: 0,

  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setCarrier: (carrier) => set({ carrier }),
  setRecargaType: (recargaType) => set({ recargaType }),
  setAmount: (amount) => set({ amount }),
  setBenefits: (benefits) => set({ benefits }),
  setIsScheduledRecharge: (isScheduled) => set({ isScheduledRecharge: isScheduled }),
  setTargetDateTs: (targetDateTs) => set({ targetDateTs }),
  resetState: () => set({
    phoneNumber: '',
    carrier: Carrier.TELCEL,
    recargaType: TelcelProductType.PAQUETE,
    amount: 0,
    benefits: '',
    isScheduledRecharge: false,
    targetDateTs: 0,
  }),
}))
