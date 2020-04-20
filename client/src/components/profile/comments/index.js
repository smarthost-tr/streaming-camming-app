import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../css/comments.css";
import axios from "axios";


class DropAComment extends Component {
constructor(props) {
    super(props);

    this.state = {
        comment: "",
        comments: [],
        reply: false,
        commentUUID: "",
        replyComment: "",
        updated: false,
        rerender: false,
        rerenderAgain: false
    }
}
    postComment = () => {
        console.log("button pressed...");

        if (this.state.comment.length > 0) {
            axios.post("/post/new/comment/profile", {
                email: this.props.user.email,
                comment: this.state.comment,
                username: this.props.usernameAuthedUser,
                birthdate: this.props.user.birthdate
            }).then((res) => {
                console.log(res.data);
                if (res.data) {
                    this.setState({
                        comment: "",
                        rerender: true
                    });
                    alert("Comment successfully posted!");
                    
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            alert("Please fill out the comment box if you'd like to leave a comment on this users wall...")
        }
    }
    componentDidMount() {
        axios.post("/gather/profile/comments/individual", {
            email: this.props.user.email
        }).then((res) => {
            for (let key in res.data) {
                let comments = res.data[key].profileComments;
                console.log(comments);
                this.setState({
                    comments,
                    rerender: true
                })
            }
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    postReplyComment = () => {
        console.log("reply clicked...");

        if (this.state.replyComment.length > 0) {
            axios.post("/post/reply/comment/profile", {
                email: this.props.user.email,
                id: this.state.commentUUID,
                comment: this.state.replyComment,
                username: this.props.usernameAuthedUser
            }).then((res) => {
                console.log(res.data);
                if (res) {
                    this.setState({
                        replyComment: "",
                        rerenderAgain: true,
                        reply: false
                    });
                    alert("Successfully posted your reply!");
                    
                }
            }).catch((err) => {
                console.log(err);
                if (err) {
                    alert("An error occurred, please try again.")
                }
            })
        } else {
            alert("You need to enter a valid message - please make sure you actually typed in your message.");
        }
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps);
        console.log(prevState);
        if (this.props.user.username !== prevProps.user.username) {
           console.log("updated...");
            axios.post("/gather/profile/comments/individual", {
                email: this.props.user.email
            }).then((res) => {
                for (let key in res.data) {
                    let comments = res.data[key].profileComments;
                    console.log(comments);
                    this.setState({
                        comments
                    })
                }
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
        if (prevState.comments && this.state.rerender) {
            return prevState.comments.map((comment, index) => {
                console.log(comment);
                if (prevState.comment !== comment.comment && this.state.rerender) {
                    console.log("running!!");
                    axios.post("/gather/profile/comments/individual", {
                        email: this.props.user.email
                    }).then((res) => {
                        for (let key in res.data) {
                            let comments = res.data[key].profileComments;
                            console.log(comments);
                            this.setState({
                                comments,
                                rerender: false
                            })
                        }
                        console.log(res.data);
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    console.log("do nothing.")
                }
            })
        }
        if (prevState.replyComment && this.state.rerenderAgain) {
            return prevState.comments.map((comment, index) => {
                if (comment.reply) {
                    return comment.reply.map((item, indexxx) => {
                        if (prevState.comment !== item.comment && this.state.rerenderAgain) {
                            console.log(item);
                           axios.post("/gather/profile/comments/individual", {
                                email: this.props.user.email
                            }).then((res) => {
                                for (let key in res.data) {
                                    let comments = res.data[key].profileComments;
                                    console.log(comments);
                                    this.setState({
                                        comments,
                                        rerenderAgain: false
                                    })
                                }
                                console.log(res.data);
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                    })
                }
            })   
        }
    }
    render() {
        console.log(this.props);
        console.log(this.state.comments);
        return (
            <div className="container-fluid">
				<div class="row bootstrap snippets">
                    <div class="col-md-16 col-md-offset-2 col-sm-12">
                        <div class="comment-wrapper">
                            <div class="panel custom_panel">
                                <div class="panel-heading">
                                    Leave a comment for your cammer/streamer!
                                </div>
                                <div class="panel-body">
                                    {this.props.authenticatedEmail ? <React.Fragment> <textarea value={this.state.comment} onChange={(e) => {
                                        this.setState({
                                            comment: e.target.value
                                        })
                                    }} class="form-control" placeholder="write a comment..." rows="3"></textarea>
                                    <br/>
                                    <button onClick={() => {
                                        this.postComment()
                                    }} type="button" class="btn btn-outline-dark pull-right" style={{ width: "100%" }}>Drop a comment!</button></React.Fragment> : null}
                                  
                                    <hr />
                                    <div class="media-body">
                                        <div class="comments-container">
                                            
                                             {this.state.reply ? <div class="form-group">
                                                <label for="exampleFormControlTextarea1" className="text-white">Reply to comment</label>
                                                <textarea onChange={(e) => {
                                                    this.setState({
                                                        replyComment: e.target.value
                                                    })
                                                }} placeholder="Enter your response to the comment you're replying to here such as... Hey i loved that video! You looked great, thanks again for the good time." class="form-control" id="exampleFormControlTextarea1" value={this.state.replyComment} rows="3"></textarea>
                                                <button onClick={() => {
                                                    this.postReplyComment()
                                                }} style={{ marginTop: "30px" }} className="btn btn-outline-dark">Submit Reply To Comment</button>
                                              </div> : null}
                                            <ul id="comments-list" class="comments-list">
                                               
                                                     
                                                  
                                                    <ul class="comments-list reply-list">
                                                        {this.state.comments ? this.state.comments.map((comment, index) => {
                                                            console.log(comment);
                                                            return (
                                                                <li key={index}>
                                                          
                                                                    {/*<div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt=""/></div>
                                                                   */}
                                                                    <div class="comment-box">
                                                                        <div class="comment-head">
                                                                            <h6 class="comment-name text-white"><a href="http://creaticode.com/blog" className="text-white">{comment.username}</a></h6>
                                                                            <span>{comment.date}</span>
                                                                            <i class="fa fa-reply" onClick={() => {
                                                                                this.setState({
                                                                                    reply: !this.state.reply,
                                                                                    commentUUID: comment.id
                                                                                })
                                                                            }}></i>
                                                                            <i class="fa fa-heart"></i>
                                                                        </div>
                                                                        <div class="comment-content">
                                                                            <div className="text-left">{comment ? comment.comment : "No comment avaliable"}</div>
                                                                        </div>
                                                                    </div>
                                                                    {comment.reply ? comment.reply.map((reply, indexxx) => {
                                                                        console.log(reply);
                                                                        return (
                                                                            <div key={indexxx} class="comment-box-two">
                                                                                <div class="comment-head">
                                                                                    <h6 class="comment-name"><a href="/">{reply.username}</a></h6>
                                                                                    <span>{reply.date}</span>
                                                                                   
                                                                                    <i class="fa fa-heart"></i>
                                                                                </div>
                                                                                <div class="comment-content">
                                                                                    <div className="text-left">{reply.comment}</div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }) : null}
                                                                </li>
                                                            );

                                                        }) : <h1 className="text-center text-dark">Unfortunetly, There are no comments yet, you can change that!</h1>}

                                                       
                                                    </ul>
                                              

                                               
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        authenticatedEmail: state.auth.data.email,
        usernameAuthedUser: state.auth.data.username
    }
}


export default connect(mapStateToProps, {  })(DropAComment);
