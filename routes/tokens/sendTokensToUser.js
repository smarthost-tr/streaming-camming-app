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

		console.log(email, tokens);

		const collection = db.collection("users");

		collection.findOneAndUpdate({ email }, { $inc: { "tokens": Number(tokens) }}, (err, doc) => {
		    if (err) {
		        console.log("Something wrong when updating data!");
		        console.log(err);
		    }
			console.log(doc);
			res.send(doc);
		});
	});
});

module.exports = router;