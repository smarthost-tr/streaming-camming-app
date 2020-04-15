import { GET_STREAM_USER, SET_USER } from "../../actions/types.js";

const initialState = {
	data: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_STREAM_USER: 
			return {
				...state,
				data: action.payload
			}
		case SET_USER: 
			return {
				...state,
				userSet: action.payload
			}
		default: 
			return state;
	}
}