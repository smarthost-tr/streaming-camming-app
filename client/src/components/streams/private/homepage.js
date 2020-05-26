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
		token: null,
		shown: false
	}
}
	renderSubmission = (e) => {
		e.preventDefault();

		const { shown } = this.state;
		
		if (!shown) {
			client.setUser({
			    id: this.props.username,
			    name: this.props.username,
			    image: this.props.image
			}, this.props.token);

			channel = client.channel('livestream', this.state.id, {
			  image: 'https://goo.gl/Zefkbx',
			  name: "Live Stream Private 1 v 1",
			});
		}

		this.setState({
			shown: true,
			uniqueID: "23094oijlakdmflak3mr2lm34",
			result: { value: 100 }
		})

		console.log("submitted...");
	}	
	renderVideoSplit = () => {
		if (this.state.uniqueID) {
			return (
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							<ReactPlayer playing={true} style={{ backgroundColor: "black" }} url={null} controls width="100%" height="100%" />
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
