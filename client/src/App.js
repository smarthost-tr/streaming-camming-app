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
        <Route path="/purchase/tokens" exact component={PurchaseTokenDash} />
        <Route path="/view/individual/private/stream/:id" exact component={StreamShow} />
        <Route path="/register" exact component={RegisterNewUser} />
        <Route path="/login" exact component={LoginScreen} />
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