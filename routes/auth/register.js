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
const { Transaction, Blockchain } = require("../../blockchain.js");
const { gemshire } = require("../../main.js");

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


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", upload.single("image"), (req, res) => {
		// deconstruct response body
		const { security, securityAnswer, gender, chat_uuid, firstName, lastName, phoneNumber, email, username, password, birthdate } = req.body;

		const hashedPassword = bcrypt.hashSync(req.body.password, 8);

		console.log("fileeeeee ------------- :", req.file);

		const { location } = req.file;

		// const key = ec.genKeyPair();

		// const publicKey = key.getPublic("hex");
		// const privateKey = key.getPrivate("hex");

		// console.log("private key is the ", privateKey);

		// console.log("public key is ", publicKey);

		// const myKey = ec.keyFromPrivate(privateKey);

		// const myWalletAddress = myKey.getPublic("hex");
		// // goes private wallet address, public, amount
		// const transaction1 = new Transaction(myWalletAddress, myWalletAddress, 35);

		// transaction1.signTransaction(myKey);
		// console.log(transaction1);
		// gemshire.addTransaction(transaction1);

		// console.log(`\n Balance of ${firstName} ${lastName} is finally...`, gemshire.getBalanceOfAddress(myWalletAddress));

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
			tokens: gemshire.getBalanceOfAddress(myWalletAddress),
			chat_uuid
			// blockPublicKey: publicKey,
			// blockPrivateKey: privateKey
		});

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
						console.log(data);
						res.send({ message: "SUCCESSFULLY REGISTERED USER", user: data });
					})
				}
			});
		}); 
	});
});

module.exports = router;
