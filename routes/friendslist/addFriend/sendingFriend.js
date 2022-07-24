const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		const { email, sendingID, username, image } = req.body;

		const collection = db.collection("users");

		collection.findOneAndUpdate({ email }, { $push: { friends: {
				username,
				id: sendingID,
				status: "pending",
				sender: true,
				image
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