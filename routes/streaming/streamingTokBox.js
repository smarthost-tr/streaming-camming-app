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
		// Set the following constants with the API key and API secret
		// that you receive when you sign up to use the OpenTok API:

		//Generate a basic session. Or you could use an existing session ID.
		let sessionId;
		let token;
		opentok.createSession({ mediaMode: "routed" }, (error, session) => {
		  if (error) {
		    console.log("Error creating session:", error);
		  } else {
		    sessionId = session.sessionId;
		    console.log("Session ID: " + sessionId);
			// set global
		    app.set("sessionId", sessionId);
			// create token
		    token = opentok.generateToken(sessionId);
		    console.log(token);

		    res.send({ token, sessionId });
		  }
		});
	});
});

module.exports = router;