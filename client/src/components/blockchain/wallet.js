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
				blocks: res.data.chain
			})
		}).catch((err) => {
			console.log(err); 
		})
	}

    render() {
        return (
           <div>
           	<Navigation />
				<h1 className="text-center" style={{ margin: "30px 0px" }}>Welcome to your crypto wallet!</h1>
		 			<div class="container">
		              <div class="row">
		                <div class="col-xs-12 col-lg-12 col-md-12">
		                  <div class="tab-content-custom py-3 px-3 px-sm-0" id="nav-tabContent">
		                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
			                    <div className="row">
				                    <div className="scrollmenu">
				                    {this.state.blocks.length === 0 ? <h1 className="text-center">There are currently no blocks on the chain.</h1> : null}
				                      {this.state.blocks ? this.state.blocks.map((block, index) => {
				                      	console.log(block);
				                      	return (
										  <div className="col-md-5 columns">
											<div class="card carddd" style={{ width: "100%" }}>
											  
											  <ul class="list-group list-group-flush">
											    <li class="list-group-item">Block: {index === 0 ? "Genisis Block" : index}</li>
											    <li class="list-group-item">Hash: {block.hash}</li>
											    <li class="list-group-item">Hash of previous block: {index === 0 ? "No Previous Hash - Genisis Block" : this.state.blocks[index - 1].hash}</li>
											    <li class="list-group-item">Nouce: {block.nounce}</li>
											    <li class="list-group-item">Timestamp: {block.timestamp}</li>
											    <li class="list-group-item">Transactions: {index === 0 ? "No Transactions" : block.transactions.length}</li>
											    <button onClick={() => {
											    	this.props.history.push("/view/block/individual", { block });
											    }} className="btn btn-outline aqua_button_custom">VIEW BLOCK</button>
											  </ul>
											  
											</div>
					                      </div>
				                      	);
				                      }) : <h1 className="text-center">loading...</h1>}
				                     
				                      
									</div>
								</div>
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
