import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import "./css/style.css";
import { Link } from "react-router-dom";
import Footer from "../../common/footer/footer.js";
import axios from "axios";
import { connect } from "react-redux";
import ReactPlayer from 'react-player';
import { Chat, Channel, ChannelHeader, Window } from 'stream-chat-react';
import { MessageList, MessageInput, MessageLivestream } from 'stream-chat-react';
import { MessageInputSmall, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';


const client = new StreamChat('qzye22t8v5c4');

let channel;

class LivePrivateStreamHomepage extends Component {
constructor(props) {
    super(props);

	this.state = {
		id: "",
		result: null,
		solution: null,
		data: [],
		uniqueID: null,
		ready: false,
		token: null
	}
}
	renderSubmission = (e) => {
		e.preventDefault();
		
		axios.post("/get/user/that/matches/id", {
			id: this.state.id
		}).then((res) => {
			console.log(res.data);
			this.setState({
				data: res.data
			})
		}).catch((err) => {
			console.log(err);
		})	
		client.setUser({
		    id: this.props.username,
		    name: this.props.username,
		    image: this.props.image
		}, this.props.token);

		channel = client.channel('livestream', this.state.id, {
		  image: 'https://goo.gl/Zefkbx',
		  name: "Live Stream Private 1 v 1",
		});

		// axios.post("/mux/get/streams", {
		// 	streamID: this.state.id
		// }).then((res) => {
		// 	console.log(res.data);
		// }).catch((err) => {
		// 	console.log(err);
		// })	

		console.log("submitted...");

		axios.post("/check/stream/live/id", {
			email: this.props.email,
			id: this.state.id
		}).then((res) => {
			console.log(res.data);
			if (res.data.length > 0) {
				if (res.data[0].privateStreamCodes.streamCode === this.state.id) {
					console.log("MATCH.");
					this.setState({
						result: res.data[0]
					}, async () => {
						  const auth = {
						    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
						    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
						  };
						  const param = { "reduced_latency": true, 
							  "playback_policy": "public", 
							  "new_asset_settings": { 
							  	"playback_policy": "public" 
							  } 
					      }
						  const identifier = this.state.result.streams[this.state.result.streams.length - 1].id;

						  const res = await axios.get(`https://api.mux.com/video/v1/live-streams/${identifier}`, { auth: auth }).catch((error) => {
						    throw error;
						  });

						  const solution = res.data.data;

						  console.log(solution);

						this.setState({
							solution
						})
					})	
				}
			} else {
				alert("Password doesn't match this streams records...")
			}
		}).catch((err) => {
			console.log(err);
		})
	}	
	runRefresh = async () => {
		const auth = {
		    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
		    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
		};

		const signing = await axios.post("https://api.mux.com/video/v1/signing-keys", {}, { auth: auth }).catch((error) => {
		    throw error;
		});

		console.log(signing.data);

		const signing_key = signing.data.data.id;

		if (this.state.data) {
			return this.state.data.map((user, index) => {
				console.log(user.email);

				if (user.email === this.state.result.email) {
					console.log("jackpot :", user.email);
					axios.post("/get/stream/mux/id", {
						email: user.email
					}).then((res) => {
						console.log(res.data);
						this.setState({
							uniqueID: res.data[0].streams[res.data[0].streams.length - 1].playback_ids[0].id
						}, () => {
							const { uniqueID } = this.state;

							axios.post("/create/mux/json/web/token", {
								private_key: signing.data.data.private_key,
								playbackID: uniqueID,
								identifier: signing.data.data.id
						  	}).then((res) => {
						  		console.log(res.data);
						  		if (res.data) {
						  			axios.post("/create/mux/token/private", {
									  	id: this.state.solution.playback_ids[0].id,
									  	signing: signing.data.data.id,
									  	private_key: signing.data.data.private_key
									}).then((responseee) => {
									  	console.log(responseee.data);
									  	this.setState({
									  		token: responseee.data
									  	});


									}).catch((err) => {
									  	console.log(err);
									})

						  		}
						  	}).catch((err) => {
						  		console.log(err);
						  	})
						})
					}).catch((err) => {
						console.log(err);
					});
				} 
			})
		}

		const identifier = this.state.result.streams[this.state.result.streams.length - 1].id;

		const res = await axios.get(`https://api.mux.com/video/v1/live-streams/${identifier}`, { auth: auth }).catch((error) => {
		    throw error;
		});

	    const solution = res.data.data;

	  	// put more code here to handle asset logic

		this.setState({
			solution
		});

	}	
	renderVideoSplit = () => {
		if (this.state.uniqueID && this.state.token) {
			return (
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							<ReactPlayer playing={true} style={{ backgroundColor: "black" }} url={`https://stream.mux.com/${this.state.uniqueID}.m3u8?token=${this.state.token}`} controls width="100%" height="100%" />
						</div>
						<div className="col-md-6">
							<Chat client={client} theme={'livestream dark'}>
						    <Channel channel={channel} Message={MessageLivestream}>
						      <Window hideOnThread>
						        <ChannelHeader live />
						        <MessageList />
						        <MessageInput Input={MessageInputSmall} focus />
						      </Window>
						      <Thread fullWidth />
						    </Channel>
						  </Chat>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div class="jumbotron card card-image" id="back_back">
                  <div class="text-white text-center py-5 px-4">
                    <div>
                      <h1 class="card-title h1-responsive pt-3 mb-5 font-bold"><strong>Ready to join the action?? You are about to enter a private 1 on 1 stream!</strong></h1>
                      <p class="mx-5 mb-5">When you are ready, click the button below to load your live stream and enjoy the show :)
                      </p>
                        <button onClick={() => {
							this.runRefresh();
						}} className="btn btn-outline purple_button" style={{ width: "100%" }}>LOAD/REFRESH PAGE</button>
                    </div>
                  </div>
                </div>
			);
		}
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
			console.log(this.state.result.streams[this.state.result.streams.length - 1].playback_ids[0].id);
			return (
				<div>
					<Navigation />
						{/*<h1 className="text-center">{this.props.match.params.id}</h1>*/}
						{this.renderVideoSplit()}
					<Footer />
				</div>
			);
		}
	}
    render() {
    	console.log(this.state);
        return (
            <div>
				{this.renderContent()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
	return {
		email: state.auth.data.email,
		username: state.auth.data.username,
		image: state.auth.data.image,
		token: state.token.token
	}
}

export default connect(mapStateToProps, {  })(LivePrivateStreamHomepage);
