import React, { Component } from 'react';
import Navigation from "../navigation/index.js";
import Footer from "../common/footer/footer.js";
import axios from "axios";
import "./css/style.css";

class CryptoWallet extends Component {
constructor(props) {
    super(props);

    this.state = {
    	blocks: []
    }
}
	componentDidMount() {
		console.log("mounted.");
		axios.get("/gather/blockchain/blocks").then((res) => {
			console.log(res.data);
			this.setState({
				blocks: res.data
			})
		}).catch((err) => {
			console.log(err); 
		})
	}

    render() {
        return (
           <div>
           	<Navigation />
				<h1 className="text-center">Welcome to your crypto wallet!</h1>
		 			<div class="container">
		              <div class="row">
		                <div class="col-xs-12 col-lg-12">
		                  <nav>
		                    <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
		                      <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Wallet</a>
		                      <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
		                      <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
		                      <a class="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">About</a>
		                    </div>
		                  </nav>
		                  <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
		                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
		                    <div className="row">
		                    <div className="scrollmenu">
		                     {/* {this.state.blocks ? this.state.blocks.map((block, index) => {
		                      	console.log(block);

		                      	return (
								  <div className="col-md-5 columns">
									<div class="card carddd" style={{ width: "100%" }}>
									  
									  <ul class="list-group list-group-flush">
									    <li class="list-group-item">Block: {index === 0 ? "Genisis Block" : index}</li>
									    <li class="list-group-item">Hash: {block.hash}</li>
									    <li class="list-group-item">Hash of previous block: {index === 0 ? block.previousHash : this.state.blocks[index - 1].hash}</li>
									    <li class="list-group-item">Nouce: {block.nounce}</li>
									    <li class="list-group-item">Timestamp: {block.timestamp}</li>
									    <li class="list-group-item">Transactions: {block.transactions}</li>
									  </ul>
									  
									</div>
			                      </div>
		                      	);
		                      }) : null}*/}
		                     
		                      
							</div>
							</div>
		                    </div>
		                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
		                      Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
		                    </div>
		                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
		                      Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
		                    </div>
		                    <div class="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
		                      Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
		                    </div>
		                  </div>
		                
		                </div>
		              </div>
				       
				</div>
			<Footer />
           </div> 
        );
    }
}

export default CryptoWallet;
