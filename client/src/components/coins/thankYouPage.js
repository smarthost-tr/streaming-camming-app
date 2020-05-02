import React, { Component } from 'react';
import "./css/thankYouPage.css";
import Navigation from "../navigation/index.js";
import FooterPage from "../common/footer/footer.js";
import axios from "axios";
import { Link } from "react-router-dom";

class ThankYouPaymentPage extends Component {
constructor(props) {
    super(props);


}
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <Navigation />
                <div class="jumbotron card card-image" id="back_back">
                  <div class="text-white text-center py-5 px-4">
                    <div>
                      <h1 class="card-title h1-responsive pt-3 mb-5 font-bold"><strong>Thank you for your payment!</strong></h1>
                      <p class="mx-5 mb-5">We have recieved a successful payment and have credited your account, feel free to go treat yourself and buy a private show or "make it rain!"
                      </p>
                      <Link to="/" class="btn btn-outline purple_button" style={{ width: "100%" }}>RETURN TO HOMEPAGE</Link>
                    </div>
                  </div>
                </div>
                <FooterPage />
            </div>
        );
    }
}

export default ThankYouPaymentPage;
