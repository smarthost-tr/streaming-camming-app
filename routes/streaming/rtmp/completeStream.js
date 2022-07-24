const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const moment = require('moment');
const uuid = require("uuid/v4");
const path = require("path");
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Grid = require("gridfs-stream");
const GridFsStorage = require('multer-gridfs-storage');
const fs = require("fs");
const exec = require('child_process').exec;


Grid.mongo = mongoose.mongo;

AWS.config.update({
    secretAccessKey: 'r8qpagbd990S45DZUU5wVFTW7K5jG75/NUc0ojg7',
    accessKeyId: 'AKIAJO4Y5WK3FS2I3UHA',
    region: 'us-east-1'
});

s3 = new AWS.S3();

var gfs = Grid("test", mongo);


mongoose.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, response) => {

        const { id } = req.body;

        console.log("id.....:", id);

        const collection = db.collection("users");

        collection.findOneAndUpdate({ "streams.id": id }, { $set: { "streams.$.active": false }}).then((user) => {
            // save video to assets with exec
            console.log(user.value.stream_key);
            const script = `ffmpeg -i http://127.0.0.1:8888/live/${user.value.stream_key}/index.m3u8 -acodec copy -y -f mp4 ${user.value.stream_key}.mp4`;

            const serverPath = path.resolve(process.cwd() + '/client/public/finishedStreams');

            const fileName = path.resolve(process.cwd() + `/client/public/finishedStreams/${user.value.stream_key}.mp4`);

            console.log("fileName :", fileName);

            console.log("serverPath", serverPath);

            const child = exec(script, { cwd: serverPath });

            const execPromise = (command) => {
                return new Promise((resolve, reject) => {
                    exec(command, (error, stdout, stderr) => {
                        if (error) {
                            console.log("promise err :", error);
                            reject(error);
                            return;
                        }

                        resolve(stdout.trim());
                    });
                });
            }

            execPromise(script, { cwd: serverPath }).then((result) => {
              console.log("JACKPOT :", result);
              fs.readFile(fileName, (err, data) => {
                  if (err) { 
                      console.log('fs error', err);
                  } else {
                    console.log("DATAAAAAAA :", data);

                    const body = fs.createReadStream(data);

                      const stream_key = user.value.stream_key;

                      var params = {
                          Bucket: 'sex-streaming-jerk-n-squirt', // pass your bucket name
                          Key: `${stream_key}.mp4`,
                          Body: body,
                          ContentType: 'video/mp4'
                      };
                     // save video to aws - s3
                     s3.upload(params, (err, data) => {
                        if (err) {
                            console.log("err..... :", err);
                        }
                        console.log("File uploaded successfully :", data);
                        response.status(200).send({
                            message: "Success"
                        }); 
                     });
                  }
              });
          }).catch((e) => {
              console.error("execPromise error :", e.message);
          });

        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;