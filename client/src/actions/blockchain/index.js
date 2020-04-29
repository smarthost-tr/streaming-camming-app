import { GATHER_CURRENCY } from "../types.js";

export const gatherCurrency = (currency) => {
	return {
		type: "GATHER_CURRENCY",
		payload: currency
	}
}
