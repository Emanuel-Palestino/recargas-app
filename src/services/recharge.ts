import { getUsername } from "@/store/userStore"
import { InvalidUsernameError, UsernameNotFoundError } from "@/types/errors"
import { ScheduledTransaction, ScheduledTransactionCreateApi } from "@/types/ScheduledTransaction"
import { RechargeRequest, Transaction } from "@/types/Transaction"

const API_URL = process.env.EXPO_PUBLIC_RECHARGE_SVC_API_URL


export type RechargeResponse = {
  code: number
  message: string
}

export const recharge = async (request: RechargeRequest): Promise<RechargeResponse> => {
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

export const getTransactions = async (startDateIso: string, endDateIso: string): Promise<Transaction[]> => {
  const username = await getUsername()
  if (!username) {
    throw new UsernameNotFoundError('Username not found')
  }

  const response = await fetch(`${API_URL}/transactions?startDateIso=${startDateIso}&endDateIso=${endDateIso}`, {
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

export const scheduleRecharge = async (request: ScheduledTransactionCreateApi): Promise<RechargeResponse> => {
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