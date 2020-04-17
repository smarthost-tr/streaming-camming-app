import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import "./css/style.css";
import { Link } from "react-router-dom";
import Footer from "../../common/footer/footer.js";
import axios from "axios";
import { connect } from "react-redux";

class LivePrivateStreamHomepage extends Component {
constructor(props) {
    super(props);

	this.state = {
		id: "",
		result: null
	}
}
	renderSubmission = (e) => {
		e.preventDefault();
		console.log("submitted...");

		axios.post("/check/stream/live/id", {
			email: this.props.email,
			id: this.state.id
		}).then((res) => {
			console.log(res.data);
			if (res.data.length > 0) {
				return res.data[0].privateStreamCodes.map((each, index) => {
					if (each.streamCode === this.state.id) {
						console.log("MATCH.");
						this.setState({
							result: res.data[0]
						})
					}
				})
			} else {
				alert("Password doesn't match this streams records...")
			}
		}).catch((err) => {
			console.log(err);
		})
	}
	renderContent = () => {
		if (this.state.result === null) {
			return (
			<div id="cover">
			<Navigation />
				<div class="container">
					<div class="d-flex justify-content-center h-100" style={{ marginTop: "200px", paddingBottom: "200px", marginBottom: "-90px" }}>
						<div class="card" style={{ width: "600px", height: "100%" }}>
							<div class="card-header">
								<h3 style={{ paddingTop: "30px" }}>Sign into private 1 on 1 stream <hr className="my-white"/> link provided in messages</h3>
								<div class="d-flex justify-content-end social_icon">
									<span><i class="fab fa-facebook-square"></i></span>
									<span><i class="fab fa-google-plus-square"></i></span>
									<span><i class="fab fa-twitter-square"></i></span>
								</div>
							</div>
							<div class="card-body">
								<form onSubmit={this.renderSubmission}>
									{/*<div class="input-group form-group">
										<div class="input-group-prepend">
											<span class="input-group-text"><i class="fas fa-user"></i></span>
										</div>
										<input type="text" class="form-control" placeholder="username" />
										
									</div>*/}
									<div class="input-group form-group">
										<div class="input-group-prepend">
											<span class="input-group-text"><i class="fas fa-key"></i></span>
										</div>
										<input onChange={(e) => {
											this.setState({
												id: e.target.value
											})
										}} value={this.state.id} type="password" class="form-control" placeholder="password for private stream - check inbox/msgs"/>
									</div>
									<div class="row align-items-center remember">
										{/*<input type="checkbox" />Remember Me*/}
									</div>
									<div class="form-group">
										<input type="submit" value="Login" class="btn float-right login_btn"/>
									</div>
								</form>
							</div>
							<div class="card-footer">
								<div class="d-flex justify-content-center links">
									Don't have your private stream key?<Link to="/chat/homepage">Redirect to messages</Link>
								</div>
								{/*<div class="d-flex justify-content-center">
									<a href="#">Forgot your password?</a>
								</div>*/}
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
			);
		} else {
			return (
				<div>
					<Navigation />
						<h1 className="text-center">{this.props.match.params.id}</h1>
					<Footer />
				</div>
			);
		}
	}
    render() {
    	console.log(this.props.match.params.id);
        return (
            <div>
				{this.renderContent()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
	return {
		email: state.auth.data.email
	}
}

export default connect(mapStateToProps, {  })(LivePrivateStreamHomepage);
