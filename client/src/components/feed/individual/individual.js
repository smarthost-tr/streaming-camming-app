import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import { connect } from "react-redux";
import axios from "axios";
import Footer from "../../common/footer/footer.js";
import "../css/style.css";

class IndividualFeedPage extends Component {
constructor(props) {
    super(props);

    this.state = {
		post: null,
		username: "",
		comment: "",
		email: "",
		comments: [],
		id: "",
		deleteUpdated: false
    }
}
	componentDidMount() {
		this.setState({
			post: this.props.location.state.post,
			username: this.props.location.state.username,
			email: this.props.location.state.email,
			id: this.props.location.state.id
		});
		setTimeout(() => {
			axios.post("/gather/instagram/feed/comments", {
				email: this.state.email,
				id: this.state.post.uniqueID
			}).then((res) => {
				console.log(res.data);
				this.setState({
					comments: res.data.feed,
					updated: false
				})
			}).catch((err) => {
				console.log(err);
			})
		}, 500);
	}
	onCommentSubmission = () => {

		const { comment, username } = this.state;

		if (this.state.email.length > 0) {
			axios.post("/submit/feed/comment/individual", {
				email: this.props.email,
				comment,
				posterEmail: this.state.email,
				id: this.state.post.uniqueID,
				username: this.props.username
			}).then((res) => {
				console.log(res.data);
				if (res.data) {
					this.setState({
						comment: "",
						updated: false
					}, () => {
						alert("You've successfully posted a new comment!")
					})
				}
			}).catch((err) => {
				console.log(err);
				alert("System error occurred, please try again...")
			})
		} else {
			alert("No email avaliable.");
		}
	}
	componentDidUpdate(prevProps, prevState) {
		console.log(prevState);
		console.log(prevProps);
		if (this.state.updated === false) {
			console.log("ran!")
			axios.post("/gather/instagram/feed/comments", {
				email: this.state.email,
				id: this.state.post.uniqueID
			}).then((res) => {
				console.log(res.data);
				this.setState({
					comments: res.data.feed,
					updated: true
				})
			}).catch((err) => {
				console.log(err);
			})
		}
	}
	deleteComment = (comment) => {
		console.log("clicked...", comment);
		axios.put("/delete/comment/instagram/feed/individual", {
			username: this.state.username,
			comment,
			user: this.props.username
		}).then((res) => {
			console.log(res.data);
			if (res) {
				this.setState({
					deleteUpdated: true
				})
				alert("You've successfully deleted this comment!");
			}
		}).catch((err) => {
			console.log(err);
		})
	}
    render() {
    	let id;
    	console.log(this.state);
        return (
            <div>
            	<Navigation />
            	{this.state.post ? <div className="container"><button onClick={() => {
            		this.props.history.push(`/profiles/individual/${this.state.username}`);
            	}} style={{ width: "100%", margin: "30px 10px" }} className="btn btn-outline move_btn green_button_custom">Return To Previous Page</button>
					<div className="container">
					<div className="row" style={{ marginBottom: "30px" }}>
						<div className="col-md-9 col-lg-9 col-sm-12 custom_col">
							<input style={{ width: "100%", margin: "10px 20px" }} type="text" onChange={(e) => {
	                        	this.setState({
	                        		comment: e.target.value
	                        	})
	                        }} class="form-control comment" placeholder="Drop a comment on this picture..." value={this.state.comment} />
						</div>
						<div className="col-md-2 col-lg-2">
							<button onClick={() => {
								this.onCommentSubmission();
							}} style={{ width: "100%" }} className="btn btn-outline aqua_button_custom">Submit Comment</button>
						</div>
					</div>
					
						<div className="row">
							<div className="col-md-7 col-lg-7 col-sm-12 col-xs-12">
								<img id="individual_image" src={this.state.post.link} alt="individual-image"/>
							</div>
							<div class="col-lg-5 col-md-5 col-xs-12 col-sm-12">
						        <div class="cardddd">
						            <div class="card-body text-center">
						                <h4 class="card-title">Latest Comments</h4>
						            </div>
						            <div class="comment-widgets">
						                {this.state.comments ? this.state.comments.map((comment, index) => {
						                	return comment.comments.reverse().map((item, indexx) => {
							                	if (item !== null) {
							                		if (item.id === this.state.id) {
							                			console.log(item);
														return (
															<React.Fragment>
															<div class="d-flex flex-row comment-row">
											                    <div class="p-2"><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583319/AAA/3.jpg" alt="user" width="50" class="rounded-circle"/></div>
											                    <div class="comment-text active w-100">
											                        <h6 class="font-medium">{item.username}</h6> <span class="m-b-15 d-block">{item.comment} </span>
											                        <div class="comment-footer"> <span class="text-muted float-right">{item.date}</span> 
											                        {/*{item.username === this.props.username ? <button onClick={() => {
											                        	this.deleteComment(item.comment);
											                        }} type="button" class="btn btn-danger btn-sm">Delete</button> : null}*/}
											                        {/*<button type="button" class="btn btn-cyan btn-sm">Edit</button> 
											                        <button type="button" class="btn btn-success btn-sm">Publish</button>
											                        <button type="button" class="btn btn-danger btn-sm">Delete</button> */}
											                         </div>
											                    </div>
											                </div> 
											                </React.Fragment>
														);
							                		}
							                	}
						                	})
						                }) : null}
						                
						                {/*<div class="d-flex flex-row comment-row">
						                    <div class="p-2"><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583319/AAA/3.jpg" alt="user" width="50" class="rounded-circle"/></div>
						                    <div class="comment-text active w-100">
						                        <h6 class="font-medium">Michael Hussey</h6> <span class="m-b-15 d-block">Thanks bbbootstrap.com for providing such useful snippets. </span>
						                        <div class="comment-footer"> <span class="text-muted float-right">May 10, 2019</span> <button type="button" class="btn btn-cyan btn-sm">Edit</button> <button type="button" class="btn btn-success btn-sm">Publish</button> <button type="button" class="btn btn-danger btn-sm">Delete</button> </div>
						                    </div>
						                </div> 
						                <div class="d-flex flex-row comment-row">
						                    <div class="p-2"><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg" alt="user" width="50" class="rounded-circle"/></div>
						                    <div class="comment-text w-100">
						                        <h6 class="font-medium">Johnathan Doeting</h6> <span class="m-b-15 d-block">Great industry leaders are not the real heroes of stock market. </span>
						                        <div class="comment-footer"> <span class="text-muted float-right">August 1, 2019</span> <button type="button" class="btn btn-cyan btn-sm">Edit</button> <button type="button" class="btn btn-success btn-sm">Publish</button> <button type="button" class="btn btn-danger btn-sm">Delete</button> </div>
						                    </div>
						                </div>*/}
						            </div> 
						        </div>
						    </div>
						</div>
						<div className="row" style={{ marginTop: "30px" }}>
							<h6 className="text-center"><strong style={{ color: "#37be43" }}>Title:</strong> {this.state.post.title}</h6>
							<hr className="my-4"/>
							<h6 className="text-center"><strong style={{ color: "#37be43" }}>Sub:</strong> {this.state.post.subtitle}</h6>
							<hr className="my-4"/>

							<p className="lead text-white"><strong style={{ color: "#37be43" }}>Description:</strong> {this.state.post.desc}</p>
						</div>
					</div></div> : null}

				<Footer />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
	return {
		email: state.auth.data.email,
		username: state.auth.data.username
	}
}

export default connect(mapStateToProps, {  })(IndividualFeedPage);
