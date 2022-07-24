const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");



mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		const collection = db.collection("users");

		const { email } = req.body;

		collection.findOne({ email }, { "feed": true }).then((user) => {
			console.log(user.feed);
			res.send({ feed: user.feed });
		}).catch((err) => {
			console.log(err);
		});
	});
});

module.exports = router;