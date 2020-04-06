/**************/
/*** CONFIG ***/
/**************/
const PORT = process.env.PORT || 5000;


/*************/
/*** SETUP ***/
/*************/
let express = require('express');
let http = require('http');
let bodyParser = require('body-parser')
let app = express()
const mongoDB = require("./config/db.js");
const cors = require("cors");
const path = require("path");
const config = require("config");
let server = http.createServer(app)
let io = require('socket.io').listen(server);
const passport = require("passport");
// Storage Configuration
const util = require('util');
const fs = require('fs');
const stateFilePath = './.data/stream';
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
// Setup the Mux SDK
const Mux = require('@mux/mux-node');

const { Video } =  new Mux("f899a074-f11e-490f-b35d-b6c478a5b12a", "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/");

let STREAM;


//io.set('log level', 2);

mongoDB();


app.use('*', cors());

app.use(express.json());
app.use(express.urlencoded({
	extended: true
})); 
app.use(passport.initialize());
app.use(passport.session());

app.get('*', cors(), function(_, res) {
  res.sendFile(__dirname, './client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    };
  };
});

app.get('/*', cors(), function(_, res) {
  res.sendFile(__dirname, './client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    };
  }; 
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

if (process.env.NODE_ENV === "production") {
	// Express will serve up production files
	app.use(express.static("client/build"));
	// serve up index.html file if fit doenst recognize the route
	app.get('*', cors(), function(_, res) {
	  res.sendFile(__dirname, './client/build/index.html'), function(err) {
	    if (err) {
	      res.status(500).send(err)
	    }
	  }
	})
	app.get('/*', cors(), function(_, res) {
	  res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
	    if (err) {
	      res.status(500).send(err)
	    }
	  })
	})
}; 

app.use("/post/reply/comment/profile", require("./routes/comments/postReplyComment.js"));
app.use("/gather/profile/comments/individual", require("./routes/comments/gather/gatherComments.js"));
app.use("/stream", require("./routes/streaming/stream.js"));
app.use("/streaming/create", require("./routes/streaming/streamingTokBox.js"));
app.use("/streaming/gather", require("./routes/streaming/gatherStreams.js"));
app.use("/streaming/start/broadcast", require("./routes/streaming/startBroadcast.js"));
app.use("/streams/gather/broadcasts", require("./routes/streaming/gatherBroadcasts.js"));
app.use("/streaming/stop", require("./routes/streaming/stopStream.js"));
app.use("/streaming/get/individual/broadcast", require("./routes/streaming/getBroadcastIndividual.js"));
app.use("/register/new/user", require("./routes/auth/register.js"));
app.use("/mux/create/stream", require("./routes/mux/index.js"));
app.use("/mux/get/streams", require("./routes/mux/gatherStream.js"));
app.use("/get/stream", require("./routes/mux/"));
app.use("/authentication/login", require("./routes/auth/login.js"));
app.use("/post/new/stream", require("./routes/streaming/mongodb/saveStreamData.js"));
app.use("/complete/form/page/one", require("./routes/forms/cammerRegistration/agreement.js"));
app.use("/identify/user/agreement", require("./routes/forms/cammerRegistration/checkAgreement.js"));
app.use("/profile/append/data/one", require("./routes/profile/addNewData/addProfileData.js"));
app.use("/gather/all/users", require("./routes/profile/gatherData/gatherAllUsers.js"));
app.use("/update/skills/percentages", require("./routes/profile/addNewData/updateSkills.js"));
app.use("/gather/skills/profile/page", require("./routes/profile/gatherData/gatherSkills.js"));
app.use("/profile/find/user/streams", require("./routes/profile/gatherData/gatherStreams.js"));
app.use("/push/stream/active_asset_id", require("./routes/mux/pushAssetID.js"));
app.use("/post/new/comment/profile", require("./routes/comments/postComment.js"));
app.use("/send/friend/request/reciever", require("./routes/friendsList/addFriend/recievingFriend.js"));
app.use("/send/friend/request/sender", require("./routes/friendsList/addFriend/sendingFriend.js"));
app.use("/gather/friends/list/navbar", require("./routes/friendsList/gatherPending/gather.js"));
app.use("/gather/username/profile", require("./routes/profile/gatherData/gatherUsername.js"));






app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`);
});


 
