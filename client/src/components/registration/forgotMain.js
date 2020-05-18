import React, { Component } from 'react';
import Navigation from "../navigation/index.js";
import Footer from "../common/footer/footer.js";
import ForgotPassword from "./forgotPassword.js";

class ForgotPasswordMainComponent extends Component {
constructor(props) {
    super(props);
}

    render() {
        return (
            <div>
				<Navigation />
					<ForgotPassword />
				<Footer />
            </div>
        );
    }
}

export default ForgotPasswordMainComponent;
