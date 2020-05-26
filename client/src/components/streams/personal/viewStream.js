import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import axios from "axios";
import "../css/personal.css";
import Footer from "../../common/footer/footer.js";
import { connect } from "react-redux";
import ReactPlayer from 'react-player';
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



class ViewStreamLink extends Component {
constructor(props) {
    super(props);

    this.state = {
		stream: null
    }
}
	componentDidMount() {
		axios.post("/gather/individual/stream/display", {
			email: this.props.email
		}).then((res) => {
			console.log(res.data);
			this.setState({
				stream: res.data
			})
		}).catch((err) => {
			console.log(err);
		})
	}
    render() {
    	console.log(this.state);

    	const { stream } = this.state;

        return (
            <div>
				<Navigation />
					<div className="mx-auto">
						<h3 style={{ marginTop: "30px" }} className="text-center text-white">You are now viewing your live stream, to visit the *actual* stream with comments, tips, etc... click the button below.</h3>
						<hr className="my-4"/>
						<div className="container">
							<div className="row">
								<div className="col-md-12 col-lg-12 col-sm-12">
									<button onClick={() => {
										this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id, stream_key: stream.stream_key });
									}} style={{ width: "100%", marginBottom: "40px" }} className="btn btn-outline aqua_button_custom">Click to the *LIVE* stream to interact with viewers!</button>
								</div>
							</div>
						</div>
					</div>
					{this.state.stream !== null ? <div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12 col-sm-12">
								<div className="mx-auto">
									<ReactPlayer height="100%" width="100%" controls={true} url={'http://127.0.0.1:' + config.rtmp_server.http.port + '/live/' + stream.stream_key + '/index.m3u8'} playing />
								</div>
							</div>
						</div>
					</div> : null}
				<Footer />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
	return {
		email: state.auth.data.email
	}
}
export default withRouter(connect(mapStateToProps, {})(ViewStreamLink));
