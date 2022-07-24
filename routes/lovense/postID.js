const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");



mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		const collection = db.collection("users");

		const { lovenseID, email } = req.body;

		collection.findOneAndUpdate({ email }, { $set: { "profile.lovenseDeviceID": lovenseID }}, (err, doc) => {
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