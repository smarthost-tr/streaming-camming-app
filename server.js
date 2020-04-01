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

// Creates a new Live Stream so we can get a Stream Key
const createLiveStream = async () => {
  // Create a new Live Stream!
  return await Video.LiveStreams.create({
    playback_policy: 'public',
    reconnect_window: 10,
    new_asset_settings: { playback_policy: 'public' } 
  });
};

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

// Reads a state file looking for an existing Live Stream, if it can't find one, 
// creates a new one, saving the new live stream to our state file and global
// STREAM variable.
// const initialize = async () => {
//   try {
//     const stateFile = await readFile(stateFilePath, 'utf8');
//     STREAM = JSON.parse(stateFile);
//     console.log('Found an existing stream! Fetching updated data.');
//     STREAM = await Video.LiveStreams.get(STREAM.id);
//   } catch (err) {
//     console.log('No stream found, creating a new one.');
//     STREAM = await createLiveStream();
//     console.log(STREAM);
//     await writeFile(stateFilePath, JSON.stringify(STREAM));
//   }
//   return STREAM;
// }

// // Lazy way to find a public playback ID (Just returns the first...)
// const getPlaybackId = stream => stream['playback_ids'][0].id;

// // Gets a trimmed public stream details from a stream for use on the client side
// const publicStreamDetails = stream => ({
//   status: stream.status,
//   playbackId: getPlaybackId(stream),
//   recentAssets: stream['recent_asset_ids'],
// })

// // API for getting the current live stream and its state for bootstrapping the app
// app.get('/stream', async (req, res) => {
//   const stream = await Video.LiveStreams.get(STREAM.id);
//   res.json(
//     publicStreamDetails(stream)
//   );
// });

// // API which Returns the 5 most recent VOD assets made from our Live Stream
// app.get('/recent', async (req, res) => {
//   const recentAssetIds = STREAM['recent_asset_ids'] || [];

//   // For each VOD asset we know about, get the details from Mux Video
//   const assets = await Promise.all(
//     recentAssetIds
//     .reverse()
//     .slice(0, 5)
//     .map((assetId) =>
//       Video.Assets.get(assetId).then(asset => {

//         return {
//           playbackId: getPlaybackId(asset),
//           status: asset.status,
//           createdAt: asset.created_at,
//         };
//       })
//     )
//   );
//   res.json(assets);
// });

// // API which Listens for callbacks from Mux
// app.post('/mux-hook', function (req, res) {
//   STREAM.status = req.body.data.status;
  
//   switch (req.body.type) {

      
//     // When a stream goes idle, we want to capture the automatically created 
//     // asset IDs, so we can let people watch the on-demand copies of our live streams
//     case 'video.live_stream.idle':
//       STREAM['recent_asset_ids'] = req.body.data['recent_asset_ids'];
//       // We deliberately don't break; here

//     // When a Live Stream is active or idle, we want to push a new event down our
//     // web socket connection to our frontend, so that it update and display or hide
//     // the live stream.
//     case 'video.live_stream.active':
//       io.emit('stream_update', publicStreamDetails(STREAM));
//       break;
//     default:
//       // Relaxing.
//   }

//   res.status(200).send('Thanks, Mux!');
// });

// // Starts the HTTP listener for our application.
// // Note: glitch helpfully remaps HTTP 80 and 443 to process.env.PORT
// initialize().then((stream) => {
//   const listener = http.listen(process.env.PORT || 4000, () => {
//     console.log('Your app is listening on port ' + listener.address().port);
//     console.log('HERE ARE YOUR STREAM DETAILS, KEEP THEM SECRET!');
//     console.log(`Stream Key: ${stream.stream_key}`);
//   });
// });


app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`);
});


 
