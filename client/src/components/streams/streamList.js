import React from "react";
import Navigation from "../navigation/index.js";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/streamList.css";
import FooterPage from "../common/footer/footer.js";

class StreamList extends React.Component {
constructor(props) {
  super(props);

 
  this.state = {
  	streams: [],
  	streamsReady: false,
  	assets: [],
  	preview: ""
  };
}
	componentDidMount() {
		const createLive = async () => {
		  const auth = {
		    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
		    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
		  };
		    const param = { "reduced_latency": true, 
			  "playback_policy": "public", 
			  "new_asset_settings": { 
			  	"playback_policy": "public" 
			  } 
			}
		  const res = await axios.get('https://api.mux.com/video/v1/live-streams', { auth: auth }).catch((error) => {
		    throw error;
		  });
		  const assets = await axios.get('https://api.mux.com/video/v1/assets?limit=51', { auth: auth }).catch((error) => {
		    throw error;
		  });
		  console.log(assets.data);
		  this.setState({
		  	streams: res.data.data,
		  	assets: assets.data.data,
		  	streamsReady: true
		  })
		}

		createLive();
	}
	render () {
		console.log(this.state);
		const { streamsReady } = this.state;
		return (
			<div>
			
			 	<Navigation />
					<div className="container-fluid background">
					<div className="row">
					{streamsReady ? this.state.streams.map((stream, index) => {
						if (stream.playback_ids[0].id && stream.status === "active") {
							return (
								<div key={index} className="col-md-3">
									<img className="box" onClick={() => {
										this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
									}} style={{ width: "100%", height: "100%", padding: "14px" }} src={`https://image.mux.com/${stream.playback_ids[0].id}/animated.gif`} alt="video-preview"/>
								</div>
							);
						} 
					}) : null}
					{/*{streamsReady ? this.state.assets.map((asset, index) => {
						console.log(asset);
						if (asset.playback_ids) {
							return (
								<div key={index} className="col-md-3" id="dark_image">
									<img className="box-two" onClick={() => {
										alert("This is an old completed stream...Click one that's not dark!")
									}} style={{ width: "100%", height: "100%", padding: "14px" }} src={`https://image.mux.com/${asset.playback_ids[0].id}/animated.gif`} alt="video-preview"/>
								</div>
							);
						} 
					}) : null}	*/}
					</div>
					</div>
				

				<FooterPage />
			</div>
		);
	}
}
export default StreamList;