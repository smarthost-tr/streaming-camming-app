import React, { Component } from "react";
import Navigation from "../navigation/index.js";

class ViewStream extends Component {
constructor(props) {
	super(props)

}

	render () {
		return (
			<div>
				<Navigation />
				<h1 className="text-center">View Stream.</h1>
			</div>
		);
	}
}
export default ViewStream;