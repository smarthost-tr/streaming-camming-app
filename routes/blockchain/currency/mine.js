const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const gemshire = require("../../../main.js");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const uuid = require("uuid/v4");

const nodeAddress = uuid().split("-").join("");

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

	    const lastBlock = gemshire.getLastBlock();

	    const previousBlockHash = lastBlock["hash"];

	    const currentBlockData = {
	      transactions: gemshire.pendingTransactions,
	      index: lastBlock["index"] + 1
	    }

	    const nounce = gemshire.proofOfWork(previousBlockHash, currentBlockData);
	  
	    const blockHash = gemshire.hashBlock(previousBlockHash, currentBlockData, nounce);

	    gemshire.createNewTransaction(12.5, "00", nodeAddress);

	    const newBlock = gemshire.createNewBlock(nounce, previousBlockHash, blockHash);

	    res.json({
	    	note: "New block mined successfully",
	    	block: newBlock
	    })
	});
});

module.exports = router;