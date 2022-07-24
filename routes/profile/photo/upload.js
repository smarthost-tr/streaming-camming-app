const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Grid = require("gridfs-stream");
const GridFsStorage = require('multer-gridfs-storage');
const axios = require("axios");

Grid.mongo = mongoose.mongo;

AWS.config.update({
    secretAccessKey: 'r8qpagbd990S45DZUU5wVFTW7K5jG75/NUc0ojg7',
    accessKeyId: 'AKIAJO4Y5WK3FS2I3UHA',
    region: 'us-east-1'
});

s3 = new AWS.S3();

var gfs = Grid("test", mongo);

const storage = new GridFsStorage({
  url: config.get("mongoURI"),
  gfs: gfs,
  file: (req, file) => {
    return {
        filename: file.originalname
    }
  }
});
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'sex-streaming-jerk-n-squirt',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});


mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", upload.single("image"), (req, res) => {
		// deconstruct response body
		const { title, image, email, subtitle, desc } = req.body;

		console.log("fileeeeee ------------- :", req.file);
		console.log("req.body -------------- :", req.body);

		const { location } = req.file;

		const collection = db.collection("users");

		collection.findOneAndUpdate({ email }, { $push: { feed: {
				link: location,
				title,
				subtitle,
				desc,
				uniqueID: uuid(),
				comments: []
			}}}, (err, doc) => {
		    if (err) {
		        console.log("Something wrong when updating data!");
		    }
		    console.log(doc)
			res.send({ data: doc });
		});
	});
});

module.exports = router;
