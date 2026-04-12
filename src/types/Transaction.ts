import { BaitProductType, Carrier, TelcelProductType } from "./Carriers"

export type RechargeRequest = {
	phone: string,
	amount: number,
	carrier: Carrier,
	productType: TelcelProductType | BaitProductType,
}

export const TransactionStatus = {
	PENDING: 'PENDING',
	SUCCESS: 'SUCCESS',
	FAILED: 'FAILED',
} as const
export type TransactionStatus = typeof TransactionStatus[keyof typeof TransactionStatus]

export type Transaction = {
	id: string,
	userId: string,
	rechargePayload: RechargeRequest,
	providerMetadata: object,
	initiatorId: string | null, // null if the transaction was manual, scheduled transaction id if it was automatic
	status: TransactionStatus,
	createdAtIso: string,
	updatedAtIso: string,
}