import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import "./css/style.css";
import Navigation from "../navigation/index.js";
import Footer from "../common/footer/footer.js";
import { withRouter } from "react-router-dom";

class FeedOnlyfansStyle extends Component {
constructor(props) {
  super(props);

}
  render() {
    console.log(this.props);
    return(
      <div>
        <div id="contain" className="container-fluid">
        <div className="row">
          {this.props.posts.feed ? this.props.posts.feed.map((post, index) => {
            console.log('post', post);
              return (
                <div onClick={() => {
                  this.props.history.push("/", { post });
                }} id="ig_photo" class="case-study study1 col-md-4 col-lg-4 col-sm-6 col-xs-6">
                  <figure>
                    <img class="case-study__img" src={post.link} alt="posted-image" />
                  </figure>
                  <div class="case-study__overlay">
                    <h2 class="case-study__title">{post.title}...</h2>
                    <a class="case-study__link" href="#">View Photo</a>
                  </div>
                </div>
              );
          }) : null}
          {!this.props.posts.feed ? <h1 className="text-center text-dark custom_text">This user currently has no posted pictures.</h1> : null}
          </div>
          </div>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.auth.data.username,
    email: state.auth.data.email
  }
}

export default withRouter(connect(mapStateToProps, {  })(FeedOnlyfansStyle));