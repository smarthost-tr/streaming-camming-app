import React, { Component } from "react";
import Navigation from "../navigation/index.js";
import "./css/streamShow.css";
import Progress from 'react-progressbar';


class StreamShowSub extends Component {
constructor(props) {
	super(props)

}
	renderSubmit = (e) => {
		e.preventDefault();
		console.log("render submit clicked...");
	}
	render () {
		let user;
		console.log(this.props);
		for (let key in this.props) {
			user = this.props[key][0];
		}
		console.log(user);
		return (
			<div>
				<div style={{ marginBottom: "-50px", paddingBottom: "50px" }} class="container-fluid emp-profile">
				       	<form onSubmit={this.renderSubmit}>
				                <div class="row">
				                    <div class="col-md-4">
				                        <div class="profile-img">
				                            <img src={user.profile.profilePic} alt="profile-pic"/>
				                           {/* <div class="file btn btn-lg btn-primary">
				                                Change Photo
				                                <input type="file" name="file"/>
				                            </div>*/}
				                        </div>
				                    </div>
				                    <div class="col-md-6">
				                        <div class="profile-head">
				                                    <h5>
				                                        First Name: {user.firstName} <br/> 
				                                        Username: {user.username}
				                                    </h5>
				                                    <h6 style={{ color: "white" }}>
				                                        Cam Model / Streamer
				                                    </h6>
				                                    <p style={{ color: "#37be43" }} class="proile-rating">RANKINGS : <span style={{ color: "#37be43" }}>8/10</span></p>
				                            <ul class="nav nav-tabs" id="myTab" role="tablist">
				                                <li class="nav-item">
				                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
				                                </li>
				                                <li class="nav-item">
				                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Bio/About-Me</a>
				                                </li>
				                            </ul>
				                        </div>
				                    </div>
				                    <div class="col-md-2">
				                       {/* <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>*/}
				                    </div>
				                </div>
				                <div class="row">
				                    <div class="col-md-4">
				                        <div class="profile-work">
				                         {/*   <p>WORK LINK</p>
				                            <a href="">Website Link</a><br/>
				                            <a href="">Bootsnipp Profile</a><br/>
				                            <a href="">Bootply Profile</a>*/}
				                            {user.skills ? <p>SKILLS</p> : null}
				                            {user.skills ? user.skills.map((skill, index) => {
				                            	console.log(skill);
				                            	return (
					                            	<React.Fragment>
														<a href="">{skill.skill} - {skill.percentage}%</a><br/>
														<Progress completed={skill.percentage} />
													</React.Fragment>
				                            	);
				                            }) : null}
				                            
				                           {/* <a href="">Web Developer</a><br/>
				                            <a href="">WordPress</a><br/>
				                            <a href="">WooCommerce</a><br/>
				                            <a href="">PHP, .Net</a><br/>*/}
				                        </div>
				                    </div>
				                    <div class="col-md-8">
				                        <div class="tab-content profile-tab" id="myTabContent">
				                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
				                                        <div class="row">
				                                            <div class="col-md-6">
				                                                <label>Username</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>{user.username}</p>
				                                            </div>
				                                        </div>
				                                        <div class="row">
				                                            <div class="col-md-6">
				                                                <label>Age</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>{user.profile.age}</p>
				                                            </div>
				                                        </div>
				                                        <div class="row">
				                                            <div class="col-md-6">
				                                                <label>Preferences</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>{user.profile.interestedIn}</p>
				                                            </div>
				                                        </div>
				                                        <div class="row">
				                                            <div class="col-md-6">
				                                                <label>Hair Color</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>{user.profile.hairColor}</p>
				                                            </div>
				                                        </div>
				                                        <div class="row">
				                                            <div class="col-md-6">
				                                                <label>Eye Color</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>{user.profile.eyeColor}</p>
				                                            </div>
				                                        </div>
				                                        <div class="row">
				                                            <div class="col-md-6">
				                                                <label>Spoken Languages</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>{user.profile.languages}</p>
				                                            </div>
				                                        </div>
				                                        <div class="row">
				                                            <div class="col-md-6">
				                                                <label>Body Type</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>{user.profile.bodyType}</p>
				                                            </div>
				                                        </div>
				                                        <div class="row">
				                                            <div class="col-md-6">
				                                                <label>Bust/Breast Size</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>{user.profile.breastSize}</p>
				                                            </div>
				                                        </div>
				                                         <div class="row">
				                                            <div class="col-md-6">
				                                                <label>Smoking/Drinking</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>{user.profile.smokeOrDrink}</p>
				                                            </div>
				                                        </div>
				                                        <div class="row">
				                                            <div class="col-md-6">
				                                                <label>Nick-Name</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>{user.profile.nickName}</p>
				                                            </div>
				                                        </div>
				                            </div>
				                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
				                                        {/*<div class="row">
				                                            <div class="col-md-6">
				                                                <label>Bio/About</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>{user.profile.bio}</p>
				                                            </div>
				                                        </div>*/}
				                                        {/*<div class="row">
				                                            <div class="col-md-6">
				                                                <label>Hourly Rate</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>10$/hr</p>
				                                            </div>
				                                        </div>
				                                        <div class="row">
				                                            <div class="col-md-6">
				                                                <label>Total Projects</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>230</p>
				                                            </div>
				                                        </div>
				                                        <div class="row">
				                                            <div class="col-md-6">
				                                                <label>English Level</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>Expert</p>
				                                            </div>
				                                        </div>
				                                        <div class="row">
				                                            <div class="col-md-6">
				                                                <label>Availability</label>
				                                            </div>
				                                            <div class="col-md-6">
				                                                <p>6 months</p>
				                                            </div>
				                                        </div>*/}
				                                <div class="row">
				                                    <div class="col-md-12">
				                                        <label>Bio/About Section</label><br/>
				                                        <p>{user.profile.bio}</p>
				                                    </div>
				                                </div>
				                            </div>
				                        </div>
				                    </div>
				                </div>
				            </form>           
				        </div>
			</div>
		);
	}
}
export default StreamShowSub;