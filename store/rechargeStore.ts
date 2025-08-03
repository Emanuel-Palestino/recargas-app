import { Carrier, ProductType, TelcelProductType } from '@/types/Carriers'
import { create } from 'zustand'

type RechargeStore = {
  currentStep: number
  phoneNumber: string
  carrier: Carrier
  recargaType: ProductType
  amount: number
  benefits: string
  isScheduledRecharge: boolean
  targetDateTs: number
}

type RechargeStoreActions = {
  goToNextStep: () => void
  goToPreviousStep: () => void
  setPhoneNumber: (phoneNumber: string) => void
  setCarrier: (carrier: Carrier) => void
  setRecargaType: (recargaType: ProductType) => void
  setAmount: (amount: number) => void
  setBenefits: (benefits: string) => void
  setIsScheduledRecharge: (isScheduled: boolean) => void
  setTargetDateTs: (targetDateTs: number) => void
  resetState: () => void
  setCurrentStep: (step: number) => void
}

export type RechargeStoreState = RechargeStore & RechargeStoreActions

export const useRechargeStore = create<RechargeStoreState>()((set) => ({
  currentStep: 0,
  phoneNumber: '',
  carrier: Carrier.TELCEL,
  recargaType: TelcelProductType.PAQUETE,
  amount: 0,
  benefits: '',
  isScheduledRecharge: false,
  targetDateTs: 0,

  goToNextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  goToPreviousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setCarrier: (carrier) => set({ carrier }),
  setRecargaType: (recargaType) => set({ recargaType }),
  setAmount: (amount) => set({ amount }),
  setBenefits: (benefits) => set({ benefits }),
  setIsScheduledRecharge: (isScheduled) => set({ isScheduledRecharge: isScheduled }),
  setTargetDateTs: (targetDateTs) => set({ targetDateTs }),
  resetState: () => set({
    currentStep: 0,
    phoneNumber: '',
    carrier: Carrier.TELCEL,
    recargaType: TelcelProductType.PAQUETE,
    amount: 0,
    benefits: '',
    isScheduledRecharge: false,
    targetDateTs: 0,
  }),
  setCurrentStep: (step) => set({ currentStep: step }),
}))