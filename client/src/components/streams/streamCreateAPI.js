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

const apiKey = '46621022';

class StreamCreateAPI extends Component {
constructor(props) {
    super(props);

	this.state = {
		loaded: false,
		streams: [],
		error: "",
		connected: null,
		broadcastID: null, 
		broadcastUrls: null, 
		updatedAt: null, 
		status: null, 
		resolution: null,
		ready: false,
		hls: "",
		streamData: null,
		subscriber: null,
		playbackID: null,
		streamKey: "",
		streamID: "",
		showVideo: false,
		gif: null,
		loadVideoAgain: false,
		startedStream: false,
		copied: false,
		value: ""
	}

	
}
	componentDidMount() {
		// create session
		axios.post("/streaming/create").then((res) => {
			console.log(res.data);
		}).catch((err) => {
			console.log(err);
		});
		
	}
	handleClick = () => {
  		axios.post("/mux/create/stream").then((res) => {
  			let playback = res.data.data.playback_ids[0].id;
  			console.log(res.data);
  			this.setState({
  				playbackID: res.data.playbackID,
  				streamKey: res.data.streamKey,
  				streamID: res.data.data.id,
  				loaded: true,
  				startedStream: true
  			}, () => {
  				this.props.streamPlaybackID(this.state.playbackID);
  			})

  			console.log(res.data);
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
		
    render() {
    	const { loaded, token, sessionId, error, showVideo, startedStream, streamKey } = this.state;
    	console.log(this.state);
        return (
            <div>	
            	<Navigation />
            	{!startedStream ? <button className="btn btn-outline-info" style={{ width: "100%", marginBottom: "40px" }} onClick={this.handleClick}>Start A Stream!</button> : null}
            	{streamKey ? <hr className="my-4"/> : null}


	            <div>{streamKey ? "Your UNIQUE stream key is: " + streamKey : null}  <div>{streamKey ? <CopyToClipboard text={streamKey}
			          onCopy={() => this.setState({
			          	copied: true
			          })}>
			          <button className="btn btn-success">Copy to clipboard</button>
			        </CopyToClipboard> : null}</div>

			    <hr className="my-4"/> 

			    {streamKey ? "Your OBS server url is: rtmps://global-live.mux.com/app" : null}

			    </div>

	           

            	{this.state.streamKey ? <hr className="my-4"/> : null}
            	{this.state.loaded && this.state.streamKey ? <button onClick={() => {
					this.props.history.push(`/view/individual/private/stream/${this.state.streamID}`, { streamID: this.state.streamID });
				}} className="btn btn-outline-info" style={{ width: "100%", marginBottom: "50px" }}>Once you started streaming - Use this to go to the Stream</button> : null}
            	{/*<button className="btn btn-outline-success" style={{ width: "100%", marginTop: "30px" }} onClick={this.createNewSession}>Gather Streams Now</button>*/}
			<div className="container-fluid">
				   { error ? <h1 style={{ color: "darkred" }} className="text-center">{this.state.error}</h1> : null }
				  	<div className="row">
				        <div className="col-md-6">
				        <hr className="my-4"/>
							<h3 className="text-center">Broadcast yourself using Open Broadcaster Software (OBS)!</h3>
							<hr className="my-4"/>
							<p className="lead">Open Broadcaster Software (OBS) is an open source streaming software which provides broadcasters control to configure stream settings and customizable plugins so they can enhance their stream.</p>
							<hr className="my-4"/>
							<p className="lead">Click "Start A Stream" above and you will be provided the information (key and rtmp server url) to start your stream as soon as 30 seconds from now! 
							<hr className="my-4"/>
							Once you create your stream, once you are absolutely sure you're streaming... Click the "load stream" button that display's AFTER creating a stream below to display your live stream!</p>
							<hr className="my-4"/>
							
				        </div>

				        <div className="col-md-6">
							<div>
								<iframe width="100%" height="425" src="https://www.youtube.com/embed/DTk99mHDX_I" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
							</div>
				        </div>
				    </div>
			    </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
	return {
		streamID: state.streaming.playbackID
	}
}

export default withRouter(connect(mapStateToProps, { streamPlaybackID })(StreamCreateAPI));
