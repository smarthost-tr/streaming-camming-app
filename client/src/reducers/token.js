import { TOKEN } from "../actions/types.js";

const initialState = {
	data: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case TOKEN: 
			return {
				...state,
				token: action.payload
			}
		default: 
			return state;
	}
}