const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const stream = require('getstream');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {
		
		const { username } = req.body;

		const client = stream.connect("wfy8v74qn2ar", "rsje7reeyrkmkuxp8w4aaeqmgfxxpxrbepyhuk7uks4mmrtnm3xbdsfxgnzvf4g6");
		const token = client.createUserToken(username);

		console.log(token);

		res.send({ token });

	});
});

module.exports = router;