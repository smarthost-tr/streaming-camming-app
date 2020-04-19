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


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {

		const { id, signing, private_key } = req.body;

	    console.log(req.body);

	    const { Video, Data } = new Mux("f899a074-f11e-490f-b35d-b6c478a5b12a", "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/");
		
		const token = Mux.JWT.sign(id, { keyId: signing, keySecret: private_key });

		console.log(token);
		res.send(token);
		// const token = Mux.JWT.sign('some-playback-id');
	});
});

module.exports = router;