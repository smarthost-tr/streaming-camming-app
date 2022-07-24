const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const fs = require("fs");
const Mux = require('@mux/mux-node');
const http = require("http");
const jwt = require("jsonwebtoken");


mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', async (req, res) => {

	    console.log(req.body);

		const { playbackID, private_key, identifier } = req.body;

	    jwt.sign({ "sub": playbackID, "exp": 999999999, "kid": identifier, "aud": "v" }, "this-is-the-secret", (err, token) => {
		  	if (err) {
		  		console.log(err);
		  	}
		  	console.log(token);
		  	res.send(token);
		});
	});
});

module.exports = router;