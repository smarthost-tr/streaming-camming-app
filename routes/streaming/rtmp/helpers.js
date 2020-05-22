const exec = require('child_process').exec;
const config = require('../../../rtmpserver/index.js');
const cmd = config.rtmp_server.trans.ffmpeg;
const path = require("path");

const generateStreamThumbnail = (stream_key) => {
    console.log("Generate stream thumbnail...", stream_key);

    console.log(cmd);

    const args = [
        '-y',
        '-i', 'http://127.0.0.1:8888/live/' + stream_key + '/index.m3u8',
        '-ss', '00:00:01',
        '-vframes', '1',
        '-vf', 'scale=-2:300',
        'server/thumbnails/'+ stream_key +'.png',
    ];
// 'http://127.0.0.1:8888/live/88d97ca9509846799eedf8f0514b098c/index.m3u8'
    const script = `ffmpeg -i http://127.0.0.1:8888/live/${stream_key}/index.m3u8 -ss 00:00:01.000 -vframes 1 ${stream_key}.png`;

    const serverPath = path.resolve(process.cwd() + '/client/src/assets/preview');

    console.log(serverPath);

    exec(script, {
        cwd: serverPath
    });
};
 
module.exports = {
    generateStreamThumbnail : generateStreamThumbnail
};


// 'http://127.0.0.1:8888/live/592105a69480488caf0ec894e27454b2/index.m3u8'