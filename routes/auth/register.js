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


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {
		// deconstruct response body
		const { security, securityAnswer, gender, firstName, lastName, phoneNumber, email, username, password, birthdate } = req.body;

		const hashedPassword = bcrypt.hashSync(req.body.password, 8);

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
			birthdate
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

// const authenticateUser = async (email, password, done) => {
// 	const user = getUserByEmail(email);
// 	if (user === null) {
// 		return done(null, false, { message: "No user with that email." });
// 	} 

// 	try {
// 		if (await bcrypt.compare(password, user.password)) {
// 			return done(null, user);
// 		} else {
// 			return done(null, false, { message: "Incorrect password." })
// 		}
// 	} catch(e) {
// 		// statements
// 		return done(e);
// 		console.log(e);
// 	}
// }

// passport.use(new LocalStrategy({ usernameField: "email" }), authenticateUser);
// passport.serializeUser((user, done) => {

// });
// passport.deserializeUser((user, data) => {

// })