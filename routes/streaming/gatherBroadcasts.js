const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const OpenTok = require('opentok');

let opentok = new OpenTok("46621022", "963397973811378d0298908a4b9f86ac186f0158");

mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.get("/", (req, res) => {

		opentok.listBroadcasts({ offset: 100, count: 50 }, (error, broadcasts, totalCount) => {
		  if (error) {
		  	console.log("error:", error);
		  }

		  console.log(totalCount + " broadcasts");
		  console.log(broadcasts)
		  for (var i = 0; i < broadcasts.length; i++) {
		    console.log(broadcasts[i]);
		  }
		});
	});
});

module.exports = router;