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

		const { comment, email, username, birthdate } = req.body;

		const collection = db.collection("users");

		collection.findOneAndUpdate({ email }, {$push:{ profileComments: {
				comment,
				username,
				birthdate: moment(birthdate).format('MM/DD/YYYY'),
				date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
				id: uuid()
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