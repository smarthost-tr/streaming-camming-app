import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import { connect } from "react-redux";
import axios from "axios";
import Footer from "../../common/footer/footer.js";
import "../css/home.css";
import { Link } from "react-router-dom";

class OthersFriendsList extends Component {
constructor(props) {
    super(props);

	this.state = {
		friends: []
	}
}
	// redirectUser = (friend) => {
	// 	console.log("redirected...", friend);

	// 	let user = this.props.location.state.user;

 //    	if (user.username) {
 //    		console.log("let user be as it was...");
 //    	} else if (user.profile) {
	// 		user = user;
 //    	} else {
 //    		user = user[0];
 //    	}

	// 	if (typeof friend !== undefined) {
	// 		axios.post("/gather/username/profile", {
	// 	      username: friend.username
	// 	    }).then((res) => {
	// 	      console.log(res.data);
	// 	      if (res.data) {
	// 	        this.props.history.push(`/profiles/individual/${friend.username}`, { user: res.data });
	// 	      }
	// 	    }).catch((err) => {
	// 	      console.log(err);
	// 	    })
	// 	} else {
	// 		axios.post("/gather/username/profile", {
	// 	      username: user.username
	// 	    }).then((res) => {
	// 	      console.log(res.data);
	// 	      if (res.data) {
	// 	        this.props.history.push(`/profiles/individual/${user.username}`, { user: res.data });
	// 	      }
	// 	    }).catch((err) => {
	// 	      console.log(err);
	// 	    })
	// 	}
	// }
	componentDidMount() {

		setTimeout(() => {
			let user = this.props.location.state.user;

			axios.post("/gather/friends/list/personalized", {
				email: user.email
			}).then((res) => {
				console.log(res.data);
				for (let key in res.data) {
					let friends = res.data[key].friends;
					this.setState({
						friends
					})
				}
			}).catch((err) => {
				console.log(err);
			})
		}, 500);
	}
    render() {
    	let user = this.props.location.state.user;
    	if (user.username) {
    		console.log("let user be as it was...");
    	} else if (user.profile) {
			user = user;
    	} else {
    		user = user[0];
    	}


    	console.log("this.props :", this.props);
    	console.log(this.state);
        return (
            <div>
            	<Navigation />
            	<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<div class="jumbotron custom_jumbo jumbotron-fluid">
							  <div class="container">
							    <h1 class="display-4 bold">Welcome to {user.username}'s friend's page!</h1>
							    <p class="lead bold">These are friends that are friend's of {user.username}. Feel free to connect with them!</p>
							  </div>
							</div>
						</div>
					</div>
            	</div>
				<div className="container-fluid" style={{ margin: "50px 0px" }}>
					<div className="row">
				
						{this.state.friends ? this.state.friends.map((friend, index) => {
							console.log(friend);
							if (friend.status === "accepted") {
								return (
									<div style={{ margin: "30px 0px" }} onClick={() => {
										{/*this.redirectUser(friend);*/}
									}} className="col-md-2">
										<div style={{ height: "100%" }} class="card">
									    <img src={friend.image ? friend.image : require("../../../images/no-image.png")} class="card-img-top" alt="..." />
									    <div class="card-body">
									      <h5 class="card-title">{friend.username}</h5>
									      {/*<p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>*/}
									    </div>
									  </div>
									</div>
								);
							}
						}) : null}
						{/*{this.state.friends.length === 0 ? <h1 className="text-center">We noticed you haven't added any friends yet, send some invites to make a few! :)</h1> : null}*/}


					</div>
				</div>
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

export default connect(mapStateToProps, {  })(OthersFriendsList);
