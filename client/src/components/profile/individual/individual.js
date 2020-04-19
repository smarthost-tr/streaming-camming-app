import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import "../css/individual.css";
import { store } from "../../../store/store.js";
import axios from "axios";
import { connect } from "react-redux";
import ReactPlayer from 'react-player';
import DropAComment from "../comments/index.js";
import { Link, withRouter } from "react-router-dom";
import Popover from "react-awesome-popover";
import socketIOClient from "socket.io-client";
import uuid from "react-uuid";
import { StreamChat } from 'stream-chat';

const client = new StreamChat('qzye22t8v5c4');

class ProfilesIndividual extends Component {
constructor(props) {
    super(props);

    this.state = {
    	count: 0,
    	skill: "",
    	talents: [],
    	percentage: 0,
    	skills: [],
    	streams: null,
    	assetIDs: [],
    	process: false,
    	stream_playback_ids: [],
    	error: "",
    	firstWorked: false,
    	friends: [],
    	matches: false,
    	friend: false,
    	usernames: [],
    	streamsDB: [],
    	channelName: "",
    	popover: false,
    	message: "",
    	endpoint: "http://localhost:5000",
    	chatTitle: "",
    	complete: false
    }
}
	addSkillToDB = (e) => {
		e.preventDefault();

		axios.post("/update/skills/percentages", {
			percentage: this.state.percentage,
			skill: this.state.skill,
			email: this.props.email
		}).then((res) => {
			if (res) {
				this.setState({
					percentage: 0,
					skill: ""
				})
				alert("Successfully added a new skill and rating!");
			}
		}).catch((err) => {
			console.log(err)
			if (err) {
				alert("There was an error submitting your new skill and rating...")
			}
		})
	} 
	componentDidMount() {
		axios.post("/gather/skills/profile/page", {
			email: this.props.location.state.user.email
		}).then((res) => {
			this.setState({
				skills: res.data
			});
		}).catch((err) => {
			console.log(err);
		});
		
		setTimeout(() => {
			
			axios.post("/figure/out/if/friends", {
				email: this.props.email
			}).then((res) => {
				console.log(res.data);
				for (let key in res.data) {
					let usernames = res.data[key].friends;
					this.setState({
						usernames
					})
				}
			}).catch((err) => {
				console.log(err);
			});
		}, 300)


	}
	videoApi = () => {
		const user = this.props.location.state.user;

		this.processData();
	}
	processData = () => {
		const user = this.props.location.state.user;
	
		console.log("booyah");
		if (user.streams) {
			return user.streams.map((stream, index) => {
				if (stream.active_asset_id) {
					console.log(stream);
					const asyncReturn = async () => {
						const auth = {
					      username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
					      password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
					    };
					    const param = { 
					  	    "reduced_latency": true, 
						    "playback_policy": "public", 
						    "new_asset_settings": { 
						    	"playback_policy": "public" 
						    } 
					    }
					    const res = await axios.get(`https://api.mux.com/video/v1/assets/${stream.active_asset_id}`, { auth: auth }).catch((error) => {
					   		if (error) {
					   			this.setState({
					   				error: error
					   			})
					   		}
					    });

					    console.log(res);
						if (res) {
							if (res.data.data.playback_ids[0].policy === "public") {
								let stream_playback_ids = res.data.data.playback_ids[0].id;

								this.setState({
							    	stream_playback_ids: [...this.state.stream_playback_ids, stream_playback_ids]
							    })

							    console.log(res.data.data.playback_ids[0].id);
							}
						}

					    this.setState({
					    	complete: true
					    })
					}
					asyncReturn();
				}
			})
		}
	}
	redirectToClip = (id) => {
		console.log("clicked.");

		this.props.history.push(`/profile/streams/individual/${id}`, { id })
	}
	sendFriendRequest = () => {
		const user = this.props.location.state.user;
		console.log("sending friend request...");

		axios.post("/send/friend/request/sender", {
			email: this.props.email,
			sendingID: user._id,
			image: user.image,
			username: user.username
		}).then((res) => {
			console.log(res.data);
			if (res.data) {
				return null;
			}
		}).catch((err) => {
			console.log(err);
		})
		axios.post("/send/friend/request/reciever", {
			receivingEmail: user.email,
			image: this.props.image,
			receivingID: this.props._id,
			username: this.props.username
		}).then((res) => {
			if (res.data) {
				alert("You've successfully sent this person a friend request!")
			}
		}).catch((err) => {
			console.log(err);
		})

		axios.post("/figure/out/if/friends", {
			email: this.props.email
		}).then((res) => {
			console.log(res.data);
			for (let key in res.data) {
				let usernames = res.data[key].friends;
				this.setState({
					usernames
				})
			}
		}).catch((err) => {
			console.log(err);
		});

		this.setState({
			matches: true
		})
	} 
    componentDidUpdate(prevProps, prevState) {
    	let user = this.props.location.state.user;
    	if (user.username) {
    		console.log("let user be as it was...");
    	} else if (user.profile) {
			user = user;
    	} else {
    		user = user[0];
    	}
        if (this.props.location.state.user !== prevProps.location.state.user) {
           	const user = this.props.location.state.user;

           	this.setState({
           		stream_playback_ids: []
           	}, () => {
           		this.processData();
           	});
        }
        if (prevState.usernames !== this.state.usernames) {
        	if (this.state.usernames) {
        		return this.state.usernames.map((username, index) => {
	        		if (username.username === user.username) {
	        			console.log("matches!!!@!!!!!")
	        			this.setState({
	        				matches: true
	        			});
	        		}
	        	})
        	}
        }
    }

