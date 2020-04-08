import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import { connect } from "react-redux";
import axios from "axios";
import Footer from "../../common/footer/footer.js";
import "../css/home.css";

class FriendsListHome extends Component {
constructor(props) {
    super(props);

	this.state = {
		friends: []
	}
}
	componentDidMount() {
		setTimeout(() => {
			axios.post("/gather/friends/list/personalized", {
				email: this.props.email
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
	redirectToIndividualPage = (friend) => {
	    axios.post("/gather/username/profile", {
	      username: friend.username
	    }).then((res) => {
	      console.log(res.data);
	      if (res.data) {
	        this.props.history.push(`/profiles/individual/${friend.username}`, { user: res.data });
	      }
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
						<div className="col-md-12">
							<div class="jumbotron custom_jumbo jumbotron-fluid">
							  <div class="container">
							    <h1 class="display-4 bold">Welcome to your PERSONAL friend's page!</h1>
							    <p class="lead bold">These are your personal friends on our platform, message them and connect! It's never to late to book a private showing.</p>
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
										this.redirectToIndividualPage(friend);
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

export default connect(mapStateToProps, {  })(FriendsListHome);
