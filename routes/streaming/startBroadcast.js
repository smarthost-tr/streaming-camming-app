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
	router.post("/", (req, res) => {
		// console.log request content
		console.log(req.body);
		// broadcast options - not complete
	    const broadcastOptions = {
		  outputs: {
		    hls: {},
		    rtmp: [{
		      id: 'foo',
		      serverUrl: 'rtmp://localhost/live',
		      streamName: 'localStream'
		    }]
		  },
		  maxDuration: 5400,
		  resolution: '640x480',
		  layout: {
		    type: 'verticalPresentation'
		  }
		};
		// create broadcast stream
		opentok.startBroadcast(req.body.sessionId, broadcastOptions, (error, broadcast) => {
		  if (error) {
		    console.log(error);
		  }
		  // deconstruct what we need
		  const { id, broadcastUrls, updatedAt, status, resolution } = broadcast;
	      // log broadcast
		  console.log ('Broadcast started: ', broadcast);
		  // send to client
		  res.send({ broadcastID: id, broadcastUrls, updatedAt, status, resolution });
		});
		
	});
});

module.exports = router;