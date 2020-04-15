const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const http = require("http");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {

	    const { email } = req.body;

	    const collection = db.collection("users");

	    collection.find({ email }, { "messages.replies": true }).toArray((err, data) => {
	      if (err) {
	        console.log(err);
	      }
	      console.log("DATA :", data);
	      res.send(data);
	    })
	});
});
module.exports = router;