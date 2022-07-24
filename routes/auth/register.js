const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");
const User = require("../../models/user.js");
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Grid = require("gridfs-stream");
const GridFsStorage = require('multer-gridfs-storage');
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const gemshire = require("../../main.js");
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
		const { security, securityAnswer, gender, chat_uuid, firstName, lastName, phoneNumber, email, username, password, birthdate } = req.body;

		const hashedPassword = bcrypt.hashSync(req.body.password, 8);

		console.log("fileeeeee ------------- :", req.file);

		const { location } = req.file;

		const key = ec.genKeyPair();

		const publicKey = key.getPublic("hex");
		const privateKey = key.getPrivate("hex");

		console.log("private key is the ", privateKey);

		console.log("public key is ", publicKey);

		const newUser = new User({
			security, 
			securityAnswer, 
			gender, 
			firstName, 
			lastName, 
			phoneNumber, 
			email, 
			username, 
			password, 
			birthdate, 
			image: location,
			tokens: 0,
			chat_uuid,
			blockPublicKey: publicKey,
			blockPrivateKey: privateKey,
			feed: []
		});

		const port = req.app.get("PORT");

		db.collection("users", (err, collection) => {
			collection.find({ email: email }).toArray((err, result) => {
				if (err) {
					console.log('err', err);
				}
				if (result.length > 0) {
					res.send({ message: "User already exists!", user: null });
				} else {
					newUser.save((err, data) => {
						if (err) {
							console.log(err);
						} 
						console.log("port :", port);
						axios.post(`http://localhost:${port}/transaction/broadcast`, {
							amount: 35, 
							sender: "00", 
							recipient: publicKey
						}).then((response) => {
							console.log(response);
							if (response) {
								axios.get(`http://localhost:${port}/mine`).then((feedback) => {
									if (feedback) {
										console.log(feedback.data);
									}
								}).catch((err) => {
									console.log(err);
								});
							}
						}).catch((err) => {
							console.log(err);
						})
						console.log(data);
						res.send({ message: "SUCCESSFULLY REGISTERED USER", user: data });
					})
				}
			});
		}); 
	});
});

module.exports = router;
