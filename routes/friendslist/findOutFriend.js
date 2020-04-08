const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const ObjectId = require('mongodb').ObjectId; 

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {
		// log req.body
		console.log("recieving file :", req.body);
		// deconstruct
		const { email } = req.body;
		// pull off collection name
		const collection = db.collection("users");
		// take email of logged in user below
		collection.find({ email: email }, { "friends.username": true }).toArray((err, result) => {
			if (err) {
				console.log(err);
			}
			console.log(result);
			res.send(result);
		})
	});
});

module.exports = router;