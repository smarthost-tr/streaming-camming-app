import React, { Component } from 'react';
import "../css/profile.css";
import Navigation from "../../navigation/index.js";

class ProfileHomepage extends Component {
    render() {
        return (
            <div>
            	<Navigation />
				<h1 className="text-center">profile homepage</h1>
            </div>
        );
    }
}

export default ProfileHomepage;
