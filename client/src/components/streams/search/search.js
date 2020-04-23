import React, { Component } from 'react';
import Modal from 'react-modal';
import "./css/search.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width 				  : '600px'
  }
};
 


class SearchContainer extends Component {
constructor(props) {
    super(props);

	this.state = {
		searchTerm: "",
		isModalVisible: false,
		ready: false,
		user: null
	}
}
	close = () => {
		this.setState({
			isModalVisible: false,
			ready: false
		})
	}
	searchForUser = () => {
		console.log("search for user...");
		axios.post("/search/user", {
			username: this.state.searchTerm
		}).then((res) => {
			console.log(res.data);
			this.setState({
				ready: true,
				user: res.data
			})
			if (!res.data) {
				alert("We could not find this user in our database, please check for another username.");
			}
		}).catch((err) => {
			console.log(err);
		})
	}
	redirectUser = () => {
		console.log("redirecting...");

		const { user } = this.state;

		this.props.history.push(`/profiles/individual/${user.username}`, { user });
	}
	renderModal = () => {
		if (this.state.ready && this.state.user) {
			return (
			<Modal
	          isOpen={this.state.isModalVisible}
	          contentLabel="User Information" 
	          style={customStyles}
	        >
	 
	         
	          
				<div class="modal-dialog container">
		            <div class="modal-content">
		                
		                <div class="modal-body">
		                    <div className="mx-auto">
			                    <a><img id="modal_img" src={this.state.user ? this.state.user.profile.profilePic : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRbezqZpEuwGSvitKy3wrwnth5kysKdRqBW54cAszm_wiutku3R"} name="aboutme" width="140" height="140" border="0" class="img-circle" /></a>
			                    <h3 class="media-heading">Username: {this.state.user ? this.state.user.username : null} <br/><small>Age: {this.state.user ? this.state.user.profile.age : null}</small><button onClick={() => {
			                    	this.redirectUser(this.state.user);
			                    }} className="btn btn-outline aqua_button_custom" style={{ width: "100%", marginTop: "20px" }}>Visit This Model's Profile</button></h3>
			                    <hr className="my-4"/>
			                    <button id="button_black" style={{ width: "100%" }} onClick={() => {
						          	this.close();
						          }} className="btn btn-outline aqua_button_custom">Close</button>
			                    <span><strong style={{ marginBottom: "30px", color: "white" }}>Skills: </strong></span>
			                    <div className="horizontal">
			                    {this.state.skills ? this.state.skills.map((each, index) => {
									if (each.skills) {
										return each.skills.map((skill, index) => {
	                                		console.log(skill);
	                                		return (
												<span class="label label-warning tag text-dark">{skill.skill} - {skill.percentage}%</span>
	                                		);
										})
									} else {
										return <h3 className="text-center text-dark">No skills have been listed...</h3>
									}
	                        	}) : <h3 className="text-center text-dark">No skills have been listed...</h3>}
			                    </div>
		                    </div>
		                    <hr className="my-4" />
		                </div>
		            </div>
		        </div>
		        
	        </Modal>
			);
		}
	}
    render() {
    	console.log(this.state);
        return (
			<div className="container">

				<div className="row" style={{ marginBottom: "20px" }}>
					<div className="col-md-12 custom_col">

					<div class="wrap custom_wrap" style={{ width: "100%" }}>
					<label id="label_custom text-center">Quickly access users profiles</label>
					   <div style={{ width: "100%"}} class="search">

					      <input value={this.state.searchTerm} onChange={(e) => {
					      	this.setState({
								searchTerm: e.target.value
					      	})
					      }} style={{ width: "100%" }} type="text" class="searchTerm" placeholder="Are you trying to find a user? Search their name here and we'll locate them for you...!" />
					      <button onClick={() => {
					      	this.searchForUser();
					      	setTimeout(() => {
								this.setState({
						      		isModalVisible: true
						      	})
					      	}, 1000);
					      }} type="submit" class="searchButton">
					        <i class="fa fa-search"></i>
					        
					     </button>
					     {this.renderModal()}
					   </div>
					</div>
					</div>
				</div>
			</div>
        );
    }
}

export default withRouter(SearchContainer);
