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

			const { data, email } = req.body;

			console.log("Data: ", data);

			let collection = db.collection("users");

			collection.findOneAndUpdate({ email: email }, {$push:{ streams: {
				streamKey: data.stream_key,
				status: data.status,
				reconnect_window: data.reconnect_window,
				playback_ids: data.playback_ids,
				new_asset_settings: data.new_asset_settings,
				id: data.id,
				created_at: data.created_at
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