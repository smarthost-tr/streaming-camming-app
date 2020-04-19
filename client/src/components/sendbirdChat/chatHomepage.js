import React, { Component } from 'react';
import Navigation from "../navigation/index.js";
import { connect } from "react-redux";
import './css/chatHomepage.css';
import Footer from "../common/footer/footer.js";
import axios from "axios";
import _ from "underscore";
import socketIOClient from "socket.io-client";
import { Chat, Channel, ChannelHeader, ChannelList, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';
import { setGetStreamUser } from "../../actions/getStream/index.js";

let channel;

const chatClient = new StreamChat('qzye22t8v5c4');


class ChatSendbirdHomepage extends Component {
constructor(props) {
    super(props);

	this.state = {
		target: "",
		user: "Jeremy Blong",
		channel: null,
		enterChannel: false,
		channels: [],
		ready: false,
		intersection: [],
		leaveStream: false,
		message: "",
		endpoint: "http://localhost:5000",
		replies: [],
		updated: false
	}
}
	componentWillUnmount() {
		console.log("disconnected...");

	    chatClient.disconnect();
	}
	componentDidMount() {

		

		// axios.post("/gather/messages/all", {
		// 	email: this.props.email
		// }).then((res) => {
		// 	console.log(res.data);
		// 	for (let key in res.data) {
		// 		let messages = res.data[key].messages;
		// 		this.setState({
		// 			channels: messages,
		// 			ready: true
		// 		})
		// 	}
		// }).catch((err) => {
		// 	console.log(err);
		// });


		setTimeout(() => {
			axios.post("/gather/sub/responses", {
				email: this.props.email
			}).then((res) => {
				console.log(res.data);
			}).catch((err) => {
				console.log(err);
			});

			chatClient.setUser({
			   id: this.props.username,
			   name: this.props.username,
			   image: this.props.image
			}, this.props.token);

			this.setState({
				ready: true,
				getStreamReady: true
			})
		}, 500);

	}
	gatherUserInformation = (channel) => {
		console.log("clicked...", channel);

		this.setState({
			channel,
			leaveStream: true
		})
	}
	handleMessageSend = () => {

		const { channel, message, endpoint } = this.state;

		if (channel && message.length > 0) {
			console.log("worked! sending message.");

			// logic goes here... 
			axios.post("/reply/private/message/sender", {
				email: channel.sender,
				message: message,
				uuid: channel.id
			}).then((res) => {
				console.log(res.data);
			}).catch((err) => {
				console.log(err);
			});


			axios.post("/reply/private/message/reciever", {
				email: channel.reciever,
				message: message,
				uuid: channel.id
			}).then((res) => {
				console.log(res.data);
			}).catch((err) => {
				console.log(err);
			})
		   
			this.setState({
				message: ""
			})
		} else {
			alert("Please enter text before attempting to send a new message...");
		}
	}

	renderConditional = () => {
		if (this.state.channel && this.state.leaveStream) {
			return (
				<div class="col-md-12 col-xl-12 chat">
					<div class="card">
						<div class="card-header msg_head">
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img"/>
									<span class="online_icon"></span>
								</div>
								<div class="user_info">
									<span>{this.state.channel ? this.state.channel.author : "Unknown user."}</span>
									<p>1767 Messages</p>
								</div>
								<div class="video_cam">
									<span><i class="fas fa-video"></i></span>
									<span><i class="fas fa-phone"></i></span>
								</div>
							</div>
							<span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
							<div class="action_menu">
								<ul>
									<li><i class="fas fa-user-circle"></i> View profile</li>
									<li><i class="fas fa-users"></i> Add to close friends</li>
									<li><i class="fas fa-plus"></i> Add to group</li>
									<li><i class="fas fa-ban"></i> Block</li>
								</ul>
							</div>
						</div>
						<div class="card-body msg_card_body">
						{this.state.channel ? <div class="d-flex justify-content-start mb-4">
							<div class="img_cont_msg">
								<img src={this.state.channel.image} class="rounded-circle user_img_msg"/>
							</div>
							<div class="msg_cotainer text-left">
								{this.state.channel.message} <br/>
								<div style={{ fontSize: "0.5rem" }}>{this.state.channel.date}</div>
							</div>

						</div> : null}
							{this.state.replies ? this.state.replies.map((reply, index) => {
								console.log("single reply :", reply);
								{/*if (message.channelUrl === this.state.channel.url) {
									console.log("WORKED!!!");
									if (message._sender.nickname === this.props.username) {
										console.log("CORRECT :", message);
										return (
											<div class="d-flex justify-content-start mb-4">
												<div class="img_cont_msg">
													<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
												</div>
												<div class="msg_cotainer">
													{message.message}
													<span class="msg_time">8:40 AM, Today</span>
												</div>
											</div>
											
										);
									} else {
										console.log("else ran", message);
										return (
											<div class="d-flex justify-content-end mb-4">
												
												<div style={{ backgroundColor: "#dcf8c6" }} class="msg_cotainer">
													{message.message}
													<span class="msg_time">8:40 AM, Today</span>
												</div>
												<div class="img_cont_msg">
													<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
												</div>
											</div>
											
										);
									}
								}*/}
							}) : console.log("NOTHING HAPPENED - UH-OH.")}

						</div>
						<div class="card-footer">
							<div class="input-group">
								<div class="input-group-append">
									<span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
								</div>
								<textarea style={{ color: "white" }} onChange={(e) => {
									this.setState({
										message: e.target.value
									})
								}} value={this.state.message} name="" class="form-control type_msg" placeholder="Type your message..."></textarea>
								<div onClick={() => {
									this.handleMessageSend();
								}} class="input-group-append">
									<span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
			<>
				<div class="row h-100 custom_row">
							<div class="col-md-6 col-xl-6 chat"><div class="card mb-sm-3 mb-md-0 contacts_card">
								<div class="card-header">
									<div class="input-group">
										<input type="text" placeholder="Search..." name="" class="form-control search"/>
										<div class="input-group-prepend">
											<span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
										</div>
									</div>
								</div>
								<div class="card-body contacts_body">
									<ul class="contacts">
										{this.state.ready && this.state.channels ? this.state.channels.map((channel, index) => {
											console.log(channel);
											return (
												<li style={{ overflowX: "scroll" }} key={index} onClick={() => {
													this.setState({
														channel
													}, () => {
														this.gatherUserInformation(channel);
													})
												}} class="active">
													<div class="d-flex bd-highlight">
														<div class="img_cont">
															<img src={channel.image} class="rounded-circle user_img"/>
															<span class="online_icon"></span>
														</div>
														<div class="user_info">
															<span>{channel.author}</span>
															
														</div>
													</div>
												</li>
											);
										}) : null}
									
									</ul>
								</div>
							<div class="card-footer"></div>
						</div>
					</div>
				
				<div className="col-md-6 col-xl-6">
					<div class="card">
						<div class="card-header msg_head">
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img"/>
									<span class="online_icon"></span>
								</div>
								<div class="user_info">
									<span>No User Selected...</span>
									<p>0 Messages</p>
								</div>
								<div class="video_cam">
									<span><i class="fas fa-video"></i></span>
									<span><i class="fas fa-phone"></i></span>
								</div>
							</div>
							<span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
							<div class="action_menu">
								<ul>
									<li><i class="fas fa-user-circle"></i> View profile</li>
									<li><i class="fas fa-users"></i> Add to close friends</li>
									<li><i class="fas fa-plus"></i> Add to group</li>
									<li><i class="fas fa-ban"></i> Block</li>
								</ul>
							</div>
						</div>
						
						<div class="card-footer">
							<div class="input-group">
								<div class="input-group-append">
									<span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
								</div>
								<textarea name="" class="form-control type_msg" placeholder="Type your message..."></textarea>
								<div class="input-group-append">
									<span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
				</div>
			</>
			);
		}
	}
	componentDidUpdate(prevProps, prevState) {
		console.log(prevProps);
		console.log(prevState);
		if (prevState.enterChannel !== this.state.enterChannel) {
			console.log("DOESN'T EQUAL - RUN CONDITION.");
		}

	}
	exitChannel = () => {
		console.log("exit channel clicked...");

		this.setState({
			channel: null,
			leaveStream: false
		})
	}

    render() {
    	console.log(this.state);
        return (
            <div>
				<Navigation />
	
				{/*	<div class="container-fluid h-100" style={{ margin: "40px 10px" }}>
					{this.state.leaveStream ? <button onClick={() => {
						this.exitChannel();
					}} className="btn btn-outine pink_button" style={{ padding: "4px 10px", width: "100%", marginBottom: "40px" }}>LEAVE CHANNEL AND RETURN TO MESSAGES</button> : null}
						{this.renderConditional()}
					</div>*/}
					  {this.state.getStreamReady && this.props.username ? <Chat client={chatClient} theme={'messaging dark'}>
						<ChannelList
					      filters={{ type: 'messaging', members: { $in: [this.props.username] } }}
					      sort={{ last_message_at: -1 }}
					    />
					    <Channel>
					      <Window>
					        <ChannelHeader />
					        <MessageList />
					        <MessageInput />
					      </Window>
					      <Thread fullWidth />
					    </Channel>
					  </Chat> : <h1 className="text-center">loading...</h1>}
				<Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		email: state.auth.data.email,
		username: state.auth.data.username,
		token: state.token.token,
		getStreamUser: state.getStream.data
	}
}

export default connect(mapStateToProps, { setGetStreamUser })(ChatSendbirdHomepage);

