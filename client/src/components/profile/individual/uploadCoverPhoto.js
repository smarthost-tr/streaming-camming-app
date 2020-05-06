import React, { Component } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import Modal from 'react-modal';
import "../css/uploadCover.css";
import ImageUploader from 'react-images-upload';
 
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


class UploadCoverPhoto extends Component {
constructor(props) {
    super(props);

    this.state = {
    	modalIsOpen: false,
    	pictures: []
    }
}
	uploadCoverPhoto = () => {
		console.log("clicked.");

		const formData = new FormData()

		formData.append("image", this.state.pictures[0]);
		formData.append("email", this.props.authenticated);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

	    axios.post("/upload/cover/photo", formData, config).then((res) => {
			console.log(res.data);
			if (res.data) {
				this.setState({
					modalIsOpen: false
				}, () => {
					alert("Successfully updated cover photo!");
					window.location.reload();
				})
			}
        }).catch((err) => {
            console.log(err);
        })
	}
    onDrop = (picture) => {
        this.setState({
            pictures: picture
        });
    }
	renderModalContent = () => {
		return (
			<Modal
	          isOpen={this.state.modalIsOpen}
	          contentLabel="User Information" 
	          style={customStyles}
	        >
	 
	         
	          
				<div class="modal-dialog container-fluid">
		            
		                
		                <div class="modal-content container">
					        <div class="modal-header header_modal">
						          <button type="button" onClick={() => {
						          	this.setState({
						          		modalIsOpen: false
						          	})
						          }} class="close" data-dismiss="modal" aria-hidden="true">×</button>
						          <h1 class="text-center">Upload a cover photo</h1>
						      </div>
						      <div class="modal-body">
						          <div class="col-md-12 center-block">
						            <ImageUploader
						                withIcon={true}
						                buttonText='Choose images'
						                onChange={this.onDrop}
						                imgExtension={['.jpg', '.gif', '.png', '.gif']}
						                maxFileSize={5242880} 
						                withPreview={true}
						            />
						          </div>
						      </div>
						      <div class="modal-footer footer_modal">
						          <div class="col-md-12">
						          <button onClick={() => {
						          	this.uploadCoverPhoto();
						          }} style={{ width: "100%" }} className="btn btn-outline aqua_button_custom">Upload!</button>
						    	  </div>	
						      </div>
						    </div>
		         
		        </div>
		        
	        </Modal>

		);
	}
    render() {
        return (
            <div>
            {this.renderModalContent()}
				<i onClick={() => {
					this.setState({
						modalIsOpen: !this.state.modalIsOpen
					})
                	
                }} class="fas fa-upload fa-2x special_icon"></i>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
	return {
		authenticated: state.auth.data.email
	}
}
export default connect(mapStateToProps, {  })(UploadCoverPhoto);
