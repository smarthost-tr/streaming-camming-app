import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import "../css/pages.css";
import axios from "axios";
import { connect } from "react-redux";
import ProgressBar from "../progress.js";
import Footer from "../../common/footer/footer.js";
import ImageUploader from 'react-images-upload';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

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
		pictures: [],
		meetup: "NO-MEETUP",
		showLocationInput: false,
		address: "",
		addresslatLng: null,
		skills: [],
		performance: "",
		task: "",
		vibratorID: "",
		toyID: "Lovense not detected."
	}
}
	onDrop = (picture) => {
        this.setState({
            pictures: this.state.pictures.concat(picture)
        });
    }
    handleChange = address => {
    	this.setState({ 
    		address 
    	});
    };
    componentDidMount() {
        axios.get("https://api.lovense.com/api/lan/getToys").then((res) => {
            console.log(res.data);
            const target = res.data["127-0-0-1.lovense.club"];
            const toyID = target.toys[Object.keys(target.toys)[0]].id;
            console.log(toyID);
            this.setState({
                toyID
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    handleSelect = address => {
	    geocodeByAddress(address)
	      .then(results => getLatLng(results[0]))
	      .then(latLng => {
	      	console.log('Success', latLng);
	      	this.setState({
	      		address,
	      		addresslatLng: latLng
	      	})
	      })
	      .catch(error => console.error('Error', error));
    };
	handleProfileSubmission = (e) => {
		e.preventDefault();

		const formData = new FormData();

		const { pictures, age, interestedIn, hairColor, eyeColor, languages, bodyType, breastSize, smokeOrDrink, nickName, bio, addresslatLng, meetup, toyID } = this.state;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

		console.log("form submitted...");

		if (age !== null && interestedIn.length > 0 && hairColor.length > 0 && eyeColor.length > 0 && languages.length > 0 && bodyType.length > 0 && breastSize.length > 0 && smokeOrDrink.length > 0 && nickName.length > 0 && bio.length > 0 && meetup.length > 0) {

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
	        formData.append("meetupCoords", addresslatLng);
	        formData.append("meetup", meetup);
	        formData.append("lovenseDeviceID", toyID);
	        if (addresslatLng) {
	        	formData.append("lat", addresslatLng.lat);
	        	formData.append("lng", addresslatLng.lng);
	        }
	        


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
	handleTipRates = () => {
		console.log("clicked...");

		const { performance, task, skills } = this.state;

		const complete = { task, cost: performance };

		if (performance.length > 0 && task.length > 0) {
			this.setState({
				skills: [...skills, complete],
				performance: "",
				task: ""
			})
		} else {
			alert("Please enter a valid tip request.")
		}
	}
	renderSubmissionButton = () => {
		if (this.state.skills.length > 0) {
			return (
				<div className="mx-auto col-md-12 col-lg-12" style={{ marginTop: "20px" }}>
					<button onClick={this.handleProfileSubmissionTwo} style={{ width: "100%" }} className="btn btn-outline green_button_custom">Submit ALL Tip Rates And Attached Tasks/Demands</button>
				</div>
			);
		}
	}
	handleProfileSubmissionTwo = () => {
		console.log("submitted...");
		axios.post("/complete/tip/list", {
			email: this.props.email,
			complete: this.state.skills
		}).then((res) => {
			console.log(res.data);
			if (res.data) {
				this.setState({
					skills: []
				})
				alert("Successfully added your tip rates, these will now show up on your live stream feeds!");

			}
		}).catch((err) => {
			console.log(err);
		})
	}
    render() {
    	console.log(this.state);
        return (
            <div className="pink_background">
            	<Navigation />
            	<ProgressBar progress={85} />
            	<div style={{ marginTop: "20px" }} className="mx-auto">
					<h2 className="text-center text-white underline">You MUST complete your profile before you can stream or appear in the "Profiles" section to post your videos for sale...</h2>
            	</div>
					<div className="container">
						<div className="row">

							<div className="col-md-12" style={{ marginBottom: "100px"}}>
							    <div className="card custom_card_two" style={{ height: "100%" }}>
							        <div className="card-body">
							            <div className="row">
							                <div className="col-md-12">
							                    <h4 className="text-center">Your Profile</h4>
							                    <hr />
							                </div>
							            </div>
							            <div className="row">
							                <div className="col-md-12" id="custom_container">
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
					                                  <select value={this.state.languages || "english"} onChange={(e) => {
					                                  	console.log(e.target.value)
					                                  	this.setState({
															languages: e.target.value
					                                  	})
					                                  }} id="select" name="languages" className="custom-select">
					                                    <option value="english">English</option>
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
					                                   <select value={this.state.smokeOrDrink || "Neither Smokes nor Drinks"} onChange={(e) => {
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
					                               <div className="form-group row">
					                                <label for="newpass" className="col-4 col-form-label">Do you want to meet up with locals to fuck? Select YES or NO</label> 
					                                <div className="col-8">
					                                   <select value={this.state.meetup || "NO-MEETUP"} onChange={(e) => {
					                                  	this.setState({
															meetup: e.target.value
					                                  	})
					                                  }} id="select" name="select" className="custom-select">
														<option value="NO-MEETUP">No, I do NOT want to fuck random people</option>
					                                    <option value="YES-MEETUP">YES, I want to fuck random people</option>
					                                    
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
													    <label class="custom-file-label" for="inputGroupFile01">{this.state.pictures.length !== 0 ? "File Selected!" : "Choose a file"}</label>
													  </div>
													</div>
					                              </div>
					                            
					                              <div className="form-group row">
					                                <div className="offset-4 col-8">
					                                  <button name="submit" type="submit" className="btn btn-outline aqua_button_custom">Update My Profile</button>
					                                </div>
					                              </div>
					                              <hr className="my-4"/>
					                              {this.state.toyID ? <div className="form-group row">
 													
													<div class="input-group">
													  <div class="input-group-prepend">
													    <span class="input-group-text" id="inputGroupFileAddon01">Lovense DEVICE ID</span>
													  </div>
													  <div class="custom-file">
													    <input value={this.state.toyID} placeholder="Enter your lovense device ID" name="lovense" type="text" class="form-control"
													      aria-describedby="inputGroupFileAddon01" />
													    {/*<label class="custom-file-label" for="inputGroupFile01">Enter Your LOVENSE DEVICE ID</label>*/}
													  </div>
													</div>
					                             </div> : <p className="text-center lead">Your lovense could not be detected. You will need to set it up later on the "Connect LOVENSE Vibrator" page under "Streams/Broadcasting" at a later time if you wish to accept tips to activte the vibrator</p>}
					                             {this.state.meetup === "YES-MEETUP" ? <div className="form-group row"><div className="mx-auto" style={{ float: "right" }}><label style={{ margin: "10px 15px" }}> Select Your Address - This will ONLY show a 10-15 mile radius - not your exact location. We believe HIGHLY in protecting our clients and your safety is a top priority. </label><PlacesAutocomplete 
												        value={this.state.address}
												        onChange={this.handleChange}
												        onSelect={this.handleSelect}
												      >
												        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
												          <div>
												            <input style={{ width: "100%", padding: "10px 30px" }}
												            className="form-control"
												              {...getInputProps({
												                placeholder: 'Search Places ...',
												                className: 'location-search-input',
												              })}
												            />
												            <div className="autocomplete-dropdown-container">
												              {loading && <div>Loading...</div>}
												              {suggestions.map(suggestion => {
												                const className = suggestion.active
												                  ? 'suggestion-item--active'
												                  : 'suggestion-item';
												                // inline style for demonstration purpose
												                const style = suggestion.active
												                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
												                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
												                return (
												                  <div
												                    {...getSuggestionItemProps(suggestion, {
												                      className,
												                      style,
												                    })}
												                  >
												                    <span style={{ color: "black" }}>{suggestion.description}</span>
												                  </div>
												                );
												              })}
												            </div>
												          </div>
												        )}
												      </PlacesAutocomplete></div></div> : null}
					                            </form>
							                </div>
							            </div>
							            
							        </div>
							    </div>
							</div>

						</div>
					</div>
					<hr className="my-4"/>
					<div className="container">
						<div className="row">
							<div className="col-md-12" style={{ marginBottom: "100px"}}>
							    <div className="card custom_card_two" style={{ height: "100%" }}>
							        <div className="card-body">
							            <div className="row">
							                <div className="col-md-12">
							                    <h4 className="text-center">Tip Rates - Acts performed per each tip amount</h4>
							                    <hr />
							                </div>
							            </div>
							            <div className="row">
							                <div className="col-md-12" id="custom_container">
							                   
							                    <div className="form-group">
					                                <label for="username" className="col-4 col-form-label">Age</label> 
					                                <div className="col-12">
					                                <div class="input-group-prepend">
													    <span class="input-group-text" id="basic-addon1"><i class="fas fa-plus-square fa-2x"></i></span>
													  
					                                  <input onChange={(e) => {
					                                  	this.setState({
					                                  		performance: e.target.value
					                                  	})
					                                  }} style={{ width: "60vw", height: "45px" }} value={this.state.performance} id="username" name="username" placeholder="Enter a tip amount - Numerical values only" className="form-control here" type="text"/>
					                                  <span class="input-group-text" id="basic-addon1"><i class="fas fa-exclamation-triangle fa-2x"></i></span>
					                                  <input onChange={(e) => {
					                                  	this.setState({
					                                  		task: e.target.value
					                                  	})
					                                  }} style={{ width: "40wv", height: "45px" }} value={this.state.task} id="username" name="username" placeholder="Enter an act to be performed for the coorelated tip" className="form-control here" type="text"/>
					                                 </div>
					                                </div>
					                              </div>
					                             
					                              <div className="form-group row">
					                                <div className="offset-4 col-8">
					                                  <button onClick={() => {
					                                		this.handleTipRates();
					                                	}} className="btn btn-outline aqua_button_custom">Add Task/Tip Amount To List</button>
					                                </div>
					                              </div>
					                             
					                            
							                </div>
							            </div>
							            <div className="row">
							            <ul className="list_custom">
											{this.state.skills ? this.state.skills.map((act, index) => {
												return (
													<li className="text-white">{act.task} is the task that is willing to be done at the cost of {Number(act.cost)} tokens</li>
												);
											}) : null}
											
										</ul>
										
							            </div>
							            {this.renderSubmissionButton()}
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
