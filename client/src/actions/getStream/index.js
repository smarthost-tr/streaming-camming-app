import { GET_STREAM_USER, SET_USER } from "../types.js";

export const setGetStreamUser = (item) => {
	return {
		type: "GET_STREAM_USER",
		payload: item
	}
}
export const setUserGetStream = (statement) => {
	return {
		type: "SET_USER",
		payload: statement
	}
}