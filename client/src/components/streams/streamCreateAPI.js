import React, { Component } from 'react';
import Navigation from "../navigation/index.js";
import { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } from 'opentok-react';
import axios from "axios";
import ReactHLS from 'react-hls';
import ReactPlayer from 'react-player';
import "./css/createStreamAPI.css";
import { connect } from "react-redux";
import { streamPlaybackID } from "../../actions/streaming.js";
import { withRouter } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FooterPage from "../common/footer/footer.js";
import ParallaxTwo from "../parallaxs/parallaxTwo.js";
import uuid from "react-uuid";

const apiKey = '46621022';

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

class StreamCreateAPI extends Component {
constructor(props) {
    super(props);

	this.state = {
		loaded: false,
		liveStreams: [],
		error: "",
		broadcastID: null,
		updatedAt: null,
		resolution: null,
		ready: false,
		hls: "",
		playbackID: null,
		streamKey: "",
		streamID: "",
		showVideo: false,
		gif: null,
		loadVideoAgain: false,
		startedStream: false,
		copied: false,
		value: "",
		data: [],
		streamSubTitle: "",
		streamTitle: "",
		streamDescription: "",
		race: "",
		preferences: "",
		orientation: "",
		tags: [],
		stream_key: "",
		show: false
	}

	
}
	componentDidMount() {
		this.getStreamKey();
	}
	handleClick = () => {

		this.setState({
			tags: [this.state.race, this.state.preferences, this.state.orientation]
		});

		axios.post('/stream_key/create', {
			email: this.props.email
		}).then(res => {
            if (res.data) {
            	console.log(res.data);

            	axios.get('/stream_key/gather', {
		        	params: {
		                email: this.props.email
		            }
		        }).then(response => {
		        	console.log(response.data);
		            this.setState({
		                stream_key: response.data.stream_key,
		                show: true
		            });
		        }).catch((err) => {
		        	console.log(err);
		        })
            }
        }).catch((err) => {
        	console.log(err);
        })
	}
	getStreamKey = () => {
        axios.get('/stream_key/gather', {
        	params: {
                email: this.props.email
            }
        }).then(res => {
        	console.log(res.data);
            this.setState({
                stream_key : res.data.stream_key
            });
        }).catch((err) => {
        	console.log(err);
        })
    }
    onError = (err) => {
    	this.setState({ 
    		error: `Failed to connect: ${err}` 
    	});
    }
  	endStream = () => {
  		axios.post("/streaming/stop", {
			broadcastID: this.state.broadcastID
  		}).then((res) => {
  			console.log(res.data);
  		}).catch((err) => {
  			console.log(err);
  		})

  		this.setState({
			hls: "",
			ready: false
		})
  	}
  	getStreamsInfo = (live_streams) => {
  		console.log(live_streams);
        // axios.get('/streams/info', {
        //     params: {
        //         streams: live_streams
        //     }
        // }).then(res => {
        //     this.setState({
        //         live_streams: res.data
        //     }, () => {
        //         console.log(this.state);
        //     });
        // }).catch((err) => {
        // 	console.log(err);
        // });
    }
 
