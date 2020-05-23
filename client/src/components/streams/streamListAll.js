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
				this.setState({
					readyStreams: [...this.state.readyStreams, stream]
				})					
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
					<div className="row" style={{ marginTop: "20px" }}>
						{this.state.readyStreams ? this.state.readyStreams.map((stream, index) => {
							console.log(stream);
							if (stream.active === true) {
								return (
									<div key={index} onClick={() => {
										this.props.history.push(`/view/individual/private/stream/${stream.id}`, { streamID: stream.id })
									}} className="col-md-3 col-lg-3 col-sm-6">
											<div style={{ margin: "20px 10px 20px 10px" }} class="card">
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
									</div>
								);
							}
						}) : null}
					</div>
				</div>
				<FooterPage />
            </div>
        );
    }
}

export default StreamListAll;
