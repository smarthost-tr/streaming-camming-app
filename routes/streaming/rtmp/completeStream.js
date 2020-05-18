const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const moment = require('moment');
const uuid = require("uuid/v4");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        console.log("REQQQQQQ :", req.body);

        const { id } = req.body;

        const collection = db.collection("users");

        collection.findOneAndUpdate({ "streams.id": id }, { $set: { "streams.$.active": false }}).then((user) => {
            console.log(user);
            // save video to assets with exec
            res.send(user);
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;