	handleRedirect = () => {

		const { streamTitle, streamSubTitle, streamDescription, orientation, preferences, race, stream_key } = this.state;

		const getLiveStreams = () => {

	        axios.get('http://127.0.0.1:' + config.rtmp_server.http.port + '/api/streams')
	            .then(res => {
	                let streams = res.data;
	                console.log(streams);
	                if (typeof (streams['live'] !== 'undefined')) {
	                    this.getStreamsInfo(streams['live']); 

						if (streamTitle.length > 0 && streamSubTitle.length > 0 && streamDescription.length > 0 && orientation && preferences && race) {
							axios.post("/post/new/stream", {
								// data: this.state.data.data,
								email: this.props.email,
								stream_key,
								// active_asset_id: res.data.data.active_asset_id,
								tags: this.state.tags,
								title: streamTitle,
								desc: streamDescription,
								subTitle: streamSubTitle,
								profilePic: this.props.image
							}).then((responseee) => {
								console.log(responseee.data.data);
								if (responseee.data) {
									axios.post("/get/stream/last", { 
										key: stream_key
									}).then((kickback) => {
										console.log(kickback.data);
										const selected = kickback.data;
										// const param = responseee.data.data.value.streams[responseee.data.data.value.streams.length - 1].id;
										
										this.props.history.push(`/view/individual/private/stream/${selected.id}`, { streamID: selected.id, stream_key: selected.stream_key });
									}).catch((err) => {
										console.log(err);
									})
								}
								
							}).catch((err) => {
								console.log(err);
								alert(err);
							});
						} else {
							alert("Please fill out each and every field.");
						}
	                }
	        }).catch((err) => {
	            	console.log(err);
	        });
	    }

	    getLiveStreams();
	}	
	renderCustomFields = () => {
		return (
		  <div className="container selector">
			<div className="row" style={{ marginTop: "30px" }}>
				<div className="col-md-6">
					<div class="form-group">
					    <label>Stream Title</label>
					    <input onChange={(e) => {
					    	this.setState({
					    		streamTitle: e.target.value
					    	})
					    }} type="text" class="form-control purple_input" placeholder="Enter your stream title..." /> 
					</div>
				</div>
				<div className="col-md-6">
					<div class="form-group">
					    <label>Stream Sub-Title</label>
					    <input onChange={(e) => {
					    	this.setState({
					    		streamSubTitle: e.target.value
					    	})
					    }} type="text" class="form-control purple_input" placeholder="Enter your stream sub-title..." /> 
					</div>
				</div>
			</div>
			<div className="row">
				<div class="col-md-4">
					<div class="form-group">
					    <label>Select One Tag From Each Category</label>
					        <select onChange={(e) => {
					        	this.setState({
									orientation: e.target.value
					        	})
					        }} id="dates-field2" class="multiselect-ui form-control purple_input" multiple="multiple">
					            <option value="STRAIGHT">STRAIGHT</option>
					            <option value="GAY">GAY</option>
					            <option value="BI-SEXUAL">BI-SEXUAL</option>
					            <option value="TRANS">TRANS</option>
					        </select>
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
					    <label>Select One Tag From Each Category</label>
					        <select onChange={(e) => {
					        	this.setState({
									preferences: e.target.value
					        	})
					        }} id="dates-field2" class="multiselect-ui form-control purple_input" multiple="multiple">
					            <option value="JOI">JOI</option>
					            <option value="ANAL">ANAL</option>
					            <option value="BBW">BBW</option>
					            <option value="FEET-FETISH">FEET FETISH</option>
					            <option value="RED-HEADS">RED-HEADS</option>
					            <option value="BLONDES">BLONDES</option>
					            <option value="BRUNETTES">BRUNETTES</option>
					            <option value="SMALL-TITS">SMALL-TITS</option>
					            <option value="BIG-TITS">BIG-TITS</option>
					            <option value="PREGNANT">PREGNANT</option>
					            <option value="SHAVED">SHAVED-PUSSY</option>
					            <option value="HAIRY">HAIRY-PUSSY</option>
					        </select>
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
					    <label>Select One Tag From Each Category</label>
					        <select onChange={(e) => {
					        	this.setState({
									race: e.target.value
					        	})
					        }} id="dates-field2" class="multiselect-ui form-control purple_input" multiple="multiple">
					            <option value="HISPANIC">HISPANIC</option>
					            <option value="EBONY">EBONY</option>
					            <option value="ASIAN">ASIAN</option>
					            <option value="WHITE">WHITE</option>
					        </select>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					  <div class="form-group">
					    <label for="exampleFormControlTextarea1">Stream Description</label>
					    <textarea className="purple_input" placeholder="Enter a stream description such as 'two girls on dildo playing with big toy - anal play with some JOI involved...'" onChange={(e) => {
					    	this.setState({
					    		streamDescription: e.target.value
					    	})
					    }} class="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
					  </div>
				</div>
			</div>
		  </div>
		);
	}
    render() {
    	const { loaded, token, sessionId, error, showVideo, startedStream, stream_key, show } = this.state;
    	console.log(this.state);
        return (
            <div>	
            	<Navigation />
            	<ParallaxTwo />
            	{this.renderCustomFields()}
            	{!startedStream && this.state.orientation.length > 0 && this.state.race.length > 0 && this.state.preferences.length > 0 && this.state.streamDescription.length > 0 ? <button className="btn btn-outline green_button_custom" style={{ width: "100%", marginBottom: "40px", marginTop: "30px" }} onClick={this.handleClick}>Start A Stream!</button> : null}
            	{stream_key && show ? <hr className="my-4"/> : null}


	            <div className="mx-auto text-center">{stream_key && show ? "Your UNIQUE stream key is: " + stream_key : null}  <div className="mx-auto">{stream_key && show ? <CopyToClipboard text={stream_key}
			          onCopy={() => this.setState({
			          	copied: true
			          })}>
			          <button className="btn btn-outline green_button_custom">Copy to clipboard</button>
			        </CopyToClipboard> : null}</div>

			    <hr className="my-4"/> 

			    {stream_key && show ? "Your OBS server url is: rtmp://127.0.0.1:1935/live" : null}

			    </div>

	           

            	{this.state.stream_key && show ? <hr className="my-4"/> : null}
            	{stream_key && show ? <button onClick={this.handleRedirect} className="btn btn-outline green_button_custom" style={{ width: "100%", marginBottom: "50px" }}>Once you've started streaming - Use this to publish and go to the Stream</button> : null}
            	{/*<button className="btn btn-outline-success" style={{ width: "100%", marginTop: "30px" }} onClick={this.createNewSession}>Gather Streams Now</button>*/}
				<div className="container-fluid">
				   { error ? <h1 style={{ color: "darkred" }} className="text-center">{this.state.error}</h1> : null }
				  	<div className="row">
				        <div className="col-md-6">
				        <hr className="my-4"/>
							<h3 className="text-left">Broadcast yourself using Open Broadcaster Software (OBS)!</h3>
							<hr className="my-4"/>
							<p className="lead text-left">Open Broadcaster Software (OBS) is an open source streaming software which provides broadcasters control to configure stream settings and customizable plugins so they can enhance their stream.</p>
							<hr className="my-4"/>
							<p className="lead text-left">Click "Start A Stream" above and you will be provided the information (key and rtmp server url) to start your stream as soon as 30 seconds from now! 
							<hr className="my-4"/>
							Once you create your stream, once you are absolutely sure you're streaming... Click the "load stream" button that display's AFTER creating a stream below to display your live stream!</p>
							<hr className="my-4"/>
							
				        </div>

				        <div className="col-md-6">
							<div>
								<iframe style={{ boxShadow: "10px 10px 10px grey" }} width="100%" height="425" src="https://www.youtube.com/embed/DTk99mHDX_I" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
							</div>
				        </div>
				    </div>
			    </div>
			    <ParallaxTwo />
			    <FooterPage />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
	return {
		streamID: state.streaming.playbackID,
		email: state.auth.data.email,
		image: state.auth.data.image
	}
}

export default withRouter(connect(mapStateToProps, { streamPlaybackID })(StreamCreateAPI));
