import React, { Component } from 'react';
import Navigation from "../../../navigation/index.js";
import Footer from "../../../common/footer/footer.js";
import axios from "axios";
import "../css/style.css";
import ParallaxOne from "../../../parallaxs/parallaxOne.js";
import ParallaxTwo from "../../../parallaxs/parallaxTwo.js";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from "react-redux";
import { MessageList, MessageInput, MessageLivestream } from 'stream-chat-react';
import { MessageInputSmall, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';


const client = new StreamChat('qzye22t8v5c4');

class CreatePrivateStream extends Component {
constructor(props) {
    super(props);

    this.state = {
		showStream: false,
		modalIsOpen: false,
		playbackID: null,
  		streamKey: null,
  		streamID: null,
  		loaded: false,
  		startedStream: null,
  		data: [],
  		copied: false,
  		id: ""
    }
}
	handleClick = () => {
 		
	}
	componentDidUnmount () {
		client.disconnect();
	}
	handleRedirect = () => {

		console.log("redirect clicked...")

		axios.post("/check/stream/live/id/two", {
			id: this.state.id
		}).then(async (res) => {
			console.log(res.data);

			const users = res.data;

			client.setUser({
			    id: this.props.username,
			    name: this.props.username,
			    image: 'https://getstream.io/random_svg/?id=patient-breeze-7&name=Patient+breeze'},
			this.props.token);

			const conversation = client.channel('messaging', `private-1-on-1-stream-info-${res.data[0].privateStreamCodes.streamCode}`, {
				name: `private-1-on-1-stream-info-${res.data[0].privateStreamCodes.streamCode}`,
			    members: [users[0].username, users[1].username]
			})

			await conversation.sendMessage({
			    text: `Your private stream is now LIVE! Please visit the url provided in the initial message to access your stream :)`
			});

			axios.post("/gather/user/id/specific", {
				email: users[0].email
			}).then(async (response) => {
				console.log(response.data);
				for (let key in response.data) {
					let code = response.data[key].privateStreamCodes.urlID;

					console.log(code);

					axios.post("/set/ready", {
						email: users[0].email
					}).then((respsonseee) => {
						console.log(respsonseee.data);
					}).catch((error) => {
						console.log(error);
					})
				}
			}).catch((err) => {
				console.log(err);
			})
			axios.post("/gather/user/id/specific", {
				email: users[1].email
			}).then(async (response) => {
				console.log(response.data);
				for (let key in response.data) {
					let code = response.data[key].privateStreamCodes.urlID;

					console.log(code);

					axios.post("/set/ready", {
						email: users[1].email
					}).then((respsonseee) => {
						console.log(respsonseee.data);
					}).catch((error) => {
						console.log(error);
					})

					this.setState({
						streamKey: "ladkjf2l3m4r2l3m4",
						loaded: true
					})
				}
			}).catch((err) => {
				console.log(err);
			})

		}).catch((err) => {
			console.log(err);
		})
	}	
	renderConditional = () => {
		if (this.state.loaded) {
			return (
				<h4 className="text-center">
				<hr className="my-4"/>Stream Key: <strong>{this.state.streamKey}</strong><CopyToClipboard style={{ marginLeft: "15px" }} text={this.state.streamKey}
			          onCopy={() => this.setState({
			          	copied: true
			          })}>
			          <button className="btn btn-outline aqua_button_custom">Copy to clipboard</button>
			        </CopyToClipboard> <hr className="my-4"/>
				  <div class="input-group mb-3">
				  <div class="input-group-prepend">
				    <span class="input-group-text" id="basic-addon1" style={{ width: "100%", margin: "0px 20px" }}>Enter your unique ID from your invitation msg from your inbox</span>
				  </div>
				  <input onChange={(e) => {
				  	this.setState({
				  		id: e.target.value
				  	})
				  }} type="text" class="form-control" placeholder="b1fe178-b2ef-cff-4702-f6dbffa5224" aria-label="Username" aria-describedby="basic-addon1" />
				</div> <hr className="my-4"/>{this.state.id ? <button onClick={() => {
									this.handleRedirect();
								}} className="btn btn-outline green_button_custom" style={{ width: "100%", margin: "30px 0px" }}>Redirect page and ACTIVATE live stream</button> : null} <hr className="my-4"/> Your OBS server url is: rtmps://global-live.mux.com/app <hr className="my-4"/>
				</h4>
			);
		} else {
			return null;
		}
	}
    render() {
    	console.log(this.state);
        return (
            <div>
				<Navigation />
				<ParallaxOne />
					{this.renderConditional()}
					<div class="container">
						<div class="row">
						
						
							<div class="col-lg-4">
								<div class="our-team-main">
								
									<div class="team-front">
									<img src="http://placehold.it/110x110/9c27b0/fff?text=Dilip" class="img-fluid" />
									<h3>Dilip Kevat</h3>
									<p>Web Designer</p>
									</div>
									
									<div class="team-back">
									<span>
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
										natoque penatibus et magnis dis parturient montes,
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
										natoque.
									</span>
									</div>
									
									</div>
									</div>
									
									<div class="col-lg-4">
									<div class="our-team-main">
									
									<div class="team-front">
									<img src="http://placehold.it/110x110/336699/fff?text=Dilip" class="img-fluid" />
									<h3>Dilip Kevat</h3>
									<p>Web Designer</p>
									</div>
									
									<div class="team-back">
									<span>
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
										natoque penatibus et magnis dis parturient montes,
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
										natoque.
									</span>
									</div>
									
									</div>
									</div>

									<div class="col-lg-4">
									<div class="our-team-main">
									
									<div class="team-front">
									<img src="http://placehold.it/110x110/607d8b/fff?text=Dilip" class="img-fluid" />
									<h3>Dilip Kevat</h3>
									<p>Web Designer</p>
									</div>
									
									<div class="team-back">
									<span>
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
										natoque penatibus et magnis dis parturient montes,
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
										natoque.
									</span>
									</div>
									
									</div>
									</div>
									{!this.state.loaded ? <button onClick={() => {
										this.handleClick();
									}} className="btn btn-outline pink_button" style={{ width: "100%", margin: "30px 0px" }}>Start a PRIVATE Stream</button> : null}
									
								<div className="mx-auto">
									<div class="col-lg-12 mx-auto" style={{ marginBottom: "20px" }}>

									
									
										<iframe style={{ boxShadow: "10px 10px 10px grey", width: "75vw" }} className="vid-vid" src="https://www.youtube.com/embed/BgpDb1XDDfY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
									
								
									</div>
								</div>

						
							{!this.state.loaded ? <button onClick={() => {
								this.handleClick();
							}} className="btn btn-outline pink_button" style={{ width: "100%", margin: "30px 0px" }}>Start a PRIVATE Stream</button> : null}
								<div class="col-lg-4">
									<div class="our-team-main">
									
									<div class="team-front">
									<img src="http://placehold.it/110x110/4caf50/fff?text=Dilip" class="img-fluid" />
									<h3>Dilip Kevat</h3>
									<p>Web Designer</p>
									</div>
									
									<div class="team-back">
									<span>
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
										natoque penatibus et magnis dis parturient montes,
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
										natoque.
									</span>
									</div>
									
									</div>
									</div>

									<div class="col-lg-4">
									<div class="our-team-main">
									
									<div class="team-front">
									<img src="http://placehold.it/110x110/e91e63/fff?text=Dilip" class="img-fluid" />
									<h3>Dilip Kevat</h3>
									<p>Web Designer</p>
									</div>
									
									<div class="team-back">
									<span>
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
										natoque penatibus et magnis dis parturient montes,
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
										natoque.
									</span>
									</div>
									
									</div>
									</div>

									<div class="col-lg-4">
									<div class="our-team-main">
									
									<div class="team-front">
									<img src="http://placehold.it/110x110/2196f3/fff?text=Dilip" class="img-fluid" />
									<h3>Dilip Kevat</h3>
									<p>Web Designer</p>
									</div>
									
									<div class="team-back">
									<span>
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
										natoque penatibus et magnis dis parturient montes,
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
										natoque.
									</span>
									</div>
								
								</div>
							</div>

							
						
						
						</div>
					</div>
					{this.state.loaded ? <h4 className="text-center">
						<hr className="my-4"/>Stream Key: <strong>{this.state.streamKey}</strong><CopyToClipboard style={{ marginLeft: "15px" }} text={this.state.streamKey}
			          onCopy={() => this.setState({
			          	copied: true
			          })}>
			          <button className="btn btn-outline aqua_button_custom">Copy to clipboard</button>
			        </CopyToClipboard><hr className="my-4"/> <div class="input-group mb-3">
					  <div class="input-group-prepend">
					    <span class="input-group-text" id="basic-addon1" style={{ width: "100%", margin: "0px 20px" }}>Enter your unique ID from your invitation msg from your inbox</span>
					  </div>
					  <input onChange={(e) => {
					  	this.setState({
					  		id: e.target.value
					  	})
					  }} type="text" class="form-control" placeholder="b1fe178-b2ef-cff-4702-f6dbffa5224" aria-label="Username" aria-describedby="basic-addon1" />
					</div> <hr className="my-4"/>{this.state.id ? <button onClick={() => {
						this.handleRedirect();
					}} className="btn btn-outline green_button_custom" style={{ width: "100%", margin: "30px 0px" }}>Redirect page and ACTIVATE live stream</button> : null}<hr className="my-4"/>Your OBS server url is: rtmps://global-live.mux.com/app <hr className="my-4"/>
					</h4> : null}
					<ParallaxOne />
				<Footer />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
	return {
		email: state.auth.data.email,
		username: state.auth.data.username,
		token: state.token.token
	}
}
export default connect(mapStateToProps, { })(CreatePrivateStream);
