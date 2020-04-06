import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";

class FriendsListHome extends Component {
constructor(props) {
    super(props);


}

    render() {
        return (
            <div>
            	<Navigation />
				<h1 className="text-center">Friends list home.</h1>
            </div>
        );
    }
}

export default FriendsListHome;
