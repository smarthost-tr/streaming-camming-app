const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const moment = require('moment');
const uuid = require("uuid/v4");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.get("/", (req, res) => {

		const collection = db.collection("users");

		const { streams } = req.query;

		if (streams){
	            let activeStreams = JSON.parse(streams);
	            let query = {$or: []};
	            for (let stream in activeStreams) {
	                if (!streams.hasOwnProperty(stream)) continue;
	                console.log(streams[stream]); 
	                // query.$or.push({ stream_key : stream });
	            }
	 			res.send(activeStreams);

        }
	});
});

module.exports = router;