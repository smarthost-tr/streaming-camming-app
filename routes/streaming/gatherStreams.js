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

		console.log("req.body :", req.body);
		
		opentok.listStreams(req.body.sessionId, (error, streams) => {
		  if (error) {
		    console.log(error.message);
		  } else {
		    streams.map((stream) => {
		      console.log("stream.id :", stream.id); // '2a84cd30-3a33-917f-9150-49e454e01572'
		      console.log("stream.videoType :", stream.videoType); // 'camera'
		      console.log(stream.name); // 'Bob'
		      console.log(stream.layoutClassList); // ['main']
		    });
		  }
		});
	});
});

module.exports = router;