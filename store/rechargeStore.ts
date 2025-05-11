import { Carrier, TelcelProductType } from '@/types/Carriers'
import { create } from 'zustand'

type RechargeStore = {
  currentStep: number
  phoneNumber: string
  carrier: Carrier
  recargaType: TelcelProductType
  amount: number
  benefits: string
}

type RechargeStoreActions = {
  goToNextStep: () => void
  goToPreviousStep: () => void
  setPhoneNumber: (phoneNumber: string) => void
  setCarrier: (carrier: Carrier) => void
  setRecargaType: (recargaType: TelcelProductType) => void
  setAmount: (amount: number) => void
  setBenefits: (benefits: string) => void
  resetState: () => void
}

export type RechargeStoreState = RechargeStore & RechargeStoreActions

export const useRechargeStore = create<RechargeStoreState>()((set) => ({
  currentStep: 0,
  phoneNumber: '',
  carrier: Carrier.TELCEL,
  recargaType: TelcelProductType.PAQUETE,
  amount: 0,
  benefits: '',

  goToNextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  goToPreviousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setCarrier: (carrier) => set({ carrier }),
  setRecargaType: (recargaType) => set({ recargaType }),
  setAmount: (amount) => set({ amount }),
  setBenefits: (benefits) => set({ benefits }),
  resetState: () => set({
    currentStep: 0,
    phoneNumber: '',
    carrier: Carrier.TELCEL,
    recargaType: TelcelProductType.PAQUETE,
    amount: 0,
    benefits: '',
  }),
}))