const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const paypal = require('paypal-rest-sdk');
const flash = require('connect-flash');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AatWS7bPUsaanCxASstt_DROXJgWESP5-qDnlAwM_J0JFp596UlChQvchiHwH6AU6oIEDVbJKunHu5pX',
  'client_secret': 'EGNFNDTQg9SNZcnYLQG10A73TQaH9DLVaYwMuLyev8o0r8nC4zKGEeE_WFGTZnRb5jwPQPxP2DursFDz'
});


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.get('/', (req, res) => {
	    console.log(req.body);
		
		const PayerID = req.query.PayerID;
		const paymentId = req.query.paymentId;

		let message = req.flash('tokens');

		let savedEmail = req.flash("email");

		console.log("PayerID", PayerID);
		console.log("paymentId: ", paymentId)
		console.log("savedEmail", savedEmail[0]);

		const execute_payment_json = {
			"payer_id": PayerID,
			"transactions": [{
				"amount": {
					"currency": "USD",
					"total": message[0]
				} 
			}]
		};
		paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
			if(error){
				console.log(error);
			} else {
				console.log('success', payment); 
				console.log(payment.transactions[0].amount.total);

				const total = payment.transactions[0].amount.total;

				const collection = db.collection("users");

				const splitted = total.split(".");

				if (payment.state === "approved") {
					console.log("approved...");
					collection.findOneAndUpdate({ email: savedEmail[0] }, { $inc: { "tokens": Number(splitted[0]) }}, (err, doc) => {
					    if (err) {
					        console.log("Something wrong when updating data!");
					        console.log(err);
					    }
						console.log(doc);
					});
				}
				res.redirect("http://localhost:3000/thank/you/for/your/payment");
			}
		});
	});
});

module.exports = router;