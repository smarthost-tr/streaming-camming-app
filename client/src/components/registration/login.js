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

const client = new StreamChat('qzye22t8v5c4');

class LoginScreen extends Component {
constructor(props) {
    super(props);

    this.state = {
		password: "",
		email: ""
    }
}
	renderSubmission = (e) => {
		e.preventDefault();

		console.log("submitted...");

		const { email, password } = this.state;

		if (this.state.email.length > 0 && this.state.password.length > 0) {
			axios.post("/authentication/login", {
				email: email.toLowerCase(),
				password,
				secret: "37ek4bmy38umj9sfbgxtte7jkj7dyr88tfsvexvm7vc7k7k5d4ekvacerq3wj7a5"
			}).then((res) => {
				console.log(res.data);
				if (res.data.data) {
					this.props.authentication(res.data.data);
					this.props.token(res.data.token);
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
	                console.log(port);
	               		axios.post("/register-and-broadcast-node", {
		                    newNodeUrl: port
		                }).then((res) => {
		                    console.log('res.data', res.data);
		                    axios.get("/consensus").then((responseee) => {
		                    	console.log(responseee);
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
				} else {
					alert(res.data.message);
				}
			}).catch((err) => {
				console.log(err);
			})
		} else {
			alert("You must complete both email and password fields.");
		}
	}
	componentWillUnmount () {
		console.log("disconnecting...");
		client.disconnect();
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
		                                        
		                                        
		                                    	<button onClick={this.renderSubmission} className="btn btn-outline aqua_button_custom" style={{ width: "100%" }}>Submit Credentials</button>
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                </div>
 					</div>
		            </div>	
		          </div>
		          <Footer />
	            </div>

        );
    }
}

export default withRouter(connect(null, { authentication, token, gatherCurrency })(LoginScreen));
