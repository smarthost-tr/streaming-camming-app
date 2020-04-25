import React, { Component } from 'react';
import Navigation from "../navigation/index.js";
import axios from "axios";
import { Link } from "react-router-dom";
import FooterPage from "../common/footer/footer.js";

class StreamListAll extends Component {
 constructor(props) {
    super(props);
}
	componentDidMount() {
		
	}
    render() {
        return (
            <div>
				<Navigation />
				<div className="container-fluid">
					<div className="row">
						<h2 className="text-center">hello</h2>
					</div>
				</div>
				<FooterPage />
            </div>
        );
    }
}

export default StreamListAll;
