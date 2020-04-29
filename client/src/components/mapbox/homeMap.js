import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from "axios";
import Navigation from "../navigation/index.js";
import Footer from "../common/footer/footer.js";
import "./css/homeMap.css";
import uuid from "react-uuid";

let map;

class HomeMap extends Component {
constructor(props) {
    super(props);

    this.state = {
		users: [],
		map: null,
		coords: [],
		latitude: null,
		longitude: null
    }
}
	componentDidMount() {
		const position = async () => {
		    await navigator.geolocation.getCurrentPosition((position) => {

		        let lat = position.coords.latitude;
		        let lng = position.coords.longitude;
				
				this.setState({
					latitude: lat,
					longitude: lng
				}, () => {
					const { latitude, longitude } = this.state;

					mapboxgl.accessToken = 'pk.eyJ1IjoiamVyZW15YWJsb25nIiwiYSI6ImNrNzIzemZ6cDA3Mm8zbWxncW5pZDkzeDkifQ.jeLgR1gLLJsaeyfjBUqrdw';
				 	map = new mapboxgl.Map({
						container: 'map', // container id
						style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
						center: [longitude, latitude], // starting position [lng, lat]
						zoom: 9 // starting zoom
					});
				})
		    }, (error) => {
		        console.log(error);
		    });
		}

		position();

		this.setState({
			map
		}, () => {
			axios.get("/gather/all/users").then((res) => {
				console.log(res.data);
				this.setState({
					users: res.data
				})
				
				


			}).catch((err) => {
				console.log(err);
			})
		})
	}

    render() {
    	console.log(this.state);
        return (
            <div>
            	<Navigation />
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							<div id="map"></div>
						</div>
						<div className="col-md-6 col-lg-6 overflow">
						<div className="container-fluid flex">
							{this.state.users ? this.state.users.map((user, index) => {
								
								if (user.profile.meetup === true) {
									console.log(user);
									return (
										<div className="col-lg-6 col-md-6">
											<div class="card" style={{ width: "100%", height: "80%" }}>
											  <img src={user.image} class="card-img-top top_image" alt="no-image" />
											  <div class="card-body">
											    <h5 class="card-title">{user.username}</h5>
											    <p class="card-text">Age: {user.profile.age}
											    <br/>
												Interested In: {user.profile.interestedIn} <br/>
												Body Type: {user.profile.bodyType} <br/>
												Language(s): {user.profile.languages}
											    </p>

											    <a onClick={() => {
											    	this.props.history.push(`/profiles/individual/${user.username}`, { user })
											    }} class="btn btn-outline aqua_button_custom">Visit User's Profile</a>
											  </div>
											</div>
										</div>
									);
								}
							}) : null}
						</div>
						</div>
					</div>
				</div>
				<Footer />
            </div>
        );
    }
}

export default HomeMap;
