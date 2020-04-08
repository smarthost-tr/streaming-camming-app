import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import FooterPage from "../../common/footer/footer.js";
import axios from "axios";
import { connect } from "react-redux";

class PurchaseTokensPayment extends Component {
constructor(props) {
    super(props);


}
    handlePayment = () => {
        const tokens = this.props.location.state.tokens;
        console.log("handle payment clicked...");
        axios.post("/paypal/pay", {
            tokens: tokens.toString(),
            email: this.props.email
        }).then((res) => {
            console.log(res.data);
            if (res.data) {
                window.location = res.data;
            } 
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
    	const tokens = this.props.location.state.tokens;
    	console.log(this.props.location.state.tokens);
        return (
            <div>
				<Navigation />
                    <div className="container" style={{ height: "100vh" }}>
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="text-center bold">Purchase Tokens Page Two - Tokens being purchased: {tokens}</h1>
                                    <button onClick={() => {
                                        this.handlePayment();
                                    }} className="btn btn-outline pink_button" style={{ width: "100%" }}>Purchase Your Coins!</button>
                            </div>
                        </div>
                    </div>
                <FooterPage />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.auth.data.email
    }
}

export default connect(mapStateToProps, {  })(PurchaseTokensPayment);
