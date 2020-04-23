import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from "../navigation/index.js";
import axios from "axios";
import ReactPlayer from 'react-player';
import ChatMockup from "../messaging/mockup.js";
import { Chat, Channel, ChannelHeader, Window } from 'stream-chat-react';
import { MessageList, MessageInput, MessageLivestream } from 'stream-chat-react';
import { MessageInputSmall, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import uuid from "react-uuid";
import { setUserGetStream } from "../../actions/getStream/index.js";
import "./css/streamShow.css";
import moment from "moment";
import io from "socket.io-client";
import Footer from "../common/footer/footer.js";
import StreamShowSub from "./streamShowSub.js";
import 'stream-chat-react/dist/css/index.css';
import Modal from 'react-modal';

 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const client = new StreamChat('qzye22t8v5c4');

const socket = io('http://127.0.0.1:5000', {
	transport: ['websocket']
});

let live_stream_id, channel;

class StreamShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	streams: [],
    	streamsReady: false,
    	playbackID: null,
    	APISuccess: false,
    	err: "",
    	streamIsReady: false,
    	ready: false,
    	tip: 0,
    	endpoint: "http://127.0.0.1:5000",
    	groupMessages: null,
    	username: "",
    	exists: false,
    	tokens: null,
    	col: 7,
    	userData: [],
    	modalIsOpen: false,
    	playbackID: null,
		streamKey: null,
		streamID: null,
		loaded: null,
		startedStream: null,
		data: [],
		setUser: null
    }

}
	componentDidMount() {

		setTimeout(() => {
			axios.post("/gather/user/info/from/stream", {
				id: this.props.location.state.streamID
			}).then((res) => {
				for (let key in res.data) {
					let username = res.data[key].username;
					this.setState({
						username,
						exists: true,
						userData: res.data
					})
				}
			}).catch((err) => {
				console.log(err);
			})

			
			if (this.props.username) {
				console.log("user is logged in.")
				const userrr = client.setUser({
				    id: this.props.username,
				    name: this.props.username,
				    image: 'https://getstream.io/random_svg/?id=patient-breeze-7&name=Patient+breeze'},
				this.props.token);

				this.setState({
					setUser: userrr
				})

				channel = client.channel('livestream', this.props.location.state.streamID, {
				  image: 'https://goo.gl/Zefkbx',
				  name: `PUBLIC STREAM RECORD: ${this.props.location.state.streamID}`,
				});
			} else {
				this.setState({
					col: 12
				})
			}

		    axios.post("/tokens/gather", {
	          email: this.props.email
	        }).then((res) => {
	          for (let key in res.data) {
	            let tokens = res.data[key].tokens;
	            this.setState({
	              tokens
	            })
	          }
	        }).catch((err) => {
	          console.log(err);
	        })  

			this.setState({
				ready: true
			});
		}, 500)


		const unique = uuid();

		live_stream_id = this.props.location.state ? this.props.location.state.streamID : "QfWl200mvXbD4MQKbMe13CvB7ubl52q97";

		const createLive = async () => {
		  const auth = {
		    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
		    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
		  };
		  const res = await axios.get("https://api.mux.com/video/v1/live-streams/" + live_stream_id, { auth: auth }).catch((error) => {
		    throw error;
		  });
		  const { data } = res.data;
		  if (data.status === "active") {
		  	this.setState({
			  	streams: data,
			  	playbackID: data.playback_ids[0].id,
			  	streamIsReady: true
			});
		  }
		}

		createLive();
	}
	checkStreamActive = (e) => {
		e.preventDefault();

		const createLive = async () => {
		  const auth = {
		    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
		    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
		  };
		  const res = await axios.get("https://api.mux.com/video/v1/live-streams/" + live_stream_id, { auth: auth }).catch((error) => {
		    throw error;
		  });
		  const { data } = res.data;
		  if (data.status === "active") {
		  	this.setState({
			  	streams: data,
			  	playbackID: data.playback_ids[0].id,
			  	streamIsReady: true
			}, () => {
				axios.get(`https://stream.mux.com/${this.state.playbackID}.m3u8`).then((res) => {
					if (res) {
						this.setState({
							streamIsReady: true
						})
					}
				}).catch((err) => {
					this.setState({
						err: err.message
					})
				})
			});
		  } else {
		  	alert("Stream is not yet live, please check again soon...")
		  }
		}

		createLive();
	}
	renderContent = () => {
		const { streamIsReady } = this.state;

		if (!streamIsReady) {
			return (
				<div className="container" style={{ marginLeft: "-200px" }}>
					<div className="col-md-12">
						<h1 className="text-center" style={{ textDecoration: "underline", paddingTop: "30px" }}>Stream is unavaliable, please check back again in a few moments...</h1>
						<button style={{ marginTop: "40px", width: "100%" }} onClick={this.checkStreamActive} className="btn btn-outline-warning">Check if stream is active</button>
					</div>
				</div>
			);
		} else {
			return (
				<React.Fragment>
					<div style={{ marginLeft: "20px", boxShadow: "5px 5px 5px #871eff" }} className={`col-lg-${this.state.col} col-sm-12 col-md-12`}>
						<ReactPlayer playing={true} style={{ backgroundColor: "black" }} url={`https://stream.mux.com/${this.state.playbackID}.m3u8`} controls width="100%" height="100%" />

					</div>
					 {this.state.ready ?  <div className="col-lg-4 col-sm-12 col-md-12"><Chat client={client} theme={'livestream dark'}>
					    <Channel channel={channel} Message={MessageLivestream}>
					      <Window hideOnThread>
					        <ChannelHeader live />
					        <MessageList />
					       	<MessageInput Input={MessageInputSmall} focus />
					      </Window>
					      <Thread fullWidth />
					    </Channel>
					  </Chat></div> : null}
				</React.Fragment>
			);
		}
	}
	componentWillUnmount() {
		console.log("unmounted...");
	    this.props.setUserGetStream(false);
	    client.disconnect();
	}
	sendTip = () => {

		console.log(Math.round(this.state.tip));

		axios.post("/gather/user/info/from/stream", {
			id: this.props.location.state.streamID
		}).then((res) => {
			for (let key in res.data) {
				const recieverEmail = res.data[key].email;
				const recieverUsername = res.data[key].username;
				const streamer = res.data[key].username;
				
				axios.post("/take/away/tokens/tip", {
					email: this.props.email,
					tokens: Math.round(this.state.tip)
				}).then((res) => {

					console.log(res.data);
					if (res.data.error) {
						alert(res.data.error);
					} else {
						axios.post("/send/tokens/to/user", {
							email: recieverEmail,
							tokens: Math.round(this.state.tip)
						}).then(async (res) => {
							console.log(res.data);
							
							const { endpoint, tip } = this.state;

						    const socket = io(endpoint);

						    socket.emit("tipped", {
						    	tip,
						    	user: this.props.username
						    })
	        
	    
							alert(`You tipped ${this.state.tip} tokens!`)
							this.setState({
								tip: 0,
								tokens: this.state.tokens - tip
							})
						}).catch((err) => {
							console.log(err);
							alert("Uh oh - There was an error.")
						})
					}
				}).catch((err) => {
					console.log(err);
					alert("Uh oh - There was an error.")
				})
			}
		}).catch((err) => {
			console.log(err);
			alert("Uh oh - There was an error.")
		})
	}
	renderSocketEmittions = () => {
		socket.on("tip", (data) => {
			console.log(data);
			this.setState({
				groupMessages: `${data.user} just tipped ${data.tip} tokens!`
			})
		})
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.tokens !== this.state.tokens) {
			console.log("updated...");
			axios.post("/tokens/gather", {
	          email: this.props.email
	        }).then((res) => {
	          console.log(res.data);
	          for (let key in res.data) {
	            let tokens = res.data[key].tokens;
	            console.log(tokens);
	            this.setState({
	              tokens
	            })
	          }
	        }).catch((err) => {
	          console.log(err);
	        }) 
		}
	}
	closeModal = () => {

	}
	modalShow = () => {
		if (this.state.modalIsOpen) {
			return (
				<div>
					<Modal id="modalll"
			          isOpen={this.state.modalIsOpen}
			          onRequestClose={this.closeModal}
			          style={customStyles}
			          contentLabel="Example Modal"
			        >
			 

						    <div class="modal-dialog modal-md" role="document">
						        <div class="modal-content" id="modal_content">
						            <div class="modal-body">
										<div class="top-strip"></div>
						                <a class="h2" href="https://www.fiverr.com/sunlimetech/design-and-fix-your-bootstrap-4-issues" target="_blank">Jerk N' Squirtn</a>
						                <h3 class="pt-5 mb-0 text-white">Are you sure you'd like to start a live stream?</h3>
						                <p class="pb-1 text-white"><small>This will cost you roughly 20 tokens per minute</small></p>
						                <form>
						                    <div class="input-group mb-3 w-75 mx-auto">
						    				  
						    				  <div class="input-group-append">
						    					<button onClick={() => {
						    						this.createPrivateStream();
						    					}} style={{ width: "100%", color: "white" }} class="btn btn-outline pink_button" type="button" id="button-addon2"><i class="fa fa-paper-plane"></i>START LIVE 1 ON 1 STREAM</button>
						    				  </div>
						    				</div>
						    			</form>
						                <p class="pb-1 text-white"><small>This is a PRIVATE one on one stream with just you and the streamer only. Most of our users prefer this method of communication!</small></p>
						                <button onClick={() => {
						                	this.setState({
												modalIsOpen: false,
												ready: true,
												col: 7
						                	})
						                }} className="btn btn-outline-danger">Cancel</button>
										<div class="bottom-strip"></div>
						            </div>
						        </div>
						    </div>
					
			        </Modal>
				</div>
			);
		}
	}
	renderModal = () => {
		this.setState({
			modalIsOpen: !this.state.modalIsOpen,
			ready: false,
			col: 12
		});
	}
	createPrivateStream = () => {

		const generated = uuid();

		const secondID = uuid();

		console.log("creating live stream...!", this.props.location.state.streamID);

		axios.post("/gather/user/info/from/stream", {
			id: this.props.location.state.streamID
		}).then((res) => {
			console.log(res.data[0]);

			const user = res.data[0];

			axios.post("/get/stream/mux/id", {
				email: user.email
			}).then(async (response) => {
				console.log(response.data[0].streams[response.data[0].streams.length - 1]);

				const last = response.data[0].streams[response.data[0].streams.length - 1].id;

					console.log("set the user.");
				// client.setUser({
				//     id: this.props.username,
				//     name: this.props.username,
				//     image: 'https://getstream.io/random_svg/?id=patient-breeze-7&name=Patient+breeze'},
				// this.props.token);

				const conversation = client.channel('messaging', `private-1-on-1-stream-info-${generated}`, {
					name: `private-1-on-1-stream-info-${generated}`,
				    members: [this.props.username, user.username],
				});

				await conversation.create();
		                    
				await conversation.sendMessage({
				    text: `Your uniquely generated id to access your private stream between ${this.props.username} and ${user.username} is ${generated}. When you recieve the confirmation message that the host/streamer has started the live stream, use the url below to access the stream... http://localhost:3000/private/live/stream/${last} - You will be notified when the stream is live and ready to be joined...!`
				});


			}).catch((err) => {
				console.log(err);
			})

// this is what should match - 95cfbc77-b5f3-6a36-e06c-6e05d522cb1c
			

			axios.post("/post/private/stream/id/sender", {
				id: generated,
				email: this.props.email,
				urlID: secondID
			}).then((res) => {
				console.log(res.data);
			}).catch((err) => {
				console.log(err);
			})

			axios.post("/post/private/stream/id/reciever", {
				id: generated,
				email: user.email,
				urlID: secondID
			}).then((res) => {
				console.log(res.data);
			}).catch((err) => {
				console.log(err);
			})

			this.setState({
				modalIsOpen: false
			});


			setTimeout(() => {
				this.props.history.push(`/chat/homepage`);
			}, 1500);


		}).catch((err) => {
			console.log(err);
			alert("Uh oh - There was an error.")
		});

	}
	endStream = () => {
		console.log("end stream clicked.");
		axios.put("/complete/stream/mongodb", {
			id: this.props.location.state.streamID,
		}).then(async (res) => {
			console.log(res.data);
			if (res.data) {
				const auth = {
				    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
				    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
				};
				const response = await axios.put(`https://api.mux.com/video/v1/live-streams/${this.props.location.state.streamID}/complete`, {}, { auth: auth }).catch((error) => {
				    throw error;
				});

				console.log(response);

				if (response) {
					alert("Successfully ended stream!")
				}
			
			}
		}).catch((err) => {
			console.log(err);
		})
	}
    render() {
    	const { streamsReady, APISuccess, err, streamIsReady } = this.state;

    	console.log(live_stream_id);
        return (
        	<div>
        		<Navigation />
        		{this.modalShow()}
        		{this.renderSocketEmittions()}
 				<div className="container-fluid" id="fragment_background" style={{ height: "100%", padding: "30px 20px 0px 0px" }}>
 				{this.props.username ? <div onClick={() => {
 					this.renderModal();
 				}} className="container-fluid">{this.props.username === this.state.username ? null : <button className="btn btn-outline purple_neon_btn" style={{ width: "100%" }}>Start a 1 on 1 PRIVATE stream</button>}</div> : null}
 				{this.props.username === this.state.username ? <div className="mx-auto"><button onClick={() => {
 					this.endStream();
 				}} className="btn btn-outline purple_neon_btn" style={{ width: "100%" }}>END STREAM</button></div> : null}
					<div className="row" style={{ margin: "40px 0px" }}>
						<div className="mx-auto">
							{this.props.username ? null : <p className="text-center lead bold" style={{ textDecoration: "underline" }}>You are seeing only a SMALL portion of the avaliable content... please sign-in to join the chat and access all of our restricted features.</p>}
						</div>

						
							<div className="row">
								{this.renderContent()}
							</div>
					
					</div>
					<div className="container" style={{ paddingBottom: "30px" }}>
					<h4 className="text-center bold">{this.state.groupMessages !== null ? this.state.groupMessages : null}</h4>
					{this.props.username ? null : <p className="text-center lead bold" style={{ textDecoration: "underline", paddingBottom: "23px" }}>You are seeing only a SMALL portion of the avaliable content... please sign-in to join the chat and access all of our restricted features.</p>}
						{(this.state.exists && this.state.username === this.props.username) ? null : <div className="row">
						<label id="label">Enter a tip amount to send to this streamer</label>
							<div class="input-group mb-3">
							  <div class="input-group-prepend">
							    <span style={{ width: "100%", backgroundColor: "#871eff", color: "white" }} class="input-group-text">You have {this.state.tokens} tokens</span>
							  </div>
							  <input onChange={(e) => {
							  	this.setState({
							  		tip: e.target.value
							  	})
							  }} style={{ width: "100%" }} placeholder="Enter a whole number tip value..." type="text" class="form-control searchTerm" aria-label="Amount (to the nearest dollar)" />
							  <div class="input-group-append">
							    <button onClick={() => {
							    	if (this.state.tokens !== 0) {
							    		this.sendTip();
							    	} else {
							    		alert("Please enter a tip amount if you'd like to send a tip.")
							    	}
							    }} class="btn btn-outline-secondary green_button_custom" type="button">Send Tip!</button>
							  </div>
							</div>
						</div>}
					</div>
 				</div>
 				<hr className="my-4"/>
 				{this.state.userData.length === 1 ? <StreamShowSub user={this.state.userData} /> : <h1 className="text-center">loading...</h1>}
 				<Footer />
        	</div>
      )
    }
}
const mapStateToProps = (state) => {
	return {
		email: state.auth.data.email,
		token: state.token.token,
		username: state.auth.data.username,
		checkUser: state.getStream.userSet
	}
}


export default connect(mapStateToProps, { setUserGetStream })(StreamShow);