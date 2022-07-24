const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const moment = require('moment');
const uuid = require("uuid/v4");


mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		console.log(req.body);

		const { email, id } = req.body;

		const collection = db.collection("users");

		collection.find({ email, "privateStreamCodes.streamCode": id }).toArray((err, result) => {
			if (err) {
				console.log(err);
			}
			console.log(result);
			res.send(result);
		})
	});
});

module.exports = router;