import { Carrier } from "@/types/Carriers"

const API_URL = process.env.EXPO_PUBLIC_RECHARGE_SVC_API_URL

export type RechargeRequest = {
  phone: string
  amount: number
  carrier: Carrier
  extraData?: string
}

export type RechargeResponse = {
	code: number
	message: string
}

export const recharge = async (request: RechargeRequest): Promise<RechargeResponse> => {
  const { phone, amount, carrier, extraData = "" } = request

  const response = await fetch(`${API_URL}/recharge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone,
      amount,
      carrier,
      extraData,
    }),
  })

  if (!response.ok) {
    throw new Error('Error al procesar la recarga')
  }

  const data = await response.json() as RechargeResponse

  return data
}
