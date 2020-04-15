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

import 'stream-chat-react/dist/css/index.css';


const client = new StreamChat('qzye22t8v5c4');

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
    	cols: 8
    }

}
	componentDidMount() {

		setTimeout(() => {
			console.log(this.props.location.state.streamID);
			
			client.setUser({
			    id: this.props.username,
			    name: this.props.username,
			    image: 'https://getstream.io/random_svg/?id=patient-breeze-7&name=Patient+breeze'},
			this.props.token);

			channel = client.channel('livestream', this.props.location.state.streamID, {
			  image: 'https://goo.gl/Zefkbx',
			  name: `PUBLIC STREAM RECORD: ${this.props.location.state.streamID}`,
			});

			this.setState({
				ready: true
			});
		}, 500)


		const unique = uuid();

		console.log(this.props);

		live_stream_id = this.props.location.state ? this.props.location.state.streamID : "QfWl200mvXbD4MQKbMe13CvB7ubl52q97";

		console.log(live_stream_id);

		const createLive = async () => {
		  const auth = {
		    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
		    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
		  };
		  const res = await axios.get("https://api.mux.com/video/v1/live-streams/" + live_stream_id, { auth: auth }).catch((error) => {
		    throw error;
		  });
		  const { data } = res.data;
		  console.log(res.data);
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
	// displayText = () => {
	// 	this.props.setUserGetStream(!this.props.checkUser);

	// 	client.disconnect();

	// 	client.setUser({
	// 	    id: this.props.username,
	// 	    name: this.props.username,
	// 	    image: 'https://getstream.io/random_svg/?id=patient-breeze-7&name=Patient+breeze'},
	// 	this.props.token);

	// 	channel = client.channel('livestream', this.props.location.state.streamID, {
	// 	  image: 'https://goo.gl/Zefkbx',
	// 	  name: `PUBLIC STREAM RECORD: ${this.props.location.state.streamID}`,
	// 	});
	// }
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
		  console.log(res.data);
		  if (data.status === "active") {
		  	this.setState({
			  	streams: data,
			  	playbackID: data.playback_ids[0].id,
			  	streamIsReady: true
			}, () => {
				axios.get(`https://stream.mux.com/${this.state.playbackID}.m3u8`).then((res) => {
					console.log(res.data);
					if (res) {
						this.setState({
							streamIsReady: true
						})
					}
				}).catch((err) => {
					console.log(err);
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
				<div className="col-md-12">
					<h1 className="text-center" style={{ textDecoration: "underline", paddingTop: "30px" }}>Stream is unavaliable, please check back again in a few moments...</h1>
					<button style={{ marginTop: "40px", width: "100%" }} onClick={this.checkStreamActive} className="btn btn-outline-warning">Check if stream is active</button>
				</div>
			);
		} else {
			return (
				<React.Fragment>
					<div className={`col-md-${this.state.cols}`}>
						<ReactPlayer playing={true} style={{ backgroundColor: "black" }} url={`https://stream.mux.com/${this.state.playbackID}.m3u8`} controls width="100%" height="100%" />
					</div>
					 {this.state.ready ?  <div style={{ maxWidth: "450px" }}><Chat client={client} theme={'livestream dark'}>
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
    render() {
    	const { streamsReady, APISuccess, err, streamIsReady } = this.state;

    	console.log(live_stream_id);
    	console.log(this.state);
        return (
        	<div>
        		<Navigation />
        		
 				<div className="container-fluid">
					<div className="row" style={{ margin: "40px 0px" }}>
						{this.renderContent()}
					</div>
 				</div>
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