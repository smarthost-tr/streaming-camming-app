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
    router.get("/", (req, res) => {
        console.log("REQQQQQQ :", req);
        const collection = db.collection("users");

        console.log("req.query.email", req.query.email);

        collection.findOne({ email: req.query.email }).then((user) => {
            console.log(user);
            if (user) {
                res.json({
                    stream_key: user.stream_key
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;