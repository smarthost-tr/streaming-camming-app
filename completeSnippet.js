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
    region: 'us-east-1',
    httpOptions: {
        timeout: 300000 
    }
});

s3 = new AWS.S3();

var gfs = Grid("test", mongo);

// File
// let fileName = 'atom.mov';
// let filePath = './' + fileName;
// let fileKey = fileName;
// let buffer = fs.readFileSync('./' + filePath);

let startTime = new Date();
let partNum = 0;
let partSize = 1024 * 1024 * 5; // Minimum 5MB per chunk (except the last part) http://docs.aws.amazon.com/AmazonS3/latest/API/mpUploadComplete.html
let maxUploadTries = 3;
let buffer = null;

let multipartMap = { 
    Parts: []
};

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, response) => {

        const { id } = req.body;

        console.log("id.....:", id);

        const collection = db.collection("users");

        collection.findOneAndUpdate({ "streams.id": id }, { $set: { "streams.$.active": false }}).then((user) => {
            // save video to assets with exec
            console.log(user.value.stream_key);
            const script = `ffmpeg -i http://127.0.0.1:8888/live/${user.value.stream_key}/index.m3u8 -y -f mp4 ${user.value.stream_key}.mp4`;

            const serverPath = path.resolve(process.cwd() + '/client/public/finishedStreams');

            const fileName = path.resolve(process.cwd() + `/client/public/finishedStreams/${user.value.stream_key}.mp4`);

            console.log("fileName :", fileName);

            console.log("serverPath", serverPath);

            const child = exec(script, { cwd: serverPath });

            child.on('exit', function() {

                console.log("exit.");

                const stream_key = user.value.stream_key;

                  const uploadFile = () => {

                      console.log("RUN.... UPLOAD VIDEO...");

                      fs.readFile(fileName, (err, buffer) => {
                          if (err) { 
                              console.log('fs error', err);
                          } else {

                            let numPartsLeft = Math.ceil(buffer.length / partSize);

                            console.log("DATAAAAAAA :", buffer);
                              // var params = {
                              //     Bucket: 'sex-streaming-jerk-n-squirt', // pass your bucket name
                              //     Key: `${stream_key}.mp4`,
                              //     Body: data,
                              //     ContentType: 'video/mp4'
                              // };
                              const multiPartParams = {
                                  Bucket: 'sex-streaming-jerk-n-squirt',
                                  Key: `${stream_key}.mp4`,
                                  ContentType: 'video/mp4'
                              };
                              const completeMultipartUpload = (s3, doneParams) => {
                                s3.completeMultipartUpload(doneParams, (err, data) => {
                                  if (err) {
                                    console.log("An error occurred while completing the multipart upload");
                                    console.log(err);
                                  } else {
                                    const delta = (new Date() - startTime) / 1000;
                                    console.log('Completed upload in', delta, 'seconds');
                                    console.log('Final upload data:', data);
                                    // response.status(200).send({
                                    //     message: "Success"
                                    // }); 
                                    multipartMap.Parts = [];
                                    console.log("multipartMap.Parts", multipartMap.Parts);
                                  }
                                });
                              }
                              const uploadPart = (s3, multipart, partParams, partNum) => {
                                let tryNum = 1;
                                s3.uploadPart(partParams, (multiErr, mData) => {
                                  if (multiErr){
                                    console.log('multiErr, upload part error:', multiErr);
                                    if (tryNum < maxUploadTries) {
                                      console.log('Retrying upload of part: #', partParams.PartNumber)
                                      uploadPart(s3, multipart, partParams, tryNum + 1);
                                    } else {
                                      console.log('Failed uploading part: #', partParams.PartNumber)
                                    }
                                    return;
                                  }
                                  console.log("PART-NUM :", partNum);
                                  
                                  console.log("Completed part", partParams.PartNumber);
                                  console.log('mData', mData);
                                  multipartMap.Parts.push({
                                    ETag: mData.ETag,
                                    PartNumber: partNum
                                  });
                                  
                                  if (--numPartsLeft > 0) return; // complete only when all parts uploaded

                                  const doneParams = {
                                    // Body: buffer.slice(i, end), 
                                    Bucket: 'sex-streaming-jerk-n-squirt', 
                                    Key: `${stream_key}.mp4`, 
                                    MultipartUpload: multipartMap, 
                                    UploadId: multipart.UploadId
                                  };

                                  

                                  console.log("Completing upload...");
                                  completeMultipartUpload(s3, doneParams);
                                });
                              }
                             // save video to aws - s3
                             s3.createMultipartUpload(multiPartParams, (err, multiPart) => {
                                if (err) {
                                    console.log("err..... :", err);
                                }
                                console.log("File uploaded successfully :", multiPart);
                                for (let i = 0; i < buffer.length; i += partSize) {
                                    partNum++;
                                    const end = Math.min(i + partSize, buffer.length);
                                    const partParams = {
                                        Body: buffer.slice(i, end),
                                        Bucket: 'sex-streaming-jerk-n-squirt',
                                        Key: `${stream_key}.mp4`,
                                        PartNumber: String(partNum),
                                        UploadId: multiPart.UploadId
                                      };

                                    // Send a single part
                                    console.log('Uploading part: #', partParams.PartNumber, ', Range start:', i);
                                    uploadPart(s3, multiPart, partParams, partNum);
                                }
                             });

                          }
                      });
                  };

                uploadFile();
            })

        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;