const NodeMediaServer = require('node-media-server');
const config = require('./index.js').rtmp_server;
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const configgg = require("config");
const mongo = require("mongodb");
const moment = require('moment');
const uuid = require("uuid/v4");
const helpers = require("../routes/streaming/rtmp/helpers.js");


let nms;
let db = null;

mongoose.connect(configgg.get("mongoURI"), (err, client) => {
    if (err) {
        console.log(err);
    }
    console.log(client);
    db = client;
})

nms = new NodeMediaServer(config);

nms.on('prePublish', async (id, StreamPath, args) => {
    const stream_key = getStreamKeyFromStreamPath(StreamPath);

    console.log(stream_key);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    const collection = db.collection("users");

    collection.findOne({stream_key: stream_key}).then((user) => {
        if (!user) {
            console.log("user doesnt exist...");
            let session = nms.getSession(id);
        } else {
            console.log("user exists! ... generate thumbnail.")
            helpers.generateStreamThumbnail(stream_key);
        }
        ;
    }).catch((err) => {
        console.log(err);
    });
});

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};


module.exports = nms;