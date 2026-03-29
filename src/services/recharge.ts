import { getUsername } from "@/store/userStore"
import { BaitProductType, Carrier, TelcelProductType } from "@/types/Carriers"
import { InvalidUsernameError, UsernameNotFoundError } from "@/types/errors"
import { ScheduledTransaction } from "@/types/ScheduledTransaction"
import { Transaction } from "@/types/Transaction"

const API_URL = process.env.EXPO_PUBLIC_RECHARGE_SVC_API_URL

export type RechargeRequest = {
  phone: string
  amount: number
  carrier: Carrier
  extraData?: TelcelProductType | BaitProductType
}

export type ScheduleRechargeRequest = {
	targetDay: number,
	targetMonth: number,
	targetYear: number,
	phone: string,
	amount: number,
	carrier: Carrier,
	extraData?: TelcelProductType | BaitProductType,
}

export type RechargeResponse = {
  code: number
  message: string
}

export const recharge = async (request: RechargeRequest): Promise<RechargeResponse> => {
  const { phone, amount, carrier, extraData = "" } = request

  const username = await getUsername()
  if (!username) {
    throw new UsernameNotFoundError('Username not found')
  }

  const response = await fetch(`${API_URL}/recharge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      username: username,
    },
    body: JSON.stringify({
      phone,
      amount,
      carrier,
      extraData,
    }),
  })

  if (response.status === 403) {
    throw new InvalidUsernameError('Invalid username')
  } else if (response.status === 400) {
    const errorResponse = await response.json() as RechargeResponse
    return errorResponse
  }

  if (!response.ok) {
    throw new Error('Error al procesar la recarga')
  }

  const data = await response.json() as RechargeResponse

  return data
}

export const getTransactions = async (startDate: number, endDate: number): Promise<Transaction[]> => {
  const startDateString = new Date(startDate).toISOString()
  const endDateString = new Date(endDate).toISOString()

  const username = await getUsername()
  if (!username) {
    throw new UsernameNotFoundError('Username not found')
  }

  const response = await fetch(`${API_URL}/transactions?startDate=${startDateString}&endDate=${endDateString}`, {
    method: 'GET',
    headers: {
      username: username,
    },
  })

  if (response.status === 403) {
    throw new InvalidUsernameError('Invalid username')
  }

  if (!response.ok) {
    throw new Error('Error al obtener las transacciones')
  }

  const data = await response.json() as Transaction[]
  return data
}

export const scheduleRecharge = async (request: ScheduleRechargeRequest): Promise<RechargeResponse> => {

  const username = await getUsername()
  if (!username) {
    throw new UsernameNotFoundError('Username not found')
  }

  const response = await fetch(`${API_URL}/scheduledTransactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      username: username,
    },
    body: JSON.stringify(request),
  })

  if (response.status === 403) {
    throw new InvalidUsernameError('Invalid username')
  } else if (response.status === 400) {
    const errorResponse = await response.json() as RechargeResponse
    return errorResponse
  }

  if (!response.ok) {
    throw new Error('Error al procesar la recarga')
  }

  const data = await response.json() as RechargeResponse

  return data
}

export const getScheduledRecharges = async (): Promise<ScheduledTransaction[]> => {
  const username = await getUsername()
  if (!username) {
    throw new UsernameNotFoundError('Username not found')
  }

  const response = await fetch(`${API_URL}/scheduledTransactions/byUser`, {
    method: 'GET',
    headers: {
      username: username,
    },
  })

  if (response.status === 403) {
    throw new InvalidUsernameError('Invalid username')
  }

  if (!response.ok) {
    throw new Error('Error al obtener las recargas programadas')
  }

  const data = await response.json() as ScheduledTransaction[]
  return data
}