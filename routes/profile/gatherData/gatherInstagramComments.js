const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");



mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {

	    console.log(req.body);

	    const collection = db.collection("users");

	    const { email, id } = req.body;

	    console.log(id);

	    collection.findOne({ "feed": { $elemMatch: { uniqueID: id }}}, { "feed.comments": true }).then((document) => {
	    	console.log(document);
	    	res.send(document);
	    }).catch((err) => {
	    	console.log(err);
	    })
	});
});

module.exports = router;