const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const jwt = require("jsonwebtoken");

// need to fix how many times res.json is sent - can't send multiple headers
mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		const { email, password, secret } = req.body;

		db.collection("users", (err, collection) => {
			collection.findOne({
				email
			}).then((user) => {
				console.log("user :", user);
				if (user) {
					if (user.email === email && 
						user.password === password) {
							jwt.sign({
							    "resource": "*",
							    "action": "*",
							    "feed_id": "*",
							    "user_id": user.username
							}, "37ek4bmy38umj9sfbgxtte7jkj7dyr88tfsvexvm7vc7k7k5d4ekvacerq3wj7a5", (err, token) => {
								if (err) {
									console.log(err);

								}
								console.log("User exists!", user);
								res.json({ message: "User exists!", data: user, token });
							});
					} else {
						console.log("User does NOT exist.");
						res.json({ message: "Please enter valid credentials. Double check your email and password! You'll miss out on your free 35 tokens upon registration!" });
					}
				} else {
					res.json({ message: "Please enter valid credentials. Double check your email and password! You'll miss out on your free 35 tokens upon registration!" })
				}
			}).catch((err) => {
				console.log(err);
			}); 
		});
	});
});

module.exports = router;