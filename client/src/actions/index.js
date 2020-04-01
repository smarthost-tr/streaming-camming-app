import { AUTH } from "./types.js";

export const authentication = (item) => {
	return {
		type: "AUTH",
		payload: item
	}
}
