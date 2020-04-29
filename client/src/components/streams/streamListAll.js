import React, { Component } from 'react';
import Navigation from "../navigation/index.js";
import axios from "axios";
import { Link } from "react-router-dom";
import FooterPage from "../common/footer/footer.js";

class StreamListAll extends Component {
 constructor(props) {
    super(props);

    this.state = {
    	readyStreams: []
    }
}
	componentDidMount() {
		axios.get("/gather/each/every/stream/mongodb").then((res) => {
			console.log(res);
			for (var i = 0; i < res.data.length; i++) {
				let stream = res.data[i];
				if (stream.status === "ready") {
					this.setState({
						readyStreams: [...this.state.readyStreams, stream]
					})					
				}
			}

			this.setState({
				ready: true
			})
		}).catch((err) => {
			console.log(err);
		})
	}
    render() {
        return (
            <div>
				<Navigation />
				<div className="container-fluid">
					<div className="row">
						{this.state.readyStreams ? this.state.readyStreams.map((stream, index) => {
							console.log(stream);
							return (
								<div onClick={() => {
									this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
								}} className="col-md-3 col-lg-3 col-sm-6">
									 <img width="100%" height="100%" src={`https://image.mux.com/${stream.playback_ids[0].id}/animated.gif`} alt="image did not load - could not be processed"/>
								</div>
							);
						}) : null}
					</div>
				</div>
				<FooterPage />
            </div>
        );
    }
}

export default StreamListAll;