    renderRedirectOthers = () => {
    	const user = this.props.location.state.user;

		this.props.history.push(`/others/friends/list/individual/${user.username}`, { user });
    }
    redirectToAsset = (identifier) => {
    	const user = this.props.location.state.user;
		console.log(identifier);

		if (user.streams) {
			return user.streams.map((stream, index) => {
				if (stream.active_asset_id) {
					console.log(stream);
					const asyncReturn = async () => {
						const auth = {
					      username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
					      password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
					    };
					    const res = await axios.get(`https://api.mux.com/video/v1/assets/${stream.active_asset_id}`, { auth: auth }).catch((error) => {
					   		if (error) {
					   			this.setState({
					   				error: error
					   			})
					   		}
					    });
						if (res) {
							let stream_playback_ids = res.data.data.playback_ids[0].id;

							if (stream_playback_ids === identifier) {
								console.log("we have a match", stream);
								this.props.history.push(`/show/individual/asset/profile/page/${stream.active_asset_id}`, { id: stream.active_asset_id });
							}
						}
					}
					asyncReturn();
				}
			})
		}
    	// this.props.history.push(`/show/individual/asset/profile/page/${id}`, { id });
    }
    sendPrivateMessage = async () => {

    	const user = this.props.location.state.user;

    	if (user.username) {
    		
    	} else if (user.profile) {
			user = user;
    	} else {
    		user = user[0];
    	}
    	console.log("clicked");

		const { message } = this.state;
		
		let error;

		const uniqueID = uuid();

		client.setUser({
		   id: this.props.username,
		   name: this.props.username,
		   image: 'https://getstream.io/random_svg/?id=spring-silence-0&name=Spring+silence'
		}, this.props.token);

		const conversation = client.channel('messaging', uniqueID, {
		    name: this.state.chatTitle,
		    image: this.props.image,
		    members: [this.props.username, user.username]
		});

		await conversation.create();
                    
		const response = await conversation.sendMessage({
		    text: message,
		    customField: '123',
		});


    	this.setState({
    		popover: false
    	});
    }
    componentWillUnmount () {
    	console.log("unmounted...");
    	client.disconnect();
    }
    render() {
    	const { message } = this.state;

    	let user = this.props.location.state.user;

    	if (user.username) {
    		
    	} else if (user.profile) {
			user = user;
    	} else {
    		user = user[0];
    	}
   		console.log(user);
    	console.log(this.state);   
        return (
            <div>	
            	<Navigation />
				<div class="container">
				    <div class="row">
				        <div class="col-md-12">
				            <div class="fb-profile-block">
				                <div class="fb-profile-block-thumb cover-container"></div>
				                <div class="profile-img">
				                    <a href="#">
				                        <img src={user.profile ? user.profile.profilePic : user.image} alt="profile-picture" />        
				                    </a>
				                </div>
				                <div class="profile-name">
				                    <h2>{user.username}</h2>
				                </div>
				                
				                <div class="fb-profile-block-menu">
				                    <div class="block-menu">
				                        <ul>
				                            <li><a href="#">Timeline</a></li>
				                            <li><a href="#">about</a></li>
				                            <li><a className="hover" onClick={this.renderRedirectOthers}>Friends</a></li>
				                            <li><a href="#">Photos</a></li>
				                            <li><a href="#">More...</a></li>
				                        </ul>
				                    </div>
				                    <div class="block-menu">
				                        <ul>
				                            <li><a href="#">Timeline</a></li>
				                            <li><a href="#">about</a></li>
				                            <li><a className="hover" onClick={this.renderRedirectOthers}>Friends</a></li>
				                            <li><a href="#">Photos</a></li>
				                            <li><a href="#">More...</a></li>
				                        </ul>
				                    </div>
				                </div>
				            </div>
				        </div>
				    </div>
				</div>
				<div class="wrapper">
				    <div class="container">

				        <div class="wraper">
				          
				            <div class="row user-tabs">
				                <div class="col-lg-6 col-md-9 col-sm-9">
				                    <ul class="nav nav-tabs tabs" style={{ width: "100%" }}>
				                        <li class="active tab" style={{ width: "25%" }}>
				                            <a href="#home-2" data-toggle="tab" aria-expanded="false" class="active">
				                                <span class="visible-xs"><i class="fa fa-home"></i></span>
				                                <span onClick={() => {
				                                	this.setState({
				                                		stream_playback_ids: []
				                                	})
				                                }} class="hidden-xs">About Me</span>
				                            </a>
				                        </li>
				                        <li class="tab" style={{ width: "25%" }}>
				                            <a href="#profile-2" data-toggle="tab" aria-expanded="false">
				                                <span class="visible-xs"><i class="fa fa-user"></i></span>
				                                <span onClick={() => {
				                                	this.setState({
				                                		stream_playback_ids: []
				                                	}, () => {
				                                		this.processData();
				                                	})
				                                }} class="hidden-xs">Videos</span>
				                            </a>
				                        </li>
				                        <li class="tab" style={{ width: "25%" }}>
				                            <a href="#messages-2" data-toggle="tab" aria-expanded="true">
				                                <span class="visible-xs"><i class="fa fa-envelope-o"></i></span>
				                                <span onClick={() => {
				                                	this.setState({
				                                		stream_playback_ids: []
				                                	})
				                                }} class="hidden-xs">Projects</span>
				                            </a>
				                        </li>

				                        {user.email === store.getState().auth.data.email ? <li class="tab" style={{ width: "25%" }}>
				                            <a href="#settings-2" data-toggle="tab" aria-expanded="false">
				                                <span class="visible-xs"><i class="fa fa-cog"></i></span>
				                                <span onClick={() => {
				                                	this.setState({
				                                		stream_playback_ids: []
				                                	})
				                                }} class="hidden-xs">Settings</span>
				                            </a>
				                        </li> : null}

				                        <div class="indicator" style={{ right: "476px", left: "0px" }}></div>
				                        <div class="indicator" style={{ right: "476px", left: "0px" }}></div>

				                    </ul>
				                    
				                </div>
				                <div class="col-lg-6 col-md-3 col-sm-3 hidden-xs">
				                    <div class="pull-right" style={{ float: "right" }}>
				                        {/*<div class="dropdown">
				                            <a data-toggle="dropdown" class="dropdown-toggle btn-rounded btn btn-primary waves-effect waves-light" href="#"> Add Friend <span class="caret"></span></a>
				                            <ul style={{ padding: "10px" }} class="dropdown-menu dropdown-menu-right" role="menu">
				                                <li><Link to="/">Remove from friends list</Link></li>
				                                <li><Link to="/">Private message</Link></li>
				                                <li class="divider"></li>
				                                <li><a href={null} style={{ color: "pink" }} className="link-a" onClick={() => {
				                                	this.sendFriendRequest()
				                                }}>Send a friend request</a></li>
				                            </ul>
				                        </div>*/}
				                       {/* {this.renderFriendRequestButton()}*/}
				                        {this.state.matches || !this.props.email || this.props.email === user.email ? null : <div className="row"><button onClick={() => {
				                            this.sendFriendRequest()
				                        }} className="btn btn-outline pink_button">Send Friend Request</button></div>}
				                        
				                    </div>
				                </div>
				            </div>
				            <div class="row">
				                <div class="col-lg-12">

				                    <div class="tab-content profile-tab-content">
				                        <div class="tab-pane active" id="home-2">
				                            <div class="row">
				                                <div class="col-md-4">
				                                   
				                                    <div class="panel panel-default panel-fill">
				                                    <Popover open={this.state.popover}>
														    <button className="btn btn-outline-info" onClick={() => {
														    	this.setState({
														    		popover: true
														    	})
														    }} style={{ marginRight: "20px", width: "100%" }}>Send a private message!</button>
														    <div style={{ padding: "20px", backgroundColor: "white" }}>
														    	{/*<div class="input-group mb-3">
																  <div class="input-group-prepend">
																    <span class="input-group-text" id="basic-addon1">Channel Name</span>
																  </div>
																  <input style={{ width: "600px" }} onChange={(e) => {
																	this.setState({
																		channelName: e.target.value
																	})
																}} type="text" class="form-control" placeholder="Ex. How are you doing?" aria-label="Username" aria-describedby="basic-addon1" />
																  
																</div>*/}
																<div class="form-group">
																    <label className="text-left" for="exampleFormControlTextarea1">Enter your message</label>
																    <textarea onChange={(e) => {
																    	this.setState({
																    		message: e.target.value
																    	})
																    }} style={{ width: "550px" }} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
																    <div style={{ marginTop: "20px" }} className="form-group">
																		<input onChange={(e) => {
																			this.setState({
																				chatTitle: e.target.value
																			})
																		}} type="text" placeholder="Enter a chat title/header..." value={this.state.chatTitle} className="form-control"/>
																    </div>
																  </div>
																<div class="form-group">
																	<p className="lead text-dark">Send a new private message and connect with this user today! Private messages are ONLY visible between you and the person you're messaging...</p>    
																</div>
																{this.state.message.length > 0 ? <button style={{ marginBottom: "100px" }} onClick={() => {
																	this.sendPrivateMessage();
																}} className="btn btn-outline-secondary">Send a private message</button> : null}
														    </div>
														  </Popover>
				                                        <div class="panel-heading">
				                                            <h3 class="panel-title">Personal Information</h3>
				                                        </div>
				                                        <div class="panel-body">
				                                            <div class="about-info-p">
				                                                <strong>Username</strong>
				                                                <br />
				                                                <p class="text-muted">{user.username}</p>
				                                            </div>
				                                            <div class="about-info-p">
				                                                <strong>Interested In...</strong>
				                                                <br />
				                                                <p class="text-muted">{user.profile ? user.profile.interestedIn : "User is not a cammer/streamer so no content is filled out"}</p>
				                                            </div>
				                                            <div class="about-info-p">
				                                                <strong>Nick-Name</strong>
				                                                <br />
				                                                <p class="text-muted">{user.profile ? user.profile.nickName : "User is not a cammer/streamer so no content is filled out"}</p>
				                                            </div>
				                                            <div class="about-info-p">
				                                                <strong>Body-Type</strong>
				                                                <br />
				                                                <p class="text-muted">{user.profile ? user.profile.bodyType : "User is not a cammer/streamer so no content is filled out"}</p>
				                                            </div>
				                                            <div class="about-info-p m-b-0">
				                                                <strong>Hair Color + Eye Color</strong>
				                                                <br />
				                                                <p class="text-muted">{user.profile ? user.profile.hairColor : "User is not a cammer/streamer so no content is filled out"} + {user.profile ? user.profile.eyeColor : "User is not a cammer/streamer so no content is filled out"}</p>
				                                         
				                                            </div>
				                                        </div>
				                                    </div>
				                                    

				                                    <div class="panel panel-default panel-fill">
				                                        <div class="panel-heading">
				                                            <h3 class="panel-title">Primary Language</h3>
				                                        </div>
				                                        <div class="panel-body">
				                                            <ul style={{ listStyleType: "none" }}>
				                                                <li style={{ marginLeft: "-40px" }}>{user.profile ? user.profile.languages : "User is not a cammer/streamer so no content is filled out"}</li>
				                                              
				                                            </ul>
				                                        </div>
				                                    </div>
				                                 

				                                </div>

				                                <div class="col-md-8">
				                                    
				                                    <div class="panel panel-default panel-fill">
				                                        <div class="panel-heading">
				                                            <h3 class="panel-title">Biography</h3>
				                                        </div>
				                                        <div class="panel-body">
				                                            <p>{user.profile ? user.profile.bio : "User is not a cammer/streamer so no content is filled out"}</p>

				                                           {/* <p><strong>But also the leap into electronic typesetting, remaining essentially unchanged.</strong></p>

				                                            <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>*/}
				                                        </div>
				                                    </div>
				                                 

				                                    <div class="panel panel-default panel-fill">
				                                        <div class="panel-heading">
				                                            <h3 class="panel-title">Skills</h3>
				                                        </div>
				                                        <div class="panel-body">
				                                        	{this.state.skills.length > 0 ? this.state.skills.map((each, index) => {
																if (each.skills) {
																	return each.skills.map((skill, indexxx) => {
						                                        		console.log(skill);
						                                        		return (
																			<div key={indexxx} class="m-b-15">
								                                                <h5>{skill.skill} <span class="pull-right">{skill.percentage}%</span></h5>
								                                                <div class="progress">
																				  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={`${skill.percentage}`} aria-valuemin="0" aria-valuemax="100" style={{ width: `${skill.percentage}%` }}></div>
																				</div>
								                                            </div>
						                                        		);
																	})
																} else {
																	return <h1 className="text-center">No skills have been listed...</h1>
																}
				                                        	}) : <h1 className="text-center">No skills have been listed...</h1>}
				                                            
				                                        </div>
				                                    </div>

				                                </div>

				                            </div>
				                        </div>

				                        <div class="tab-pane" id="profile-2">
				                           
				                            <div class="panel panel-default panel-fill">

				                                <div class="panel-body" style={{ height: "100%" }}>
				                                    <div class="timeline-2">
														<div className="row">
				                                        {this.state.stream_playback_ids.length > 0 && this.state.complete ? this.state.stream_playback_ids.map((id, index) => {
				                                        	console.log("ID! :", id);
				                                        	return (
																<div style={{ margin: "20px 10px" }} className="col-md-3">
																<div className="overlay_parent">
				                                        			<img className="overlay" style={{ width: "100%", height: "100%" }} src={`https://image.mux.com/${id}/animated.gif`} alt="video-custom"/>
				                                        			<button onClick={() => {
																		this.redirectToAsset(id);
																	}} style={{ width: "100%" }} className="btn btn-outline pink_button">VIEW RECORDING</button>
																</div>	
				                                        		</div>
				                                        	);

				                                        }) : <button onClick={() => {
				                                        	this.videoApi();
				                                        }} className="btn btn-outline pink_button" style={{ width: "100%" }}>Load Video Content</button>}
														</div>
				                                        {/*<div class="time-item">
				                                            <div class="item-info">
				                                                <div class="text-muted">30 minutes ago</div>
				                                                <p><a href="" class="text-info">Lorem</a> commented your post.</p>
				                                                <p><em>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam laoreet tellus ut tincidunt euismod. "</em></p>
				                                            </div>
				                                        </div>

				                                        <div class="time-item">
				                                            <div class="item-info">
				                                                <div class="text-muted">59 minutes ago</div>
				                                                <p><a href="" class="text-info">Jessi</a> attended a meeting with<a href="#" class="text-success">John Doe</a>.</p>
				                                                <p><em>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam laoreet tellus ut tincidunt euismod. "</em></p>
				                                            </div>
				                                        </div>

				                                        <div class="time-item">
				                                            <div class="item-info">
				                                                <div class="text-muted">5 minutes ago</div>
				                                                <p><strong><a href="#" class="text-info">John Doe</a></strong>Uploaded 2 new photos</p>
				                                            </div>
				                                        </div>

				                                        <div class="time-item">
				                                            <div class="item-info">
				                                                <div class="text-muted">30 minutes ago</div>
				                                                <p><a href="" class="text-info">Lorem</a> commented your post.</p>
				                                                <p><em>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam laoreet tellus ut tincidunt euismod. "</em></p>
				                                            </div>
				                                        </div>

				                                        <div class="time-item">
				                                            <div class="item-info">
				                                                <div class="text-muted">59 minutes ago</div>
				                                                <p><a href="" class="text-info">Jessi</a> attended a meeting with<a href="#" class="text-success">John Doe</a>.</p>
				                                                <p><em>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam laoreet tellus ut tincidunt euismod. "</em></p>
				                                            </div>
				                                        </div>*/}
				                                    </div>

				                                </div>
				                            </div>
				                         
				                        </div>

				                        <div class="tab-pane" id="messages-2">
				                            
				                            <div class="panel panel-default panel-fill">
				                                <div class="panel-heading">
				                                    <h3 class="panel-title">My Projects</h3>
				                                </div>
				                                <div class="panel-body">
				                                    <div class="table-responsive">
				                                        <table class="table">
				                                            <thead>
				                                                <tr>
				                                                    <th>#</th>
				                                                    <th>Project Name</th>
				                                                    <th>Start Date</th>
				                                                    <th>Due Date</th>
				                                                    <th>Status</th>
				                                                    <th>Assign</th>
				                                                </tr>
				                                            </thead>
				                                            <tbody>
				                                                <tr>
				                                                    <td>1</td>
				                                                    <td>Moltran Admin</td>
				                                                    <td>01/01/2015</td>
				                                                    <td>07/05/2015</td>
				                                                    <td><span class="label label-info">Work in Progress</span></td>
				                                                    <td>Coderthemes</td>
				                                                </tr>
				                                                <tr>
				                                                    <td>2</td>
				                                                    <td>Moltran Frontend</td>
				                                                    <td>01/01/2015</td>
				                                                    <td>07/05/2015</td>
				                                                    <td><span class="label label-success">Pending</span></td>
				                                                    <td>Coderthemes</td>
				                                                </tr>
				                                                <tr>
				                                                    <td>3</td>
				                                                    <td>Moltran Admin</td>
				                                                    <td>01/01/2015</td>
				                                                    <td>07/05/2015</td>
				                                                    <td><span class="label label-pink">Done</span></td>
				                                                    <td>Coderthemes</td>
				                                                </tr>
				                                                <tr>
				                                                    <td>4</td>
				                                                    <td>Moltran Frontend</td>
				                                                    <td>01/01/2015</td>
				                                                    <td>07/05/2015</td>
				                                                    <td><span class="label label-purple">Work in Progress</span></td>
				                                                    <td>Coderthemes</td>
				                                                </tr>
				                                                <tr>
				                                                    <td>5</td>
				                                                    <td>Moltran Admin</td>
				                                                    <td>01/01/2015</td>
				                                                    <td>07/05/2015</td>
				                                                    <td><span class="label label-warning">Coming soon</span></td>
				                                                    <td>Coderthemes</td>
				                                                </tr>

				                                            </tbody>
				                                        </table>
				                                    </div>

				                                </div>
				                            </div>
				                      
				                        </div>

				                        <div class="tab-pane" id="settings-2">
				                        
				                            <div class="panel panel-default panel-fill">
				                                <div class="panel-heading">
				                                    <h3 class="panel-title">Edit Profile</h3>
				                                </div>
				                                <div class="panel-body">
				                                    <form role="form">
				                                        <div class="form-group">
				                                            <label for="FullName">List One Skill At A Time In Each Input - Ex. Anal, JOI, Etc...</label>
				                                            <div class="input-group">
															  <input onChange={(e) => {
															  	this.setState({
															  		skill: e.target.value
															  	})
															  }} type="text" value={this.state.skill} class="form-control" aria-label="Text input with segmented dropdown button"/> 
															  <div class="input-group-append">
															    {this.state.percentage !== 0 && this.state.skill.length > 0 ? <button onClick={this.addSkillToDB} type="button" class="btn btn-outline-secondary">Add Skill ({this.state.percentage}%)</button> : <button  onClick={() => {
															    	if (this.state.percentage === 0 || this.state.skill.length === 0) {
																		alert("You must complete both fields - Percentage + Skill Name")
															    	}
															    }} type="button" class="btn btn-outline-secondary">Add Skill Percentage</button>}
															    <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
															      <span class="sr-only">Toggle Percentages</span>
															    </button>
															    <div class="dropdown-menu dropdown_custom">
															      <a onClick={() => {
															      	this.setState({
															      		percentage: 20
															      	})
															      }} class="dropdown-item drop">20%</a>
															      <a onClick={() => {
															      	this.setState({
															      		percentage: 40
															      	})
															      }} class="dropdown-item drop">40%</a>
															      <a onClick={() => {
															      	this.setState({
															      		percentage: 60
															      	})
															      }}  class="dropdown-item drop">60%</a>
															      <a onClick={() => {
															      	this.setState({
															      		percentage: 80
															      	})
															      }}  class="dropdown-item drop">80%</a>
															      <a onClick={() => {
															      	this.setState({
															      		percentage: 100
															      	})
															      }} class="dropdown-item drop">100%</a>
															     </div>
															     
															  </div>
															</div>
				                                        </div>
				                                       

				                                        
				                                        {/*<div class="form-group">
				                                            <label for="Email">Email</label>
				                                            <input type="email" value="first.last@example.com" id="Email" class="form-control"/>
				                                        </div>
				                                        <div class="form-group">
				                                            <label for="Username">Username</label>
				                                            <input type="text" value="john" id="Username" class="form-control"/>
				                                        </div>
				                                        <div class="form-group">
				                                            <label for="Password">Password</label>
				                                            <input type="password" placeholder="6 - 15 Characters" id="Password" class="form-control"/>
				                                        </div>
				                                        <div class="form-group">
				                                            <label for="RePassword">Re-Password</label>
				                                            <input type="password" placeholder="6 - 15 Characters" id="RePassword" class="form-control"/>
				                                        </div>*/}
				                                       {/* <div class="form-group">
				                                            <label for="AboutMe">About Me</label>
				                                            <textarea style={{ height: "125px" }} id="AboutMe" class="form-control">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</textarea>
				                                        </div>*/}
				                                       {/* <button class="btn btn-primary waves-effect waves-light w-md" type="submit">Save</button>*/}
				                                    </form>

				                                </div>
				                            </div>
				                          
				                        </div>
				                    </div>
				                </div>
				            </div>
				        </div>
				    </div>
				</div>
				<DropAComment user={user} picture={user.profile ? user.profile.profilePic : user} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
	return {
		email: state.auth.data.email,
		_id: state.auth.data._id,
		username: state.auth.data.username,
		image: state.auth.data.image,
		chat_uuid: state.auth.data.chat_uuid,
		token: state.token.token
	}
}

export default withRouter(connect(mapStateToProps, { })(ProfilesIndividual));
