import SendBird from 'sendbird';
import axios from "axios";

export const sbCreateOpenChannel = ({channelName, userId, email }) => {
  return new Promise((resolve, reject) => {
    if (!channelName) {
      console.log("Channel name is required");
      reject('Channel name is required.');
      return;
    }
    const sb = SendBird.getInstance();
    sb.connect(userId, function(user, error) {
        if (error) {
          console.log(error);
          return;
        }
        axios.post("/gather/image/profile", {
          email
        }).then((res) => {
          console.log(res.data);
          if (res.data) {
            sb.OpenChannel.createChannel(channelName, res.data, null, (channel, error) => {
              if (error) {
                console.log(error);
                reject('Create OpenChannel Failed.');
              } else {
                console.log(channel);
                axios.post("/post/channel/db", {
                  channel,
                  email
                }).then((res) => {
                  console.log(res.data);
                  resolve(channel);
                }).catch((err) => {
                  console.log(err);
                })
                
              }
            });
          }
        }).catch((err) => {
          console.log(err);
        })
    });
  });
};


export const sbCreateOpenChannelListQuery = () => {
  const sb = SendBird.getInstance();
  return sb.OpenChannel.createOpenChannelListQuery();
};

export const sbGetOpenChannelList = openChannelListQuery => {
  return new Promise((resolve, reject) => {
    openChannelListQuery.next((channels, error) => {
      if (error) {
        reject(error);
      } else {
        console.log(channels);
        resolve(channels);
      }
    });
  });
};

export const sbGetOpenChannel = (channelUrl) => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(channel);
        resolve(channel);
      }
    });
  });
};

export const sbOpenChannelEnter = (channel) => {
  return new Promise((resolve, reject) => {
    console.log("CHANNEL :", channel);
    channel.enter((response, error) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(channel);
        resolve(channel);
      }
    });
  });
};


export const sbOpenChannelExit = (channel) => {
  return new Promise((resolve, reject) => {
    channel.exit((response, error) => {
      if (error) {
        reject(error);
        console.log(error);
      } else {
        console.log("resolve channel :", channel);
        resolve(channel);
      }
    });
  });
};

