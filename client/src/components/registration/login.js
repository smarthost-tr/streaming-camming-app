import React, { Component, PropTypes } from 'react';
import Navigation from "../navigation/index.js";
import axios from "axios";
import { connect } from "react-redux";
import { authentication } from "../../actions/index.js";
import { withRouter } from "react-router-dom";
import "./registration.css";
import { token } from "../../actions/token.js";
import { StreamChat } from 'stream-chat';
import { gatherCurrency } from "../../actions/blockchain/index.js";
import Footer from "../common/footer/footer.js";
import { getStreamFeedToken } from "../../actions/getStream/feed.js";
import { Link } from "react-router-dom";

const client = new StreamChat('qzye22t8v5c4');

class LoginScreen extends Component {
constructor(props) {
    super(props);

    this.state = {
		password: "",
		email: "",
		show: false,
		code: "",
		textCode: ""
    }
}
	renderSubmission = () => {
		const { email, password } = this.state;

		if (email.length > 0 && password.length > 0) {
			axios.post("/login/check/creds", {
				email: email.toLowerCase(),
				password
			}).then((res) => {
				if (res.data.message === "MATCH!") {
					axios.post("/verification", {
						email,
						password
					}).then((res) => {
						if (res.data) {
							this.setState({
								show: true,
								textCode: res.data.special
							});
						}
					}).catch((err) => {
						console.log(err);
						alert("Server error occurred...Something went wrong.")
					});
				} else {
					alert(res.data.message);
				}
			}).catch((err) => {
				console.log(err);
			})
		}
	}
	componentWillUnmount () {
		console.log("disconnecting...");
		client.disconnect();
	}
	renderFinalSubmission = (e) => {
		e.preventDefault();

		console.log("submitted...");

		const { email, password, code, textCode } = this.state;

		if (email.length > 0 && password.length > 0) {
			if (textCode === code) {
				axios.post("/authentication/login", {
					email: email.toLowerCase(),
					password,
					secret: "37ek4bmy38umj9sfbgxtte7jkj7dyr88tfsvexvm7vc7k7k5d4ekvacerq3wj7a5",
					code
				}).then((res) => {
					if (res.data.data) {
						axios.post("/stream/feed/token",{
					      username: res.data.data.username
					    }).then((responseeee) => {
					      if (responseeee.data) {
							this.props.authentication(res.data.data);
							this.props.token(res.data.token);
							this.props.getStreamFeedToken(responseeee.data.token);
							this.props.gatherCurrency({ 
								privateKey: res.data.data.blockPrivateKey, 
								publicKey: res.data.data.blockPublicKey 
							})
							client.setUser({
							   id: res.data.data.username,
							   name: res.data.data.username,
							   image: 'https://getstream.io/random_svg/?id=spring-silence-0&name=Spring+silence'
							}, res.data.token);

							axios.get("/gather/port/number").then((res) => {
			                const port = "http://localhost:" + res.data.port.toString();
			               		axios.post("/register-and-broadcast-node", {
				                    newNodeUrl: port
				                }).then((res) => {
				                    axios.get("/consensus").then((responseee) => {
				                    	if (responseee) {
				                    		this.props.history.push("/");
				                    	}
				                    }).catch((error) => {
				                    	console.log(error);
				                    })
				                    
				                }).catch((err) => {
				                    console.log(err);
				                })
				            }).catch((err) => {
				                console.log(err);
				            })
						  }
						}).catch((err) => {
						  console.log(err);
						})
					} else {
						alert(res.data.message);
					}
				}).catch((err) => {
					console.log(err);
				})
			} else {
				alert("Code does not match, please make sure you entered the correct code.")
			}
		} else {
			alert("You must complete both email and password fields.");
		}
	}
	renderContent = () => {
		if (!this.state.show) {
			return (
				<div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 class="register-heading">Log-in today and gain full access to restricted content!</h3>
	                        <div class="row register-form">
	                            <div class="col-md-12">
	                                <div class="form-group">
	                                    <input type="text" onChange={(e) => {
	                                    	this.setState({
	                                    		email: e.target.value
	                                    	})
	                                    }} class="form-control" placeholder="Email *" value={this.state.email} />
	                                </div>
	                                <div class="form-group">
	                                    <input type="text" onChange={(e) => {
	                                    	this.setState({
	                                    		password: e.target.value
	                                    	})
	                                    }} class="form-control" placeholder="Password *" value={this.state.password} />
	                                </div>

	                                <Link style={{ fontSize: "1.3rem", color: "white" }} to="/forgot/password">Forgot your password? Click me to reset it!</Link>
	                                
	                                
	                            	<button onClick={this.renderSubmission} className="btn btn-outline aqua_button_custom" style={{ width: "100%", marginTop: "10px" }}>Continue</button>
	                        </div>
	                    </div>
	                </div>
              	</div>
			);
		} else {
			return (
				<div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 class="register-heading">Enter your verification code</h3>
	                        <div class="row register-form">
	                            <div class="col-md-12">
	                                <div class="form-group">
	                                <label style={{ color: "white" }}>Please enter the code we just texted to your registered phone number - case sensitive...</label>
	                                    <input type="text" onChange={(e) => {
	                                    	this.setState({
	                                    		code: e.target.value
	                                    	})
	                                    }} class="form-control" placeholder="Enter your verifcation code here..." value={this.state.code} />
	                                </div>
	                                
	                                
	                                
	                            	<button onClick={this.renderFinalSubmission} className="btn btn-outline aqua_button_custom" style={{ width: "100%" }}>Submit Credentials && Authentication Code</button>
	                        </div>
	                    </div>
	                </div>
              	</div>
			);
		}
	}
    render() {
        return (
            <div>
				<div>
				<Navigation />
					<div class="container-fluid register register_two">
		                <div class="row">
		                    <div class="col-md-3 register-left">
		                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
		                        <h3>Welcome</h3>
		                        <p>Enter your credentials on this page to login and access our platforms restricted features!</p>
		                       
		                    </div>
		                    <div class="col-md-9 register-right">
		                       {this.renderContent()}
		                    </div>
		                </div>
 					</div>
		            </div>
		        <Footer />	
		    </div>
		          


        );
    }
}

export default withRouter(connect(null, { authentication, token, gatherCurrency, getStreamFeedToken })(LoginScreen));
