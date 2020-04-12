import React, { Component } from "react";
import Navigation from "../navigation/index.js";
import axios from "axios";
import ReactPlayer from 'react-player';
import "./css/streams.css";


class AssetShow extends Component {
constructor(props) {
  super(props);

  this.state = {
	playbackID: null
  };
}
	componentDidMount() {
		const ASSET_ID = this.props.location.state.id;

		console.log(ASSET_ID);

		const createLive = async () => {
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
		  const res = await axios.get(`https://api.mux.com/video/v1/assets/${ASSET_ID}`, { auth: auth }).catch((error) => {
		    throw error;
		  });

		  this.setState({
		  	playbackID: res.data.data.playback_ids[0].id
		  })

		  console.log(res.data.data);
		}

		createLive();
	}
	render () {
		console.log(this.props);
		console.log(this.state);
		const ASSET_ID = this.props.location.state.id;
		return (
			<div>
			 	<Navigation />
			 	<div className="controller-back">
					{this.state.playbackID ? <div className="controller"><ReactPlayer playing={true} style={{ backgroundColor: "black" }} url={`https://stream.mux.com/${this.state.playbackID}.m3u8`} controls width="100%" height="100%" /></div> : null}
				</div>
			</div>
		);
	}
}
export default AssetShow;