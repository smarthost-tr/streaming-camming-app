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
	router.post("/", (req, res) => {

		const { email, tokens } = req.body;

		console.log(Number(-tokens));

		const collection = db.collection("users");

		collection.findOne({ email }).then((user) => {
			console.log(user);
			if (user.tokens - tokens > 0) {
				collection.findOneAndUpdate({ email }, { $inc: { "tokens": Number(-tokens) }}, (err, doc) => {
				    if (err) {
				        console.log("Something wrong when updating data!");
				        console.log(err);
				    }
					console.log(doc);
					res.send(doc);
				});
			} else {
				console.log("You need to purchase more tokens to tip this amount. Visit our 'purchase tokens' page to buy more tokens!")
				res.json({ error: "You need to purchase more tokens to tip this amount. Visit our 'purchase tokens' page to buy more tokens!" })
			}
		})
	});
});

module.exports = router;
