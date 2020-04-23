import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from "axios";
import Navigation from "../navigation/index.js";
import Footer from "../common/footer/footer.js";
import "./css/homeMap.css";

class HomeMap extends Component {
constructor(props) {
    super(props);

    this.state = {

    }
}
	componentDidMount() {
		mapboxgl.accessToken = 'pk.eyJ1IjoiamVyZW15YWJsb25nIiwiYSI6ImNrNzIzemZ6cDA3Mm8zbWxncW5pZDkzeDkifQ.jeLgR1gLLJsaeyfjBUqrdw';
	 	const map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
		center: [-74.5, 40], // starting position [lng, lat]
		zoom: 9 // starting zoom
		});
	}
    render() {
        return (
            <div>
            	<Navigation />
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-7">
							<div id="map"></div>
						</div>
						<div className="col-md-5">

						</div>
					</div>
				</div>
				<Footer />
            </div>
        );
    }
}

export default HomeMap;
