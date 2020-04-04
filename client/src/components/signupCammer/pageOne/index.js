import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import "../css/pages.css";
import DatePicker from 'react-date-picker';
import Moment from 'react-moment';
import ProgressBar from "../progress.js";
import axios from "axios";
import { connect } from "react-redux";
import FooterPage from "../../common/footer/footer.js";

class PageOneSignupCamming extends Component {
constructor(props) {
    super(props);

    this.state = {
		birthdate: new Date(),
		firstName: "",
		lastName: "",
		gender: "",
		signature: "",
		error: "",
		showContent: false
    }
}
	onChange = (date) => {
		this.setState({
			birthdate: date
		})
	}
	handleSubmission = (e) => {
		e.preventDefault();

		const { birthdate, firstName, lastName, gender, signature } = this.state;

		if (birthdate && firstName.length > 0 && lastName.length > 0 && gender.length > 0 && signature.length > 0) {
			axios.post("/complete/form/page/one", {
				email: this.props.email,
				birthdate, 
				firstName, 
				lastName, 
				gender, 
				signature
			}).then((res) => {
				console.log(res.data);
				if (res) {
					alert("Thank You, You've successfully completed the cammer/streamer agreement!");
					this.props.history.push("/signup/camming/two");
				}
			}).catch((err) => {
				console.log(err);
				if (err) {
					alert("There was an error submitting information, please try again...");
				}
			})
		} else {
			this.setState({
				error: "You need to complete each and every field, please review the form and check to make sure everything is filled out appropriatly..."
			})
		}
	}
	componentDidMount() {
		axios.post("/identify/user/agreement", {
			email: this.props.email
		}).then((res) => {
			console.log(res.data.registration);
			let registrationObj = res.data.registration;

			let push = false;

			for (let key in registrationObj) {
				let selector = registrationObj[key];
				push = selector.agreementSigned;
			}

			if (push === true) {
				this.props.history.push("/signup/camming/two");
			}

			this.setState({
				showContent: true
			})

		}).catch((err) => {
			console.log(err);
		})
	}
	renderContent = () => {
		const dateToFormat = new Date();

		if (this.state.showContent) {
			return (
			<React.Fragment>
				<Navigation />
	          		<ProgressBar progress={50} />
					<div className="container" style={{ marginTop: "50px" }}>
					<div className="content-box">
					  <h3 className="text-left bold">Independent Performer Agreement</h3><br/>
					  <p className="lead text-left">This Independent Performer Agreement (this "Agreement") is entered into as of the date it is signed by ("I", "me", or "Performer").</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Ability to Contract:</strong> I hereby warrant that my date of birth is and that I am at least eighteen (18) years of age or the age of majority in my location, whichever is higher (the "Age of Majority"). My digital signature at the bottom of this document certifies that the above information is correct. I further warrant and represent that I have the right to enter into this contract and that I am entering doing so of my own free will, as a consenting adult.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Compensation:</strong> I understand that by entering into this Agreement and providing the documentation required by Secure Live Media, LLC ("J&S (Jerk N' Squirt)") that I am requesting access to the software platform operated by J&S (Jerk N' Squirt) (the "Platform") to stream my live, interactive cam shows and to upload and distribute recorded content (collectively, the "Content") to users of the Platform. J&S (Jerk N' Squirt) will provide payment as designated by me representing five United States cents (US$0.05) per unit of digital currency (often called "tokens") received by J&S (Jerk N' Squirt) from users of the Platform for viewing my Content hereunder. I understand that the payment information I provide will be the information used by J&S (Jerk N' Squirt) to compensate me as set forth herein and that J&S (Jerk N' Squirt)'s tendering of payment as requested through my account with the Platform Site is full satisfaction of J&S (Jerk N' Squirt)'s compensation obligations hereunder regardless of whether or not I negotiate or receive all of such payment.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Platform Interaction between Independent Performers and Community Members: </strong> I acknowledge and agree that the Platform provides a marketplace that enables me to sell Content to other individuals accessing the Platform (each, a "Community Member"), that the Platform enables me to enter into direct contact and establish direct business relationships solely on the Platform with other Community Members, and that neither Producer nor J&S (Jerk N' Squirt) is responsible or liable for the actions or inactions of a Community Member with regards to my Content.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Platform Access: </strong>As long as my account is in good standing with J&S (Jerk N' Squirt), I understand I will be permitted to access my account with the Platform as and when the Platform is available. J&S (Jerk N' Squirt) does not promise or guarantee that the Platform will function at all times or be error-free. I understand that J&S (Jerk N' Squirt) may, based upon its own performance metrics, in J&S (Jerk N' Squirt)'s sole and absolute discretion, determine where I appear on the Platform . I understand that while I will be permitted to select my username, I will not use such username to impersonate any third party nor to infringe on the rights of any third party.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Obligations: </strong>I understand that it is my responsibility to provide any and all equipment (such as a laptop computer and webcam) and services (such as internet service) which may be necessary or desirable in connection with my use of the Platform. It will also be my responsibility to confirm that my use of the Platform, including the content and actions I choose to make available through the Platform, does not violate any applicable laws. I will also ensure that my conduct is in full compliance with the Platform's Code of Conduct as may be updated from time to time in the Platform's Terms. I agree that at no time will I appear on the Platform with any third party who has not been approved in advance by Platform in writing which approval will be conditioned upon a release being executed by such third party and such third party providing to Platform age verification documentation acceptable to Platform. Subject to the Platform's capacity and limits, the hours I provide the Content will be my sole determination.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Performer's Activities: </strong>I understand and agree that neither Producer nor J&S (Jerk N' Squirt) exercises any control over my day-to-day activities, including with regards to the creation and sharing of Content, that J&S (Jerk N' Squirt)'s core business is the operation, maintenance, and administration of the Platform, and J&S (Jerk N' Squirt)'s employees and third-party contractors (the "Operators") are responsible for the operation and maintenance of the Platform and for ensuring that all Community Members (myself included) are in compliance with applicable law and the Platform's terms and conditions. Neither J&S (Jerk N' Squirt) nor its Operators can create or assume any obligation to third parties on my behalf (or vice-versa). I acknowledge and agree that my sharing of Content on the Platform, acceptance of payment from Community Members, and entering into this Agreement does not and is not intended to create an employment or agency relationship between either me and J&S (Jerk N' Squirt), me and Producer, or any of their respective affiliates.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Warranty to J&S (Jerk N' Squirt): </strong> I understand and agree that I am an independent contractor and will be permitted to determine at what times and from what location(s) I will perform the Content; however, I warrant to Producer that I will perform the Content in an artistic and conscientious manner. I acknowledge that I am responsible for complying with all laws in my location, including any applicable obscenity laws and that I am responsible for paying all taxes from monies paid to me. I further acknowledge and agree that I am solely responsible for collecting and remitting all applicable withholding, FICA, and other applicable taxes on any amounts received from Community Members in connection with my Content, and neither Producer not J&S (Jerk N' Squirt) shall provide me, and I am not entitled to, workman's compensation, unemployment insurance, medical benefits, paid time off, or other benefits offered to Producer or J&S (Jerk N' Squirt)'s employees. I understand and agree that I am free from any control by Producer and J&S (Jerk N' Squirt) in my use of and sharing of Content on the Platform.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Rights Granted to J&S (Jerk N' Squirt): </strong>I hereby grant to J&S (Jerk N' Squirt) a fully-paid, worldwide, perpetual and irrevocable license to edit and exploit my Content for purposes in connection with the Platform. I further grant to J&S (Jerk N' Squirt) a worldwide irrevocable right and license to utilize and distribute any and all images associated with my Content on the Platform as well as in connection with the promotion of the Platform and any other services offered by J&S (Jerk N' Squirt) or its affiliated entities. I further grant to the J&S (Jerk N' Squirt) a worldwide irrevocable right and license to utilize any and all stage name(s), alias(es) or pseudonym(s) that may be created and/or used in connection with my Content hereunder in connection with the provision of the Content on websites owned and/or operated by J&S (Jerk N' Squirt) and/or third parties, and all advertising (including using my name and images on websites, banner ads, written publications and the like), merchandising, commercial tie-ups, publicity, and other means of exploitation.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Rules: </strong>Although Performer is free to create, perform, and exhibit Content on the Platform at any time or otherwise perform similar content on other web sites or platforms in addition to the Platform, J&S (Jerk N' Squirt) has established the following rules to ensure compliance with applicable law and the Platform's Terms and Conditions, as well as to protect the safety of Independent Performer and Community Members. Accordingly, I agree to adhere to the following rules while performing the Content for the Producer:</p>
					  <ul className="rules_list">
						<li>I will not reveal my real name or personal contact information to any individuals while performing the Content. I agree that under no circumstances will I communicate with any Platform user through any means other than through the Platform without the express written permission of J&S (Jerk N' Squirt);</li>
						<li>I will not reveal the location from where I provide the Content nor the names, addresses or other information of any of the companies or individuals connected with the Platform or my Content;</li>
						<li>I will not promote or discuss any third party or website which is not the Platform or which has not been approved in writing by J&S (Jerk N' Squirt);</li>
						<li>I will not appear on camera under the influence of nor will I use while providing the Content any mind-altering substance, including, without limitation, alcohol or drugs, whether legal or illegal, whether prescription or otherwise</li>
						<li>If, at any time, I feel that someone is requesting me to perform an act in violation of this Agreement or applicable law, I will cease to perform the Content for the individual, and I will immediately report that person's information to J&S (Jerk N' Squirt);</li>
						<li>I will not hold myself out to anyone as not being the Age of Majority. In the event I believe that someone believes me to be less than the Age of Majority, I will immediately tell the person that I am the Age of Majority</li>
						<li>I will not tell any individual, nor lead them to believe, that I participate in or simulate any obscene acts including, but not limited to, bestiality, necrophilia, child molestation, child pornography, rape, urination, defecation or any other obscene sex acts</li>
						<li>While providing the Content, I agree that I will ensure that no music is audible through the Platform at any time, at any volume; and,</li>
						<li>While providing the Content, I agree that I will not appear on camera with any third person without the written permission of J&S (Jerk N' Squirt), which permission will be contingent on such third party signing an agreement with J&S (Jerk N' Squirt) and/or Producer.</li>
					  </ul>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Release: </strong> Performer releases J&S (Jerk N' Squirt), its employees, agents, attorneys, assigns and licensees from any and all claims arising out of this Agreement and the Content including, without limitation, right of publicity claims, invasion of privacy claims, defamation claims, sexual harassment claims, injuries (both physical and emotional), negligence, intellectual property, claims relating to disease or illness (including STD's), pregnancy, and all other such claims whether or not listed above. I agree to indemnify and hold harmless the Platform, J&S (Jerk N' Squirt), Producer, their employees, affiliates, and other related workers and entities from any liability arising out of this Agreement. I agree that in the event that I appear on camera with any third person, as permitted hereunder, I am doing so at my own discretion and risk and I acknowledge that J&S (Jerk N' Squirt) will not, and is under no obligation to, do any medical testing of such third party. I further release any and all moral rights I may hold with respect to any of the content streamed through and/or posted by me on the Platform.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Termination: </strong> This Agreement may be terminated by either party for any reason whatsoever and shall be effective upon delivery of written notice as follows:</p>
					  <br/>
					  <ul className="rules_list">
						<li>If to J&S (Jerk N' Squirt): compliance@camsoda.com (email)</li>
						<li>If to Performer: jeremyablong@icloud.com (email)</li>
					  </ul>
					  <p className="text-left">In the event that the Operators determine, in the Operators' sole discretion, that I have performed the Content in a way in which such Content is obscene, defamatory, threatening, in violation of applicable law, in anyway in violation of a third party's rights or otherwise in violation of this Agreement, I understand and agree that J&S (Jerk N' Squirt) shall have the right to immediately terminate this Agreement "for cause" and in such event I agree to forfeit any monies earned but not yet paid. After termination of this Agreement, for any reason, Performer agrees not to perform live streaming Content for any other individual or entity for a period of four (4) months.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Severability: </strong> If any provision of this Agreement is found to be unenforceable, the remainder shall be enforced as fully as possible and the unenforceable provision shall be deemed modified to the limited extent required to permit its enforcement in a manner most closely representing the intention of the Parties as expressed herein.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Indemnification: </strong>I will indemnify and hold harmless the Platform, J&S (Jerk N' Squirt), Producer, their employees, owners, agents, attorneys, assigns, licensees, and affiliated entities with respect to the provision of the Content and all information I provide to the J&S (Jerk N' Squirt) and/or Producer and any of their agents, employees, or affiliated entities.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Miscellaneous: </strong> Performer understands and agrees that J&S (Jerk N' Squirt) is an intended third-party beneficiary of this Agreement. Performer and Producer each understands and agrees that any controversy or claim arising out of or relating to J&S (Jerk N' Squirt)'s exploitation or use of the Content shall be settled by binding arbitration before the American Arbitration Association utilizing one arbitrator in Miami-Dade County, Florida and judgment upon the award rendered by the arbitrator may be entered in any court having jurisdiction thereof. The prevailing party shall be entitled to reimbursement for costs and reasonable attorneys' fees. The determination of the arbitrator in such proceeding shall be final, binding and non-appealable. In such event Performer and Producer each shall be limited to the applicable remedy at law for direct damages (after Performer's and Producer's good-faith efforts to mitigate such damages), if any, and shall not have the right to seek consequential or punitive damages to terminate or rescind this Agreement or to enjoin or restrain in any way the production, distribution, advertising or exploitation of the Content.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Jurisdiction/Venue: </strong> Subject in all respect to the Arbitration clause above, Performer and Producer irrevocably submit to the jurisdiction of the courts located in Miami-Dade County, Florida and agree that all disputes arising hereunder shall be governed by the laws of the State of Florida, excluding its conflict of laws provisions. In the event of Performer's actual, alleged or threatened breach of the Exclusivity or Rules provisions hereof, Producer and J&S (Jerk N' Squirt) shall jointly and severally be entitled to seek injunctive relief against Performer in any court having competent jurisdiction over such matter.</p>
					  <hr className="my-white"/>
					  <p className="text-left"><strong>Class Action Waiver: </strong>Any proceedings to resolve or litigate any dispute will be conducted solely on an individual basis. Neither you nor we will seek to have any dispute heard as a class action or in any other proceeding in which either party acts or proposes to act in any representative capacity. You and we further agree that no arbitration or proceeding will be combined with another without the prior written consent of all parties to the affected proceedings.</p>
					   <hr className="my-white"/>
					  <p className="text-left">By signing this Agreement, I agree to assign all rights to the Content performed pursuant to this Agreement to Producer. Additionally, by my signature below, <strong>I hereby represent, covenant and warrant that I have the ability to grant all rights granted herein and that there are no agreements or other legal impediments which make the undersigned's acceptance of this Agreement invalid, unlawful or avoidable.</strong></p>
					  <br/>
					  <p className="text-left">I agree that this Agreement is intended to be governed by the Electronic Signatures in Global and National Commerce Act (the "E-Sign Act") and that by typing my name below I am intending it to stand in the place of and be equally as binding on me as if I had signed this document manually. I understand that may retain a paper copy of this transaction for my personal records and that I have the right to remove my consent to using the E-Sign Act by emailing the Producer, with a copy to J&S (Jerk N' Squirt), at support@camsoda.com at which time I will immediately cease using the Platform; provided however that I understand and agree that the withdrawal of my consent shall apply only to future services provided by me and will not affect my previous unrestricted exclusive grant of rights to J&S (Jerk N' Squirt) with respect to services previously performed by me.</p>
					  <hr className="my-white"/>
					  <p className="text-left">Performer: {this.state.firstName.length > 0 || this.state.lastName.length > 0 ? this.state.firstName + " " + this.state.lastName : "__________________"}</p>
					  
					  <p className="text-left">Date: <Moment date={dateToFormat} /></p>
					</div>
					</div>
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h4 className="text-center red">{this.state.error.length > 0 ? this.state.error : null}</h4>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row" style={{ marginTop: "30px" }}>
							<div className="col-md-6">
								<div class="input-group mb-3">
								  <div class="input-group-prepend">
								    <span class="input-group-text details" id="inputGroup-sizing-default">First Name</span>
								  </div>
								  <input onChange={(e) => {
								  	this.setState({
								  		firstName: e.target.value
								  	})
								  }} placeholder="John" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
								</div>
							</div>
							<div className="col-md-6">
								<div class="input-group mb-3">
								  <div class="input-group-prepend">
								    <span class="input-group-text details" id="inputGroup-sizing-default">Last Name</span>
								  </div>
								  <input onChange={(e) => {
								  	this.setState({
								  		lastName: e.target.value
								  	})
								  }} placeholder="Doe" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div class="input-group mb-3">
								  <div class="input-group-prepend">
								    <label class="input-group-text details" for="inputGroupSelect01">Gender Preferences</label>
								  </div>
								  <select onChange={(e) => {
								  	this.setState({
								  		gender: e.target.value
								  	})
								  }} class="custom-select" id="inputGroupSelect01">
								    <option selected>Gender Preferences...</option>
								    <option value="female">Female</option>
								    <option value="male">Male</option>
								    <option value="trans">Trans</option>
								    <option value="couple">Couple</option>
								  </select>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<label style={{ paddingRight: "30px" }}>Select Your Birthdate  </label>
								<DatePicker 
						          onChange={this.onChange}
						          value={this.state.birthdate}
						        />
							</div>
						</div>
						<div className="row" style={{ marginTop: "30px" }}>
							<div className="col-md-12">
								<div class="input-group mb-3">
								  <div class="input-group-prepend">
								    <span class="input-group-text details" id="inputGroup-sizing-default">Digital Signature</span>
								  </div>
								  <input onChange={(e) => {
								  	this.setState({
								  		signature: e.target.value
								  	})
								  }} placeholder="Enter your first + middle + last name to verfiy and confirm you agree to our conditions and terms..." style={{ width: "100%" }} type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<button style={{ marginBottom: "50px" }} onClick={this.handleSubmission} className="btn btn-outline pink_button">Submit agreement and continue with application...</button>
							</div>
						</div>
					</div>
					<FooterPage />
				</React.Fragment>
			);
		}
	}
    render() {
    	console.log(this.state);
        return (
          	<div>
				{this.renderContent()}
          	</div>  
        );
    }
}
const mapStateToProps = (state) => {
	return {
		email: state.auth.data.email
	}
}

export default connect(mapStateToProps, {  })(PageOneSignupCamming);
