import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import { connect } from "react-redux";
import axios from "axios";
import Footer from "../../common/footer/footer.js";


class WireUpLovenseVibrator extends Component {
constructor(props) {
    super(props);

    this.state = {
    	httpPort: 0,
    	url: "",
    	toyID: ""
    }
}
	componentDidMount() {
		axios.get("https://api.lovense.com/api/lan/getToys").then((res) => {
			console.log(res.data);
			let keys = Object.keys(res.data)[0];
			const target = res.data["127-0-0-1.lovense.club"];
			const toyID = target.toys[Object.keys(target.toys)[0]].id;
			console.log(toyID);
			this.setState({
				url: keys,
				httpPort: target.httpPort,
				toyID
			})
		}).catch((err) => {
			console.log(err);
		})
	}
	sendVibration = () => {

		const { url, httpPort, toyID } = this.state;

		axios.get(`http://${url}:${httpPort}/Vibrate?v=20&t=${toyID}`).then((res) => {
			console.log(res.data);
			if (res.data) {
				setTimeout(() => {
					axios.get(`http://${url}:${httpPort}/Vibrate?v=0&t=${toyID}`).then((res) => {
						console.log(res.data);
					}).catch((err) => {
						console.log(err);
					})
				}, 10000);
			}
		}).catch((err) => {
			console.log(err);
		})
		
	}
	sendLovenseID = () => {

		const { toyID } = this.state;

		axios.post("/post/lovense/id", {
			lovenseID: toyID,
			email: this.props.email
		}).then((res) => {
			console.log(res.data);
			if (res.data) {
				alert("Successfully updated your profile with your new lovense ID.")
			}
		}).catch((err) => {
			console.log(err);
			alert("An error occurred... Please try again.")
		})
	}
    render() {
    	console.log(this.state);
        return (
            <div>

            	<Navigation />
					<a target="_blank" style={{ width: "100%", margin: "30px 10px" }} href="https://www.lovense.com/cam-model/download" className="btn btn-outline green_button_custom">Go to "Lovense" Website for download links and instructions setting up your vibrator to tips</a>
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-6 col-sm-12">
							<h6 className="text-left">To set-up your lovense device to our streaming platform you must complete the following steps completely in order to have tip activated vibrations...These can all be found by clicking the button above.</h6>
							<hr className="my-4"/>
							<p className="lead">Windows computers - Users would need to purchase Lovense USB Bluetooth Adapter</p><hr className="my-4"/>
							<p className="lead">Mac - Users can connect our toys directly from their Mac computers.</p>
								<ol className="custom_list">
									<li>Download Lovense <strong style={{ color: "#37be43" }}>"connect"</strong></li>
									<li>Download Lovense <strong style={{ color: "#37be43" }}>"Browser"</strong></li>
									<li>Download Lovense <strong style={{ color: "#37be43" }}>"Extension"</strong> for your browser - either firefox or google chrome</li>
								</ol>
								<h6 className="text-left">Use the Lovense "browser" and you won't need to install the extension. Lovense works best with the lovense browser. Open the browser and sign in by clicking the icon in the top right corner.</h6>
							</div>
							<div className="col-lg-6 col-md-12 col-sm-12">
								<iframe width="100%" height="100%" src="https://www.youtube.com/embed/lV-c-lWDs5k" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
							</div>
						</div>
						{this.state.toyID ? <div className="form-group row"><div style={{ marginTop: "30px" }} className="col-md-12 col-lg-12 col-sm-12">						
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
	                     </div><hr className="my-4" style={{ margin: "20px 0px" }}/>
	                     	<button style={{ width: "100%", margin: "20px 10px" }} onClick={this.sendLovenseID} className="btn btn-outline purple_neon_btn">Update/Post LOVENSE ID</button>
	                     </div> : <p className="text-center lead">Your lovense could not be detected. You will need to set it up later on the "Connect LOVENSE Vibrator" page under "Streams/Broadcasting" at a later time if you wish to accept tips to activte the vibrator</p>}
					</div>
					<button style={{ width: "100%", margin: "20px 10px" }} onClick={this.sendVibration} className="btn btn-outline purple_neon_btn">Vibrate!</button>
					
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

export default connect(mapStateToProps, {  })(WireUpLovenseVibrator);
