const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");



mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.put("/", (req, res) => {

		const collection = db.collection("users");

		const { username, comment, user } = req.body;

		collection.find({ username }).forEach((doc) => {
			let comments = doc.feed;
			for (var i = 0; i < comments.length; i++) {
			 	let element = comments[i].comments;
			 	for (var x = 0; x < element.length; x++) {
			 		let individual = element[x];
			 		console.log(individual);
			 		if (individual !== null) {
				 		if (comment === individual.comment) {
				 			console.log("element :", element);
				 			for (var o = 0; o < element.length; o++) {
				 				let item = element[o];
				 				if (item !== null && item.comment === comment) {
				 					console.log(item);
									delete item;
				 				}
				 			}
				 		}
				 	}
			 	}
			}
			collection.save(doc);
		});
	});
});

module.exports = router;