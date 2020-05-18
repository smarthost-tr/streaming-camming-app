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

		const { key } = req.body;

		const collection = db.collection("users");

		collection.findOne({ "streams.stream_key": key }).then((user) => {
			console.log(user);
			let last = user.streams.pop();
			console.log(last);
			res.send(last);
		}).catch((err) => {
			console.log(err);
		})
	});
});

module.exports = router;