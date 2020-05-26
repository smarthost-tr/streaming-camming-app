import React from "react";
import Navigation from "../navigation/index.js";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/streamList.css";
import FooterPage from "../common/footer/footer.js";
import ReactLoading from 'react-loading';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SearchContainer from "./search/search.js";
import { connect } from "react-redux";

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

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


class StreamList extends React.Component {
constructor(props) {
  super(props);

 
  this.state = {
  	streams: [],
  	streamsReady: false,
  	assets: [],
  	preview: "",
  	streamies: [],
  	finishedStreams: [],
  	idleStreams: [],
  	readyStreams: [],
  	ready: false,
  	// go back and take these out
  	straightExists: false,
  	biSexualExists: false,
  	gayExists: false,
  	// go back and take these out ^^^^^^^^,
  	user: null
  };
}
	getStreamsInfo = (live_streams) => {
		axios.get('/streams/info', {
            params: {
                streams: live_streams
            }
        }).then(res => {
        	console.log(res.data);
            // this.setState({
            //     streamsReady: res.data
            // }, () => {
            //     console.log(this.state);
            // });
        }).catch((err) => {
        	console.log(err);
        });
	}
	componentDidMount() {
    //    	setTimeout(() => {
	 		// axios.get('/create/thumbnail')
	   //          .then(res => {
	   //            	console.log(res.data);
	   //      }).catch((err) => {
	   //          	console.log(err);
	   //      });

    //    	}, 1000);
		axios.get("/gather/each/every/stream/mongodb").then((res) => {
			console.log(res);
			for (var i = 0; i < res.data.length; i++) {
				let stream = res.data[i];

				// if (stream.status === "finished") {
				// 	this.setState({
				// 		finishedStreams: [...this.state.finishedStreams, stream]
				// 	})
				// }
				// if (stream.status === "idle") {
				// 	this.setState({
				// 		idleStreams: [...this.state.idleStreams, stream]
				// 	})
				// }
				if (stream) {
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
		});

		setTimeout(() => {
			axios.post("/get/user", {
				email: this.props.email
			}).then((res) => {
				console.log(res.data);
				this.setState({
					user: res.data
				})
			}).catch((err) => {
				console.log(err);
			})
		}, 500);
	}
	renderIdleStreams = () => {
		if (this.state.idleStreams) {
			return this.state.idleStreams.slice(0, 20).map((stream, index) => {
				return (
					<div key={index}>
						<img className="box" onClick={() => {
							this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
						}} style={{ width: "100%", height: "100%", padding: "14px" }} src={`https://image.mux.com/${stream.playback_ids[0].id}/animated.gif`} alt="video-preview"/>
					</div>
				);
			})
		}		
	}
	entered = () => {
		console.log("entered.");
		this.setState({
			enteredAndVisit: true
		})
	} 
	exited = () => {
		console.log("Exited.");
		this.setState({
			enteredAndVisit: false
		})
	}
	mineCurrency = () => {
		axios.get("/mine").then((res) => {
			console.log(res.data);
			if (res.data.note) {
				alert(res.data.note);
			}
		}).catch((err) => {
			console.log(err);
		});
	}
	render () {
		const { streamsReady } = this.state;
		return (
			<div>
			 	<Navigation />
					<div style={{ padding: "70px 0px" }} className="container-fluid background">
					<SearchContainer />
						<div className="row">

						
						{/*{streamsReady ? this.state.streams.map((stream, index) => {
							console.log(stream.new_asset_settings.playback_policies[0]);
							if (stream.playback_ids[0].id && stream.status === "active" && stream.new_asset_settings.playback_policies[0] === "public") {
								return (
									<div key={index} className="col-md-3">
										<img className="box" onClick={() => {
											this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
										}} style={{ width: "100%", height: "100%", padding: "14px" }} src={`https://image.mux.com/${stream.playback_ids[0].id}/animated.gif`} alt="video-preview"/>
									</div>
								);
							} 
						}) : null}*/}
						{/*{streamsReady ? this.state.assets.map((asset, index) => {
							if (asset.status === "ready" && asset.playback_ids[0].policy === "public") {
								return (
									<div key={index} className="col-md-3" id="dark_image">
										<img className="box-two" onClick={() => {
											alert("This is an old completed stream...Click one that's not dark!")
										}} style={{ width: "100%", height: "100%", padding: "14px" }} src={`https://image.mux.com/${asset.playback_ids[0].id}/animated.gif`} alt="video-preview"/>
									</div>
								);
							} 
						}) : <div className="mx-auto" style={{ padding: "40px 0px" }}><ReactLoading type="spinningBubbles" color="pink" height={500} width={500} /></div>}*/}
						
						</div>
					{/*{this.state.ready ? <h1 className="text-white text-center">Straight Streams</h1> : null}*/}
					<Carousel responsive={responsive}>
			 		  {/*{this.renderIdleStreams()}*/}
			 		  	{this.state.readyStreams ? this.state.readyStreams.sort(() => Math.random() - 0.5).map((stream, index) => {
			 		  		console.log(stream);
			 		  	{/*	const auth = {
							    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
							    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
							};

			 		  		const res = axios.get(`https://api.mux.com/video/v1/assets/${stream.id}`, {}, { auth: auth }).catch((err) => {
			 		  			throw err;
			 		  		})*/}

			 		  		{/*console.log(res);*/}
			 		  		if (stream.tags.includes("STRAIGHT") && stream.active === true) {
								return (
									<div key={index} style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onClick={() => {
											this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id, stream_key: stream.stream_key });
										}} class="card">
							            <div class="thumbnail">
							                <img width="360" height="270" src={require(`../../assets/preview/${stream.stream_key}.png`)} alt="thumbnail"/>
							                <a class="thumb-cover"></a>
							                <div class="details">
							                    <div class="authors-container">
							                        <div class="author">
							                            <a class="card-user account-photo  account-product-owner">
							                            <div class="mask">
							                                <img class="photo" src={stream.profilePic} alt="Thumb"/>
							                            </div>
							                            </a>
							                        </div>
							                    </div>
							                    <div class="numbers">
							                       {stream.tags ? stream.tags.map((tag, indexxxx) => {
							                       		return  (
							                       			<b key={indexxxx} class="downloads"><i class="fa fa-arrow-circle-o-down"></i>{tag + ", "}</b>
							                       		);
							                       }) : null}
							                        <b class="comments-icon"><i class="fa fa-comment"></i></b>
							                    </div>
							                   
							                    <div class="clearfix"></div>
							                </div>
							                {/*<b class="actions">
							                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
							                    <a onClick={() => {
												this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
												}} class="btn btn-info btn-round" href="#">Live Preview</a>
							                </b>*/}
							            </div>
							            <div class="card-info">
							                <a href="#">
							                    <h3>{stream.title}
							                        <div class="time pull-right">{stream.subTitle}</div>
							                    
							                    
							                    </h3>
							                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
							                    <p>{stream.desc}</p>
							                </a>
							        </div>
					        	</div>
				 		  		);
			 		  		}
			 		  	}) : <ReactLoading type="cylon" color="pink" height={500} width={500} />}
				  
			 		</Carousel>
			 		<Carousel responsive={responsive}>
			 		  {/*{this.renderIdleStreams()}*/}
			 		  	{this.state.readyStreams ? this.state.readyStreams.sort(() => Math.random() - 0.5).map((stream, index) => {
			 		  	{/*	const auth = {
							    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
							    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
							};

			 		  		const res = axios.get(`https://api.mux.com/video/v1/assets/${stream.id}`, {}, { auth: auth }).catch((err) => {
			 		  			throw err;
			 		  		})*/}

			 		  		{/*console.log(res);*/}
			 		  		if (stream.tags.includes("STRAIGHT") && stream.active === true) {
								return (
									<div key={index} style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onClick={() => {
											this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id, stream_key: stream.stream_key });
										}} class="card">
							            <div class="thumbnail">
							                <img width="360" height="270" src={require(`../../assets/preview/${stream.stream_key}.png`)} alt="thumbnail"/>
							                <a class="thumb-cover"></a>
							                <div class="details">
							                    <div class="authors-container">
							                        <div class="author">
							                            <a class="card-user account-photo  account-product-owner">
							                            <div class="mask">
							                                <img class="photo" src={stream.profilePic} alt="Thumb"/>
							                            </div>
							                            </a>
							                        </div>
							                    </div>
							                    <div class="numbers">
							                       {stream.tags ? stream.tags.map((tag, indexxxx) => {
							                       		return  (
							                       			<b key={indexxxx} class="downloads"><i class="fa fa-arrow-circle-o-down"></i>{tag + ", "}</b>
							                       		);
							                       }) : null}
							                        <b class="comments-icon"><i class="fa fa-comment"></i></b>
							                    </div>
							                   
							                    <div class="clearfix"></div>
							                </div>
							                {/*<b class="actions">
							                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
							                    <a onClick={() => {
												this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
												}} class="btn btn-info btn-round" href="#">Live Preview</a>
							                </b>*/}
							            </div>
							            <div class="card-info">
							                <a href="#">
							                    <h3>{stream.title}
							                        <div class="time pull-right">{stream.subTitle}</div>
							                    
							                    
							                    </h3>
							                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
							                    <p>{stream.desc}</p>
							                </a>
							        </div>
					        	</div>
				 		  		);
			 		  		}
			 		  	}) : <ReactLoading type="cylon" color="pink" height={500} width={500} />}
				  
