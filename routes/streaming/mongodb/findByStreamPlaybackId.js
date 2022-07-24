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
	router.put("/", (req, res) => {

		console.log(req.body);

		const { id } = req.body;

		const collection = db.collection("users");

		collection.findOneAndUpdate({ "streams.id": id }, { $set: { "streams.$.status": "finished" }}, (err, doc) => {
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