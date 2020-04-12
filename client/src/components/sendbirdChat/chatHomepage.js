import React, { Component } from 'react';
import Navigation from "../navigation/index.js";
import { connect } from "react-redux";
import { getOpenChannelList } from "../../actions/channels.js";
import { sbCreateOpenChannelListQuery, sbOpenChannelEnter } from "../../actions/sendbird/openChannel.js";
import './css/chatHomepage.css';
import Footer from "../common/footer/footer.js";
import { onOpenChannelPress, channelExit } from "../../actions/channels.js";
import axios from "axios";
import _ from "underscore";

class ChatSendbirdHomepage extends Component {
constructor(props) {
    super(props);

	this.state = {
		openChannelListQuery: null,
		target: "",
		user: "Jeremy Blong",
		channel: null,
		enterChannel: false,
		channels: [],
		ready: false,
		intersection: [],
		leaveStream: false
	}
}
	componentDidMount() {

		setTimeout(() => {
			const openChannelListQuery = sbCreateOpenChannelListQuery();
		        this.setState({ 
		        	openChannelListQuery 
		        }, () => {
	            	this.props.getOpenChannelList({
		            	openChannelListQuery: this.state.openChannelListQuery,
		            	userId: this.props.userID
		        	});

					axios.post("/gather/personal/channels", {
						email: this.props.email
					}).then((res) => {
						console.log(res.data);
						for (let key in res.data) {
							let channels = res.data[key].channels;
						
							console.log(this.state.channels);
							console.log(this.props.channels);
							for (var i = 0; i < channels.length; i++) {
								let channel = channels[i].channel;
								console.log(channel);
								this.setState({
									channels: [...this.state.channels, channel]
								})
							}
							
						}
						console.log(this.props.channels);
						console.log(this.state.channels);
						let intersection = _.difference(this.state.channels, this.props.channels);

						this.setState({
							intersection,
							ready: true
						}, () => {
							console.log(this.state.intersection)
						})
					}).catch((err) => {
						console.log(err);
					});
					
	        });

		}, 500);
	}
	gatherUserInformation = (channel) => {
		console.log("clicked...", channel);
	    this.setState({ 
      		enterChannel: true,
      		leaveStream: true,
      		channel
  	    }, () => {
       		this.props.onOpenChannelPress(channel.url);
			for (var i = 0; i < this.props.channels.length; i++) {
				let chan = this.props.channels[i];
				console.log(chan);
				if (chan.url === channel.url) {
					console.log("match!");
       				this.props.sbOpenChannelEnter(chan);
       			}
			}
        });
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
									<span>Chat with {this.state.channel ? this.state.channel.name : "Unknown user."}</span>
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
							<div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
								</div>
								<div class="msg_cotainer">
									Hi, how are you samim?
									<span class="msg_time">8:40 AM, Today</span>
								</div>
							</div>
							<div class="d-flex justify-content-end mb-4">
								<div class="msg_cotainer_send">
									Hi Khalid i am good tnx how about you?
									<span class="msg_time_send">8:55 AM, Today</span>
								</div>
								<div class="img_cont_msg">
							<img src={require("../../images/sex-3.jpg")} class="rounded-circle user_img_msg"/>
								</div>
							</div>
							<div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
								</div>
								<div class="msg_cotainer">
									I am good too, thank you for your chat template
									<span class="msg_time">9:00 AM, Today</span>
								</div>
							</div>
							<div class="d-flex justify-content-end mb-4">
								<div class="msg_cotainer_send">
									You are welcome
									<span class="msg_time_send">9:05 AM, Today</span>
								</div>
								<div class="img_cont_msg">
							<img src={require("../../images/sex-2.jpg")} class="rounded-circle user_img_msg"/>
								</div>
							</div>
							<div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
								</div>
								<div class="msg_cotainer">
									I am looking for your next templates
									<span class="msg_time">9:07 AM, Today</span>
								</div>
							</div>
							<div class="d-flex justify-content-end mb-4">
								<div class="msg_cotainer_send">
									Ok, thank you have a good day
									<span class="msg_time_send">9:10 AM, Today</span>
								</div>
								<div class="img_cont_msg">
						<img src={require("../../images/sex-1.jpg")} class="rounded-circle user_img_msg" />
								</div>
							</div>
							<div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
								</div>
								<div class="msg_cotainer">
									Bye, see you
									<span class="msg_time">9:12 AM, Today</span>
								</div>
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
			);
		} else {
			return (
			<>
				<div class="row h-100 custom_row">
							<div class="col-md-4 col-xl-4 chat"><div class="card mb-sm-3 mb-md-0 contacts_card">
								<div class="card-header">
									<div class="input-group">
										<input type="text" placeholder="Search..." name="" class="form-control search"/>
										<div class="input-group-prepend">
											<span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
										</div>
									</div>
								</div>
								<div class="card-body contacts_body">
									<ui class="contacts">
										{this.state.ready && this.state.intersection ? this.state.intersection.map((channel, index) => {
											console.log(channel);
											return (
												<li key={index} onClick={() => {
													this.setState({
														channel
													}, () => {
														this.gatherUserInformation(channel);
													})
												}} class="active">
													<div class="d-flex bd-highlight">
														<div class="img_cont">
															<img src={channel.coverUrl} class="rounded-circle user_img"/>
															<span class="online_icon"></span>
														</div>
														<div class="user_info">
															<span>{channel.name}</span>
															<p>Kalid is online</p>
														</div>
													</div>
												</li>
											);
										}) : null}
									
									</ui>
								</div>
							<div class="card-footer"></div>
						</div>
					</div>
				
				<div className="col-md-8 col-xl-8">
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
	exitChannel = () => {
		console.log("exit channel clicked...");
		this.props.channelExit(this.state.channel.url, this.state.channel.channelType);

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
	
					<div class="container-fluid h-100" style={{ margin: "40px 10px" }}>
					{this.state.leaveStream ? <button onClick={() => {
						this.exitChannel();
					}} className="btn btn-outine pink_button" style={{ padding: "4px 10px", width: "100%", marginBottom: "40px" }}>LEAVE CHANNEL AND RETURN TO MESSAGES</button> : null}
						{this.renderConditional()}
					</div>
				<Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		userID: state.login.user ? state.login.user.userId : "unknown",
		channels: state.openChannelReducer.list,
		email: state.auth.data.email
	}
}

export default connect(mapStateToProps, { 
	getOpenChannelList, 
	sbCreateOpenChannelListQuery, 
	onOpenChannelPress, 
	sbOpenChannelEnter, 
	channelExit
})(ChatSendbirdHomepage);

