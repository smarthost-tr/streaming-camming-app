import { combineReducers } from "redux";
import auth from "./auth.js";
import streaming from "./streaming.js";
import login from "./sendbird/loginReducer.js";
import openChannel from "./sendbird/openChannel.js";
import openChannelReducer from "./sendbird/openChannelReducer.js";

export default combineReducers({
	auth,
	streaming,
	login,
	openChannel,
	openChannelReducer
});