import React from "react";
import Navigation from "../navigation/index.js";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/streamList.css";

class StreamList extends React.Component {
constructor(props) {
  super(props);

 
  this.state = {
  	streams: [],
  	streamsReady: false
  };
}
	componentDidMount() {
		const createLive = async () => {
		  const auth = {
		    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
		    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
		  };
		  const param = { "reduced_latency": true, "playback_policy": "public", "new_asset_settings": { "playback_policy": "public" } }
		  const res = await axios.get('https://api.mux.com/video/v1/live-streams', { auth: auth }).catch((error) => {
		    throw error;
		  });
		  console.log(res.data);
		  this.setState({
		  	streams: res.data.data,
		  	streamsReady: true
		  })
		}

		createLive();
	}
	render () {
		console.log(this.state);
		return (
			<div>
			 	<Navigation />
				<div className="container-fluid">
				<div className="row">
				{this.state.streamsReady ? this.state.streams.map((stream, index) => {
					if (stream.playback_ids && stream.status === "active") {
						console.log(stream);
						return (
							<div key={index} className="col-md-3">
								<img className="box" onClick={() => {
									this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
								}} style={{ width: "100%", height: "100%", padding: "14px" }} src={`https://image.mux.com/${stream.playback_ids[0].id}/animated.gif`} alt="video-preview"/>
							</div>
						);
					}
				}) : null}
				</div>
				</div>
			</div>
		);
	}
}
export default StreamList;