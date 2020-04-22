import React, { Component } from "react";
import "../css/contact.css";
import axios from "axios";
import Navigation from "../../navigation/index.js";
import Footer from "../footer/footer.js";

class ContactPage extends Component {
constructor(props) {
  super(props);

  this.state = {
	name: "",
	email: "",
	phoneNumber: "",
	message: ""
  };
}
	renderSubmission = (e) => {
		e.preventDefault();

		const { email, name, phoneNumber, message } = this.state;

		console.log("submitted.");

		axios.post("/post/contact/information", {
			email,
			name,
			phoneNumber,
			message
		}).then((res) => {
			console.log(res.data);
		}).catch((err) => {
			console.log(err);
		})
	}
	componentDidMount() {
		window.scrollTo(0, 0)
	}
	render () {
		return (
			<div className="back_background">
			<Navigation />
				<div class="container contact-form">
		            <div class="contact-image">
		                <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
		            </div>
		            <form onSubmit={this.renderSubmission}>
		                <h3>Drop Us a Message</h3>
		               <div class="row">
		                    <div class="col-md-6">
		                        <div class="form-group">
		                            <input onChange={(e) => {
		                            	this.setState({
											name: e.target.value
		                            	})
		                            }} type="text" name="txtName" class="form-control" placeholder="Your Name *" value={this.state.name} />
		                        </div>
		                        <div class="form-group">
		                            <input onChange={(e) => {
		                            	this.setState({
											email: e.target.value
		                            	})
		                            }} type="text" name="txtEmail" class="form-control" placeholder="Your Email *" value={this.state.email} />
		                        </div>
		                        <div class="form-group">
		                            <input onChange={(e) => {
		                            	this.setState({
											phoneNumber: e.target.value
		                            	})
		                            }} type="text" name="txtPhone" class="form-control" placeholder="Your Phone Number *" value={this.state.phoneNumber} />
		                        </div>
		                        <div class="form-group">
		                            <input type="submit" name="btnSubmit" class="btnContact" value="Send Message" />
		                        </div>
		                    </div>
		                    <div class="col-md-6">
		                        <div class="form-group">
		                            <textarea onChange={(e) => {
		                            	this.setState({
		                            		message: e.target.value
		                            	})
		                            }} name="txtMsg" value={this.state.message} class="form-control" placeholder="Your Message *" style={{ width: "100%", height: "150px" }}></textarea>
		                        </div>
		                    </div>
		                </div>
		            </form>
				</div>
				<Footer />
			</div>
		);
	}
}
export default ContactPage;