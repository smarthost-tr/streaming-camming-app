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
        // axios.post("/paypal/pay", {
        //     tokens: tokens.toString(),
        //     email: this.props.email
        // }).then((res) => {
        //     console.log(res.data);
        //     if (res.data) {
        //         window.location = res.data;
        //     } 
        // }).catch((err) => {
        //     console.log(err);
        // })
        axios.post("/make/blockchain/payment", {
            tokens: tokens,
            publicAddress: this.props.publicKey,
            privateKey: this.props.privateKey
        }).then((res) => {
            console.log(res.data);
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
                    <div style={{ height: "100vh", width: "100vw" }}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mx-auto text-center">
                                <div class="jumbotron bg-cover text-white" id="jumbo">
                                    <div class="container">
                                    
                                        <h1 className="text-center bold text">You are about to purchase {tokens} tokens!</h1>
                                        <p class="lead text-center">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                                            <hr class="my-white" />
                                        <p className="text-center">It uses utility classes for typography and spacing to space content out within the larger container.</p>
                                        
                                            <button onClick={() => {
                                            this.handlePayment();
                                        }} class="btn btn-primary btn-lg"role="button">Purchase Tokens</button>
                                       
                                    </div>
                                </div>
                                    {/*<button onClick={() => {
                                        this.handlePayment();
                                    }} className="btn btn-outline pink_button" style={{ width: "100%" }}>Purchase Your Coins!</button>*/}
                            </div>
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
        email: state.auth.data.email,
        publicKey: state.currency.data.publicKey,
        privateKey: state.currency.data.privateKey
    }
}

export default connect(mapStateToProps, {  })(PurchaseTokensPayment);
