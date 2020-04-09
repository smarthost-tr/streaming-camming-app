import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { connect } from "react-redux";
import StreamList from "./components/streams/streamList.js";
import { BrowserRouter, Route } from "react-router-dom";
import ViewStream from "./components/streams/viewStream.js";
import StreamEdit from "./components/streams/streamEdit.js";
import StreamDelete from "./components/streams/streamDelete.js";
import StreamShow from "./components/streams/streamShow.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import StreamCreateAPI from "./components/streams/streamCreateAPI.js";
import RegisterNewUser from "./components/registration/registerNewUser.js";
import LoginScreen from "./components/registration/login.js";
import ErrorUnauthorized from "./components/error/errorPage.js";
import PurchaseTokenDash from "./components/coins/purchase/index.js";
import PurchaseTokensPayment from "./components/coins/purchase/purchaseCoin.js";
import PageOneSignupCamming from "./components/signupCammer/pageOne/index.js";
import PageTwoSignupCamming from "./components/signupCammer/pageTwo/index.js";
import ProfileHomepage from "./components/profile/home/index.js";
import PageThreeCammerSignup from "./components/signupCammer/pageThree/index.js";
import AllProfilesHomepage from "./components/profile/allProfiles/allProfiles.js";
import ProfilesIndividual from "./components/profile/individual/individual.js";
import SubscribeHomepage from "./components/subscribe/home/index.js";
import FriendsListHome from "./components/friends/home/index.js";
import OthersFriendsList from "./components/friends/otherUsersFriends/index.js";
import ThankYouPaymentPage from "./components/coins/thankYouPage.js";

class App extends Component {
constructor(props) {
  super(props);

  

  this.state = {

  };
}

  handleClick = () => {
    console.log("clicked");
    axios.post("/stream").then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }
  render () {
    return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={StreamList} />
        {this.props.auth ? <Route path="/streams/create" exact component={StreamCreateAPI} /> : <Route path="/streams/create" exact component={ErrorUnauthorized} />}
        <Route path="/streams/edit/:id" exact component={StreamEdit} />
        {this.props.auth ? <Route path="/purchase/tokens" exact component={PurchaseTokenDash} /> : <Route path="/purchase/tokens" exact component={ErrorUnauthorized} />}
        {this.props.auth ? <Route path="/purchase/tokens/payment" exact component={PurchaseTokensPayment} /> : <Route path="/purchase/tokens/payment" exact component={ErrorUnauthorized} />}
        <Route path="/view/individual/private/stream/:id" exact component={StreamShow} />
        <Route path="/register" exact component={RegisterNewUser} />
        <Route path="/login" exact component={LoginScreen} />
        {this.props.auth ? <Route path="/signup/camming/one" exact component={PageOneSignupCamming} /> : <Route path="/signup/camming/one" exact component={ErrorUnauthorized} />}
        {this.props.auth ? <Route path="/signup/camming/two" exact component={PageTwoSignupCamming} /> : <Route path="/signup/camming/two" exact component={ErrorUnauthorized} />}
        {this.props.auth ? <Route path="/signup/camming/three" exact component={PageThreeCammerSignup} /> : <Route path="/signup/camming/two" exact component={ErrorUnauthorized} />}
        <Route path="/profile/individual" exact component={ProfileHomepage} />
        <Route path="/profiles" exact component={AllProfilesHomepage} />
        <Route path="/profiles/individual/:id" exact component={ProfilesIndividual} />
        <Route path="/signup/subscriber/payment" exact component={SubscribeHomepage} />
        {this.props.auth ? <Route path="/friends/list/home" exact component={FriendsListHome} /> : <Route path="/friends/list/home" exact component={ErrorUnauthorized} />}
        <Route path="/others/friends/list/individual/:id" exact component={OthersFriendsList} />
        <Route path="/thank/you/for/your/payment" exact component={ThankYouPaymentPage} />
        
      </div>
    </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth.data.email
  }
}

export default connect(mapStateToProps, {  })(App);