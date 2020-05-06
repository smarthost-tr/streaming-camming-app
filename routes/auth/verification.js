const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const jwt = require("jsonwebtoken");
const Nexmo = require('nexmo');
const uuid = require("uuid/v4");

const nexmo = new Nexmo({
    apiKey: "ad56c78d",
    apiSecret: "42s4VqpO5abAcKYG"
});

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		const { email, password } = req.body;

		db.collection("users", (err, collection) => {
			collection.findOne({
				email
			}).then((user) => {
				console.log(user);
				if (user) {
					if (user.email === email && 
						user.password === password) {
							console.log("match.");

							const generated = uuid().split("-").join("").slice(0, 7);

							const sender = 12014293158;
							const recipient = Number(1 + user.phoneNumber);
							const message = "Your verifcation code for 'Jerk N' Squirt' is - " + generated;

							nexmo.message.sendSms(sender, recipient, message, (err, responseData) => {
								if (err) {
									console.log(err);
								}
								res.send({ special: generated });
							});
							// jwt.sign({
							//     "resource": "*",
							//     "action": "*",
							//     "feed_id": "*",
							//     "user_id": user.username
							// }, "37ek4bmy38umj9sfbgxtte7jkj7dyr88tfsvexvm7vc7k7k5d4ekvacerq3wj7a5", (err, token) => {
							// 	if (err) {
							// 		console.log(err);

							// 	}
							// 	console.log("User exists!", user);
							// 	res.json({ message: "User exists!", data: user, token });
							// });
					} else {
						console.log("User does NOT exist.");
						res.json({ message: "NEXMO" });
					}
				}
			}).catch((err) => {
				console.log(err);
			}); 
		});
	});
});

module.exports = router;
