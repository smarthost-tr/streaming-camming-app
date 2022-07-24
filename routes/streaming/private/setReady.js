const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

			console.log("This is the req.body: ", req.body);

			const { email } = req.body;

			let collection = db.collection("users");

			collection.findOneAndUpdate({ email: email }, { $set: { privateShow: {
				streamerIsPrivate: true
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