const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const { gemshire } = require("../../../main.js");
const { Transaction } = require("../../../blockchain.js");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		console.log(req.body);

		const { privateKey, tokens, publicAddress } = req.body;


		const myKey = ec.keyFromPrivate(privateKey);
		const myWalletAddress = myKey.getPublic("hex");

		const trans = new Transaction(myWalletAddress, publicAddress, tokens);
		trans.signTransaction(myKey);
		gemshire.addTransaction(trans);

		console.log("\n Balance of this user is...", gemshire.getBalanceOfAddress(myWalletAddress));
		
		

		res.send({ transaction: gemshire.getBalanceOfAddress(myWalletAddress) });
	});
});

module.exports = router;