import React, { Component } from 'react';
import "./registration.css";
import axios from "axios";

class ForgotPassword extends Component {
constructor(props) {
    super(props);

    this.state = {
    	email: ""
    }
}
	handleSubmission = (e) => {
		e.preventDefault();
		console.log("submitted...");
		const { email } = this.state;

		if (email.length > 0) {
			axios.post("/get/user", {
				email: this.state.email
			}).then((res) => {
				if (res.data) {
					axios.post("/sendgrid/send/email", {
						email: this.state.email,
						password: res.data.password,
						phoneNumber: res.data.phoneNumber,
						username: res.data.username
					}).then((res) => {
						console.log(res.data);
						if (res.data.message === "Success") {
							this.setState({
								email: ""
							})
							alert("Check your email that is registered to your account, you should have a notification from us - make sure to check you junk mail! :)");
							
						} 
					}).catch((err) => {
						console.log(err);
						alert("An error occurred... Please try again.")
					})
				} else {
					alert("Email is non-existant... Please enter a valid email.");
				}
			}).catch((err) => {
				console.log(err);
			})
		} else {
			alert("Please enter an email...");
		}
	}
    render() {
        return (
            <div>
				<div class="container h-100">
    				<div class="row h-100">
						<div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
							<div class="d-table-cell align-middle">

								<div class="text-center mt-4">
									<h1 class="h2 text-white">Reset password</h1>
									<p class="lead text-white">
										Enter your email to reset your password.
									</p>
								</div>

								<div class="card super_card">
									<div class="card-body">
										<div class="m-sm-4">
											<form onSubmit={this.handleSubmission}>
												<div class="form-group">
													<label>Email</label>
													<input onChange={(e) => {
														this.setState({
															email: e.target.value
														})
													}} value={this.state.email} class="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" />
												</div>
												<div class="text-center mt-3">
													
													<button style={{ width: "100%" }} type="submit" class="btn btn-lg btn-outline aqua_button_custom">Reset password</button> 
												</div>
											</form>
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

export default ForgotPassword;
