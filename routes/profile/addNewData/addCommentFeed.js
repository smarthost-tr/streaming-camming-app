const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const moment = require("moment");
const uuid = require("uuid/v4");


mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		const collection = db.collection("users");

		const date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

		const { comment, email, posterEmail, id, username } = req.body;

		collection.findOneAndUpdate({ "feed.uniqueID": id }, { "$push": { "feed.$.comments": {
				comment: comment, 
				id: id, 
				date: date,
				username: username,
				poster: email
			}}}, (err, doc) => {
		    if (err) {
		    	console.log(err);
		        console.log("Something wrong when updating data!");
		    }
		    if (doc) {
		    	console.log(doc)
				res.send({ data: doc });
		    }
		});
	});
});

module.exports = router;