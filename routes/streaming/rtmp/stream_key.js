const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const moment = require('moment');
const uuid = require("uuid/v4");


mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { email } = req.body;

        const collection = db.collection("users");

        const uniqueStreamKey = uuid().split("-").join("");
         
        collection.findOneAndUpdate({ email }, { $set: { stream_key: uniqueStreamKey }}, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data);
            res.send(data);
        })
    })
});

module.exports = router;