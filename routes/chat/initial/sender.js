const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const moment = require("moment");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {

		const { email, message, author, image, reciever, sender, uniqueID } = req.body;

		const collection = db.collection("users");
		
		collection.findOneAndUpdate({ email }, {$push:{ messages: {
				author,
				message,
				date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
				id: uniqueID,
				replies: [],
				image,
				sender, 
				reciever
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