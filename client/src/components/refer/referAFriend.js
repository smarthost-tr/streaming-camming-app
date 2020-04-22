import React, { Component } from 'react';
import Navigation from "../navigation/index.js";
import "./style.css";
import Footer from "../common/footer/footer.js";

class ReferAFriendPage extends Component {
constructor(props) {
    super(props);

}
	renderSubmission = () => {
		console.log("button clicked...");

	}
	componentDidMount() {
		window.scrollTo(0, 0)
	}
    render() {
        return (
			<div>
				<Navigation />
					<div class="jumbotron jumbotron-fluid bg-dark jum">

					  <div class="container text-white transparency">

					    <h1>Refer someone and get a $50 bonus once they make $200 or more!</h1>
					    <p class="lead">Enter your friends/aquaintences email below and we will send them a code to enter upon registration.</p>
					    <hr class="my-4" />
					    <input style={{ marginBottom: "23px" }} type="text" class="form-control" placeholder="Enter the person's email who you're referring..." />
					    <button onClick={this.renderSubmission} class="btn btn-outline aqua_button_custom" role="button">Learn more</button>

					  </div>	 
					</div>
				<Footer />
			</div>            
        );
    }
}

export default ReferAFriendPage;
