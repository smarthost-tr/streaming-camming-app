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

		const { broadcastId } = req.body;
		// broadcast options - not complete
	    opentok.getBroadcast(broadcastId, (err, data) => {
			if (err) {
				console.log(err);
			}
			console.log("Data :", data);
			res.send({ hls: data.broadcastUrls.hls, data })
		})
	});
});

module.exports = router;