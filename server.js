/**************/
/*** CONFIG ***/
/**************/
const PORT = process.argv[2] || 5000;
const port = process.argv[2] || PORT;

/*************/
/*** SETUP ***/
/*************/
let express = require('express');
let http = require('http');
// let bodyParser = require('body-parser')
let app = express()
const mongoDB = require("./config/db.js");
const cors = require("cors");
const path = require("path");
// const config = require("config");
const passport = require("passport");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
// Storage Configuration
// const util = require('util');
// const fs = require('fs');
// const stateFilePath = './.data/stream';
// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);
// Setup the Mux SDK
// const Mux = require('@mux/mux-node');
const paypal = require('paypal-rest-sdk');
const flash = require('connect-flash');
const session = require('express-session');
// const mongo = require("mongodb");
// const moment = require("moment");
// const {Video} = new Mux("f899a074-f11e-490f-b35d-b6c478a5b12a", "4vLdjx6uBafGdFiSbmWt5akv4DaD4PkDuCCYdFYXzudywyQSR3Uh27GqlfedlhZ17fbnXbf9Rh/");
// const EC = require("elliptic").ec;
// const ec = new EC("secp256k1");
const gemshire = require("./main.js");
const rp = require("request-promise");
const uuid = require("uuid/v4");
const nodeAddress = uuid().split("-").join("");
const node_media_server = require('./rtmpserver/media_server.js');
// import thumbnail generator
const thumbnail_generator = require('./rtmpserver/thumbnail.js');

// let STREAM;

{/*var httpsServer = https.createServer(credentials, app).listen(<port>);*/
}

app.set("PORT", PORT);

mongoDB();

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AatWS7bPUsaanCxASstt_DROXJgWESP5-qDnlAwM_J0JFp596UlChQvchiHwH6AU6oIEDVbJKunHu5pX',
    'client_secret': 'EGNFNDTQg9SNZcnYLQG10A73TQaH9DLVaYwMuLyev8o0r8nC4zKGEeE_WFGTZnRb5jwPQPxP2DursFDz'
});

