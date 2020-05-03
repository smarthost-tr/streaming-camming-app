const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		const { username } = req.body;

		db.collection("users", (err, collection) => {
			collection.findOne({
				username
			}, { "profile.lovenseDeviceID": true }).then((user) => {
				if (user) {
					console.log(user);
					res.send(user);
				} 

			}).catch((err) => {
				console.log(err);
			}); 
		});
	});
});

module.exports = router;