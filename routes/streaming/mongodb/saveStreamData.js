const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const uuid = require("uuid/v4");

mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

			console.log("This is the req.body: ", req.body);

			const { email, tags, title, desc, subTitle, profilePic, stream_key } = req.body;

			let collection = db.collection("users");

			const generated = uuid().split("-").join("");

			collection.findOneAndUpdate({ email: email }, {$push:{ streams: {
				stream_key,
				tags,
				title,
				desc,
				active: true,
				subTitle, 
				profilePic,
				id: generated
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