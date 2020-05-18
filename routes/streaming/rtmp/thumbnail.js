const CronJob = require('cron').CronJob;
const request = require('request');
const helpers = require('./helpers.js');
const config = require('../../../rtmpserver/index.js');
const port = config.rtmp_server.http.port;
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const configgg = require("config");
const mongo = require("mongodb");


mongo.connect(configgg.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {
        
        const { streams } = req.query;

        if (streams){
                let activeStreams = JSON.parse(streams);
                let query = {$or: []};
                for (let stream in activeStreams) {
                    if (!streams.hasOwnProperty(stream)) continue;
                    console.log(streams[stream]); 
                    // query.$or.push({ stream_key : stream });
                }
                res.send(activeStreams);

        }
    });
});
 
module.exports = router;