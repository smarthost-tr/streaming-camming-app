const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");

// need to fix how many times res.json is sent - can't send multiple headers
mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		const { email, password } = req.body;

		db.collection("users", (err, collection) => {
			collection.findOne({
				email
			}).then((user) => {
				console.log("user :", user);
				if (user) {
					if (user.email === email && 
						user.password === password) {
						console.log("match");
						res.status(200).json({ message: "MATCH!" });
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