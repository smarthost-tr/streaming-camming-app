import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/profile.css";
import Modal from 'react-modal';
import Footer from "../../common/footer/footer.js";
import ReactLoading from 'react-loading';

 
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
		skills: [],
		currentPage: 1,
		profilesPerPage: 20
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
			                    }} className="btn btn-outline aqua_button_custom" style={{ width: "100%", marginTop: "20px" }}>Visit This Model's Profile</button></h3>
			                    <hr className="my-4"/>
			                    <button className="btn btn-outline aqua_button_custom" onClick={this.closeModal} style={{ width: "100%", marginBottom: "20px" }}>close</button>
			                    <span><strong style={{ marginBottom: "30px", color: "white" }}>Skills: </strong></span>
			                    <div className="horizontal">
			                    {this.state.skills.length > 0 ? this.state.skills.map((each, index) => {
									if (each.skills) {
										return each.skills.map((skill, index) => {
	                                		console.log(skill);
	                                		return (
												<span class="label label-warning tag text-dark">{skill.skill} - {skill.percentage}%</span>
	                                		);
										})
									} else {
										return <h3 className="text-center text-white">No skills have been listed...</h3>
									}
	                        	}) : <h3 className="text-center text-white">No skills have been listed...</h3>}
			                    </div>
		                    </div>
		                    <hr className="my-4" />
		                </div>
		            </div>
		        </div>
		        
	        </Modal>

		);
	}
    handleClickPage = (event) => {
	    this.setState({
	      currentPage: Number(event.target.id)
	    }, () => {
	    	console.log(this.state.currentPage);
	    });
    }
	render() {

		let renderUsers;
		
		const { currentPage, profilesPerPage, users } = this.state; 
	    	// Logic for displaying users
	    const lastIndexOfUser = currentPage * profilesPerPage;
	    const indexOfFirstUser = lastIndexOfUser - profilesPerPage;
	    let currentUsers = users.slice(indexOfFirstUser, lastIndexOfUser);

	    if (currentUsers) {
	    	renderUsers = currentUsers.map((user, index) => {
					return (	
						  <React.Fragment key={index}>
						    <div onClick={() => {
						    	console.log("clicked.");
						    	this.handleClick(user);
						    }} class="card col-md-2 hover_card" style={{ height: "100%", margin: "0px 12px 30px 12px", boxShadow: "10px 10px 10px grey" }}>
						     <img class="card-img" src={user.profile.profilePic} alt="profile-pic" />
						        <div class="card-img-overlay text-white d-flex justify-content-center align-items-end">
						          <p>{user.username}</p>
						        </div>
						    </div>
						 </React.Fragment>
					);
			})
	    }

	    // Logic for displaying page numbers
	    const pageNumbers = [];
	    for (let i = 1; i <= Math.ceil(users.length / profilesPerPage); i++) {
	      pageNumbers.push(i);
	    }

	    const renderPageNumbers = pageNumbers.map(number => {
	      return (
	        <a className="pagination-tag"
	          key={number}
	          id={number}
	          onClick={this.handleClickPage}
	        >
	          {number}
	        </a>
	      );
	    });
    	console.log(this.state);
        return (
            <div>
				<Navigation />
				<div className="container-fluid style_container">
					<div className="row" style={{ padding: "20px 0px" }}>
					
					{/*{this.state.users ? this.state.users.map((user, index) => {
						console.log("user", user);
							return (	
								  <React.Fragment>
								    <div onClick={() => {
								    	console.log("clicked.");
								    	this.handleClick(user);
								    }} class="card col-md-2 hover_card" style={{ height: "100%", margin: "0px 12px 30px 12px", boxShadow: "10px 10px 10px grey" }}>
								     <img class="card-img" src={user.profile.profilePic} alt="profile-pic" />
								        <div class="card-img-overlay text-white d-flex justify-content-center align-items-end">
								          <p>{user.username}</p>
								        </div>
								    </div>
								 </React.Fragment>
							);
					}) : <div className="mx-auto"><ReactLoading type="spinningBubbles" color="black" height={500} width={500} /></div>}*/}
						{renderUsers ? renderUsers : null}
					
						{this.renderModalContent()}
					</div>
					<div className="row">
						<div class="paginate mx-auto">
							{renderPageNumbers}
						</div>
					</div>
				</div>
				<Footer />
            </div>
        );
    }
}

export default AllProfilesHomepage;


