const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");



mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {

		const { email } = req.body;

		console.log(req.body);

	    const collection = db.collection("users");

	    collection.findOne({ email }).then((user) => {
	    	console.log(user);
	    	res.send(user);
	    }).catch((err) => {
	    	console.log(err);
	    })
	});
});

module.exports = router;