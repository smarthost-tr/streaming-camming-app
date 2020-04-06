import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import "../css/purchase.css";
import FooterPage from "../../common/footer/footer.js";
import { withRouter } from "react-router-dom";

class PurchaseTokenDash extends Component {
constructor(props) {
  super(props);

  this.state = {
  	tokens: 0
  };
}
	renderRedirect = () => {
		console.log("clicked");
		this.props.history.push("/signup/subscriber/payment");
	}
    render() {
    	console.log(this.state);
        return (
            <div>
            	<Navigation />
				<section id="team" class="pb-5">
				    <div class="container">
				    	<button onClick={this.renderRedirect} style={{ width: "100%", marginBottom: "20px" }} className="btn btn-outline pink_button">Subscribe to our discounted monthly plan to see ALL of our restricted content!</button>
				        <p class="section-title lead" style={{ fontSize: "1.7rem", textDecoration: "underline" }}>Ready to purchase some coins and get some action?! We offer discounted rates for bulk coin purchases, buy bulk and save.</p>
				        <div class="row">
				         	
				            <div class="col-xs-12 col-sm-6 col-md-4">
				                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
				                    <div class="mainflip">
				                        <div class="frontside">
				                            <div class="card">
				                                <div class="card-body custom_body text-center">
				                                    <p><img class=" img-fluid" src={require("../../../images/sex-1.jpg")} alt="card image"/></p>
				                                    <h4 class="card-title">Purchase 25 Coins</h4>
				                                    <p class="card-text">Coins can be used to tip and incentivize live streamers to join a private chat with you or make the cammer(s) do certain sexual acts</p>
				                                    <button onClick={() => {
				                                    	this.setState({
				                                    		tokens: 25
				                                    	}, () => {
				                                    		this.props.history.push("/purchase/tokens/payment", { tokens: this.state.tokens });
				                                    	})
				                                    }} class="btn btn-info"><i class="fa fa-plus"></i>Purchase 25 Coins</button>
				                                </div>
				                            </div>
				                        </div>
				                        <div class="backside">
				                            <div class="card">
				                                <div class="card-body custom_body text-center mt-4">
				                                    <h4 class="card-title">Purchase 25 Coins</h4>
				                                    <p class="card-text">These coins can only be used on "Jerk N' Squirt" but can also be cashed out if you wish to do so, don't feel trapped. We are here to create the best experience possible, even if that means returning your money back to your account if you're displeased with our streaming platform.</p>
				                                    <hr className="my-4"/>
				                                     <button onClick={() => {
				                                    	this.setState({
				                                    		tokens: 25
				                                    	}, () => {
				                                    		this.props.history.push("/purchase/tokens/payment", { tokens: this.state.tokens });
				                                    	})
				                                    }} class="btn btn-info"><i class="fa fa-plus"></i>Purchase 25 Coins</button>
				                                </div>
				                            </div>
				                        </div>
				                    </div>
				                </div>
				            </div>
				   
				            <div class="col-xs-12 col-sm-6 col-md-4">
				                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
				                    <div class="mainflip">
				                        <div class="frontside">
				                            <div class="card">
				                                <div class="card-body custom_body text-center">
				                                    <p><img class=" img-fluid" src={require("../../../images/sex-2.jpg")} alt="card image"/></p>
				                                    <h4 class="card-title">Purchase 50 Coins</h4>
				                                    <p class="card-text">Coins can be used to tip and incentivize live streamers to join a private chat with you or make the cammer(s) do certain sexual acts</p>
				                                   <button onClick={() => {
				                                    	this.setState({
				                                    		tokens: 50
				                                    	}, () => {
				                                    		this.props.history.push("/purchase/tokens/payment", { tokens: this.state.tokens });
				                                    	})
				                                    }} class="btn btn-info"><i class="fa fa-plus"></i>Purchase 50 Coins</button>
				                                </div>
				                            </div>
				                        </div>
				                        <div class="backside">
				                            <div class="card">
				                                <div class="card-body custom_body text-center mt-4">
				                                   <h4 class="card-title">Purchase 50 Coins</h4>
				                                    <p class="card-text">These coins can only be used on "Jerk N' Squirt" but can also be cashed out if you wish to do so, don't feel trapped. We are here to create the best experience possible, even if that means returning your money back to your account if you're displeased with our streaming platform.</p>
				                                    <hr className="my-4"/>
				                                     <button onClick={() => {
				                                    	this.setState({
				                                    		tokens: 50
				                                    	}, () => {
				                                    		this.props.history.push("/purchase/tokens/payment", { tokens: this.state.tokens });
				                                    	})
				                                    }} class="btn btn-info"><i class="fa fa-plus"></i>Purchase 50 Coins</button>
				                                </div>
				                            </div>
				                        </div>
				                    </div>
				                </div>
				            </div>
				          
				            <div class="col-xs-12 col-sm-6 col-md-4">
				                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
				                    <div class="mainflip">
				                        <div class="frontside">
				                            <div class="card">
				                                <div class="card-body custom_body text-center">
				                                    <p><img class=" img-fluid" src={require("../../../images/sex-3.jpg")} alt="card image"/></p>
				                                    <h4 class="card-title">Purchase 75 Tokens</h4>
				                                    <p class="card-text">Coins can be used to tip and incentivize live streamers to join a private chat with you or make the cammer(s) do certain sexual acts</p>
				                                    <button onClick={() => {
				                                    	this.setState({
				                                    		tokens: 75
				                                    	}, () => {
				                                    		this.props.history.push("/purchase/tokens/payment", { tokens: this.state.tokens });
				                                    	})
				                                    }} class="btn btn-info"><i class="fa fa-plus"></i>Purchase 75 Coins</button>
				                                </div>
				                            </div>
				                        </div>
				                        <div class="backside">
				                            <div class="card">
				                                <div class="card-body custom_body text-center mt-4">
				                                    <h4 class="card-title">Purchase 75 Coins</h4>
				                                    <p class="card-text">These coins can only be used on "Jerk N' Squirt" but can also be cashed out if you wish to do so, don't feel trapped. We are here to create the best experience possible, even if that means returning your money back to your account if you're displeased with our streaming platform.</p>
				                                    <hr className="my-4"/>
				                                     <button onClick={() => {
				                                    	this.setState({
				                                    		tokens: 75
				                                    	}, () => {
				                                    		this.props.history.push("/purchase/tokens/payment", { tokens: this.state.tokens });
				                                    	})
				                                    }} class="btn btn-info"><i class="fa fa-plus"></i>Purchase 75 Coins</button>
				                                </div>
				                            </div>
				                        </div>
				                    </div>
				                </div>
				            </div>
				           
				            <div class="col-xs-12 col-sm-6 col-md-4">
				                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
				                    <div class="mainflip">
				                        <div class="frontside">
				                            <div class="card">
				                                <div class="card-body custom_body text-center">
				                                    <p><img class=" img-fluid" src={require("../../../images/sex-4.jpg")} alt="card image"/></p>
				                                    <h4 class="card-title">Purchase 100 Coins</h4>
				                                   <p class="card-text">Coins can be used to tip and incentivize live streamers to join a private chat with you or make the cammer(s) do certain sexual acts</p>
				                                    <button onClick={() => {
				                                    	this.setState({
				                                    		tokens: 100
				                                    	}, () => {
				                                    		this.props.history.push("/purchase/tokens/payment", { tokens: this.state.tokens });
				                                    	})
				                                    }} class="btn btn-info"><i class="fa fa-plus"></i>Purchase 100 Coins</button>
				                                </div>
				                            </div>
				                        </div>
				                        <div class="backside">
				                            <div class="card">
				                                <div class="card-body custom_body text-center mt-4">
				                                    <h4 class="card-title">Purchase 100 Coins</h4>
				                                    <p class="card-text">These coins can only be used on "Jerk N' Squirt" but can also be cashed out if you wish to do so, don't feel trapped. We are here to create the best experience possible, even if that means returning your money back to your account if you're displeased with our streaming platform.</p>
				                                    <hr className="my-4"/>
				                                     <button onClick={() => {
				                                    	this.setState({
				                                    		tokens: 100
				                                    	}, () => {
				                                    		this.props.history.push("/purchase/tokens/payment", { tokens: this.state.tokens });
				                                    	})
				                                    }} class="btn btn-info"><i class="fa fa-plus"></i>Purchase 100 Coins</button>
				                                </div>
				                            </div>
				                        </div>
				                    </div>
				                </div>
				            </div>
				         
				            <div class="col-xs-12 col-sm-6 col-md-4">
				                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
				                    <div class="mainflip">
				                        <div class="frontside">
				                            <div class="card">
				                                <div class="card-body custom_body text-center">
				                                    <p><img class=" img-fluid" src={require("../../../images/sex-5.jpg")} alt="card image"/></p>
				                                    <h4 class="card-title">Purchase 150 Coins</h4>
				                                    <p class="card-text">Coins can be used to tip and incentivize live streamers to join a private chat with you or make the cammer(s) do certain sexual acts</p>
				                                    <button onClick={() => {
				                                    	this.setState({
				                                    		tokens: 150
				                                    	}, () => {
				                                    		this.props.history.push("/purchase/tokens/payment", { tokens: this.state.tokens });
				                                    	})
				                                    }} class="btn btn-info"><i class="fa fa-plus"></i>Purchase 150 Coins</button>
				                                </div>
				                            </div>
				                        </div>
				                        <div class="backside">
				                            <div class="card">
				                                <div class="card-body custom_body text-center mt-4">
				                                    <h4 class="card-title">Purchase 150 Coins</h4>
				                                    <p class="card-text">These coins can only be used on "Jerk N' Squirt" but can also be cashed out if you wish to do so, don't feel trapped. We are here to create the best experience possible, even if that means returning your money back to your account if you're displeased with our streaming platform.</p>
				                                    <hr className="my-4"/>
				                                     <button onClick={() => {
				                                    	this.setState({
				                                    		tokens: 150
				                                    	}, () => {
				                                    		this.props.history.push("/purchase/tokens/payment", { tokens: this.state.tokens });
				                                    	})
				                                    }} class="btn btn-info"><i class="fa fa-plus"></i>Purchase 150 Coins</button>
				                                </div>
				                            </div>
				                        </div>
				                    </div>
				                </div>
				            </div>
				          
				            <div class="col-xs-12 col-sm-6 col-md-4">
				                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
				                    <div class="mainflip">
				                        <div class="frontside">
				                            <div class="card">
				                                <div class="card-body custom_body text-center">
				                                    <p><img class=" img-fluid" src={require("../../../images/sex-6.jpg")} alt="card image"/></p>
				                                    <h4 class="card-title">Purchase 200 Coins</h4>
				                                    <p class="card-text">Coins can be used to tip and incentivize live streamers to join a private chat with you or make the cammer(s) do certain sexual acts</p>
				                                    <button onClick={() => {
				                                    	this.setState({
				                                    		tokens: 175
				                                    	}, () => {
				                                    		this.props.history.push("/purchase/tokens/payment", { tokens: this.state.tokens });
				                                    	})
				                                    }} class="btn btn-info"><i class="fa fa-plus"></i>Purchase 200 Coins</button>
				                                </div>
				                            </div>
				                        </div>
				                        <div class="backside">
				                            <div class="card">
				                                <div class="card-body custom_body text-center mt-4">
				                                    <h4 class="card-title">Purchase 200 Coins</h4>
				                                    <p class="card-text">These coins can only be used on "Jerk N' Squirt" but can also be cashed out if you wish to do so, don't feel trapped. We are here to create the best experience possible, even if that means returning your money back to your account if you're displeased with our streaming platform.</p>
				                                    <hr className="my-4"/>
				                                     <button onClick={() => {
				                                    	this.setState({
				                                    		tokens: 175
				                                    	}, () => {
				                                    		this.props.history.push("/purchase/tokens/payment", { tokens: this.state.tokens });
				                                    	})
				                                    }} class="btn btn-info"><i class="fa fa-plus"></i>Purchase 200 Coins</button>
				                                </div>
				                            </div>
				                        </div>
				                    </div>
				                </div>
				            </div>
				           
							
				        </div>
				    </div>
				</section>
				<FooterPage />
            </div>
        );
    }
}

export default withRouter(PurchaseTokenDash);
