import { GET_STREAM_TOKEN } from "../../actions/types.js";

const initialState = {
	data: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_STREAM_TOKEN: 
			return {
				...state,
				data: action.payload
			}
		default: 
			return state;
	}
}