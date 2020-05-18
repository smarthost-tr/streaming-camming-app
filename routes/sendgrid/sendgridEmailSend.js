const helper = require('sendgrid').mail;
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const moment = require('moment');
const uuid = require("uuid/v4");
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: "ad56c78d",
    apiSecret: "42s4VqpO5abAcKYG"
});

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		console.log(req.body);

		const { email, username, password, phoneNumber } = req.body;

		const fromEmail = new helper.Email('jeremyablong@icloud.com');
		const toEmail = new helper.Email(email);
		const subject = "Account Recovery - Jerk N' Squirt - Regain Access";
		const content = new helper.Content('text/plain', `Welcome to your password recovery... The password we have on file for ${username} is ${password}. Please use this to login into your account. If you have not requested this email, please contact support at 1-888-888-8888 immediately...`);
		const mail = new helper.Mail(fromEmail, subject, toEmail, content);

		const generated = uuid().split("-").join("").slice(0, 7);

		// const sender = 12014293158;
		// const recipient = Number(1 + phoneNumber);
		// const message = "Your verifcation code for 'Jerk N' Squirt' is - " + generated;

		// nexmo.message.sendSms(sender, recipient, message, (err, responseData) => {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// 	res.send({ special: generated });
		// });

		const sg = require('sendgrid')(config.get("sendgrid"));
		const request = sg.emptyRequest({
		  method: 'POST',
		  path: '/v3/mail/send',
		  body: mail.toJSON()
		});
		 
		sg.API(request, (error, response) => {
		  if (error) {
		    console.log('Error response received');
		    res.send({
		    	message: "Error"
		    })
		  }
		  console.log(response.statusCode);
		  console.log(response.body);
		  res.send({
		  	message: "Success"
		  })
		  console.log(response.headers);
		});
	});
});

module.exports = router;