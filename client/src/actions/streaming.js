import { PLAYBACK_ID } from "./types.js";

export const streamPlaybackID = (item) => {
	return {
		type: "PLAYBACK_ID",
		payload: item
	}
}
