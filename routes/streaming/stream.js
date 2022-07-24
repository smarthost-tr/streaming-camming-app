const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {
		
		// content goes here...
		navigatior.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			console.log(stream);
			socket.emit("NewClient")
		}).catch((err) => {
			console.log(err);
		})
		
	});
});

module.exports = router;