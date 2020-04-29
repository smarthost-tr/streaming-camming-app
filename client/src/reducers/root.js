import { combineReducers } from "redux";
import auth from "./auth.js";
import streaming from "./streaming.js";
import token from "./token.js";
import getStream from "./getStream/index.js";
import currency from "./blockchain/index.js";

export default combineReducers({
	auth,
	streaming,
	token,
	getStream,
	currency
});