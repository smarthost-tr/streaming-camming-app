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
import WavFile from "../../assets/cash.wav";
import Casino from "../../assets/casino.wav";
import Game from "../../assets/game.wav";
import RewardTwo from "../../assets/reward-2.wav";
import WinMoney from "../../assets/win-money.wav";
import Yay from "../../assets/yay.mp3";
import ConfettiAnimation from "./animations/confetti.js";
import videojs from 'video.js';
import { withRouter } from "react-router-dom";

const config = {
    server: {
        secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc'
    },
    rtmp_server: {
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 60,
            ping_timeout: 30
        },
        http: {
            port: 8888,
            mediaroot: './server/media',
            allow_origin: '*'
        },
        trans: {
            ffmpeg: '/usr/local/bin/ffmpeg',
            tasks: [
                {
                    app: 'live',
                    hls: true,
                    hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                    dash: true,
                    dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
                }
            ]
        }
    }
};

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : "black"
  }
};

const client = new StreamChat('qzye22t8v5c4');

const socket = io('http://localhost:5000', {
	transport: ['websocket']
});

let live_stream_id, channel;


class StreamShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	streams: [],
    	streamsReady: false,
    	APISuccess: false,
    	err: "",
    	streamIsReady: false,
    	ready: false,
    	tip: 0,
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
		setUser: null,
		sound: false,
		confetti: false,
		corner: false,
		confettiHide: false,
		lovenseID: "",
		url: "",
		httpPort: 0,
		stream: false,
        videoJsOptions: null,
        streamIsActive: true,
        fireSocket: false,
        warning: ""
    }	
}

	componentDidMount() {
		window.addEventListener('scroll', this.listenScrollEvent);

		window.scrollTo(0, 0);

		document.getElementById("fun-poof").style.display = "none";
		document.getElementById("lovense").style.display = "none";
		document.getElementById("not-connected").style.display = "none";

		console.log(this.props);

		// axios.get('/user', {
  //           params: {
  //               username: this.props.username
  //           }
  //       }).then(res => {
  //       	console.log(res);
  //           this.setState({
  //               stream: true,
  //               videoJsOptions: {
  //                   autoplay: false,
  //                   controls: true,
  //                   sources: [{
  //                       src: 'http://127.0.0.1:' + config.rtmp_server.http.port + '/live/' + res.data.stream_key + '/index.m3u8',
  //                       type: 'application/x-mpegURL'
  //                   }],
  //                   fluid: true,
  //               }
  //           }, () => {
  //               this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
  //                   console.log('onPlayerReady', this)
  //               });
  //           });
  //       }).catch((err) => {
  //       	console.log(err);
  //       })
		
		let username, passedPropsStreamID;

		setTimeout(() => {
			
			console.log("this.props.location.state", this.props.location.state);

			if (this.props.location.state === undefined) {
				this.props.history.push("/");
			} else {
				passedPropsStreamID = this.props.location.state.streamID
			}
			axios.post("/gather/user/info/from/stream", {
				id: passedPropsStreamID
			}).then((res) => {
				for (let key in res.data) {
					const last_stream = res.data[key].streams[res.data[key].streams.length - 1].active;
					console.log(last_stream);
					username = res.data[key].username;
					this.setState({
						username,
						exists: true,
						userData: res.data,
						fireSocket: last_stream
					})
				}
				if (res.data) {
					axios.post("/gather/lovense/toyID", {
						username
					}).then((res) => {
						console.log(res.data);
						this.setState({
							lovenseID: res.data.profile.lovenseDeviceID
						})
					}).catch((err) => {
						console.log(err);
					})

					axios.get("https://api.lovense.com/api/lan/getToys").then((res) => {
						console.log(res.data);
						const isEmpty = (obj) => {
						    for(var prop in obj) {
						        if(obj.hasOwnProperty(prop)) {
						            const keys = Object.keys(res.data)[0];
									const target = res.data["127-0-0-1.lovense.club"];
									this.setState({
										url: keys,
										httpPort: target.httpPort,
										streamIsReady: true
									})
						        	console.log("outcome - is empty:", false);
						        }
						        console.log("outcome - is empty:", true);
						    }
						}
						isEmpty(res.data);
					}).catch((err) => {
						console.log(err);
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

				channel = client.channel('livestream', passedPropsStreamID, {
				  image: 'https://goo.gl/Zefkbx',
				  name: `PUBLIC STREAM RECORD: ${passedPropsStreamID}`,
				});
			} else {
				this.setState({
					col: 12
				})
			}

		    axios.post("/get/user", {
		        email: this.props.email
		    }).then((res) => {
		        const publicKey = res.data.blockPublicKey;
		        axios.get(`/address/${publicKey}`).then((res) => {
		          console.log(res.data);
		          this.setState({
		            tokens: res.data.addressData.addressBalance
		          })
		        }).catch((err) => {
		          console.log(err);
		        })
		      }).catch((err) => {
		        console.log(err);
		    })

			this.setState({
				ready: true
			});
		}, 500)


		const unique = uuid();

		live_stream_id = this.props.location.state ? passedPropsStreamID : "QfWl200mvXbD4MQKbMe13CvB7ubl52q97";

	}
	checkStreamActive = (e) => {
		e.preventDefault();
		console.log("clicked...");
	}
	renderContent = () => {
		const { streamIsReady, fireSocket } = this.state;

		if (fireSocket === false) {
			return (
				<div className="container">
					<div className="col-md-12 col-lg-12">
						<h1 className="text-center" style={{ textDecoration: "underline", paddingTop: "30px" }}>Stream is unavaliable...</h1>
						<button style={{ marginTop: "40px", width: "100%" }} onClick={this.checkStreamActive} className="btn btn-outline-warning">Check if stream is active</button>
					</div>
				</div>
			);
		} else {
			return (
				<div className="container-fluid">
					<div className="row">
				        {/* Other elements can be in between `StickyContainer` and `Sticky`,
				        but certain styles can break the positioning logic used. */}
				        
				           
						        <div id="vid_container" style={{ marginLeft: "20px", boxShadow: "5px 5px 5px #871eff" }}>
									<ReactPlayer playing={true} id={this.state.corner ? "corner_me" : "no-corner"} playing={true} style={{ backgroundColor: "black" }} url={'http://127.0.0.1:' + config.rtmp_server.http.port + '/live/' + this.props.location.state.stream_key + '/index.m3u8'} controls width="100%" height="100%" />

									{/*{this.state.stream ? (
				                        <div data-vjs-player>
				                            <video id={this.state.corner ? "corner_me" : "no-corner"} playing={true} controls width="100%" height="100%" className="video-js vjs-big-play-centered"/>
				                        </div>
				                    ) : ' Loading ... '}	*/}		        		
								</div>
				           
				         
						 {this.state.ready ?  <div id="chattt"><Chat client={client} theme={'livestream dark'}>
						    <Channel channel={channel} Message={MessageLivestream}>
						      <Window hideOnThread>
						        <ChannelHeader live />
						        <MessageList />
						       	<MessageInput Input={MessageInputSmall} focus />
						      </Window>
						      <Thread fullWidth />
						    </Channel>
						  </Chat></div> : null}
					</div>
				</div>
			);
		}
	}
	componentWillUnmount() {
		console.log("unmounted...");
	    this.props.setUserGetStream(false);
	    client.disconnect();
	}
	sendTip = () => {
		const passedPropsStreamID = this.props.location.state.streamID;

		const { tip } = this.state;

		axios.post("/gather/user/info/from/stream", {
			id: passedPropsStreamID
		}).then((res) => {
			for (let key in res.data) {
				console.log(res.data);
				const recieverEmail = res.data[key].email;
				const recieverUsername = res.data[key].username;
				const streamer = res.data[key].username;
				const publicKey = res.data[key].blockPublicKey;

				const { tip } = this.state;

				console.log("calculation Math.round(tip) * 0.60 : ", Math.round(tip) * 0.60);
				
				const result = (60 / 100) * Math.round(tip);

				axios.post("/transaction/broadcast", {
					amount: result, 
					sender: this.props.publicKey, 
					recipient: publicKey
				}).then((res) => {
					console.log(res);
					if (res) {
						const { endpoint, tip, url, httpPort, lovenseID } = this.state;

					    socket.emit("tipped", {
					    	tip,
					    	user: this.props.username
					    });

					    socket.emit("tip-record", {
					    	message: `${this.props.username} just tipped ${this.state.tip} tokens!`,
					    	generatedID: uuid()
					    })
        
    					socket.emit("sound", {
    						sound: true,
    						tip
    					});

    					if (tip >= 2000) {
    						socket.emit("confetti", {
    							confetti: true
    						})
							
							setTimeout(() => {
								socket.emit("confetti", {
	    							confetti: false
	    						})
							}, 13000);

    					}

						alert(`You tipped ${this.state.tip} tokens!`);

						this.setState({
							tip: "",
							tokens: this.state.tokens - tip
						})
					}
				}).catch((err) => {
					console.log(err);
				})

				const sendToMainResult = (40 / 100) * Math.round(tip);

				axios.post("/transaction/broadcast", {
					amount: sendToMainResult, 
					sender: this.props.publicKey, 
					recipient: "04b768b0b7e02be5e05912c4479acd8e4a6e730e1eaa39e50e412bd22ed676f9360a52741f21a3bc9eed2f6a75b3fb70ff58fb5c1a60fc418541f01c6f18a1dab4"
				}).then((res) => {
					console.log(res);
				}).catch((err) => {
					console.log(err);
				})

			}
		}).catch((err) => {
			console.log(err);
			alert("Uh oh - There was an error.")
		})
	}
	componentDidUpdate(prevProps, prevState) {

		window.addEventListener('scroll', this.listenScrollEvent);

		console.log(prevState);
		if (prevState.sound !== false) {
			socket.emit("sound", {
				sound: true
			})
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

		const passedPropsStreamID = this.props.location.state.streamID;

		const generated = uuid();

		const secondID = uuid();

		console.log("creating live stream...!", passedPropsStreamID);

		axios.post("/gather/user/info/from/stream", {
			id: passedPropsStreamID
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
				// this.props.history.push(`/chat/homepage`);
				alert("You just sent the streamer a private stream request, please let them know you sent the request! You can also directly chat with the streamer through the channel created.")
			}, 1500);


		}).catch((err) => {
			console.log(err);
			alert("Uh oh - There was an error.")
		});

	}
	endStream = () => {
		const passedPropsStreamID = this.props.location.state.streamID;

		let config = {
		  headers: {
		      'Content-Type': 'application/json;charset=UTF-8',
		      "Access-Control-Allow-Origin": "*",
		  }
		}
		this.setState({
			warning: "You will need to close the stream in OBS before the stream officially ends - it is then added to your profile videos..."
		})
		console.log("end stream clicked.", passedPropsStreamID);
		axios.post("/complete/stream/rtmp", {
			id: passedPropsStreamID,
		}, config).then((res) => {
			console.log(res.data);
			if (res.data.message === "Success") {
				this.setState({
					streamIsActive: false,
					fireSocket: false
				});
				socket.emit("endStream", {
			    	ended: false
			    });

			    alert("You successfully ended this stream! It will no longer be active or displayed. You may now stop the stream in OBS...");
			}
		}).catch((err) => {
			console.log(err);
		})
	}
	// playAudio = () => {
	// 	if (this.state.sound) {
	// 		document.getElementById("audio").play();
	// 		this.setState({
	// 			sound: false
	// 		})
	// 	}
	// }
	renderEndOfStream = () => {

		const { fireSocket } = this.state;

		if (fireSocket) {
			socket.on("end", (data) => {
				console.log('data', data);
				this.setState({
					fireSocket: data.ended
				})
			});
		}
	}
	renderCustomModal = () => {
		if (this.state.modalIsOpen) {
			return (
				<div>
					<Modal id="modalll"
			          isOpen={this.state.modalIsOpen}
			          style={customStyles}
			          contentLabel="Example Modal"
			        >
					

						    <div class="modal-dialog modal-md" role="document">
						        <div class="modal-content" id="modal_content">
						            <div class="modal-body">
										<div class="top-strip"></div>
						                <a class="h2" style={{ color: "#37be43" }} href="/" target="_blank">Jerk N' Squirtn</a>
						                <h3 class="pt-5 mb-0 text-white">Are you sure you'd like to start a live stream?</h3>
						                <p class="pb-1 text-white"><small>This will cost you roughly 20 tokens per minute</small></p>
						                <form>
						                    <div class="input-group mb-3 w-75 mx-auto">
						    				  
						    				  <div class="input-group-append">
						    					<button onClick={() => {
						    						this.createPrivateStream();
						    					}} style={{ width: "100%", color: "white" }} class="btn btn-outline aqua_button_custom" type="button" id="button-addon2"><i class="fa fa-paper-plane"></i>START LIVE 1 ON 1 STREAM</button>
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
						                }} className="btn btn-outline aqua_button_custom">Cancel</button>
										<div class="bottom-strip"></div>
						            </div>
						        </div>
						    </div>
					
			        </Modal>
				</div>
			);
		}
	}					
	webSock = () => {

		const { url, httpPort, tip, lovenseID } = this.state;

		let finished = false;

		socket.on("boom", (data) => {
			console.log('data', data);
			if (data.tip <= 20) {
				document.getElementById("audio").play();
				if (lovenseID && httpPort !== 0) {
					axios.get(`http://${url}:${httpPort}/Vibrate?v=20&t=${lovenseID}`).then((res) => {
						console.log(res.data);
						if (res.data.data === "Toy Not Connect") {
							document.getElementById("not-connected").style.display = "block";
							setTimeout(() => {
								document.getElementById("not-connected").style.display = "none";
							}, 3000);
						} else if (res.data.code === 200) {
							document.getElementById("lovense").style.display = "block";
							setTimeout(() => {
								document.getElementById("lovense").style.display = "none";
								axios.get(`http://${url}:${httpPort}/Vibrate?v=0&t=${lovenseID}`).then((res) => {
									console.log(res.data);
								}).catch((err) => {
									console.log(err);
									if (err) {
										alert("An unknown error occurred... Please try again.");
									}
								})
							}, 2500);
						}
					}).catch((err) => {
						console.log(err);
					});
				}
			} else if (data.tip <= 50) {
				document.getElementById("audio").play();
				if (lovenseID && httpPort !== 0) {
					axios.get(`http://${url}:${httpPort}/Vibrate?v=20&t=${lovenseID}`).then((res) => {
						console.log(res.data);
						if (res.data.data === "Toy Not Connect") {
							document.getElementById("not-connected").style.display = "block";
							setTimeout(() => {
								document.getElementById("not-connected").style.display = "none";
							}, 3000);
						} else if (res.data.code === 200) {
							document.getElementById("lovense").style.display = "block";
							setTimeout(() => {
								document.getElementById("lovense").style.display = "none";
								axios.get(`http://${url}:${httpPort}/Vibrate?v=0&t=${lovenseID}`).then((res) => {
									console.log(res.data);
								}).catch((err) => {
									console.log(err);
									if (err) {
										alert("An unknown error occurred... Please try again.");
									}
								})
							}, 4000);
						}
					}).catch((err) => {
						console.log(err);
					})
				}
			} else if (data.tip <= 100) {
				document.getElementById("casino-file").play();
				if (lovenseID && httpPort !== 0) {
					axios.get(`http://${url}:${httpPort}/Vibrate?v=20&t=${lovenseID}`).then((res) => {
						console.log(res.data);
						if (res.data.data === "Toy Not Connect") {
							document.getElementById("not-connected").style.display = "block";
							setTimeout(() => {
								document.getElementById("not-connected").style.display = "none";
							}, 3000);
						} else {
							document.getElementById("lovense").style.display = "block";
							setTimeout(() => {
								document.getElementById("lovense").style.display = "none";
								axios.get(`http://${url}:${httpPort}/Vibrate?v=0&t=${lovenseID}`).then((res) => {
									console.log(res.data);
								}).catch((err) => {
									console.log(err);
									if (err) {
										alert("An unknown error occurred... Please try again.");
									}
								})
							}, 5500);
						}
					}).catch((err) => {
						console.log(err);
					})
				}
			} else if (data.tip <= 300) {
				document.getElementById("game-file").play();
				if (lovenseID && httpPort !== 0) {
					axios.get(`http://${url}:${httpPort}/Vibrate?v=20&t=${lovenseID}`).then((res) => {
						console.log(res.data);
						if (res.data.data === "Toy Not Connect") {
							document.getElementById("not-connected").style.display = "block";
							setTimeout(() => {
								document.getElementById("not-connected").style.display = "none";
							}, 3000);
						} else {
							document.getElementById("lovense").style.display = "block";
							setTimeout(() => {
								document.getElementById("lovense").style.display = "none";
								axios.get(`http://${url}:${httpPort}/Vibrate?v=0&t=${lovenseID}`).then((res) => {
									console.log(res.data);
								}).catch((err) => {
									console.log(err);
									if (err) {
										alert("An unknown error occurred... Please try again.");
									}
								})
							}, 8500);
						}
					}).catch((err) => {
						console.log(err);
					})
				}
			} else if (data.tip <= 500) {
				document.getElementById("reward-two-file").play();
				if (lovenseID && httpPort !== 0) {
					axios.get(`http://${url}:${httpPort}/Vibrate?v=20&t=${lovenseID}`).then((res) => {
						console.log(res.data);
						if (res.data.data === "Toy Not Connect") {
							document.getElementById("not-connected").style.display = "block";
							setTimeout(() => {
								document.getElementById("not-connected").style.display = "none";
							}, 3000);
						} else {
							document.getElementById("lovense").style.display = "block";
							setTimeout(() => {
								document.getElementById("lovense").style.display = "none";
								axios.get(`http://${url}:${httpPort}/Vibrate?v=0&t=${lovenseID}`).then((res) => {
									console.log(res.data);
								}).catch((err) => {
									console.log(err);
									if (err) {
										alert("An unknown error occurred... Please try again.");
									}
								})
							}, 12500);
						}
					}).catch((err) => {
						console.log(err);
					})
				}
			} else if (data.tip <= 1000) {
				document.getElementById("win-money").play();
				if (lovenseID && httpPort !== 0) {
					axios.get(`http://${url}:${httpPort}/Vibrate?v=20&t=${lovenseID}`).then((res) => {
						console.log(res.data);
						if (res.data.data === "Toy Not Connect") {
							document.getElementById("not-connected").style.display = "block";
							setTimeout(() => {
								document.getElementById("not-connected").style.display = "none";
							}, 3000);
						} else {
							document.getElementById("lovense").style.display = "block";
							setTimeout(() => {
								document.getElementById("lovense").style.display = "none";
								axios.get(`http://${url}:${httpPort}/Vibrate?v=0&t=${lovenseID}`).then((res) => {
									console.log(res.data);
								}).catch((err) => {
									console.log(err);
									if (err) {
										alert("An unknown error occurred... Please try again.");
									}
								})
							}, 15000);
						}
					}).catch((err) => {
						console.log(err);
					});
				}
			} else if (data.tip <= 1500) {
				document.getElementById("yay-file").play();
				if (lovenseID && httpPort !== 0) {
					axios.get(`http://${url}:${httpPort}/Vibrate?v=20&t=${lovenseID}`).then((res) => {
						console.log(res.data);
						if (res.data.data === "Toy Not Connect") {
							document.getElementById("not-connected").style.display = "block";
							setTimeout(() => {
								document.getElementById("not-connected").style.display = "none";
							}, 3000);
						} else {
							document.getElementById("lovense").style.display = "block";
							setTimeout(() => {
								document.getElementById("lovense").style.display = "none";
								axios.get(`http://${url}:${httpPort}/Vibrate?v=0&t=${lovenseID}`).then((res) => {
									console.log(res.data);
								}).catch((err) => {
									console.log(err);
									if (err) {
										alert("An unknown error occurred... Please try again.");
									}
								})
							}, 30000);
						}
					}).catch((err) => {
						console.log(err);
					})
				}
			}		
		});
		socket.on("poof", (data) => {
			console.log("BOOYAH :", data);
			if (data.confetti === true) {
				document.getElementById("fun-poof").style.display = "block";
				document.getElementById("yay-file").play();
				if (lovenseID && httpPort !== 0) {
					axios.get(`http://${url}:${httpPort}/Vibrate?v=20&t=${lovenseID}`).then((res) => {
						console.log(res.data);
						if (res.data.data === "Toy Not Connect") {
							document.getElementById("not-connected").style.display = "block";
							setTimeout(() => {
								document.getElementById("not-connected").style.display = "none";
							}, 3000);
						} else {
							document.getElementById("lovense").style.display = "block";
							setTimeout(() => {
								document.getElementById("lovense").style.display = "none";
								axios.get(`http://${url}:${httpPort}/Vibrate?v=0&t=${lovenseID}`).then((res) => {
									console.log(res.data);
								}).catch((err) => {
									console.log(err);
									if (err) {
										alert("An unknown error occurred... Please try again.");
									}
								})
							}, 45000);
						}
					}).catch((err) => {
						console.log(err);
					})
				}
			} else {
				document.getElementById("fun-poof").style.display = "none";
			}
		})
	}
  	listenScrollEvent = (e) => {
	    if (window.scrollY > 600) {
	      this.setState({ 
	      	corner: true
	      })
	    } else {
	      this.setState({
	      	corner: false
	      })
	    }
  	}
    render() {
		
    	const { streamsReady, APISuccess, err, streamIsReady } = this.state;

    	console.log(this.state);
        return (
        	<div>
        		<Navigation />
				{this.webSock()}
				<div id="fun-poof">
					<ConfettiAnimation />
				</div>
				
 				<div className="container-fluid" id="fragment_background" style={{ height: "100%", padding: "30px 20px 0px 0px" }}>
 				<div className="mx-auto">
 				{/*{this.state.modalIsOpen ?  : null}*/}

				<audio id="audio"><source src={WavFile} type="audio/mpeg"></source></audio>
				<audio id="casino-file"><source src={Casino} type="audio/mpeg"></source></audio>
				<audio id="game-file"><source src={Game} type="audio/mpeg"></source></audio>
				<audio id="reward-two-file"><source src={RewardTwo} type="audio/mpeg"></source></audio>
				<audio id="win-money"><source src={WinMoney} type="audio/mpeg"></source></audio>
				<audio id="yay-file"><source src={Yay} type="audio/mpeg"></source></audio>
 				</div>
 				{this.renderCustomModal()}

				{this.renderEndOfStream()}

 				{this.props.username ? <div onClick={() => {
 					this.renderModal();
 				}} className="container-fluid">{this.props.username === this.state.username ? null : <button className="btn btn-outline purple_neon_btn" style={{ width: "100%" }}>Start a 1 on 1 PRIVATE stream</button>}</div> : null}
 				
 				{this.props.username === this.state.username ? <div className="mx-auto"><button onClick={() => {
 					this.endStream();
 				}} className="btn btn-outline purple_neon_btn" style={{ width: "100%" }}>END STREAM</button></div> : null}
 				<h1 className="text-red text-left">{this.state.warning.length > 0 ? this.state.warning : null}</h1>
					<div className="row" style={{ margin: "40px 0px" }}>
						<div className="mx-auto">
							{this.props.username ? null : <p className="text-center lead bold" style={{ textDecoration: "underline" }}>You are seeing only a SMALL portion of the avaliable content... please sign-in to join the chat and access all of our restricted features.</p>}
						</div>	
					</div>
					{this.renderContent()}
					
					<div className="container" style={{ paddingBottom: "30px" }}>
					<h4 className="text-center bold">{this.state.groupMessages !== null ? this.state.groupMessages : null}</h4>
					
					{this.props.username ? null : <p className="text-center lead bold" style={{ textDecoration: "underline", paddingBottom: "23px" }}>You are seeing only a SMALL portion of the avaliable content... please sign-in to join the chat and access all of our restricted features.</p>}
					<div id="lovense">
						<h4 className="text-center text-white">Lovense Vibrator Is NOW ACTIVE!</h4>
					</div>
					<div id="not-connected">
						<h4 className="text-center red" style={{ color: "red" }}>Lovense Vibrator is NOT connected - Please connect lovense!</h4>
					</div>
						{(this.state.exists && this.state.username === this.props.username) ? null : <div className="row">
						<label id="label">Enter a tip amount to send to this streamer</label>
							<div class="input-group mb-3">
							  <div class="input-group-prepend">
							    <span style={{ width: "100%", backgroundColor: "#871eff", color: "white" }} class="input-group-text">You have {this.state.tokens} tokens</span>
							  </div>
							  <input value={this.state.tip} onChange={(e) => {
							  	this.setState({
							  		tip: e.target.value,
							  		confetti: false
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
		checkUser: state.getStream.userSet,
		publicKey: state.currency.data.publicKey
	}
}


export default withRouter(connect(mapStateToProps, { setUserGetStream })(StreamShow));