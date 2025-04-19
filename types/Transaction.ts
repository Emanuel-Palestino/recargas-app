import { Carrier } from "./Carriers";

export type Transaction = {
	id: number,
	date: string,
	success: boolean,
	note: string,
	phone: string,
	amount: number,
	carrier: Carrier,
	extraData: string,
}