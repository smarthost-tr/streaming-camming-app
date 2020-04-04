import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import "../css/pages.css";
import axios from "axios";
import { connect } from "react-redux";
import ProgressBar from "../progress.js";
import Footer from "../../common/footer/footer.js";
import ImageUploader from 'react-images-upload';


class PageThreeCammerSignup extends Component {
constructor(props) {
    super(props);

	this.state = {
		age: "",
		interestedIn: "",
		hairColor: "",
		eyeColor: "",
		languages: "english",
		bodyType: "",
		breastSize: "",
		smokeOrDrink: "smokes_occasionally",
		nickName: "",
		bio: "",
		pictures: []
	}
}
	onDrop = (picture) => {
        this.setState({
            pictures: this.state.pictures.concat(picture)
        });
    }
	handleProfileSubmission = (e) => {
		e.preventDefault();

		const formData = new FormData();

		const { pictures, age, interestedIn, hairColor, eyeColor, languages, bodyType, breastSize, smokeOrDrink, nickName, bio } = this.state;

        formData.append('image', pictures);
        formData.append("age", age);
        formData.append("interestedIn", interestedIn);
        formData.append("hairColor", hairColor);
        formData.append("eyeColor", eyeColor);
        formData.append("languages", languages);
        formData.append("bodyType", bodyType);
        formData.append("breastSize", breastSize);
        formData.append("smokeOrDrink", smokeOrDrink);
        formData.append("nickName", nickName);
        formData.append("bio", bio);
        formData.append("email", this.props.email);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

		console.log("form submitted...");

		if (age !== null && interestedIn.length > 0 && hairColor.length > 0 && eyeColor.length > 0 && languages.length > 0 && bodyType.length > 0 && breastSize.length > 0 && smokeOrDrink.length > 0 && nickName.length > 0 && bio.length > 0) {
			axios.post("/profile/append/data/one", formData, config).then((res) => {
				console.log(res.data);
				if (res) {
					this.setState({
						age: null,
						interestedIn: "",
						hairColor: "",
						eyeColor: "",
						languages: "",
						bodyType: "",
						breastSize: "",
						smokeOrDrink: "",
						nickName: "",
						bio: ""
					}, () => {
						alert("You have successfully updated your profile information and it will now be visible!")
					})
				}				
			}).catch((err) => {
				console.log(err);
			})
		} else {
			alert("Please fill out every field.")
		}
	}
    render() {
    	console.log(this.state.pictures);
        return (
            <div className="pink_background">
            	<Navigation />
            	<ProgressBar progress={85} />
            	<div style={{ marginTop: "20px" }} className="mx-auto">
					<h2 className="text-center">You MUST complete your profile before you can stream or appear in the "Profiles" section to post your videos for sale...</h2>
            	</div>
					<div className="container" style={{ height: "100%" }}>
						<div className="row">
							<div className="col-md-3" style={{ marginTop: "50px" }}>
							     <div className="list-group ">
					              <a href="#" className="list-group-item list-group-item-action active">Personal/public information while streaming</a>
					              <a href="#" className="list-group-item list-group-item-action">User Management</a>
					              <a href="#" className="list-group-item list-group-item-action">Used</a>
					              <a href="#" className="list-group-item list-group-item-action">Enquiry</a>
					              <a href="#" className="list-group-item list-group-item-action">Dealer</a>
					            
					              
					              
					            </div> 
							</div>
							<div className="col-md-9">
							    <div className="card custom_card_two">
							        <div className="card-body">
							            <div className="row">
							                <div className="col-md-12">
							                    <h4>Your Profile</h4>
							                    <hr />
							                </div>
							            </div>
							            <div className="row">
							                <div className="col-md-12">
							                    <form type="multipart/form-data" onSubmit={this.handleProfileSubmission}>
							                    <div className="form-group row">
					                                <label for="username" className="col-4 col-form-label">Age</label> 
					                                <div className="col-8">
					                                  <input value={this.state.age} onChange={(e) => {
					                                  	this.setState({
															age: e.target.value
					                                  	})
					                                  }} id="username" name="username" placeholder="Enter your age as shown on your ID - we routinely check these." className="form-control here" required="required" type="text"/>
					                                </div>
					                              </div>
					                              <div className="form-group row">
					                                <label for="username" className="col-4 col-form-label">Interested IN</label> 
					                                <div className="col-8">
					                                  <input value={this.state.interestedIn} onChange={(e) => {
					                                  	this.setState({
															interestedIn: e.target.value
					                                  	})
					                                  }} id="username" name="username" placeholder="Couples, Males, Females, Trans, Etc..." className="form-control here" required="required" type="text"/>
					                                </div>
					                              </div>
					                              <div className="form-group row">
					                                <label for="name" className="col-4 col-form-label">Hair Color</label> 
					                                <div className="col-8">
					                                  <input value={this.state.hairColor} onChange={(e) => {
					                                  	this.setState({
															hairColor: e.target.value
					                                  	})
					                                  }} id="name" name="name" placeholder="Natural Hair Color" className="form-control here" type="text"/>
					                                </div>
					                              </div>
					                              <div className="form-group row">
					                                <label for="lastname" className="col-4 col-form-label">Eye Color</label> 
					                                <div className="col-8">
					                                  <input value={this.state.eyeColor} onChange={(e) => {
					                                  	this.setState({
															eyeColor: e.target.value
					                                  	})
					                                  }} id="lastname" name="lastname" placeholder="Eye Color" className="form-control here" type="text"/>
					                                </div>
					                              </div>
					                              <div className="form-group row">
					                                <label for="text" className="col-4 col-form-label">Nick Name</label> 
					                                <div className="col-8">
					                                  <input value={this.state.nickName} onChange={(e) => {
					                                  	this.setState({
															nickName: e.target.value
					                                  	})
					                                  }} id="text" name="text" placeholder="Nick Name - Ex. Cherry" className="form-control here" required="required" type="text"/>
					                                </div>
					                              </div>
					                              <div className="form-group row">
					                                <label for="select" className="col-4 col-form-label">Primary Language</label> 
					                                <div className="col-8">
					                                  <select value={this.state.languages} onChange={(e) => {
					                                  	console.log(e.target.value)
					                                  	this.setState({
															languages: e.target.value
					                                  	})
					                                  }} id="select" name="languages" className="custom-select">
					                                    <option selected value="english">English</option>
					                                    <option value="spanish">Spanish</option>
					                                    <option value="french">French</option>
					                                    <option value="german">German</option>
					                                    <option value="chinesse">Chineese</option>
					                                    <option value="portuguese">Portuguese</option>
					                      
					                                  </select>
					                                </div>
					                              </div>
					                              <div className="form-group row">
					                                <label for="email" className="col-4 col-form-label">Body Type</label> 
					                                <div className="col-8">
					                                  <input value={this.state.bodyType} onChange={(e) => {
					                                  	this.setState({
															bodyType: e.target.value
					                                  	})
					                                  }} id="email" name="email" placeholder="Body Type - Athletic, Slim, Thick, Etc..." className="form-control here" required="required" type="text"/>
					                                </div>
					                              </div>
					                              <div className="form-group row">
					                                <label for="website" className="col-4 col-form-label">Breast Size</label> 
					                                <div className="col-8">
					                                  <input value={this.state.breastSize} onChange={(e) => {
					                                  	this.setState({
															breastSize: e.target.value
					                                  	})
					                                  }} placeholder="34B" className="form-control here" type="text"/>
					                                </div>
					                              </div>
					                              <div className="form-group row">
					                                <label for="publicinfo" className="col-4 col-form-label">Bio - What do you want to tell your viewers</label> 
					                                <div className="col-8">
					                                  <textarea value={this.state.bio} onChange={(e) => {
					                                  	this.setState({
															bio: e.target.value
					                                  	})
					                                  }} id="publicinfo" name="publicinfo" placeholder="This is your time to tell your viewers exactly what you'd like to tell them before you even stream... Be descriptive!" cols="40" rows="4" className="form-control"></textarea>
					                                </div>
					                              </div>
					                              <div className="form-group row">
					                                <label for="newpass" className="col-4 col-form-label">Smoke/Drink?</label> 
					                                <div className="col-8">
					                                   <select value={this.state.smokeOrDrink} onChange={(e) => {
					                                   	console.log(e.target.value);
					                                  	this.setState({
															smokeOrDrink: e.target.value
					                                  	})
					                                  }} id="select" name="select" className="custom-select">
					                                    <option selected value="smokes_occasionally">Smoke Occassionally</option>
					                                    <option value="smokes_frequently">Smoke Frequently</option>
					                                    <option value="drinks_occasionally">Drinks Occassionally</option>
					                                    <option value="drinks_frequently">Drinks Frequently</option>
					                                    <option value="drinks_smokes_occasionally">Smokes & Drinks Occassionally</option>
					                                    <option value="drinks_smokes_frequently">Smokes & Drinks Frequently</option>
					                                  </select>
					                                </div>
					                              </div> 
					                              <div className="col-md-8" style={{ float: "right" }}>
													<div class="input-group">
													  <div class="input-group-prepend">
													    <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
													  </div>
													  <div class="custom-file">
													    <input onChange={(e) => {
													    	this.setState({
													    		pictures: e.target.files[0]
													    	})
													    }} name="upload" type="file" class="custom-file-input" id="inputGroupFile01"
													      aria-describedby="inputGroupFileAddon01" />
													    <label class="custom-file-label" for="inputGroupFile01">Choose a file</label>
													  </div>
													</div>
					                              </div>
					                              <div className="form-group row">
					                                <div className="offset-4 col-8">
					                                  <button name="submit" type="submit" className="btn btn-primary">Update My Profile</button>
					                                </div>
					                              </div>
					                            </form>
							                </div>
							            </div>
							            
							        </div>
							    </div>
							</div>
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

export default connect(mapStateToProps, {  })(PageThreeCammerSignup);
