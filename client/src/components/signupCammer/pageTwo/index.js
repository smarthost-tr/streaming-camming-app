import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import ProgressBar from "../progress.js";
import FooterPage from "../../common/footer/footer.js";
import "../css/pages.css";
import { Link } from "react-router-dom";

class PageTwoSignupCamming extends Component {
constructor(props) {
    super(props);

    this.state = {
		verficiationPhoto: null,
		verficiationID: null
    }
}

    render() {
        return (
            <div>
            	<Navigation />
            	<ProgressBar progress={75} />
				<div className="container" style={{ marginTop: "30px" }}>
					<div className="row">
						<div className="col-md-12">
							<h4 className="text-center bold">Age Verification Documents</h4>
							<hr className="my-4"/>
							<h4 className="text-left bold" style={{ textDecoration: "underline" }}>Please upload two photos for our verficiation process...</h4>
							<p className="text-left lead">1. A high quality photo of your official government ID (Passport or Drivers License) all by itself</p>
							<p className="text-left lead">2. Photo of that same ID held up next to your face (smart phone selfies are totally fine)</p>
						</div>

					</div>
					<div className="row">
						<div className="col-md-6">
							<img className="custom_upload_img"  className="custom_upload_img" src={require("../../../images/id-one.jpg")} alt="front"/>
							<hr className="my-4"/>
							<div class="input-group mb-3">
							  <div class="input-group-prepend">
							    <span class="input-group-text">Upload</span>
							  </div>
							  <div class="custom-file">
							    <input onChange={(e) => {
							    	this.setState({
							    		verficiationID: e.target.value
							    	})
							    }} type="file" class="custom-file-input" id="inputGroupFile01" />
							    <label class="custom-file-label" htmlFor="inputGroupFile01">{this.state.verficiationID ? "File Selected!" : "Choose File..."}</label>
							  </div>
							</div>
						</div>
						<div className="col-md-6">
							<img className="custom_upload_img" src={require("../../../images/id-two.jpg")} alt="front"/>
							<hr className="my-4"/>
							<div class="input-group mb-3">
							  <div class="input-group-prepend">
							    <span class="input-group-text">Upload</span>
							  </div>
							  <div class="custom-file">
							    <input onChange={(e) => {
							    	this.setState({
							    		verficiationPhoto: e.target.value
							    	})
							    }} type="file" class="custom-file-input" id="inputGroupFile01" />
							    <label class="custom-file-label" htmlFor="inputGroupFile01">{this.state.verficiationPhoto ? "File Selected!" : "Choose File..."}</label>
							  </div>
							</div>
						</div>

					</div>
					{this.state.verficiationID !== null && this.state.verficiationPhoto !== null ? <div className="row">
						<div className="col-md-12">
							<Link to="/signup/camming/three" style={{ width: "100%", marginBottom: "40px" }} className="btn btn-outline pink_button">Submit Idenification Photos</Link>
						</div>
					</div> : null}
				</div>
				<FooterPage />
            </div>
        );
    }
}

export default PageTwoSignupCamming;
