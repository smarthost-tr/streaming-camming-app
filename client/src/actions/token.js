import { TOKEN } from "./types.js";

export const token = (token) => {
	return {
		type: "TOKEN",
		payload: token
	}
}