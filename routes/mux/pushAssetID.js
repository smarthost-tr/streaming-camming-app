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

			const { active_asset_id, id, email } = req.body;

			console.log("Data: ", data);

			let collection = db.collection("users");

			collection.findOneAndUpdate({ email: email }, {$push:{ nothing: {

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