app.use(cors());
app.use('*', cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(session({
    cookie: {maxAge: 60000},
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));

app.get('*', cors(), function (_, res) {
    res.sendFile(__dirname, './client/build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }

    };
});

app.get('/*', cors(), function (_, res) {
    res.sendFile(__dirname, './client/build/index.html') , function (err) {
        if (err) {
            res.status(500).send(err)
        }

    };
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

if (process.env.NODE_ENV === "production") {
    // Express will serve up production files
    app.use(express.static("client/build"));
    // serve up index.html file if fit doenst recognize the route
    app.get('*', cors(), function (_, res) {
        res.sendFile(__dirname, './client/build/index.html'), function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    })
    app.get('/*', cors(), function (_, res) {
        res.sendFile(path.join(__dirname, './client/build/index.html'), function (err) {
            if (err) {
                res.status(500).send(err)
            }
        })
    })
}

app.use("/login/check/creds", require("./routes/auth/checkCreds.js"));
app.use("/post/reply/comment/profile", require("./routes/comments/postReplyComment.js"));
app.use("/gather/profile/comments/individual", require("./routes/comments/gather/gatherComments.js"));
app.use("/stream", require("./routes/streaming/stream.js"));
app.use("/streaming/gather", require("./routes/streaming/gatherStreams.js"));
app.use("/streaming/start/broadcast", require("./routes/streaming/startBroadcast.js"));
app.use("/streams/gather/broadcasts", require("./routes/streaming/gatherBroadcasts.js"));
app.use("/streaming/stop", require("./routes/streaming/stopStream.js"));
app.use("/streaming/get/individual/broadcast", require("./routes/streaming/getBroadcastIndividual.js"));
app.use("/register/new/user", require("./routes/auth/register.js"));
app.use("/mux/create/stream", require("./routes/mux/index.js"));
app.use("/mux/get/streams", require("./routes/mux/gatherStream.js"));
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
app.use("/send/friend/request/reciever", require("./routes/friendslist/addFriend/recievingFriend.js"));
app.use("/send/friend/request/sender", require("./routes/friendslist/addFriend/sendingFriend.js"));
app.use("/gather/friends/list/navbar", require("./routes/friendslist/gatherPending/gather.js"));
app.use("/gather/username/profile", require("./routes/profile/gatherData/gatherUsername.js"));
app.use("/handle/friend/request", require("./routes/friendslist/addFriend/approve.js"));
app.use("/recieving/approval/send/confirmation", require("./routes/friendslist/addFriend/recievingApproval.js"));
app.use("/gather/friends/list/personalized", require("./routes/friendslist/retrieve/retrieve.js"));
app.use("/figure/out/if/friends", require("./routes/friendslist/findOutFriend.js"));
app.use("/paypal/pay", require("./routes/paypal/pay/intitial.js"));
app.use("/success", require("./routes/paypal/pay/success.js"));
app.use("/cancel", require("./routes/paypal/pay/cancel.js"));
app.use("/tokens/gather", require("./routes/tokens/gatherTokens.js"));
app.use("/generate/user/token", require("./routes/getStreamChat/tokens/createToken.js"));
app.use("/stream/feed/token", require("./routes/getStreamChat/tokens/feed.js"));
app.use("/gather/image/profile", require("./routes/gatherUserImage.js"));
app.use("/post/channel/db", require("./routes/chat/saveToDatabase/saveChannel.js"));
app.use("/post/channel/db/other/user", require("./routes/chat/saveToDatabase/saveReceivingChannel.js"));
app.use("/gather/personal/channels", require("./routes/chat/gatherCredentials/gatherChannels.js"));
app.use("/gather/user/info/from/stream", require("./routes/streaming/getByStreamId.js"));
app.use("/take/away/tokens/tip", require("./routes/tokens/takeAwayTokensTip.js"));
app.use("/send/tokens/to/user", require("./routes/tokens/sendTokensToUser.js"));
app.use("/gather/sub/responses", require("./routes/chat/custom_chat/chatHome.js"));
app.use("/gather/unique/stream/id", require("./routes/getStreamChat/gatherUniqueStreamId.js"));
app.use("/post/private/stream/id/sender", require("./routes/streaming/private/senderCode.js"));
app.use("/post/private/stream/id/reciever", require("./routes/streaming/private/recieverCode.js"));
app.use("/check/stream/live/id", require("./routes/streaming/private/checkCode.js"));
app.use("/check/if/cammer/true", require("./routes/checkIfCammer.js"));
app.use("/gather/user/id/specific", require("./routes/gatherSpecificID.js"));
app.use("/set/ready", require("./routes/streaming/private/setReady.js"));
app.use("/get/stream/mux/id", require("./routes/getMuxID.js"));
app.use("/get/user/that/matches/id", require("./routes/getUserThatMatchesID.js"));
app.use("/post/mux/private/stream", require("./routes/mux/createPrivate.js"));
app.use("/create/mux/token/private", require("./routes/mux/createToken.js"));
app.use("/create/mux/json/web/token", require("./routes/mux/createJSONWebToken.js"));
app.use("/check/stream/live/id/two", require("./routes/streaming/findSpecificUserByID.js"));
// saving stream data db stuff 
app.use("/complete/stream/mongodb", require("./routes/streaming/mongodb/findByStreamPlaybackId.js"));
app.use("/gather/each/every/stream/mongodb", require("./routes/streaming/mongodb/gatherEachStream.js"));
// saving stream data db stuff ^^^^^^^^^
app.use("/search/user", require("./routes/friendslist/searchUser.js"));
app.use("/complete/tip/list", require("./routes/forms/cammerRegistration/postTipRates.js"));
app.use("/get/user", require("./routes/getUser.js"));
app.use("/make/blockchain/payment", require("./routes/blockchain/currency/purchase.js"));
app.use("/gather/blockchain/blocks", require("./routes/blockchain/getChain.js"));
app.use("/mine/crypto", require("./routes/blockchain/currency/mine.js"));
app.use("/gather/port/number", require("./routes/getPort.js"));
app.use("/post/lovense/id", require("./routes/lovense/postID.js"));
app.use("/gather/lovense/toyID", require("./routes/lovense/gatherID.js"));
app.use("/verification", require("./routes/auth/verification.js"));
app.use("/post/photo/feed/individual", require("./routes/profile/photo/upload.js"));
app.use("/gather/photos/onlyfans/page", require("./routes/profile/photo/gatherPhotos.js"));
app.use("/gather/username/individual/user", require("./routes/getUserByUsername.js"));
app.use("/upload/cover/photo", require("./routes/profile/uploadCoverPhoto.js"));
app.use("/submit/feed/comment/individual", require("./routes/profile/addNewData/addCommentFeed.js"));
app.use("/gather/instagram/feed/comments", require("./routes/profile/gatherData/gatherInstagramComments.js"));
app.use("/delete/comment/instagram/feed/individual", require("./routes/profile/removeData/removeComment.js"));
app.use("/sendgrid/send/email", require("./routes/sendgrid/sendgridEmailSend.js"));
app.use("/follow/user", require("./routes/following/followUser.js"));
app.use("/gather/followers", require("./routes/following/gatherFollowers.js"));
app.use("/gather/individual/stream/display", require("./routes/streaming/mongodb/getStreams.js"));
// RTMP BEGIN
app.use("/streams/info", require("./routes/streaming/rtmp/info.js"));
app.use("/stream_key/create", require("./routes/streaming/rtmp/stream_key.js"));
app.use("/stream_key/gather", require("./routes/streaming/rtmp/gatherStreamKey.js"));
app.use("/get/stream/last", require("./routes/streaming/findByStreamKey.js"));
app.use("/complete/stream/rtmp", require("./routes/streaming/rtmp/completeStream.js"));
// RTMP END


app.get("/blockchain", (req, res) => {
    res.send(gemshire);
});

app.post("/receive-new-block", (req, res) => {
    const {newBlock} = req.body;
    const lastBlock = gemshire.getLastBlock();

    const correctHash = lastBlock.hash === newBlock.previousBlockHash;
    const correctIndex = lastBlock["index"] + 1 === newBlock["index"];

    if (correctHash && correctIndex) {
        gemshire.chain.push(newBlock);
        gemshire.pendingTransactions = [];
        res.json({
            note: "New block received and accepted.",
            newBlock
        })
    } else {
        res.json({
            note: "New block rejected.",
            newBlock
        })
    }

})

app.get("/mine", (req, res) => {

    const lastBlock = gemshire.getLastBlock();

    const previousBlockHash = lastBlock["hash"];

    const currentBlockData = {
        transactions: gemshire.pendingTransactions,
        index: lastBlock["index"] + 1
    }

    const nounce = gemshire.proofOfWork(previousBlockHash, currentBlockData);

    const blockHash = gemshire.hashBlock(previousBlockHash, currentBlockData, nounce);

    const newBlock = gemshire.createNewBlock(nounce, previousBlockHash, blockHash);

    const requestPromises = [];

    gemshire.networkNodes.forEach((networkNodeUrl) => {
        const requestOptions = {
            uri: networkNodeUrl + "/receive-new-block",
            method: "POST",
            body: {newBlock},
            json: true
        };

        requestPromises.push(rp(requestOptions));
    })

    Promise.all(requestPromises).then((data) => {
        const requestOptions = {
            uri: gemshire.currentNodeUrl + "/transaction/broadcast",
            method: "POST",
            body: {
                amount: 12.5,
                sender: "00",
                recipient: nodeAddress
            },
            json: true
        }

        return rp(requestOptions);
    }).then((data) => {
        res.json({
            note: "New block mined successfully",
            block: newBlock
        })
    })
});

app.get("/consensus", (req, res) => {
    const requestPromises = [];

    gemshire.networkNodes.forEach((networkNodeUrl) => {
        const requestOptions = {
            uri: networkNodeUrl + "/blockchain",
            method: "GET",
            json: true
        };
        requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises).then((blockchains) => {
        let maxChainLength = gemshire.chain.length;
        let newLongestChain = null;
        let newPendingTransactions = null;

        blockchains.forEach((blockchain) => {
            if (blockchain.chain.length > maxChainLength) {
                maxChainLength = blockchain.chain.length;
                newLongestChain = blockchain.chain;
                newPendingTransactions = blockchain.pendingTransactions;
            }
        });

        if (!newLongestChain || (newLongestChain && !gemshire.chainIsValid(newLongestChain))) {
            res.json({
                note: "Current chain has not been replaced.",
                chain: gemshire.chain
            })
        } else if (newLongestChain && gemshire.chainIsValid(newLongestChain)) {
            gemshire.chain = newLongestChain;
            gemshire.pendingTransactions = newPendingTransactions;
            res.json({
                note: "This chain has been replaced",
                chain: gemshire.chain
            })
        }
    });
});

// register a node and broadcast to network
app.post("/register-and-broadcast-node", (req, res) => {
    const {newNodeUrl} = req.body;

    if (gemshire.networkNodes.indexOf(newNodeUrl) === -1 && gemshire.currentNodeUrl !== newNodeUrl) {
        console.log("ran 3");
        gemshire.networkNodes.push(newNodeUrl);
    }
    const regNodesPromises = [];
    gemshire.networkNodes.forEach((networkNodeUrl) => {
        const requestOptions = {
            uri: networkNodeUrl + "/register-node",
            method: "POST",
            body: {newNodeUrl: newNodeUrl},
            json: true
        }
        regNodesPromises.push(rp(requestOptions));
    });

    Promise.all(regNodesPromises).then((data) => {
        // do operations
        const bulkRegisterOptions = {
            uri: newNodeUrl + "/register-nodes-bulk",
            method: "POST",
            body: {allNetworkNodes: [...gemshire.networkNodes, gemshire.currentNodeUrl]},
            json: true
        };

        return rp(bulkRegisterOptions);
    }).then((data) => {
        console.log("DATA :", data);
        res.json({note: data.note})
    });
});
// register node with the network
app.post("/register-node", (req, res) => {
    console.log("req.body.newNodeUrl", req.body.newNodeUrl, gemshire.currentNodeUrl);
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = gemshire.networkNodes.indexOf(newNodeUrl) === -1;
    const notCurrentNode = gemshire.currentNodeUrl === newNodeUrl;

    if (nodeNotAlreadyPresent && !notCurrentNode) {
        console.log("ran 1");
        gemshire.networkNodes.push(newNodeUrl);
    }
    res.json({
        note: "New node registered successfully."
    })
});
app.post("/transaction", (req, res) => {
    const newTransaction = req.body;

    const blockIndex = gemshire.addTransactionToPendingTransactions(newTransaction);

    res.json({
        note: `Transaction will be added in block ${blockIndex}`
    })
})
app.post('/transaction/broadcast', (req, res) => {
    const {amount, sender, recipient} = req.body;

    const newTransaction = gemshire.createNewTransaction(amount, sender, recipient);

    gemshire.addTransactionToPendingTransactions(newTransaction);

    const requestPromises = [];

    gemshire.networkNodes.forEach((networkNodeUrl) => {
        const requestOptions = {
            uri: networkNodeUrl + "/transaction",
            method: "POST",
            body: newTransaction,
            json: true
        };

        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises).then((data) => {
        res.json({
            note: "Transaction created and broadcasted successfully."
        })
    })
});
// register multiple nodes at once
app.post("/register-nodes-bulk", (req, res) => {
    const allNetworkNodes = req.body.allNetworkNodes;

    allNetworkNodes.forEach((networkNodeUrl) => {
        console.log("allNetworkNodes", allNetworkNodes);
        const nodeNotAlreadyPresent = gemshire.networkNodes.indexOf(networkNodeUrl) === -1;
        const notCurrentNode = gemshire.currentNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode) {
            console.log("Ran 2");
            gemshire.networkNodes.push(networkNodeUrl);
        }
    });
    res.json({
        note: "Bulk registration successful."
    })
});

app.get("/block/:blockHash", (req, res) => {
    const blockHash = req.params.blockHash;
    const correctBlock = gemshire.getBlock(blockHash);
    res.json({
        block: correctBlock
    })
});

app.get("/transaction/:transactionId", (req, res) => {
    const transactionId = req.params.transactionId;

    const transactionData = gemshire.getTransaction(transactionId);

    res.json({
        transaction: transactionData.transaction,
        block: transactionData.block
    })
});

app.get("/address/:address", (req, res) => {
    const address = req.params.address;
    const addressData = gemshire.getAddressData(address);

    res.json({
        addressData
    })
});


node_media_server.run();

thumbnail_generator.start();

io.on("connection", socket => {
    console.log("New client connected");
    socket.on("tipped", (data) => {
        console.log(data);
        io.sockets.emit("tip", data);
    })
    socket.on("endStream", (data) => {
        console.log("The magic - end:", data);
        io.sockets.emit("end", data);
    })

    socket.on("sound", (data) => {
        console.log("sound", data);
        if (data.sound === true) {
            io.sockets.emit("boom", data);
        }
    })
    socket.on("confetti", (data) => {
        console.log(data);
        io.sockets.emit("poof", data);
    })

    socket.on("tip-record", (tips) => {
        console.log(tips);
        io.sockets.emit("tippy", tips);
    })

    socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});
