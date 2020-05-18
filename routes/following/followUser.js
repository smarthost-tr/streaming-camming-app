const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const axios = require("axios");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {

		const { email, other, tokens, recipient, sender } = req.body;

	    const collection = db.collection("users");

	    const port = req.app.get("PORT");

		axios.post(`http://localhost:${port}/transaction/broadcast`, {
			amount: tokens,
			sender, 
			recipient
	    }).then((response) => {
	    	console.log("TOKEN PURCHASE RES.DATA :", response.data);
	    	if (response.data) {
	    		axios.get(`http://localhost:${port}/mine`).then((feedback) => {
					console.log(feedback.data);
					if (feedback.data) {
						collection.findOneAndUpdate({ email }, { $addToSet: { "following": other }}).then((user) => {
					        res.send(user);
					    }).catch((err) => {
					    	console.log(err);
					    });
					}
				}).catch((err) => {
					console.log(err);
				});
	    	}
	    }).catch((err) => {
	    	console.log(err);
	    })
	});
});

module.exports = router;