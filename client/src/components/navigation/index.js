import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Link, withRouter } from "react-router-dom";
import "./style.css";
import { connect } from "react-redux";
import { authentication } from "../../actions/index.js";
import { store } from "../../store/store.js";
import axios from "axios";
import io from "socket.io-client";
import { StreamChat } from 'stream-chat';


const client = new StreamChat('qzye22t8v5c4');

const socket = io("http://localhost:5000");

let channel;

class Navigation extends Component {
constructor(props) {
  super(props);

  this.state = {
    isOpen: false,
    friends: [],
    users: [],
    successful: false,
    tokens: null,
    cammer: false,
    showNotificationBanner: true
  };
}
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  gatherFriendRequests = () => {
    axios.post("/gather/friends/list/navbar", {
      email: this.props.authenticated
    }).then((res) => {
      console.log(res.data);
      for (let key in res.data) {
        let friends = res.data[key].friends;
        console.log(friends);
        this.setState({
          friends
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  gatherUser = (username) => {
    axios.post("/gather/username/profile", {
      username
    }).then((res) => {
      console.log(res.data);
      if (res.data) {
        this.props.history.push(`/profiles/individual/${username}`, { user: res.data });
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  addFriend = (friend) => {
    console.log("clicked... :", friend);

    axios.put("/handle/friend/request", {
      username: friend.username,
      email: this.props.authenticated
    }).then((res) => {
      console.log(res.data);
      // if (res.data) {
      //   this.reRenderFriendsList();
      // }
    }).catch((err) => {
      console.log(err);
    })
    axios.put("/recieving/approval/send/confirmation", {
      username: this.props.username,
      id: friend.id
    }).then((res) => {
      console.log(res.data);
      // if (res.data) {
      //   this.reRenderFriendsList();
      // }
    }).catch((err) => {
      console.log(err);
    })

    setTimeout(() => {
      window.location.reload();
    }, 700);
  }
  reRenderFriendsList = () => {
    console.log("reRenderFriendsList");
    axios.post("/gather/friends/list/navbar", {
      email: this.props.authenticated
    }).then((res) => {
      console.log(res.data);
      for (let key in res.data) {
        let friends = res.data[key].friends;
        console.log(friends);
        this.setState({
          friends
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("prevState :", prevState);
    console.log("prevProps :", prevProps);
    if (prevProps.tokens !== store.getState().auth.data.tokens) {
        // axios.post("/get/user", {
        //   email: this.props.authenticated
        // }).then((res) => {
        //   const publicKey = res.data.blockPublicKey;
        //   axios.get(`/address/${publicKey}`).then((res) => {
        //     console.log(res.data);
        //     this.setState({
        //       tokens: res.data.addressData.addressBalance
        //     })
        //   }).catch((err) => {
        //     console.log(err);
        //   })
        // }).catch((err) => {
        //   console.log(err);
        // })
        // axios.post("/tokens/gather", {
        //   email: this.props.authenticated
        // }).then((res) => {
        //   console.log(res.data);
        //   for (let key in res.data) {
        //     let tokens = res.data[key].tokens;
        //     console.log(tokens);
        //     this.setState({
        //       tokens
        //     })
        //   }
        // }).catch((err) => {
        //   console.log(err);
        // })  
    }
  }
  componentDidMount() {
    setTimeout(() => {
      axios.post("/get/user", {
        email: this.props.authenticated
      }).then((res) => {
        const publicKey = res.data.blockPublicKey;
        axios.get(`/address/${publicKey}`).then((res) => {
          console.log(res.data);
          this.setState({
            tokens: res.data.addressData.addressBalance
          })
        }).catch((err) => {
          console.log(err);
        })
      }).catch((err) => {
        console.log(err);
      })
      // axios.post("/tokens/gather", {
      //   email: this.props.authenticated
      // }).then((res) => {
      //   console.log(res.data);
      //   for (let key in res.data) {
      //     let tokens = res.data[key].tokens;
      //     console.log(tokens);
      //     this.setState({
      //       tokens
      //     })
      //   }
      // }).catch((err) => {
      //   console.log(err);
      // })
      axios.post("/check/if/cammer/true", {
        email: this.props.authenticated
      }).then((res) => {
        if (res.data.length === 0) {
          console.log("undefined/unknown - do nothing.")
          return null;
        } else {
          console.log(res.data);
          this.setState({
            cammer: true
          })
        }
        
      }).catch((err) => {
        console.log(err);
      })


      this.setState({
        showNotificationBanner: false
      })
    }, 300);
  }
  constantRender = () => {
    socket.on("connection", () => {
      console.log("connected.");
    })
  }

  render () { 
    console.log(this.state);
    return (
      <div>
        <Navbar className="navigation" expand="md">
          <NavbarBrand><img onClick={() => {
            this.props.history.push("/");
          }} style={{ width: "200px", height: "50px" }} src={require("../../images/logos.png")} alt="logo"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} style={{ color: "white", border: "2px solid white" }}> Menu </NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {this.props.authenticated ? <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Crypto Tokens 
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link class="dropdown-item" to="/crypto/wallet">Crypto Wallet</Link>
                  <Link class="dropdown-item" to="/purchase/tokens">Purchase Tokens</Link>
                  <div class="dropdown-divider"></div>
                  <Link class="dropdown-item" to="/cashout/homepage">Cash Out Your Tokens</Link>
                </div>
              </li> : null}
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Streams/Broadcasting
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  {this.props.authenticated && this.state.cammer ? <Link class="dropdown-item" to="/streams/create">Start PUBLIC Stream</Link> : null}
                  <Link class="dropdown-item" to="/profiles">Cammers/Buy-Content</Link>
                  
                  {this.props.authenticated && this.state.cammer ? <React.Fragment><div class="dropdown-divider"></div><Link class="dropdown-item" to="/streams/create/private">Start PRIVATE Stream</Link></React.Fragment> : null}
                  {this.props.authenticated && this.state.cammer ? <React.Fragment><div class="dropdown-divider"></div><Link class="dropdown-item" to="/lovense/connect">Connect LOVENSE Vibrator</Link></React.Fragment> : null}
                  <Link class="dropdown-item" to="/all/streams/public">View All Public Streams</Link>
                </div>
              </li>
              {this.props.authenticated ? <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Social Links
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link class="dropdown-item" to="/chat/homepage">Messaging</Link>
                  <Link class="dropdown-item" to="/find/fuck/buddies/map">Find Locals To Fuck</Link>
                  <div class="dropdown-divider"></div>
                  <Link class="dropdown-item" to="/upload/photo/feed">Upload Photo To Profile Feed</Link>
                </div>
              </li>  : null}


            </Nav>
            	{this.props.authenticated ? null : <NavItem className="link">
                <Link className="btn btn-outline aqua_button_custom" to="/login">Sign-in</Link>
              </NavItem>}
              
              {this.props.authenticated ? <NavItem className="link sign-out">
                <button onClick={() => {
                	this.props.authentication({});
                  this.props.history.push("/");
                }} className="btn btn-outline-light" to="/register">Sign-Out</button>
              </NavItem> : <NavItem className="link">
                <Link className="btn btn-outline green_button_custom" to="/register">Sign Up</Link>
              </NavItem>}
              {this.props.authenticated ? <NavItem className="link">
                <Link className="btn btn-outline pink_button" to="/signup/camming/one">Become A Cammer!</Link>
              </NavItem> : null}
              {this.props.authenticated ? <li style={{ listStyleType: "none" }} class="dropdown">
                  <a style={{ margin: "20px", color: "black" }} onClick={this.gatherFriendRequests} class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i style={{ color: "black" }} class="fas fa-user-friends fa-2x peek-a-boo"></i>
                  {/*{this.state.friends ? (<b>{this.state.friends ? this.state.friends.length : null}</b>) : null}*/}
                  </a>
                  <ul class="dropdown-menu notify-drop">
                    <div class="notify-drop-title">
                      
                    </div>
                   
                    <div class="drop-content" style={{ padding: "20px 25px" }}>
                      {this.state.friends ? this.state.friends.map((friend, index) => {
                        console.log(friend);
                        if (friend.status === "pending" && friend.sender === false) {
                          return (
                              <li key={index}>
                              
                                <div id="fb" style={{ width: "100%" }}>
                                <div id="fb-top">
                                  <p><b>Friend Requests</b><span>Find Friends &bull; Settings</span></p>
                                </div>
                                <img src={friend.image ? friend.image : require("../../images/sex-1.jpg")} height="100" width="100" alt="Image of woman" />
                                <p id="info"><b><a style={{ color: "pink" }} onClick={() => {
                                  this.gatherUser(friend.username);
                                }}>{friend.username}</a></b> <br /> <span>14 mutual friends</span></p>
                                <div id="button-block">
                                  <div onClick={() => {
                                    this.addFriend(friend);
                                  }} id="confirm">Confirm</div>
                                  <div id="delete">Delete Request</div>
                                </div>
                              </div>
                            
                            
                            </li>
                          );
                        }
                      }) : <h3 className="text-center text-dark">You have no currently pending friend requests...</h3>}
                     
                      <div>
                        <Link to="/friends/list/home" style={{ width: "100%", color: "black" }} className="btn btn-outline purple_neon_btn_black">Check out your friends list</Link>
                      </div>
                     
                    </div>
                   {/* <div class="notify-drop-footer text-center">
                      <a href=""><i class="fa fa-eye"></i> Tümünü Göster</a>
                    </div>*/}
                  </ul>
                </li> : null}
             
              {this.props.authenticated ? <NavbarText>{store.getState().auth.data.username.slice(0, 10)}..., (<strong>{this.state.tokens === 0 ? "0" : this.state.tokens}</strong>) tokens</NavbarText> : null}
            {this.constantRender()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	console.log("State :", state);
	return {
		authenticated: state.auth.data.email,
    username: state.auth.data.username,
    tokens: state.auth.data.tokens ? state.auth.data.tokens : 0,
    token: state.token.token
	}
}

export default withRouter(connect(mapStateToProps, { authentication })(Navigation));