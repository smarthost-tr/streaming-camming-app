import React, { Component } from 'react';
import Navigation from "../navigation/index.js";
import Footer from "../common/footer/footer.js";
import axios from "axios";
import ImageUploader from 'react-images-upload';
import "./css/style.css";
import { connect } from "react-redux";

class UploadPhotoToFeed extends Component {
constructor(props) {
    super(props);

    this.state = {
    	pictures: [],
    	title: "",
    	preview: true,
    	subtitle: "",
    	desc: ""
    }
}
    onDrop = (picture) => {
        this.setState({
        	preview: true,
            pictures: picture,
        });
    } 
    onSubmission = () => {

    	const formData = new FormData();

    	const { title, pictures, desc, subtitle } = this.state;

        formData.append("title", title.slice(0, 15));
        formData.append("image", pictures[0]);
        formData.append("email", this.props.email);
        formData.append("subtitle", subtitle);
        formData.append("desc", desc);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

    	if (title.length > 0 && pictures.length !== 0 && subtitle.length > 0 && desc.length > 0) {
    		axios.post("/post/photo/feed/individual", formData, config).then((res) => {
	    		console.log(res.data);
	    		if (res.data) {
	    			alert("Successfully uploaded new image/feed!");
	    			this.setState({
	    				title: "",
	    				preview: false,
	    				subtitle: "",
	    				desc: ""
	    			})
	    		}
	    	}).catch((err) => {
	    		console.log(err);
	    	})
    	} else {
    		alert("Please select a photo and enter a title :)")
    	}
    }
    render() {
        return (
            <div>
            	<Navigation />
					<h1 className="text-center underline">upload photo to feed...</h1>
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12 col-xs-12">
							<label>Enter a catchy title limited to TWO words or THREE short words. This will be displayed when hovering on your photo in the profile feed... We will limit what you enter to 15 charactors MAX.</label>
								<div class="form-group">
			                        <input style={{ width: "100%" }} type="text" onChange={(e) => {
			                        	this.setState({
			                        		title: e.target.value
			                        	})
			                        }} class="form-control" placeholder="Enter a SHORT header/title for your photo - under 15 charectors" value={this.state.title} />
			                    </div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12 col-lg-12 col-xs-12">
							<label>Enter a catchy sub-title - There is no charactor limit on this field.</label>
								<div class="form-group">
			                        <input style={{ width: "100%" }} type="text" onChange={(e) => {
			                        	this.setState({
			                        		subtitle: e.target.value
			                        	})
			                        }} class="form-control" placeholder="Enter a subtitle for your picture/post... This can be any length" value={this.state.subtitle} />
			                    </div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12 col-lg-12 col-xs-12">
							<label>Enter a description for your photo - There is also no charactor limit on this field as well...</label>
								<div class="form-group">
							        <textarea style={{ width: "100%" }} onChange={(e) => {
							        	this.setState({
							        		desc: e.target.value
							        	})
							        }} class="form-control" value={this.state.desc} rows="4" placeholder="Enter a description... Ex: Cute picture from the beach the other day! Let me know what ya'll think!" required></textarea>
							    </div>
							</div>
						</div>
					</div>
					<div className="container">
					<label>Please only select on photo at a time... Any others will not be processed...</label>
						<ImageUploader
			                withIcon={true}
			                buttonText='Choose images'
			                onChange={this.onDrop}
			                imgExtension={['.jpg', '.gif', '.png', '.gif']}
			                maxFileSize={5242880} 
			                withPreview={this.state.preview} 
			            />
					</div>
		            <div className="container-fluid">
						<div className="row">
							<div className="col-md-12 col-lg-12 col-xs-12">
								<button onClick={() => {
									this.onSubmission();
								}} style={{ width: "100%" }} className="btn btn-outline aqua_button_custom">Submit New Photo</button>
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
export default connect(mapStateToProps, {  })(UploadPhotoToFeed);
