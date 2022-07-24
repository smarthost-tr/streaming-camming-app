const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		console.log(req.body);

		const { email } = req.body;

		const collection = db.collection("users");

		collection.findOne({ email }, { "streams": true }).then((user) => {
			const last = user.streams[user.streams.length - 1];
			console.log("LAST", last);
			res.send(last);
		}).catch((err) => {
			console.log(err);
		})
	});
});

module.exports = router;