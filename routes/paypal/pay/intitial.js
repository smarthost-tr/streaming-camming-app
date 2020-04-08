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
	router.post('/', (req, res) => {

	    console.log(req.body);

	    const { tokens, email } = req.body;

	    req.flash('tokens', tokens + ".00");
	    req.flash('email', email);

		const create_payment_json = {
		    "intent": "sale",
		    "payer": {
		        "payment_method": "paypal"
		    },
		    "redirect_urls": {
		        "return_url": "http://localhost:5000/success",
		        "cancel_url": "http://localhost:5000/cancel"
		    },
		    "transactions": [{
		        "item_list": {
		            "items": [{
		                "name": "testing",
		                "sku": "testing",
		                "price": `${tokens}.00`,
		                "currency": "USD",
		                "quantity": 1
		            }]
		        },
		        "amount": {
		            "currency": "USD",
		            "total": `${tokens}.00`
		        },
		        "description": "This is the payment description."
		    }]
		};
		paypal.payment.create(create_payment_json, function (error, payment) {
		    if (error) {
		       	console.log(error);
		    } else {
		        console.log("Create Payment Response");
		        console.log(payment);
		        for (var i = 0; i < payment.links.length; i++) {
		        	let element = payment.links[i];
		        	if (element.rel === "approval_url") {
		        		console.log(element.href);
		        		res.send(element.href);
		        	}
		        }
		    }
		});
	});
});

module.exports = router;