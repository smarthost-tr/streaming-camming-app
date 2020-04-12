import React, { Component } from 'react';
import "./registration.css";
import Navigation from "../navigation/index.js";
import DatePicker from 'react-date-picker';
import axios from "axios";
import { authentication } from "../../actions/index.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class RegisterNewUser extends Component {
constructor(props) {
  super(props);

  	this.state = {
		security: "",
		securityAnswer: "",
		gender: null,
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		password: "",
		birthdate: new Date(),
		phoneNumber: "",
        image: null
	}
}
	onChange = (date) => {
		this.setState({ 
			birthdate: date
		})
	}
	handleSubmission = (e) => {
		e.preventDefault();
		// deconstruct to make more readable
		const { security, securityAnswer, gender, firstName, lastName, phoneNumber, image, email, username, password, birthdate } = this.state;

        const formData = new FormData();

        formData.append('securityAnswer', securityAnswer);
        formData.append("security", security);
        formData.append("gender", gender);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("phoneNumber", phoneNumber);
        formData.append("image", image);
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("birthdate", birthdate);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        

		// check if everything is filled out
		if (security.length > 0 && securityAnswer.length > 0 && gender.length > 0 && firstName.length > 0 && lastName.length > 0 && phoneNumber.length > 0 && email.length > 0 && username.length > 0 && password.length > 0 && birthdate !== null && image) {
			axios.post("/register/new/user", formData, config).then((res) => {
				// console.log response
				console.log(res.data);
				if (res.data.user !== null) {
					this.props.authentication(res.data.user);
					this.props.history.push("/");
					alert("Successfully registered!");
				} else {
					alert("User already exists, use a different email.");
				}
			}).catch((err) => {
				console.log(err);
			});
		} else {
			alert("Please fill out each and every field, you missed some!")
		}
		// make request to back-end to create user
		
	}
	render() {
		console.log(this.state);
		return (
			<div>
			<Navigation />
			<div class="container-fluid register">
                <div class="row">
                    <div class="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>You are 30 seconds away from jerking to the best quality models on the internet or even making money with us!</p>
                        
                    </div>
                    <div class="col-md-9 register-right">
                       
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Register Today For Your Free Credits (100 Credits)!</h3>
                                <div class="row register-form">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" onChange={(e) => {
                                            	this.setState({
                                            		firstName: e.target.value
                                            	})
		                                    }} class="form-control" placeholder="First Name - This will NOT being publicly avaliable *" value={this.state.firstName} />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" onChange={(e) => {
                                            	this.setState({
                                            		lastName: e.target.value
                                            	})
                                            }} class="form-control" placeholder="Last Name - This will NOT being publicly avaliable *" value={this.state.lastName} />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" onChange={(e) => {
                                            	this.setState({
                                            		password: e.target.value
                                            	})
                                            }} class="form-control" placeholder="Password *" value={this.state.password} />
                                        </div>
                                        <div class="form-group">
                                            <input onChange={(e) => {
                                            	this.setState({
                                            		username: e.target.value
                                            	})
                                            }} type="text" class="form-control"  placeholder="Username *" value={this.state.username} />
                                        </div>

                                        <div class="form-group">
                                            <div class="maxl">
                                                <label style={{ marginRight: "15px" }} class="radio inline"> 
                                                    <input onChange={(e) => {
		                                            	this.setState({
		                                            		gender: e.target.value
		                                            	})
		                                            }} type="radio" name="gender" value="male"/>
                                                    <span> Male </span> 
                                                </label>
                                                <label style={{ marginRight: "15px" }} class="radio inline"> 
                                                    <input onChange={(e) => {
		                                            	this.setState({
		                                            		gender: e.target.value
		                                            	})
		                                            }} type="radio" name="gender" value="female" />
                                                    <span>Female </span> 
                                                </label>
                                                <label style={{ marginRight: "15px" }} class="radio inline"> 
                                                    <input onChange={(e) => {
		                                            	this.setState({
		                                            		gender: e.target.value
		                                            	})
		                                            }} type="radio" name="gender" value="trans"/>
                                                    <span> Trans </span> 
                                                </label>
                                                <label style={{ marginRight: "15px" }} class="radio inline"> 
                                                    <input onChange={(e) => {
		                                            	this.setState({
		                                            		gender: e.target.value
		                                            	})
		                                            }} type="radio" name="gender" value="couple" />
                                                    <span>Couple </span> 
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input onChange={(e) => {
                                            	this.setState({
                                            		email: e.target.value
                                            	})
                                            }} type="email" class="form-control" placeholder="Your Email *" value={this.state.email} />
                                        </div>
                                        <div class="form-group">
                                            <input onChange={(e) => {
                                            	this.setState({
                                            		phoneNumber: e.target.value
                                            	})
                                            }} type="text" minlength="10" maxlength="10" name="txtEmpPhone" class="form-control" placeholder="Your Phone *" value={this.state.phoneNumber} />
                                        </div>
        								
                                        <div class="form-group">
                                            <select onChange={(e) => {
                                            	this.setState({
                                            		security: e.target.value
                                            	})
                                            }} class="form-control">
                                                <option class="hidden"  selected disabled>Please select your Security Question</option>
                                                <option>What is your favorite vacation spot?</option>
                                                <option>What is Your old Phone Number</option>
                                                <option>What is your Pet Name?</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <input onChange={(e) => {
                                            	this.setState({
                                            		securityAnswer: e.target.value
                                            	})
                                            }} type="text" class="form-control" placeholder="Enter Your Answer *" value={this.state.securityAnswer} />
                                        </div>
                                        <div class="form-group">
                                        	<label className="text-left" style={{ marginRight: "30px" }}>Birthdate</label>
                                            <DatePicker style={{ zIndex: 999 }}
									          onChange={this.onChange}
									          value={this.state.birthdate}
									        />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div style={{ float: "left" }} class="input-group mb-3">
                                                  <div class="custom-file">
                                                    <input name="image" onChange={(e) => {
                                                        this.setState({
                                                            image: e.target.files[0]
                                                        })
                                                    }} type="file" class="custom-file-input" id="inputGroupFile01"/>
                                                    <label class="custom-file-label" for="inputGroupFile01">{this.state.image ? "You selected a profile picture!" : "Choose a profile picture"}</label>
                                                  </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="submit" class="btnRegister" onClick={this.handleSubmission}  value="Register"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>	
          </div>	
        );
	}
}

export default withRouter(connect(null, { authentication })(RegisterNewUser));