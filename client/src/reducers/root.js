import { combineReducers } from "redux";
import auth from "./auth.js";
import streaming from "./streaming.js";

export default combineReducers({
	auth,
	streaming
});