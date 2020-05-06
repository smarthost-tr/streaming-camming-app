import { GET_STREAM_TOKEN } from "../types.js";

export const getStreamFeedToken = (token) => {
	return {
		type: "GET_STREAM_TOKEN",
		payload: token
	}
}