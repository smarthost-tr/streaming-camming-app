import { GATHER_CURRENCY } from "../../actions/types.js";

const initialState = {
	data: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GATHER_CURRENCY: 
			return {
				...state,
				data: action.payload
			}
		default: 
			return state;
	}
}