import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/profile.css";
import Modal from 'react-modal';
import Footer from "../../common/footer/footer.js";
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)',
    background            : "black"
  }
};

const streamsArray = [];

class AllProfilesHomepage extends Component {
constructor(props) {
    super(props);

	this.state = {
		users: [],
		streams: [],
		ready: false,
		successful: false,
		modalIsOpen: false,
		user: null,
		skills: []
	}
}
	componentDidMount() {
		axios.get("/gather/all/users").then((res) => {
			console.log(res.data);
			this.setState({
				users: res.data,
				successful: true
			});
		}).catch((err) => {
			console.log(err);
		})
	}
	handleClick = (user) => {
		console.log("entered :", user);

		axios.post("/gather/skills/profile/page", {
			email: user.email
		}).then((res) => {
			console.log(res.data);
			this.setState({
				skills: res.data
			});
		}).catch((err) => {
			console.log(err);
		})
		this.setState({
			user,
			modalIsOpen: true
		})
	}
	afterOpenModal = () => {
    	// references are now sync'd and can be accessed.
    	
    }
    closeModal = () => {
    	this.setState({
    		modalIsOpen: false
    	})
    }
    redirectUser = (user) => {
    	this.props.history.push(`/profiles/individual/${user.username}`, { user })
    }
	renderModalContent = () => {
		console.log(this.state.user);
		return (
			<Modal
	          isOpen={this.state.modalIsOpen}
	          onAfterOpen={this.afterOpenModal}
	          onRequestClose={this.closeModal}
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
			                    }} className="btn btn-outline purple_button" style={{ width: "100%" }}>Visit This Model's Profile</button></h3>
			                    <hr className="my-4"/>
			                    <button className="btn btn-outline pink_button" onClick={this.closeModal} style={{ width: "100%" }}>close</button>
			                    <span><strong style={{ marginBottom: "30px" }}>Skills: </strong></span>
			                    <div className="horizontal">
			                    {this.state.skills.length > 0 ? this.state.skills.map((each, index) => {
									if (each.skills) {
										return each.skills.map((skill, index) => {
	                                		console.log(skill);
	                                		return (
												<span class="label label-warning tag">{skill.skill} - {skill.percentage}%</span>
	                                		);
										})
									} else {
										return <h3 className="text-center">No skills have been listed...</h3>
									}
	                        	}) : <h3 className="text-center">No skills have been listed...</h3>}
			                    </div>
		                    </div>
		                    <hr className="my-4" />
		                </div>
		            </div>
		        </div>
		        
	        </Modal>

		);
	}
    render() {
    	console.log(this.state);
        return (
            <div>
				<Navigation />
				<div className="container-fluid">
					<div className="row">
					
					{this.state.users ? this.state.users.map((user, index) => {
						console.log("user", user);
							return (	
								  <React.Fragment>
								    <div onClick={() => {
								    	console.log("clicked.");
								    	this.handleClick(user);
								    }} class="card col-md-2 hover_card" style={{ height: "100%", margin: "0px 12px 30px 12px" }}>
								     <img class="card-img" src={user.profile.profilePic} alt="profile-pic" />
								        <div class="card-img-overlay text-white d-flex justify-content-center align-items-end">
								          <p>{user.username}</p>
								        </div>
								    </div>
								 </React.Fragment>
							);
					}) : null}
						{this.renderModalContent()}
					</div>
				</div>
				<Footer />
            </div>
        );
    }
}

export default AllProfilesHomepage;


