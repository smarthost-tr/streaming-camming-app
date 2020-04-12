import {
  INIT_OPEN_CHANNEL,
  OPEN_CHANNEL_PROGRESS_START,
  OPEN_CHANNEL_PROGRESS_END,
  OPEN_CHANNEL_LIST_SUCCESS,
  OPEN_CHANNEL_LIST_FAIL,
  GET_OPEN_CHANNEL_SUCCESS,
  GET_OPEN_CHANNEL_FAIL,
  ADD_OPEN_CHANNEL_ITEM,
  CLEAR_ADD_OPEN_CHANNEL,
  CLEAR_SELECTED_OPEN_CHANNEL,
  CHANNEL_EXIT_SUCCESS, 
  CHANNEL_EXIT_FAIL, 

} from './types';
import { sbGetOpenChannelList, sbGetOpenChannel, sbOpenChannelExit } from './sendbird/openChannel.js';
import SendBird from 'sendbird';

export const initOpenChannel = () => {
  return { type: INIT_OPEN_CHANNEL };
};

export const getOpenChannelList = ({ openChannelListQuery, userId }) => {
  return dispatch => {
    if (openChannelListQuery.hasNext) {
      const sb = SendBird.getInstance();
      sb.connect(userId, (user, error) => {
        if (error) {
          console.log(error);
          return;
        }
        return sbGetOpenChannelList(openChannelListQuery)
        .then(channels => {
          console.log(channels);
            dispatch({
              type: OPEN_CHANNEL_LIST_SUCCESS,
              list: channels
            })
          }
        )
        .catch(error => {
          console.log(error);
          dispatch({ 
            type: OPEN_CHANNEL_LIST_FAIL 
          })
        });
      });
    } else {
      dispatch({ 
        type: OPEN_CHANNEL_LIST_FAIL 
      });
      return Promise.resolve(true);
    }
  };
};

export const onOpenChannelPress = (channelUrl) => {
  return dispatch => {
    return sbGetOpenChannel(channelUrl)
      .then(channel => {
        console.log(channel);
          dispatch({
            type: GET_OPEN_CHANNEL_SUCCESS,
            channel: channel
          })
        }
      )
      .catch(error => {
        console.log(error);
        dispatch({ 
          type: GET_OPEN_CHANNEL_FAIL 
        })
      });
  };
};

export const addOpenChannelItem = channel => {
  return {
    type: ADD_OPEN_CHANNEL_ITEM,
    channel: channel
  };
};

export const clearCreatedOpenChannel = () => {
  return { type: CLEAR_ADD_OPEN_CHANNEL };
};

export const clearSelectedOpenChannel = () => {
  return { type: CLEAR_SELECTED_OPEN_CHANNEL };
};

export const openChannelProgress = start => {
  return {
    type: start ? OPEN_CHANNEL_PROGRESS_START : OPEN_CHANNEL_PROGRESS_END
  };
};

export const channelExit = (channelUrl, isOpenChannel) => {
  return dispatch => {
    if (isOpenChannel) {
      return sbGetOpenChannel(channelUrl)
        .then(channel => {
          console.log(channel);
          sbOpenChannelExit(channel)
            .then(response => {
              console.log(response);
              dispatch({ type: CHANNEL_EXIT_SUCCESS })
            })
            .catch(error => {
              console.log(error);
              dispatch({ type: CHANNEL_EXIT_FAIL })
            });
        })
        .catch(error => {
          console.log(error);
          dispatch({ type: CHANNEL_EXIT_FAIL })
        });
    } else {
      const sb = SendBird.getInstance();
      sb.removeChannelHandler(channelUrl);
      dispatch({ 
        type: CHANNEL_EXIT_SUCCESS 
      });
      return Promise.resolve(true);
    }
  };
};