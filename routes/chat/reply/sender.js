const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const uuid = require("uuid/v4");
const moment = require("moment");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {

		const { email, message, uuid } = req.body;

		const collection = db.collection("users");
		
		collection.findOneAndUpdate({ email, "messages.id": uuid }, { $push:{ "messages.$.replies": {
				uuid,
				message,
				date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a")
			}}}, (err, doc) => {
		    if (err) {
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