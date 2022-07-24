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


mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', async (req, res) => {

	    console.log("BODY :", req.body);

	    const { tags } = req.body;

	    const { Video, Data } = new Mux("f899a074-f11e-490f-b35d-b6c478a5b12a", "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/");
		
		try {
			let result = await Video.LiveStreams.create({
			    playback_policy: 'public',
			    reconnect_window: 20,
			    new_asset_settings: { playback_policy: 'public' } 
			  })
		      console.log(result);

		      res.send({ 
		      	streamKey: result.stream_key, 
		      	data: result, 
		      	playbackID: result.playback_ids[0].id 
		      });
			return result;		
		} catch(e) {
			// statements
			console.log(e);
		}
	});
});

module.exports = router;