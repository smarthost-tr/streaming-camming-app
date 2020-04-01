const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const OpenTok = require('opentok');

let opentok = new OpenTok("46621022", "963397973811378d0298908a4b9f86ac186f0158");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {
		// console.log request content
		console.log(req.body);
		// deconstruct for cleaner appearence
		const { broadcastID } = req.body;
		// broadcast options - not complete
		opentok.stopBroadcast(broadcastID, (error, broadcast) => {
		  if (error) {
		    console.log(error);
		  }
		  console.log('Broadcast stopped: ', broadcast);
		});
		
	});
});

module.exports = router;