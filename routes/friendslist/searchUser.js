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
		const { username } = req.body;
		// pull off collection name
		const collection = db.collection("users");
		// take email of logged in user below
		collection.findOne({ username, "profile.cammer": true }).then((user) => {
			console.log(user);
			res.send(user);
		}).catch((err) => {
			console.log(err);
		});
	});
});

module.exports = router;