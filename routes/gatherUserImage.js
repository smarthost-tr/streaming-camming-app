const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

			console.log("This is the req.body: ", req.body);

			const { email } = req.body;

			let collection = db.collection("users");

			collection.findOne({ email: email }, { "image": true }).then((user) => {
				if (user) {
					console.log(user.image);
					res.send(user.image);
				}
			});
      });
});

module.exports = router;