			 		</Carousel>
			 		<Carousel responsive={responsive}>
			 		  {/*{this.renderIdleStreams()}*/}
			 		  	{this.state.readyStreams ? this.state.readyStreams.slice(0, 20).map((stream, index) => {
			 		  	{/*	const auth = {
							    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
							    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
							};

			 		  		const res = axios.get(`https://api.mux.com/video/v1/assets/${stream.id}`, {}, { auth: auth }).catch((err) => {
			 		  			throw err;
			 		  		})*/}

			 		  		{/*console.log(res);*/}
			 		  		if (stream.tags.includes("BI-SEXUAL") && stream.active === true) {
								return (
									<div key={index} style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onClick={() => {
											this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id, stream_key: stream.stream_key });
										}} class="card">
							            <div class="thumbnail">
							                <img width="360" height="270" src={require(`../../assets/preview/${stream.stream_key}.png`)} alt="thumbnail"/>
							                <a class="thumb-cover"></a>
							                <div class="details">
							                    <div class="authors-container">
							                        <div class="author">
							                            <a class="card-user account-photo  account-product-owner">
							                            <div class="mask">
							                                <img class="photo" src={stream.profilePic} alt="Thumb"/>
							                            </div>
							                            </a>
							                        </div>
							                    </div>
							                    <div class="numbers">
							                       {stream.tags ? stream.tags.map((tag, indexxxx) => {
							                       		return  (
							                       			<b key={indexxxx} class="downloads"><i class="fa fa-arrow-circle-o-down"></i>{tag + ", "}</b>
							                       		);
							                       }) : null}
							                        <b class="comments-icon"><i class="fa fa-comment"></i></b>
							                    </div>
							                   
							                    <div class="clearfix"></div>
							                </div>
							                {/*<b class="actions">
							                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
							                    <a onClick={() => {
												this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
												}} class="btn btn-info btn-round" href="#">Live Preview</a>
							                </b>*/}
							            </div>
							            <div class="card-info">
							                <a href="#">
							                    <h3>{stream.title}
							                        <div class="time pull-right">{stream.subTitle}</div>
							                    
							                    
							                    </h3>
							                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
							                    <p>{stream.desc}</p>
							                </a>
							        </div>
					        	</div>
				 		  		);
			 		  		}
			 		  	}) : <ReactLoading type="cylon" color="pink" height={500} width={500} />}
				  
			 		</Carousel>
			 		<Carousel responsive={responsive}>
			 		  {/*{this.renderIdleStreams()}*/}
			 		  	{this.state.readyStreams ? this.state.readyStreams.slice(0, 20).map((stream, index) => {
			 		  	{/*	const auth = {
							    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
							    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
							};

			 		  		const res = axios.get(`https://api.mux.com/video/v1/assets/${stream.id}`, {}, { auth: auth }).catch((err) => {
			 		  			throw err;
			 		  		})*/}

			 		  		{/*console.log(res);*/}
			 		  		if (stream.tags.includes("GAY") && stream.active === true) {
								return (
									<div key={index} style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onClick={() => {
											this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id, stream_key: stream.stream_key });
										}} class="card">
							            <div class="thumbnail">
							                <img width="360" height="270" src={require(`../../assets/preview/${stream.stream_key}.png`)} alt="thumbnail"/>
							                <a class="thumb-cover"></a>
							                <div class="details">
							                    <div class="authors-container">
							                        <div class="author">
							                            <a class="card-user account-photo  account-product-owner">
							                            <div class="mask">
							                                <img class="photo" src={stream.profilePic} alt="Thumb"/>
							                            </div>
							                            </a>
							                        </div>
							                    </div>
							                    <div class="numbers">
							                       {stream.tags ? stream.tags.map((tag, indexxxx) => {
							                       		return  (
							                       			<b key={indexxxx} class="downloads"><i class="fa fa-arrow-circle-o-down"></i>{tag + ", "}</b>
							                       		);
							                       }) : null}
							                        <b class="comments-icon"><i class="fa fa-comment"></i></b>
							                    </div>
							                   
							                    <div class="clearfix"></div>
							                </div>
							                {/*<b class="actions">
							                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
							                    <a onClick={() => {
												this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
												}} class="btn btn-info btn-round" href="#">Live Preview</a>
							                </b>*/}
							            </div>
							            <div class="card-info">
							                <a href="#">
							                    <h3>{stream.title}
							                        <div class="time pull-right">{stream.subTitle}</div>
							                    
							                    
							                    </h3>
							                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
							                    <p>{stream.desc}</p>
							                </a>
							        </div>
					        	</div>
				 		  		);
			 		  		}
			 		  	}) : <ReactLoading type="cylon" color="pink" height={500} width={500} />}
				  
			 		</Carousel>
			 		<Carousel responsive={responsive}>
			 		  {/*{this.renderIdleStreams()}*/}
			 		  	{this.state.readyStreams ? this.state.readyStreams.slice(0, 20).map((stream, index) => {
			 		  	{/*	const auth = {
							    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
							    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
							};

			 		  		const res = axios.get(`https://api.mux.com/video/v1/assets/${stream.id}`, {}, { auth: auth }).catch((err) => {
			 		  			throw err;
			 		  		})*/}

			 		  		{/*console.log(res);*/}
			 		  		if (stream.tags.includes("TRANS") && stream.active === true) {
								return (
									<div key={index} style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onClick={() => {
											this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id, stream_key: stream.stream_key });
										}} class="card">
							            <div class="thumbnail">
							                <img width="360" height="270" src={require(`../../assets/preview/${stream.stream_key}.png`)} alt="thumbnail"/>
							                <a class="thumb-cover"></a>
							                <div class="details">
							                    <div class="authors-container">
							                        <div class="author">
							                            <a class="card-user account-photo  account-product-owner">
							                            <div class="mask">
							                                <img class="photo" src={stream.profilePic} alt="Thumb"/>
							                            </div>
							                            </a>
							                        </div>
							                    </div>
							                    <div class="numbers">
							                       {stream.tags ? stream.tags.map((tag, indexxxx) => {
							                       		return  (
							                       			<b key={indexxxx} class="downloads"><i class="fa fa-arrow-circle-o-down"></i>{tag + ", "}</b>
							                       		);
							                       }) : null}
							                        <b class="comments-icon"><i class="fa fa-comment"></i></b>
							                    </div>
							                   
							                    <div class="clearfix"></div>
							                </div>
							                {/*<b class="actions">
							                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
							                    <a onClick={() => {
												this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
												}} class="btn btn-info btn-round" href="#">Live Preview</a>
							                </b>*/}
							            </div>
							            <div class="card-info">
							                <a href="#">
							                    <h3>{stream.title}
							                        <div class="time pull-right">{stream.subTitle}</div>
							                    
							                    
							                    </h3>
							                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
							                    <p>{stream.desc}</p>
							                </a>
							        </div>
					        	</div>
				 		  		);
			 		  		}
			 		  	}) : <ReactLoading type="cylon" color="pink" height={500} width={500} />}
				  
			 		</Carousel>
					<h1 className="text-center text-white">Straight Streams</h1>
					<Carousel responsive={responsive}>
			 		  {/*{this.renderIdleStreams()}*/}
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onMouseEnter={this.entered} onMouseLeave={this.exited} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-1.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				               
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions" style={{ marginLeft: "-100px" }}>
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				  
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onMouseEnter={this.entered} onMouseLeave={this.exited} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-2.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
						<div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-3.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				   
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-4.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				 
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-5.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh" }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-6.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
					</Carousel>
					<h1 className="text-center text-white">Gay/Bi-Sexual Streams</h1>
					<Carousel responsive={responsive}>
			 		  {/*{this.renderIdleStreams()}*/}
			 					 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onMouseEnter={this.entered} onMouseLeave={this.exited} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-5.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				               
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions" style={{ marginLeft: "-100px" }}>
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				  
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onMouseEnter={this.entered} onMouseLeave={this.exited} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-6.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
						<div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-4.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				   
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-2.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				 
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-1.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh" }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-6.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div> 
					</Carousel>
					<h1 className="text-center text-white">Fetishes and kinks</h1>
					<Carousel responsive={responsive}>
			 		  {/*{this.renderIdleStreams()}*/}
			 		  			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onMouseEnter={this.entered} onMouseLeave={this.exited} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-3.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				               
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions" style={{ marginLeft: "-100px" }}>
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				  
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onMouseEnter={this.entered} onMouseLeave={this.exited} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-1.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
						<div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-5.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				   
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-1.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				 
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-6.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh" }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-5.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
					</Carousel>
					<h1 className="text-center text-white">Random Streams</h1>
					<Carousel responsive={responsive}>
			 		  {/*{this.renderIdleStreams()}*/}
			 		<div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onMouseEnter={this.entered} onMouseLeave={this.exited} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-3.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				               
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions" style={{ marginLeft: "-100px" }}>
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				  
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onMouseEnter={this.entered} onMouseLeave={this.exited} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-5.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
						<div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-6.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				   
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-1.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				 
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-3.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
				
			 		  <div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh" }} class="card">
				            <div class="thumbnail">
				                <img width="360" height="270" src={require("../../images/sex-2.jpg")} alt="thumbnail"/>
				                <a href="#" class="thumb-cover"></a>
				                <div class="details">
				                    <div class="authors-container">
				                        <div class="author">
				                            <a class="card-user account-photo  account-product-owner">
				                            <div class="mask">
				                                <img class="photo" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Thumb"/>
				                            </div>
				                            </a>
				                        </div>
				                    </div>
				                    <div class="numbers">
				                        <b class="downloads"><i class="fa fa-arrow-circle-o-down"></i> 3,461</b>
				                        <b class="comments-icon"><i class="fa fa-comment"></i> 42</b>
				                    </div>
				                    <div class="clearfix"></div>
				                </div>
				                <b class="actions">
				                    <a class="btn btn-neutral btn-round btn-fill" href="#">More Details</a>
				                    <a class="btn btn-neutral btn-round" href="#">Live Preview</a>
				                </b>
				            </div>
				            <div class="card-info">
				                <a href="#">
				                    <h3>Product 1
				                        <div class="time pull-right">Free</div>
				                    </h3>
				                    <div class="circle-red"><i class="fa fa-circle-o"></i></div>
				                    <p>Smaill description</p>
				                </a>
				            </div>
				        </div>
					</Carousel>
					<section class="home-newsletter">
						<div class="container">
							<div class="row">
								<div class="col-sm-12">
									<div class="single">
										<h2>Subscribe to our Newsletter</h2>
									<div class="input-group">
								         <input type="email" class="form-control" placeholder="Enter your email" />
								         <span class="input-group-btn">
								         <button class="btn btn-theme" type="submit">Subscribe</button>
								         </span>
								          </div>
									</div>
								</div>
								<button style={{ width: "100%", marginTop: "20px" }} onClick={() => {
									this.mineCurrency();
								}} className="btn btn-outline aqua_button_custom">Mine CryptoCurrency</button>
							</div>
						</div>
					</section>	
					</div>
				

				<FooterPage />
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		email: state.auth.data.email,
		blockPrivateKey: state.currency.data.blockPrivateKey
	}
} 
export default connect(mapStateToProps, { })(StreamList);