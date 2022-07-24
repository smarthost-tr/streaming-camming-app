const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");



mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {

		const { email, otherEmail } = req.body;

		console.log(otherEmail);

	    const collection = db.collection("users");

	    collection.findOne({ email }).then((user) => {
			console.log("USERRRRR :", user.following);
	        user.following.forEach((each) => {
	        	console.log("EACH :", each);
		        if (each === otherEmail) {
					res.send({
						match: true
					});
		        } 
	        });
	    }).catch((err) => {
	    	console.log(err);
	    });
	});
});

module.exports = router;