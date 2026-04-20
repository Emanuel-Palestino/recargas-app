import { RechargeRequest } from "./Transaction";

export const ScheduledTransactionType = {
	ONE_TIME: 'ONE_TIME',
	RECURRING: 'RECURRING',
} as const
export type ScheduledTransactionType = typeof ScheduledTransactionType[keyof typeof ScheduledTransactionType]

export type ScheduledTransaction = {
	id: string,
	type: ScheduledTransactionType,
	nextExecutionDateIso: string,
	lastExecutionDateIso: string | null,
	rechargePayload: RechargeRequest,
	lastExecutionSuccess: boolean | null,
	finished: boolean,
	createdAtTs: number,
	updatedAtTs: number,
}

export type ScheduledTransactionCreateApi = {
	type: ScheduledTransactionType,
	nextExecutionDateIso: string | null,
	rechargePayload: RechargeRequest,
}