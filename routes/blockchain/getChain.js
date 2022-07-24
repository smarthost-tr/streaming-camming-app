const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const gemshire = require("../../main.js");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

// need to fix how many times res.json is sent - can't send multiple headers
mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.get("/", (req, res) => {

		console.log(gemshire);
		res.send(gemshire);
	});
});

module.exports = router;