import { Carrier } from "./Carriers";

export type Transaction = {
	success: boolean,
	note: string,
	phone: string,
	amount: number,
	carrier: Carrier,
	extraData: string,
	metadataResponse: object,
}