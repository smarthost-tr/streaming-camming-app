import React, { Component } from "react";
import Confetti from 'react-confetti';

class ConfettiAnimation extends Component {
constructor(props) {
  super(props);

    this.state = { 
		width: 0, 
		height: 0 
	};
}
	componentDidMount() {
	  this.updateWindowDimensions();
	  window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
	  window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions = () => {
	  this.setState({ width: window.innerWidth, height: window.innerHeight });
	}
    render() {
        return (
            <Confetti
		      width={this.state.width}
		      height={this.state.height + 800}
		    />
        );
    }
}

export default ConfettiAnimation;
