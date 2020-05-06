const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	security: {
		type: String
	},
	securityAnswer: {
		type: String
	},
	gender: {
		type: String
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	phoneNumber: {
		type: String
	},
	email: {
		type: String
	},
	username: {
		type: String
	},
	password: {
		type: String
	},
	birthdate: {
		type: Date
	},
	image: {
		type: String
	},
	tokens: {
		type: Number
	},
	chat_uuid: {
		type: String
	},
	blockPublicKey: {
		type: String
	},
	blockPrivateKey: {
		type: String
	},
	feed: {
		type: Array
	}
});

module.exports = User = mongoose.model("user", UserSchema);