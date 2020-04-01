import React, { Component } from 'react';
import "./css/error.css";
import { Link } from "react-router-dom";
import Navigation from "../navigation/index.js";

class ErrorUnauthorized extends Component {
constructor(props) {
    super(props);


}

    render() {
        return (
            <div>
            	<Navigation />
				<div id="notfound">
					<div class="notfound">
						<div class="notfound-404">
							<h1>404</h1>
							<h2>Not Authorized - Please Sign In</h2>
						</div>
						<Link to="/">Homepage</Link>
					</div>
				</div>
            </div>
        );
    }
}

export default ErrorUnauthorized;
