import React, { Component } from 'react';
import Footer from "../../common/footer/footer.js";
import Navigation from "../../navigation/index.js";
import "../css/viewBlock.css";

class CryptoBlockIndividual extends Component {
constructor(props) {
    super(props);

	this.state = {

	}
}
    render() {
    	console.log(this.props.location.state.block);
    	const myBlock = this.props.location.state.block;
        return (
            <div>
				<Navigation />
					<div class="container">
					    <div class="team-single">
					        <div class="row" style={{ margin: "50px 0px" }}>
					            <div class="col-lg-4 col-md-5 xs-margin-30px-bottom">
					                <div class="team-single-img">
					                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
					                </div>
					                <div class="bg-light-gray padding-30px-all md-padding-25px-all sm-padding-20px-all text-center">
					                    <h4 class="margin-10px-bottom font-size24 md-font-size22 sm-font-size20 font-weight-600 text-dark">Gemshire Currency</h4>
					                    <p class="sm-width-95 sm-margin-auto text-dark">Welcome to your blockchain, please feel free to browse your transactions, blocks, etc... and message us if you have ANY questions or concerns!</p>
					                    <div class="margin-20px-top team-single-icons">
					                        <ul class="no-margin">
					                            <li><a href="javascript:void(0)"><i class="fab fa-facebook-f"></i></a></li>
					                            <li><a href="javascript:void(0)"><i class="fab fa-twitter"></i></a></li>
					                            <li><a href="javascript:void(0)"><i class="fab fa-google-plus-g"></i></a></li>
					                            <li><a href="javascript:void(0)"><i class="fab fa-instagram"></i></a></li>
					                        </ul>
					                    </div>
					                </div>
					            </div>

					            <div class="col-lg-8 col-md-7">
					                <div class="team-single-text padding-50px-left sm-no-padding-left">
					                    <h4 class="font-size38 sm-font-size32 xs-font-size30">Welcome to block {myBlock.index} of your blockchain network!</h4>
					                    {/*<p class="no-margin-bottom">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum voluptatem.</p>*/}
					                    <div class="contact-info-section margin-40px-tb">
					                        <ul class="list-style9 no-margin">
					                            <li>

					                                <div class="row">
					                                    <div class="col-md-5 col-5">
					                                        <i class="fas fa-graduation-cap text-orange"></i>
					                                        <strong class="margin-10px-left text-orange">Hash:</strong>
					                                    </div>
					                                    <div class="col-md-7 col-7">
					                                        <p className="row-wrap">{myBlock.hash}</p>
					                                    </div>
					                                </div>

					                            </li>
					                            <li>

					                                <div class="row">
					                                    <div class="col-md-5 col-5">
					                                        <i class="far fa-gem text-yellow"></i>
					                                        <strong class="margin-10px-left text-yellow">Block #:</strong>
					                                    </div>
					                                    <div class="col-md-7 col-7">
					                                        <p>{myBlock.index}</p>
					                                    </div>
					                                </div>

					                            </li>
					                            <li>

					                                <div class="row">
					                                    <div class="col-md-5 col-5">
					                                        <i class="far fa-file text-lightred"></i>
					                                        <strong class="margin-10px-left text-lightred">nounce:</strong>
					                                    </div>
					                                    <div class="col-md-7 col-7">
					                                        <p>{myBlock.nounce}</p>
					                                    </div>
					                                </div>

					                            </li>
					                            <li>

					                                <div class="row">
					                                    <div class="col-md-5 col-5">
					                                        <i class="fas fa-map-marker-alt text-green"></i>
					                                        <strong class="margin-10px-left text-green">Previous Block Hash:</strong>
					                                    </div>
					                                    <div class="col-md-7 col-7">
					                                        <p className="row-wrap">{myBlock.previousBlockHash}</p>
					                                    </div>
					                                </div>

					                            </li>
					                            <li>

					                                <div class="row">
					                                    <div class="col-md-5 col-5">
					                                        <i class="fas fa-mobile-alt text-purple"></i>
					                                        <strong class="margin-10px-left xs-margin-four-left text-purple">Timestamp:</strong>
					                                    </div>
					                                    <div class="col-md-7 col-7">
					                                        <p>{myBlock.timestamp}</p>
					                                    </div>
					                                </div>

					                            </li>
					                           {/* <li>
					                                <div class="row">
					                                    <div class="col-md-5 col-5">
					                                        <i class="fas fa-envelope text-pink"></i>
					                                        <strong class="margin-10px-left xs-margin-four-left text-pink">Email:</strong>
					                                    </div>
					                                    <div class="col-md-7 col-7">
					                                        <p><a href="javascript:void(0)">addyour@emailhere</a></p>
					                                    </div>
					                                </div>
					                            </li>*/}
					                        </ul>
					                    </div>

					                    

					                    
					                </div>
					            </div>

					            <div class="col-md-12">

					            </div>
					        </div>
					    </div>
					</div>
					<h5 class="font-size24 sm-font-size22 xs-font-size20 text-center">- Blockchain Transactions -</h5>
					<div style={{ marginTop: "30px" }} className="container">
						<div className="col-md-12 col-lg-12 col-sm-12">
								<div class="sm-no-margin">
		                        <div class="row">
							        <div class="panel panel-primary filterable">
							            <div class="panel-heading">
							                <h3 class="panel-title text-center">Welcome to block {myBlock.index} of your blockchain!</h3>
							                {/*<div class="pull-right">*/}
							                    {/*<button class="btn btn-default btn-xs btn-filter"><span class="glyphicon glyphicon-filter"></span> Filter</button>
							                </div>*/}
							            </div>
							            <table class="table">
							                <thead>
							                    <tr class="filters">
							                        <th><input style={{ width: "150px" }} type="text" class="form-control" placeholder="Amount" disabled /></th>
							                        <th><input type="text" class="form-control" placeholder="Recipient" disabled /></th>
							                        <th><input type="text" class="form-control" placeholder="Sender" disabled /></th>
							                        <th><input type="text" class="form-control" placeholder="Transaction ID" disabled /></th>
							                    </tr>
							                </thead>
							                <tbody>
								                {myBlock.transactions ? myBlock.transactions.map((transaction, index) => {
							                    	console.log(transaction);
							                    	return (
														<tr>
									                        <td className="text-white">{transaction.amount === "00" ? "This is a mined block" : transaction.amount}</td>
									                        <td className="text-white">{transaction.recipient}</td>
									                        <td className="text-white">{transaction.sender}</td>
									                        <td className="text-white">{transaction.transactionId}</td>
									                    </tr>
							                    	);
							                    }) : <h1 style={{ width: "100%" }} className="text-center">No Transactions Present.</h1>}
							                </tbody>
							            </table>
							        </div>
							    </div>
		                    
		                   
		                        {/*<div class="progress-text">
		                            <div class="row">
		                                <div class="col-7">Positive Behaviors</div>
		                                <div class="col-5 text-right">40%</div>
		                            </div>
		                        </div>
		                        <div class="custom-progress progress">
		                            <div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: "40%" }} class="animated custom-bar progress-bar slideInLeft bg-sky"></div>
		                        </div>
		                        <div class="progress-text">
		                            <div class="row">
		                                <div class="col-7">Teamworking Abilities</div>
		                                <div class="col-5 text-right">50%</div>
		                            </div>
		                        </div>
		                        <div class="custom-progress progress">
		                            <div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: "50%" }} class="animated custom-bar progress-bar slideInLeft bg-orange"></div>
		                        </div>
		                        <div class="progress-text">
		                            <div class="row">
		                                <div class="col-7">Time Management </div>
		                                <div class="col-5 text-right">60%</div>
		                            </div>
		                        </div>
		                        <div class="custom-progress progress">
		                            <div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }} class="animated custom-bar progress-bar slideInLeft bg-green"></div>
		                        </div>
		                        <div class="progress-text">
		                            <div class="row">
		                                <div class="col-7">Excellent Communication</div>
		                                <div class="col-5 text-right">80%</div>
		                            </div>
		                        </div>
		                        <div class="custom-progress progress">
		                            <div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }} class="animated custom-bar progress-bar slideInLeft bg-yellow"></div>
		                        </div>*/}
		                    </div>

						</div>
					</div>
				<Footer />
            </div>
        );
    }
}

export default CryptoBlockIndividual;
