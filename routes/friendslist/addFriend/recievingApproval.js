const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const ObjectId = require('mongodb').ObjectId; 

mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.put("/", (req, res) => {
		// log req.body
		console.log("recieving file :", req.body);
		// deconstruct
		const { id, username } = req.body;
		// pull off collection name
		const collection = db.collection("users");
		// take email of logged in user below
		collection.findOneAndUpdate({ _id: ObjectId(id), "friends.username": username }, { 
	        $set: {
	            "friends.$.status": "accepted"
	        }
	    }, (err, doc) => {
	    	if (err) {
	    		console.log(err);
	    	}
	    	console.log(doc);
	    	res.send(doc);
	    })
	});
});

module.exports = router;