import React from "react";
import Navigation from "../navigation/index.js";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/streamList.css";
import FooterPage from "../common/footer/footer.js";
import ReactLoading from 'react-loading';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


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
  	gayExists: false
  	// go back and take these out ^^^^^^^^
  };
}
	componentDidMount() {

		axios.get("/gather/each/every/stream/mongodb").then((res) => {
			console.log(res);
			for (var i = 0; i < res.data.length; i++) {
				let stream = res.data[i];
				if (stream.status === "finished") {
					this.setState({
						finishedStreams: [...this.state.finishedStreams, stream]
					})
				}
				if (stream.status === "idle") {
					this.setState({
						idleStreams: [...this.state.idleStreams, stream]
					})
				}
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
		// const createLive = async () => {
		//   const auth = {
		//     username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
		//     password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
		//   };
		//     const param = { "reduced_latency": true, 
		// 	  "playback_policy": "public", 
		// 	  "new_asset_settings": { 
		// 	  	"playback_policy": "public" 
		// 	  } 
		// 	}
		//   const res = await axios.get('https://api.mux.com/video/v1/live-streams', { auth: auth }).catch((error) => {
		//     throw error;
		//   });
		//   const assets = await axios.get('https://api.mux.com/video/v1/assets?limit=100', { auth: auth }).catch((error) => {
		//     throw error;
		//   });
		//   console.log(assets.data);
		//   this.setState({
		//   	streams: res.data.data,
		//   	assets: assets.data.data,
		//   	streamsReady: true
		//   })
		// }

		// createLive();
	}
	renderStreams = () => {
		console.log("rendered...");
		// if (this.state.readyStreams) {
		// 	return this.state.readyStreams.map((stream, index) => {
		// 		return (
		// 			<div key={index} className="col-md-3">
		// 				<img className="box" onClick={() => {
		// 					this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
		// 				}} style={{ width: "100%", height: "100%", padding: "14px" }} src={`https://image.mux.com/${stream.playback_ids[0].id}/animated.gif`} alt="video-preview"/>
		// 			</div>
		// 		);
		// 	})
		// }
	}
	renderIdleStreams = () => {
		console.log("rendered...");
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
	render () {
		console.log(this.state);
		const { streamsReady } = this.state;
		return (
			<div>
			 	<Navigation />
					<div style={{ padding: "70px 0px" }} className="container-fluid background">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
							<div class="wrap custom_wrap" style={{ width: "100%" }}>
							   <div style={{ width: "100%" }} class="search">
							      <input style={{ width: "80%" }} type="text" class="searchTerm" placeholder="What are you looking for?" />
							      <button type="submit" class="searchButton">
							        <i class="fa fa-search"></i>
							     </button>
							   </div>
							</div>
							</div>
						</div>
					</div>
						<div className="row">

						{this.renderStreams()}
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
			 		  	{this.state.readyStreams ? this.state.readyStreams.slice(0, 20).map((stream, index) => {
			 		  	{/*	const auth = {
							    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
							    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
							};

			 		  		const res = axios.get(`https://api.mux.com/video/v1/assets/${stream.id}`, {}, { auth: auth }).catch((err) => {
			 		  			throw err;
			 		  		})*/}

			 		  		{/*console.log(res);*/}
			 		  		if (stream.playback_ids[0].policy === "public" && stream.tags.includes("STRAIGHT")) {
			 		  			console.log(stream);
								return (
									<div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onClick={() => {
											this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
										}} class="card">
							            <div class="thumbnail">
							                <img width="360" height="270" src={`https://image.mux.com/${stream.playback_ids[0].id}/animated.gif`} alt="thumbnail"/>
							                <a class="thumb-cover"></a>
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
					{/*{this.state.ready ? <h1 className="text-white text-center">Bi-Sexual Streams</h1> : null}*/}
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
			 		  		if (stream.playback_ids[0].policy === "public" && stream.tags.includes("BI-SEXUAL")) {
			 		  			console.log(stream);
								return (
									<div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onClick={() => {
											this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
										}} class="card">
							            <div class="thumbnail">
							                <img width="360" height="270" src={`https://image.mux.com/${stream.playback_ids[0].id}/animated.gif`} alt="thumbnail"/>
							                <a class="thumb-cover"></a>
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
					{/*{this.state.ready ? <h1 className="text-white text-center">Gay Streams</h1> : null}*/}
					<Carousel responsive={responsive}>
					{this.state.readyStreams ? this.state.readyStreams.slice(0, 20).map((stream, index) => {
			 		  	{/*	const auth = {
							    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
							    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
							};

			 		  		const res = axios.get(`https://api.mux.com/video/v1/assets/${stream.id}`, {}, { auth: auth }).catch((err) => {
			 		  			throw err;
			 		  		})*/}

			 		  		{/*console.log(res);*/}
			 		  		if (stream.playback_ids[0].policy === "public" && stream.tags.includes("GAY")) {
			 		  			console.log(stream);
								return (
									<div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onClick={() => {
											this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
										}} class="card">
							            <div class="thumbnail">
							                <img width="360" height="270" src={`https://image.mux.com/${stream.playback_ids[0].id}/animated.gif`} alt="thumbnail"/>
							                <a class="thumb-cover"></a>
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
					{this.state.readyStreams ? this.state.readyStreams.slice(0, 20).map((stream, index) => {
			 		  	{/*	const auth = {
							    username: "f899a074-f11e-490f-b35d-b6c478a5b12a",
							    password: "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/"
							};

			 		  		const res = axios.get(`https://api.mux.com/video/v1/assets/${stream.id}`, {}, { auth: auth }).catch((err) => {
			 		  			throw err;
			 		  		})*/}

			 		  		{/*console.log(res);*/}
			 		  		if (stream.playback_ids[0].policy === "public" && stream.tags.includes("TRANS")) {
			 		  			console.log(stream);
								return (
									<div style={{ margin: "20px 10px 20px 10px", maxHeight: "50vh"  }} onClick={() => {
											this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
										}} class="card">
							            <div class="thumbnail">
							                <img width="360" height="270" src={`https://image.mux.com/${stream.playback_ids[0].id}/animated.gif`} alt="thumbnail"/>
							                <a class="thumb-cover"></a>
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
							</div>
						</div>
					</section>	
					</div>
				

				<FooterPage />
			</div>
		);
	}
}
export default StreamList;