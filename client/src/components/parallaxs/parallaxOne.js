import React, { Component } from 'react';
import { Parallax, Background } from 'react-parallax';
import "./css/parallax.css";

class ParallaxOne extends Component {
constructor(props) {
    super(props);


}

    render() {
        return (
            <div className="parallax-one" style={{ width: "100vw", borderTop: "10px solid black", borderBottom: "10px solid black" }}>
				<Parallax
		            blur={0}
		            bgImage={require('../../images/nature.jpg')}
		            bgImageAlt="the cat"
		            strength={500}
		        >
		            <h1 style={{ textDecoration: "underline" }} className="text-center custom_display display-4">Purchase your tokens today and get started in the action!</h1>
		            <div style={{ height: '225px' }} />
		        </Parallax>
            </div>
        );
    }
}

export default ParallaxOne;
